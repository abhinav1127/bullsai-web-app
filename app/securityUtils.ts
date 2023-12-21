import crypto from "crypto";
import type { QueryParams } from "./types";
import { readSignedNonceCookie } from "./nonceCookie.server";

export function verifyHMAC(queryParams: QueryParams): boolean {
  // Extract the HMAC and remove it from the query parameters
  const { hmac, ...rest } = queryParams;

  // Create a string of the remaining query parameters sorted alphabetically
  const message = Object.keys(rest)
    .sort()
    .map((key) => `${key}=${rest[key]}`)
    .join("&");

  // Use HMAC-SHA256 hash function to hash the message with the client secret key
  const generatedHash = crypto
    .createHmac("sha256", process.env.SHOPIFY_CLIENT_SECRET || "")
    .update(message)
    .digest("hex");

  // Compare the generated hash with the HMAC from the query parameters
  return generatedHash === hmac;
}

export async function verifyShopifyAuthCodeRequest(
  queryParams: QueryParams,
  signedCookieNonce: string | null
): Promise<boolean> {
  // Verify the nonce
  console.log("nonce", queryParams.state);
  console.log("nonce", await readSignedNonceCookie(signedCookieNonce));
  if (queryParams.state !== (await readSignedNonceCookie(signedCookieNonce))) {
    console.log("nonce failed");
    return false;
  }

  // Verify the HMAC
  if (!verifyHMAC(queryParams)) {
    console.log("hmac failed");
    return false;
  }

  // Verify the shop parameter
  const shopRegex = /^[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com$/;
  if (!shopRegex.test(queryParams.shop)) {
    console.log("shop parameter check failed");
    return false;
  }

  return true;
}
