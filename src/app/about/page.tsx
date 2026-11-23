import type { Metadata } from "next";
import { SeatbeltLabsMark } from "@/components/SeatbeltLabsMark";
import { SourceLink } from "@/components/SourceLink";
import { DOCS_URL, SPEC_ISSUES_URL, SPEC_TREE_URL, specUrl } from "@/lib/sources";

export const metadata: Metadata = {
  title: "About",
  description:
    "Traceweave is an open, non-commercial, independent specification for recognising your own work when it turns up somewhere else, and for producing evidence of the match that anyone can re-run and check.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-header">
        <div className="container prose">
          <div className="eyebrow">About Traceweave</div>
          <h1>An open, non-commercial, independent specification</h1>
          <p className="lead">
            Traceweave is an open specification for recognising your own work when it
            turns up somewhere else, and for producing evidence of the match that anyone
            can re-run and check.
          </p>
          <p>
            It is an open, non-commercial, independent effort — not a company, standards
            body, certification program, or legal entity. Independent reference
            implementations in Rust and Go exist as evidence that the specification can be
            implemented independently, not as a closed product.
          </p>
          <p className="maintained-by">
            <span>Maintained by</span>
            <a
              href="https://seatbeltlabs.com"
              rel="noopener noreferrer"
              className="seatbelt-link"
            >
              <span className="seatbelt-mark-plate">
                <SeatbeltLabsMark />
              </span>
              <span className="seatbelt-wordmark">SEATBELT LABS</span>
            </a>
          </p>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="governance-heading">
        <div className="container">
          <div className="grid-2">
            <div className="card">
              <h2 id="governance-heading">How decisions and reviews work</h2>
              <ul className="clean-list">
                <li>
                  <strong>One reviewable change per decision:</strong> format changes move
                  schemas, examples, negative fixtures, and version identifiers together.
                </li>
                <li>
                  <strong>Committed evidence before progress:</strong> roadmap gates close
                  only when someone who did not do the work can re-run the check or recount
                  the evidence from a clean clone.
                </li>
                <li>
                  <strong>Non-author reviews:</strong> contracts, protocols, and
                  implementation merges receive independent review passes whose findings
                  are recorded and dispositioned publicly.
                </li>
                <li>
                  <strong>Two implementations for stability:</strong> no profile is marked
                  stable until two independent implementations reproduce every positive and
                  negative vector byte for byte.
                </li>
              </ul>
              <p style={{ marginTop: "1rem", marginBottom: 0 }}>
                <SourceLink path="ROADMAP.md" anchor="how-work-is-accepted" /> ·{" "}
                <SourceLink path="spec/conformance.md" />
              </p>
            </div>

            <div className="card">
              <h2>Contributing and reporting problems</h2>
              <p>
                Discussion and pull requests live in the specification repository.
                Proposals should start from a concrete use case, cite primary sources for
                external claims, and separate measured results from open hypotheses.
              </p>
              <ul className="clean-list">
                <li>
                  <strong>Design issues &amp; pull requests:</strong> open an issue or pull
                  request in the specification repository following{" "}
                  <SourceLink path="CONTRIBUTING.md" />.
                </li>
                <li>
                  <strong>Never submit private evidence:</strong> do not post private keys,
                  real catalogues, nonces, or unpublished suspect content to public issues
                  or pull requests. Use synthetic fixtures you have permission to share.
                </li>
                <li>
                  <strong>Security &amp; confidential reports:</strong> follow{" "}
                  <SourceLink path="SECURITY.md" /> — use GitHub private vulnerability
                  reporting if enabled, or ask for a private channel without posting the
                  exploit or sensitive material.
                </li>
                <li>
                  <strong>Contact:</strong>{" "}
                  <a href="mailto:connor@seatbeltlabs.com">connor@seatbeltlabs.com</a>.
                </li>
              </ul>
              <div className="actions" style={{ marginTop: "1.1rem" }}>
                <a
                  href={SPEC_ISSUES_URL}
                  className="btn btn-primary"
                  rel="noopener noreferrer"
                >
                  Open an issue ↗
                </a>
                <a
                  href={SPEC_TREE_URL}
                  className="btn btn-secondary"
                  rel="noopener noreferrer"
                >
                  Specification repo ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="licences-heading">
        <div className="container prose">
          <div className="eyebrow">Licensing</div>
          <h2 id="licences-heading">Open licences for prose and code</h2>
          <p>
            Both this website and the specification repository follow the same dual-scope
            open licence split (<SourceLink path="LICENSE.md" />):
          </p>
          <ul className="clean-list" style={{ marginBottom: "1.25rem" }}>
            <li>
              <strong>Prose and documentation:</strong>{" "}
              <a href={specUrl("LICENSES/CC-BY-4.0.txt")} rel="noopener noreferrer">
                Creative Commons Attribution 4.0 International (CC BY 4.0)
              </a>
              .
            </li>
            <li>
              <strong>Source code, schemas, test vectors, and scripts:</strong>{" "}
              <a href={specUrl("LICENSES/Apache-2.0.txt")} rel="noopener noreferrer">
                Apache License, Version 2.0 (Apache-2.0)
              </a>
              .
            </li>
          </ul>
          <p>
            These licences govern Traceweave&apos;s own specification, website, and
            tooling. They do not change the copyright or licence status of any external
            content processed by an implementation, and no claim of patent clearance or
            standards-body endorsement is made.
          </p>

          <div className="actions">
            <a href={DOCS_URL} className="btn btn-secondary" rel="noopener noreferrer">
              Documentation site (docs.traceweave.org) ↗
            </a>
            <a
              href={specUrl("CONTRIBUTING.md")}
              className="btn btn-secondary"
              rel="noopener noreferrer"
            >
              Read CONTRIBUTING.md ↗
            </a>
            <a
              href={specUrl("SECURITY.md")}
              className="btn btn-secondary"
              rel="noopener noreferrer"
            >
              Read SECURITY.md ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
