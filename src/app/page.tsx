import type { Metadata } from "next";
import Link from "next/link";
import { SourceLink } from "@/components/SourceLink";
import { WorkflowDiagram } from "@/components/WorkflowDiagram";
import { ROADMAP_COUNTS, SPEC_DRAFT_VERSION } from "@/data/facts";
import { DOCS_URL, SPEC_TREE_URL, specUrl } from "@/lib/sources";

export const metadata: Metadata = {
  title: "Traceweave — Open specification for checkable content reuse evidence",
  description:
    "Traceweave is an open specification for recognising your own work when it turns up somewhere else, and for producing evidence of the match that anyone can re-run and check.",
  alternates: {
    canonical: "/",
  },
};

const WHO_IT_IS_FOR = [
  {
    role: "Software maintainers",
    summary:
      "Locate fragments of reference source code inside a local candidate project, with exact byte spans and fragment containment reported separately from whole-file similarity.",
  },
  {
    role: "Origin & licence reviewers",
    summary:
      "Pair technical match regions with separate origin records and archived licence notices so provenance facts stay distinct from human review.",
  },
  {
    role: "Creators keeping private records",
    summary:
      "Keep local fingerprint catalogues and exact-byte commitments on your own machine without uploading work or publishing an identity.",
  },
  {
    role: "Auditors & recipients",
    summary:
      "Re-run a comparison from catalogues and pinned configuration bytes to verify every count and span in a received report independently.",
  },
  {
    role: "Researchers & implementers",
    summary:
      "Measure how code, writing, and image profiles behave across transformations and control sets, with explicit denominators and abstentions.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="status-strip" role="note" aria-label="Project maturity status">
            <span className="status-dot" aria-hidden="true" />
            <span>
              Experimental draft ({SPEC_DRAFT_VERSION}) — not a standard and not yet
              evaluated on real-world data.
            </span>
          </div>

          <div style={{ maxWidth: "74ch" }}>
            <h1>
              Recognise your own work when it turns up somewhere else.
            </h1>
            <p className="lead">
              Traceweave is an open specification for recognising your own work when it
              turns up somewhere else, and for producing evidence of the match that anyone
              can re-run and check.
            </p>
            <p className="lead" style={{ marginBottom: 0 }}>
              It is designed to cover any kind of work: source code, writing, images and
              audio. One shared evidence format sits underneath, with a profile for each
              medium. Your content never leaves your machine; only fingerprints are
              compared.
            </p>
          </div>

          <div className="actions">
            <Link href="/how-it-works" className="btn btn-primary">
              How it works
            </Link>
            <a href={DOCS_URL} className="btn btn-secondary" rel="noopener noreferrer">
              Read the docs ↗
            </a>
            <a href={SPEC_TREE_URL} className="btn btn-secondary" rel="noopener noreferrer">
              Specification repository ↗
            </a>
            <Link href="/roadmap" className="btn btn-secondary">
              Roadmap
            </Link>
          </div>

          <div
            className="card-muted"
            role="region"
            aria-label="Current project status"
            style={{ marginTop: "2rem", maxWidth: "74ch" }}
          >
            <p style={{ marginBottom: "0.55rem" }}>
              <strong>Where it stands today:</strong> source code is working end to end,
              with Go and Rust as the first two case studies. TypeScript, JavaScript and
              plain text are specified. Images have been measured in two studies. More
              languages, audio, and signed, timestamped registration records are planned.
              It is experimental and not yet evaluated on real-world data.
            </p>
            <p style={{ marginBottom: 0, fontSize: "0.84rem" }}>
              Sources: <SourceLink path="README.md" /> ·{" "}
              <SourceLink
                path="ROADMAP.md"
                anchor="pilot-languages"
                label="ROADMAP.md#pilot-languages"
              />{" "}
              ·{" "}
              <SourceLink
                path="ROADMAP.md"
                anchor="later-profiles-and-sequence"
                label="ROADMAP.md#later-profiles-and-sequence"
              />
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="workflow-heading">
        <div className="container">
          <div className="eyebrow">How it works</div>
          <h2 id="workflow-heading">Three local steps, zero content uploads</h2>
          <p className="prose">
            Each medium profile extracts fingerprints locally into a private catalogue
            that holds no raw content, then compares catalogues to emit a report anyone
            with the same inputs can reproduce. Source code — with Go and Rust as the
            first two case studies, validated across two independent implementations to
            show the specification can be built independently — exercises this pipeline
            end to end today.
          </p>
          <WorkflowDiagram />
          <p style={{ marginBottom: 0 }}>
            <Link href="/how-it-works">Walk through a real published example →</Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="scope-heading">
        <div className="container">
          <div className="eyebrow">Evidence and scope</div>
          <h2 id="scope-heading">What a comparison records — and its scope</h2>
          <p className="prose">
            Traceweave records technical similarity separately from timestamps,
            signatures, and human origin review so each piece of evidence can be checked
            on its own terms.
          </p>

          <div className="grid-2" style={{ marginTop: "1.25rem" }}>
            <div className="card">
              <div className="card-title-row">
                <h3 style={{ marginBottom: 0 }}>What it records</h3>
                <span className="badge badge-active">Checkable output</span>
              </div>
              <ul className="clean-list">
                <li>
                  <strong>Shared fingerprints:</strong> exact and normalized token matches
                  between a candidate and your private reference catalogue.
                </li>
                <li>
                  <strong>Exact byte coordinates:</strong> half-open UTF-8 byte spans in
                  both the reference and candidate where matching regions sit.
                </li>
                <li>
                  <strong>Fragment and whole-file counts:</strong> directional fragment
                  containment reported alongside whole-file Jaccard similarity so a small
                  copied region stays visible inside a larger file.
                </li>
                <li>
                  <strong>Reproducible reports:</strong> canonical report bytes and a
                  SHA-256 digest that another party holding the same catalogues and
                  configuration can re-run and verify.
                </li>
              </ul>
            </div>

            <div className="card">
              <div className="card-title-row">
                <h3 style={{ marginBottom: 0 }}>Where matching stops</h3>
                <span className="badge">Scope boundary</span>
              </div>
              <ul className="clean-list">
                <li>
                  <strong>Shared content, not chronology:</strong> a match shows overlapping
                  material; a fingerprint made today says nothing about when a version
                  existed.
                </li>
                <li>
                  <strong>Rewriting and edits:</strong> token matching builds on established
                  prior art and light rewriting defeats it; no match means insufficient
                  matching evidence rather than absence of reuse.
                </li>
                <li>
                  <strong>Embedded marks:</strong> tested marks in source code and prose did
                  not survive normalization, and public image watermark encoders let anyone
                  copy a mark onto another image without the key — making a mark a finding
                  aid rather than evidence of origin.
                </li>
              </ul>
            </div>
          </div>

          <div className="card" style={{ marginTop: "1.25rem" }}>
            <h3>Built for provenance</h3>
            <p className="prose" style={{ marginBottom: "0.9rem" }}>
              Traceweave helps you show where your work appears, and how copies relate to
              the original, with evidence anyone can check. It records facts. It leaves
              the judgments to people.
            </p>
            <ul className="clean-list">
              <li>
                <strong>Working today, in draft:</strong> fingerprint Go and Rust code on
                your own machine, keep a private catalogue that holds no source text, and
                produce comparison reports anyone can re-run.
              </li>
              <li>
                <strong>Coming next:</strong> signed, timestamped registration records, so
                you can show a version of your work existed by a given date.
                Licence-history packets follow.
              </li>
              <li>
                <strong>What you do with it is up to you.</strong> Traceweave produces
                checkable facts about your work. It does not lock content, and it does not
                make the call on ownership or permission.
              </li>
            </ul>
            <p style={{ marginTop: "1rem", marginBottom: 0 }}>
              <Link href="/evidence">See what the research measured</Link> ·{" "}
              <SourceLink path="spec/core.md" /> · <SourceLink path="spec/threat-model.md" />
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="audience-heading">
        <div className="container">
          <div className="eyebrow">Use cases</div>
          <h2 id="audience-heading">Who Traceweave is built for</h2>
          <p className="prose">
            The specification is organised around five provenance workflows documented in{" "}
            <SourceLink path="docs/use-cases.md" />.
          </p>

          <div className="grid-3" style={{ marginTop: "1.25rem" }}>
            {WHO_IT_IS_FOR.map((item) => (
              <div key={item.role} className="card">
                <h3 style={{ marginBottom: "0.5rem" }}>{item.role}</h3>
                <p style={{ marginBottom: 0 }}>{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="status-heading">
        <div className="container">
          <div className="eyebrow">Progress</div>
          <h2 id="status-heading">Tracked by committed, verifiable gates</h2>
          <p className="prose">
            Each milestone splits into verifiable gates that close only when someone else
            can re-run or recount the committed evidence from a clean clone. Counts below
            come directly from{" "}
            <SourceLink path={ROADMAP_COUNTS.sourcePath} anchor={ROADMAP_COUNTS.anchor} />.
          </p>

          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-value">
                {ROADMAP_COUNTS.core.met} / {ROADMAP_COUNTS.core.total}
              </div>
              <div className="stat-label">
                Core milestone gates met ({ROADMAP_COUNTS.core.open} open,{" "}
                {ROADMAP_COUNTS.core.negativeResult} negative-result)
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {ROADMAP_COUNTS.later.met} / {ROADMAP_COUNTS.later.total}
              </div>
              <div className="stat-label">
                Later-profile and release gates met ({ROADMAP_COUNTS.later.open} open,{" "}
                {ROADMAP_COUNTS.later.negativeResult} negative-result)
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-value">0 / 1</div>
              <div className="stat-label">
                Held-out real-world corpus evaluation run (pending)
              </div>
            </div>
          </div>

          <div className="actions">
            <Link href="/roadmap" className="btn btn-primary">
              View roadmap and gates
            </Link>
            <Link href="/coverage" className="btn btn-secondary">
              Content coverage
            </Link>
            <a href={DOCS_URL} className="btn btn-secondary" rel="noopener noreferrer">
              Full documentation ↗
            </a>
            <a
              href={specUrl("ROADMAP.md")}
              className="btn btn-secondary"
              rel="noopener noreferrer"
            >
              Read ROADMAP.md ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
