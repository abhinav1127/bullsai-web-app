import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { withAuthentication } from "~/utils";

// TODO: Determine why this is being called twice
export let loader: LoaderFunction = withAuthentication(async ({ request, shopifySession }) => {
  return json({ session: shopifySession });
});
