// app/routes/error.tsx

import { Link } from "@remix-run/react";

export default function ErrorPage() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Oops! Something Went Wrong</h1>
      <p>Sorry, there was an unexpected issue.</p>
      <Link to="/" style={{ textDecoration: "underline" }}>
        Go Home
      </Link>
    </div>
  );
}
