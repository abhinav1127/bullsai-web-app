import { redirect } from "@remix-run/node";
import { getSession, destroySession } from "~/sessionStorage.server";
import { getValidShopifySession } from "~/types";

export function GetBaseURL(): string {
  console.log("process.env.USE_LOCALHOST", process.env.USE_LOCALHOST);
  return process.env.USE_LOCALHOST ? "http://localhost:3000" : "https://bullsai.app";
}

export async function ValidateProtectedPageRequest(request: Request): Promise<void> {
  // if (request.method !== "GET") {
  //   throw new Response("Invalid Request", { status: 400 });
  // }

  const { validSession, headers } = await ValidateShopifySession(request);

  if (!validSession) {
    console.log("no session exists, redirecting to index");
    throw redirect("/", { headers });
  }
}

export async function handleSessionForUnprotectedPage(request: Request): Promise<void> {
  const { validSession, headers } = await ValidateShopifySession(request);

  if (validSession) {
    console.log("session exists, redirecting to dashboard");
    throw redirect("/dashboard/home", { headers });
  } else if (headers.has("Set-Cookie")) {
    console.log("destroy session");
    throw redirect("/", { headers });
  }
}

export async function ValidateShopifySession(request: Request): Promise<{ validSession: boolean; headers: Headers }> {
  const sessionCookie = await getSession(request.headers.get("Cookie"));
  console.log("sessionCookie", sessionCookie);
  const session = sessionCookie?.get("session");

  if (!session) {
    console.log("no session exists");
    return { validSession: false, headers: new Headers() };
  }

  const shopifySession = getValidShopifySession(session);

  if (!shopifySession) {
    console.log("session is not valid, destroy cookie");
    const headers = new Headers();
    headers.append("Set-Cookie", await destroySession(sessionCookie));
    return { validSession: false, headers };
  }

  return { validSession: true, headers: new Headers() };
}

export function ParseQueryParams(url: string | URL): { [key: string]: string } {
  const searchParams = new URL(url).searchParams;
  return Object.fromEntries(searchParams.entries());
}

export function handleResponseError(error: unknown): Response {
  if (error instanceof Response) {
    return error;
  }

  console.error("An error occurred:", error);
  return new Response("Internal Server Error", { status: 500 });
}

export function toLowerCaseAndDashes(input: string): string {
  return input.toLowerCase().replace(/\s/g, "-");
}
