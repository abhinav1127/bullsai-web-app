import { verifyHMAC, verifyShopifyAuthCodeRequest } from "./securityUtils";
import crypto from "crypto";
import { scopeString as scopesString } from "./constants";
import type { QueryParams, ShopifySession } from "./types";
import type { FetchAccessTokenTypes } from "./inputTypes";
import { GetBaseURL, handleResponseError } from "./utils";
import { setSignedNonceCookie } from "./nonceCookie.server";

const clientId = process.env.SHOPIFY_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
if (!clientId || !clientSecret) {
  throw new Error("Missing Shopify Client ID or Client Secret");
}

const users = [
  { id: 1, email: "nick@teelaunch.com" },
  { id: 2, email: process.env.EMAIL },
];

function findById(id: number, fn) {
  const idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error(`User ${id} does not exist`));
  }
}

function findByEmail(email: string, fn) {
  for (let i = 0, len = users.length; i < len; i++) {
    const user = users[i];
    if (user.email === email) {
      return fn(null, user);
    }
  }

  return fn(null, null);
}

// Handles Installation request as well if necessary using the authorization url
export async function handleShopifyAccessRequest(queryParams: QueryParams): Promise<Response> {
  try {
    if (!verifyHMAC(queryParams)) {
      console.log("hmac failed");
      throw new Response("Invalid HMAC", { status: 400 });
    }
    console.log("hmac passed");

    return handleAuthRedirect(queryParams.shop);
  } catch (error) {
    return handleResponseError(error);
  }
}

export async function handleAuthRedirect(shop: string, additionalHeaders: Headers): Promise<Response> {
  if (!clientId || !clientSecret) {
    throw new Error("Missing Shopify Client ID or Client Secret");
  }

  const nonce = crypto.randomBytes(16).toString("base64");

  const params = new URLSearchParams({
    client_id: clientId,
    scope: scopesString,
    redirect_uri: `${GetBaseURL()}/auth/shopify/callback`,
    state: nonce,
  });

  const authorizationUrl = `https://${shop}/admin/oauth/authorize?${params.toString()}`;

  console.log("authorizationUrl", authorizationUrl);

  const cookieHeader = await setSignedNonceCookie(nonce);

  return new Response(null, {
    headers: {
      "Set-Cookie": cookieHeader,
      Location: authorizationUrl,
      ...additionalHeaders,
    },
    status: 303,
    statusText: "See Other",
  });
}

export async function createShopifySession(
  queryParams: QueryParams,
  signedCookieNonce: string | null
): Promise<Response | ShopifySession> {
  if (!(await verifyShopifyAuthCodeRequest(queryParams, signedCookieNonce))) {
    console.log("Shopify Authorization Code failed");
    throw new Response("Shopify Authorization failed", { status: 400 });
  }
  console.log("Shopify Authorization Code succeeded");

  const data = await fetchShopifyAccessToken(queryParams.shop, queryParams.code);
  console.log("data2", data);

  if (data.scope != scopesString) {
    console.error(`Mismatch between expected (${scopesString}) and granted scopes (${data.scope}), but continuing`);
  }
  if (!data.access_token) {
    throw new Error("Missing access token from Shopify");
  }

  return {
    shop: queryParams.shop,
    scopes: data.scope.split(","),
    accessToken: data.access_token,
    expires: Date.now() + 86400000,
  };
}

async function fetchShopifyAccessToken(shop: string, code: string): Promise<FetchAccessTokenTypes> {
  if (!clientId || !clientSecret) {
    throw new Error("Missing Shopify Client ID or Client Secret");
  }

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
  });

  const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token?${params.toString()}`;
  const response = await fetch(accessTokenRequestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Response("Failed to get access token from Shopify", { status: response.status });
  }

  console.log("response", response);
  const data = await response.json();
  console.log("data", data);
  return data; // This will contain the access token and other
}
