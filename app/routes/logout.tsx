import { redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { destroySession, getSession } from "~/sessionStorage.server";

export let loader: LoaderFunction = async ({ request }) => {
  let sessionCookie = await getSession(request.headers.get("Cookie"));
  const cookieHeader = await destroySession(sessionCookie);
  return redirect("/home", {
    status: 200,
    headers: {
      "Set-Cookie": cookieHeader,
    },
  });
};
