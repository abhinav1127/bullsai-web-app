import type { MetaFunction, LoaderFunction, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useFetcher } from "@remix-run/react";
import { handleAuthRedirect, handleShopifyAccessRequest } from "~/auth.server";
import { myShopifyDomainExtension } from "~/constants";
import { ParseQueryParams, handleResponseError, handleSessionForUnprotectedPage } from "~/utils";
import Logo from "./components/Logo";

// Route to initiate the authentication process
export let loader: LoaderFunction = async ({ request }) => {
  try {
    await handleSessionForUnprotectedPage(request);
    const params = ParseQueryParams(request.url);
    if (params.shop) {
      return handleShopifyAccessRequest(params);
    }
    return json({});
  } catch (error) {
    return handleResponseError(error);
  }
};

export const action = async (props: ActionFunctionArgs) => {
  try {
    const body = await props.request.text();
    const params = new URLSearchParams(body);
    const shop = params.get("shop");

    // TODO: Validate shop name in DB
    if (!shop) {
      return json({ error: "Missing shop name" }, { status: 400 });
    }

    return handleAuthRedirect(shop + myShopifyDomainExtension);
  } catch (error) {
    return handleResponseError(error);
  }
};

export const meta: MetaFunction = () => {
  return [{ title: "BullsAI" }, { name: "description", content: "Welcome to BullsAI!" }];
};

export default function Index() {
  const fetcher = useFetcher();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex-1 bg-primary flex justify-center items-center">
        <Logo className="h-48 w-48 fill-white" />
      </div>
      <div className="flex-1 bg-white flex flex-col justify-center items-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3">Login to BullsAI</h2>
          <p className="mb-5 text-gray-600">Experience personalized e-commerce like never before</p>
        </div>

        <fetcher.Form action="/?index" method="post" className="w-full max-w-xs">
          <div className="mb-4">
            <label htmlFor="shop" className="block text-sm font-medium text-gray-700">
              Shopify Store Name
            </label>
            <input
              type="text"
              name="shop"
              id="shop"
              placeholder="storename"
              required
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm w-full"
              autoFocus
            />
            <p className="mt-2 text-sm text-gray-500">
              Enter the subdomain of your Shopify store, e.g., 'storename' from 'storename.myshopify.com'.
            </p>
          </div>
          <button type="submit" className="btn-primary w-full">
            Log In
          </button>
        </fetcher.Form>

        <div className="mt-6">
          <Link to="http://getbullsai.com" className="text-blue-600 hover:text-blue-800 transition duration-300">
            Learn More About BullsAI
          </Link>
        </div>
      </div>
    </div>
  );
}
