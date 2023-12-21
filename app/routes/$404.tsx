import { Link } from "@remix-run/react";

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn't find the page you're looking for.</p>
      <Link to="/" style={{ textDecoration: "underline" }}>
        Go Home
      </Link>
    </div>
  );
}
