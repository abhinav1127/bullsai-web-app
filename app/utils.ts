import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getSession, destroySession } from "~/sessionStorage.server";
import { getValidShopifySession } from "~/types";
import type { LoaderFunctionArgsWithSession, ShopifySession } from "~/types";

export function GetBaseURL(): string {
  console.log("process.env.USE_LOCALHOST", process.env.USE_LOCALHOST);
  return process.env.USE_LOCALHOST ? "http://localhost:3000" : "https://bullsai.app";
}

export async function ValidateProtectedPageRequest(request: Request): Promise<ShopifySession> {
  if (request.method !== "GET") {
    throw new Response("Invalid Request", { status: 400 });
  }

  let sessionCookie = await getSession(request.headers.get("Cookie"));
  const session = sessionCookie.get("session");

  console.log("session", session);
  const shopifySession = getValidShopifySession(session);
  if (!shopifySession) {
    console.log("session is not valid, destroying cookie");
    const cookieHeader = await destroySession(sessionCookie);
    throw redirect("Unauthorized", {
      status: 401,
      headers: {
        "Set-Cookie": cookieHeader,
      },
    });
  }

  return shopifySession;
}

export function ParseQueryParams(url: string | URL): { [key: string]: string } {
  const searchParams = new URL(url).searchParams;
  let paramsObject: { [key: string]: string } = {};

  searchParams.forEach((value, key) => {
    paramsObject[key] = value;
  });

  return paramsObject;
}

export function handleResponseError(error: unknown): Response {
  if (error instanceof Response) {
    return error;
  }

  console.error("An error occurred:", error);
  return new Response("Internal Server Error", { status: 500 });
}

export async function withAuthentication(
  loader: (args: LoaderFunctionArgsWithSession) => Promise<any>
): Promise<LoaderFunction> {
  return async (args) => {
    try {
      const shopifySession = await ValidateProtectedPageRequest(args.request);
      return loader({ ...args, shopifySession });
    } catch (error) {
      return handleResponseError(error);
    }
  };
}
