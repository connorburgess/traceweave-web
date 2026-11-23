import type { Metadata } from "next";
import Link from "next/link";
import { SourceLink } from "@/components/SourceLink";
import { COVERAGE_ITEMS, PLANNED_CAPABILITIES } from "@/data/facts";
import { DOCS_URL } from "@/lib/sources";

export const metadata: Metadata = {
  title: "What it covers",
  description:
    "Honest status of Traceweave content profiles across Go, Rust, TypeScript/JavaScript, plain text, still images, audio, and compiled binaries.",
  alternates: {
    canonical: "/coverage",
  },
};

function badgeClass(tone: "active" | "specified" | "researched" | "unstarted") {
  if (tone === "active") return "badge badge-active";
  if (tone === "researched") return "badge badge-caution";
  return "badge";
}

export default function CoveragePage() {
  return (
    <>
      <section className="page-header">
        <div className="container prose">
          <div className="eyebrow">Content profiles</div>
          <h1>What Traceweave covers — and what is not built yet</h1>
          <p className="lead">
            The shared core record format is content-independent, but extraction rules,
            transformations, and failure envelopes belong to each content profile. No
            profile inherits accuracy or resilience claims from another.
          </p>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="matrix-heading">
        <div className="container">
          <h2 id="matrix-heading">Content type status</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Content type</th>
                  <th scope="col">Profile / draft</th>
                  <th scope="col">Status</th>
                  <th scope="col">Current scope and limit</th>
                </tr>
              </thead>
              <tbody>
                {COVERAGE_ITEMS.map((item) => (
                  <tr key={item.kind}>
                    <td>
                      <strong>{item.kind}</strong>
                    </td>
                    <td className="mono" style={{ fontSize: "0.84rem" }}>
                      {item.profiles}
                    </td>
                    <td>
                      <span className={badgeClass(item.statusTone)}>{item.status}</span>
                    </td>
                    <td>
                      <p style={{ marginBottom: "0.45rem" }}>{item.summary}</p>
                      <SourceLink
                        path={item.sourcePath}
                        anchor={"anchor" in item ? item.anchor : undefined}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-muted prose" style={{ maxWidth: "100%" }}>
            <h3 style={{ marginBottom: "0.4rem" }}>Note on Python</h3>
            <p style={{ marginBottom: 0 }}>
              Python is used in the specification repository for schema validation and
              vector checkers only. As stated in{" "}
              <SourceLink path="ROADMAP.md" anchor="pilot-languages" />, Python research
              tooling does not select Python as a code profile target, and no Python
              extraction profile is currently specified or drafted.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="planned-heading">
        <div className="container">
          <div className="eyebrow">Planned extensions</div>
          <h2 id="planned-heading">Provenance, review packets, and interoperability</h2>
          <p className="prose">
            None of the items below is shipped yet. Each is gated behind explicit fixtures
            and non-author review in <SourceLink path="ROADMAP.md" />.
          </p>

          <div className="grid-2" style={{ marginTop: "1.25rem" }}>
            {PLANNED_CAPABILITIES.map((cap) => (
              <div key={cap.title} className="card">
                <div className="card-title-row">
                  <h3 style={{ marginBottom: 0 }}>{cap.title}</h3>
                  <span className="badge mono">{cap.status} · {cap.gates}</span>
                </div>
                <p style={{ marginBottom: "0.65rem" }}>{cap.summary}</p>
                <SourceLink
                  path={cap.sourcePath}
                  anchor={"anchor" in cap ? cap.anchor : undefined}
                />
              </div>
            ))}
          </div>

          <div className="actions">
            <Link href="/evidence" className="btn btn-primary">
              Read the research evidence &amp; limits
            </Link>
            <Link href="/roadmap" className="btn btn-secondary">
              View roadmap gates
            </Link>
            <a href={DOCS_URL} className="btn btn-secondary" rel="noopener noreferrer">
              Profile documents on docs.traceweave.org ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
