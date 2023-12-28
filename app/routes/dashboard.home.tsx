import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

// TODO: Determine why this is being called twice
export let loader: LoaderFunction = async ({ request }) => {
  console.log("home2323", request);
  return json({ message: "This is the home page" });
};

export default function Home() {
  return (
    <div>
      <h1>
        Dashboard Home2Dashboard Home2Dashboard Home2Dashboard Home2Dashboard Home2Dashboard Home2Dashboard
        Home2Dashboard Home2Dashboard Home2
      </h1>
      {/* Additional content for the home page */}
    </div>
  );
}
