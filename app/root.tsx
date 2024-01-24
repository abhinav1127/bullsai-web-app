import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import "react-toastify/dist/ReactToastify.min.css";
import { Tooltip } from "react-tooltip";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
  { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/react-toastify/dist/ReactToastify.min.css" },
  {
    rel: "icon",
    href: "/bullsai.png",
    type: "image/png",
  },
];
export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Tooltip id="my-tooltip" className="z-[100]" />
      </body>
    </html>
  );
}
