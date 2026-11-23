import type { Metadata } from "next";
import Link from "next/link";
import { DOCS_URL } from "@/lib/sources";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested page does not exist on traceweave.org.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <section className="page-header">
      <div className="container prose">
        <div className="eyebrow">404 · Not found</div>
        <h1>That page does not exist.</h1>
        <p className="lead">
          The address you followed is not part of traceweave.org. For deeper
          technical references, schemas, and contract text, check the
          documentation site.
        </p>
        <div className="actions">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/how-it-works" className="btn btn-secondary">
            How it works
          </Link>
          <a href={DOCS_URL} className="btn btn-secondary" rel="noopener noreferrer">
            Documentation site ↗
          </a>
        </div>
      </div>
    </section>
  );
}
