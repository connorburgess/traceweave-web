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
    caseId: "UC-1",
    summary:
      "Check whether a local candidate project contains a fragment of your reference source code (with Go and Rust as the first two case studies), keeping exact byte spans and fragment containment separate from whole-file similarity.",
  },
  {
    role: "Licence & origin reviewers",
    caseId: "UC-2",
    summary:
      "Combine technical match regions with separate origin records and archived licence notices without conflating technical similarity and legal permission.",
  },
  {
    role: "Creators keeping private records",
    caseId: "UC-3",
    summary:
      "Maintain local fingerprint catalogues and exact-byte cryptographic commitments without uploading source code or publishing an identity.",
  },
  {
    role: "Auditors & recipients",
    caseId: "UC-4",
    summary:
      "Re-run a comparison from catalogues and pinned configuration bytes to verify the exact canonical report body independently of any signed claim.",
  },
  {
    role: "Implementers & researchers",
    caseId: "UC-5",
    summary:
      "Measure which code, text, or image transformations survive or fail against hard negative controls, with explicit denominators and abstentions.",
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
              Experimental draft ({SPEC_DRAFT_VERSION}) · Not a standard · Not production
              software · Held-out evaluation not yet run
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
              Roadmap &amp; gates
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
              Scope and status sources: <SourceLink path="README.md" /> ·{" "}
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
            that contains no raw source text, then compares catalogues to produce a
            re-runnable comparison report. Source code — with Go and Rust as the first two
            case studies, validated across two independent implementations to show the
            specification can be built independently — exercises this pipeline end to end
            today.
          </p>
          <WorkflowDiagram />
          <p style={{ marginBottom: 0 }}>
            <Link href="/how-it-works">Walk through a real published example →</Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="honest-bounds-heading">
        <div className="container">
          <div className="eyebrow">Honest boundaries</div>
          <h2 id="honest-bounds-heading">What it can tell you — and what it cannot</h2>
          <p className="prose">
            Traceweave separates technical similarity from authorship, timestamps, and legal
            rights. Reading a comparison report accurately starts with knowing what it does
            not show.
          </p>

          <div className="grid-2" style={{ marginTop: "1.25rem" }}>
            <div className="card">
              <div className="card-title-row">
                <h3 style={{ marginBottom: 0 }}>What it can tell you</h3>
                <span className="badge badge-active">Observed evidence</span>
              </div>
              <ul className="clean-list">
                <li>
                  <strong>Shared token sequences:</strong> whether a candidate file shares
                  exact or identifier-normalized token fingerprints with your private
                  reference catalogue.
                </li>
                <li>
                  <strong>Exact byte coordinates:</strong> half-open UTF-8 byte spans in
                  both the reference and candidate where matching regions sit.
                </li>
                <li>
                  <strong>Fragment vs whole-file overlap:</strong> directional fragment
                  containment reported separately from whole-file Jaccard similarity, so a
                  copied function inside a large file is not hidden by file size.
                </li>
                <li>
                  <strong>Reproducible output:</strong> the exact canonical report bytes and
                  SHA-256 digest that anyone holding the same catalogues and pinned
                  configuration will obtain again.
                </li>
              </ul>
            </div>

            <div className="card">
              <div className="card-title-row">
                <h3 style={{ marginBottom: 0 }}>What it cannot tell you</h3>
                <span className="badge badge-caution">Hard limits</span>
              </div>
              <ul className="clean-list limit-list">
                <li>
                  <strong>Who wrote or owns the content:</strong> a match shows shared
                  material, never authorship, copying direction, permission, or
                  infringement.
                </li>
                <li>
                  <strong>When content existed:</strong> a fingerprint or catalogue made
                  today says nothing about earlier existence. Self-declared timestamps are
                  not trusted time.
                </li>
                <li>
                  <strong>Absence of reuse:</strong> no match means insufficient matching
                  evidence, not that copying did not happen. Token winnowing is established
                  prior art and light rewriting defeats it.
                </li>
                <li>
                  <strong>Origin from an embedded mark:</strong> code and prose marks tested
                  so far did not survive cheap normalization, and public image watermark
                  encoders allow anyone to copy a mark onto an unrelated image without the
                  key — so a mark is a finding aid, not evidence of origin.
                </li>
              </ul>
            </div>
          </div>

          <div className="card-caution" style={{ marginTop: "1.25rem" }}>
            <h3>Looking for a tool to stop copying or establish rights?</h3>
            <p style={{ marginBottom: "0.6rem" }}>
              Traceweave is not DRM and cannot prevent copying. Here is the plain boundary:
            </p>
            <ul className="clean-list limit-list">
              <li>
                <strong>Available in draft today:</strong> end-to-end local source code
                fingerprinting (with Go and Rust as the first two case studies), private
                catalogues without source text, and re-runnable comparison reports.
              </li>
              <li>
                <strong>Planned (not built yet):</strong> signed, timestamped registration
                records (DSSE/in-toto envelopes with optional RFC 3161 timestamps, gates{" "}
                <span className="mono">M4.3–M4.6</span>) and separate licence-history review
                packets (<span className="mono">M2.7</span>).
              </li>
              <li>
                <strong>What no tool can show:</strong> legal ownership, who originally
                authored a passage, whether reuse was permitted, or survival under arbitrary
                rewriting.
              </li>
            </ul>
            <p style={{ marginTop: "0.9rem", marginBottom: 0 }}>
              <Link href="/evidence">Read the measured research results and limits →</Link>{" "}
              · <SourceLink path="spec/core.md" /> · <SourceLink path="spec/threat-model.md" />
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="audience-heading">
        <div className="container">
          <div className="eyebrow">Use cases</div>
          <h2 id="audience-heading">Who Traceweave is designed for</h2>
          <p className="prose">
            The specification starts from five concrete workflows documented in{" "}
            <SourceLink path="docs/use-cases.md" />. All workflows remain draft or planned
            until their roadmap gates close.
          </p>

          <div className="grid-3" style={{ marginTop: "1.25rem" }}>
            {WHO_IT_IS_FOR.map((item) => (
              <div key={item.caseId} className="card">
                <div className="card-title-row">
                  <h3 style={{ marginBottom: 0 }}>{item.role}</h3>
                  <span className="badge mono">{item.caseId}</span>
                </div>
                <p style={{ marginBottom: 0 }}>{item.summary}</p>
              </div>
            ))}
            <div className="card-muted">
              <div className="card-title-row">
                <h3 style={{ marginBottom: 0 }}>Outside scope</h3>
                <span className="badge">Non-goals</span>
              </div>
              <p style={{ marginBottom: 0 }}>
                Internet-wide crawling, automatic takedowns, DRM, model-training membership
                claims, or automated ownership verdicts are explicitly outside scope.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="status-heading">
        <div className="container">
          <div className="eyebrow">Current status</div>
          <h2 id="status-heading">Roadmap progress, counted by committed evidence</h2>
          <p className="prose">
            Progress is tracked by verifiable gates rather than dates. A gate closes only
            when someone else can re-check its committed evidence from a clean clone, and a
            negative research result counts as a valid answer. Counts below are taken
            directly from{" "}
            <SourceLink path={ROADMAP_COUNTS.sourcePath} anchor={ROADMAP_COUNTS.anchor} />.
          </p>

          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-value">
                {ROADMAP_COUNTS.core.met} / {ROADMAP_COUNTS.core.total}
              </div>
              <div className="stat-label">
                Core M0–M5 gates met ({ROADMAP_COUNTS.core.open} open,{" "}
                {ROADMAP_COUNTS.core.negativeResult} negative-result)
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {ROADMAP_COUNTS.later.met} / {ROADMAP_COUNTS.later.total}
              </div>
              <div className="stat-label">
                Later profiles, EXT &amp; RC gates met ({ROADMAP_COUNTS.later.open} open,{" "}
                {ROADMAP_COUNTS.later.negativeResult} negative-result)
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-value">0 / 1</div>
              <div className="stat-label">
                Held-out M3 corpus evaluation run (budget set at 1 in 20; run pending)
              </div>
            </div>
          </div>

          <div className="actions">
            <Link href="/roadmap" className="btn btn-primary">
              View roadmap summary
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
