import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { createShopifySession } from "~/auth.server";
import { ParseQueryParams, handleResponseError } from "~/utils";
import { getSession, commitSession } from "~/sessionStorage.server";

export let loader: LoaderFunction = async ({ request }) => {
  try {
    const params = ParseQueryParams(request.url);
    console.log("params", params);
    if (request.method !== "GET") {
      return json({ error: "Invalid request method" }, { status: 405 });
    }

    console.log("Cookie", request.headers.get("Cookie"));
    const response = await createShopifySession(params, request.headers.get("Cookie"));
    console.log("response", response);
    if (response instanceof Response) {
      return response;
    }

    let session = await getSession(request.headers.get("Cookie"));
    session.set("session", JSON.parse(JSON.stringify(response)));
    let cookieHeader = await commitSession(session);
    console.log("cookieHeader", cookieHeader);

    return redirect("/dashboard/home", {
      headers: {
        "Set-Cookie": cookieHeader,
      },
    });
  } catch (error) {
    return handleResponseError(error);
  }
};
