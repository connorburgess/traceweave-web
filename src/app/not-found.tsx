import type { Metadata } from "next";
import { Button } from "@/components/Button";
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
      <div className="container">
        <div className="hero-copy">
          <div className="eyebrow">404 · Not found</div>
          <h1>That page does not exist.</h1>
          <p className="lead">
            The address you followed is not part of traceweave.org. For deeper
            technical references, schemas, and contract text, check the
            documentation site.
          </p>
          <div className="actions">
            <Button href="/" variant="primary">
              Back to home
            </Button>
            <Button href="/how-it-works" variant="secondary">
              How it works
            </Button>
            <Button href={DOCS_URL} variant="secondary" external>
              Documentation site
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
