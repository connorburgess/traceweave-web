import type { Metadata } from "next";
import Link from "next/link";
import { SourceLink } from "@/components/SourceLink";
import { WorkflowDiagram } from "@/components/WorkflowDiagram";
import { WORKED_EXAMPLE } from "@/data/facts";
import { DOCS_URL } from "@/lib/sources";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Plain-language walkthrough of Traceweave token extraction, private local catalogues, deterministic comparison reports, and a worked example from the published test vectors.",
  alternates: {
    canonical: "/how-it-works",
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="page-header">
        <div className="container prose">
          <div className="eyebrow">How it works</div>
          <h1>From local files to a deterministic, byte-identical comparison report</h1>
          <p className="lead">
            Traceweave puts one shared evidence format underneath profile-specific
            extractors. Every comparison runs in three local steps so your content stays on
            your machine and anyone with the same catalogues can reproduce the exact report
            bytes.
          </p>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="pipeline-heading">
        <div className="container">
          <h2 id="pipeline-heading">The three-stage pipeline</h2>
          <WorkflowDiagram />

          <div className="grid-3" style={{ marginTop: "1.25rem" }}>
            <div className="card">
              <div className="eyebrow">Stage 1</div>
              <h3>Extract fingerprints</h3>
              <p>
                A profile lexer scans UTF-8 input bytes with pinned{" "}
                <span className="mono">Unicode 17.0.0</span> tables — no parser, compiler,
                or network access. It produces two streams: an <strong>exact</strong>{" "}
                channel keeping names and literals, and a <strong>normalized</strong>{" "}
                channel clearing identifier and literal values so simple renaming still
                aligns.
              </p>
              <p style={{ marginBottom: 0 }}>
                Overlapping token k-grams are hashed to 64-bit SHA-256 prefixes and
                selected with rightmost-minimum winnowing. Every fingerprint keeps its
                original half-open UTF-8 byte span.{" "}
                <SourceLink path="spec/extraction.md" />
              </p>
            </div>

            <div className="card">
              <div className="eyebrow">Stage 2</div>
              <h3>Build a private catalogue</h3>
              <p>
                Selected fingerprints, artifact SHA-256 digests, and the exact extraction
                configuration bytes are serialized into a canonical JSON catalogue. Source
                text, token strings, and file paths are discarded.
              </p>
              <p style={{ marginBottom: 0 }}>
                Catalogues are stored outside git working trees by default. Because hashes
                are unkeyed, someone holding a catalogue can still test guessed code
                against it — so catalogues are treated as private material.{" "}
                <SourceLink
                  path="spec/catalogue-report.md"
                  anchor="35-not-stored"
                />
              </p>
            </div>

            <div className="card">
              <div className="eyebrow">Stage 3</div>
              <h3>Compare and report</h3>
              <p>
                Comparison reads only the reference catalogue, candidate catalogue,
                optional boilerplate-suppression catalogue, and comparison configuration
                bytes. It never reads source text.
              </p>
              <p style={{ marginBottom: 0 }}>
                Matching hashes on a consistent offset diagonal merge into regions when
                their reference-position gap is at most <span className="mono">mergeGap</span>
                , and become reportable once they reach{" "}
                <span className="mono">minRegionDistinctHashes</span> distinct non-common
                hashes.{" "}
                <SourceLink
                  path="spec/catalogue-report.md"
                  anchor="5-comparison-algorithm-traceweave-seed-merge-draft-2"
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="example-heading">
        <div className="container">
          <div className="eyebrow">Worked example from published test vectors</div>
          <h2 id="example-heading">
            Finding a small Go function inside a larger file (
            <span className="mono">{WORKED_EXAMPLE.vectorId}</span>)
          </h2>
          <p className="prose">
            This example comes verbatim from the published matching vectors (
            <SourceLink path="test-vectors/matching/extraction-go.json" /> and{" "}
            <SourceLink path="test-vectors/matching/example-report.json" />
            ). Both files are extracted under <span className="mono">go-tokens</span>{" "}
            <span className="mono">draft-1</span> with{" "}
            <span className="mono">k = {WORKED_EXAMPLE.k}</span> and{" "}
            <span className="mono">window = {WORKED_EXAMPLE.window}</span>, and compared
            with <span className="mono">minRegionDistinctHashes = {WORKED_EXAMPLE.minRegionDistinctHashes}</span>{" "}
            and <span className="mono">mergeGap = {WORKED_EXAMPLE.mergeGap}</span>.
          </p>

          <div className="grid-2" style={{ marginTop: "1.25rem" }}>
            <div>
              <h3>
                Reference: <span className="mono">{WORKED_EXAMPLE.reference.id}</span>
              </h3>
              <p style={{ fontSize: "0.88rem" }}>
                {WORKED_EXAMPLE.reference.tokenCount} tokens ·{" "}
                {WORKED_EXAMPLE.reference.exactFingerprints} exact fingerprints ·{" "}
                {WORKED_EXAMPLE.reference.normalizedFingerprints} normalized fingerprints
              </p>
              <pre>
                <code>{WORKED_EXAMPLE.reference.code}</code>
              </pre>
            </div>

            <div>
              <h3>
                Candidate: <span className="mono">{WORKED_EXAMPLE.candidate.id}</span>
              </h3>
              <p style={{ fontSize: "0.88rem" }}>
                {WORKED_EXAMPLE.candidate.tokenCount} tokens ·{" "}
                {WORKED_EXAMPLE.candidate.exactFingerprints} exact fingerprints ·{" "}
                {WORKED_EXAMPLE.candidate.normalizedFingerprints} normalized fingerprints
              </p>
              <pre>
                <code>{WORKED_EXAMPLE.candidate.code}</code>
              </pre>
            </div>
          </div>

          <h3 style={{ marginTop: "1rem" }}>What the canonical report records</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Channel / mode</th>
                  <th scope="col">Outcome</th>
                  <th scope="col">Reference in candidate</th>
                  <th scope="col">Whole-file Jaccard</th>
                  <th scope="col">Reference byte span</th>
                  <th scope="col">Candidate byte span</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mono">exact</td>
                  <td className="mono">{WORKED_EXAMPLE.exact.outcome}</td>
                  <td className="num">{WORKED_EXAMPLE.exact.referenceInCandidate}</td>
                  <td className="num">{WORKED_EXAMPLE.exact.jaccard}</td>
                  <td className="mono">{WORKED_EXAMPLE.exact.referenceSpan}</td>
                  <td className="mono">{WORKED_EXAMPLE.exact.candidateSpan}</td>
                </tr>
                <tr>
                  <td className="mono">normalized</td>
                  <td className="mono">{WORKED_EXAMPLE.normalized.outcome}</td>
                  <td className="num">{WORKED_EXAMPLE.normalized.referenceInCandidate}</td>
                  <td className="num">{WORKED_EXAMPLE.normalized.jaccard}</td>
                  <td className="mono">{WORKED_EXAMPLE.normalized.referenceSpan}</td>
                  <td className="mono">{WORKED_EXAMPLE.normalized.candidateSpan}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card-muted prose" style={{ maxWidth: "100%" }}>
            <p style={{ marginBottom: "0.65rem" }}>
              <strong>Why two metrics matter:</strong> in the exact channel, every
              fingerprint from <span className="mono">sum.go</span> appears inside{" "}
              <span className="mono">host.go</span> (<strong>14/14</strong> directional
              containment), while whole-file Jaccard similarity is only{" "}
              <strong>14/39</strong> because <span className="mono">host.go</span> has
              surrounding code. Reporting raw unreduced fractions keeps the small copied
              fragment visible.
            </p>
            <p style={{ marginBottom: 0 }}>
              <strong>Canonical digest:</strong> the RFC 8785 canonical report body hashes
              to{" "}
              <code>{WORKED_EXAMPLE.bodySha256}</code>. As evidence that the specification
              can be implemented independently, both the Rust and Go implementations emit
              those exact deterministic, byte-identical report bytes for this vector.
            </p>
          </div>

          <h3 style={{ marginTop: "2rem" }}>Two companion cases from the same vector set</h3>
          <div className="grid-2">
            <div className="card">
              <div className="card-title-row">
                <h4 style={{ marginBottom: 0 }} className="mono">
                  go-renamed
                </h4>
                <span className="badge">Identifiers changed</span>
              </div>
              <p style={{ marginBottom: 0 }}>
                When variable and function names are renamed, the{" "}
                <span className="mono">exact</span> channel reports{" "}
                <span className="mono">no-shared-fingerprints</span> (0/4), while the{" "}
                <span className="mono">normalized</span> channel still matches (4/4).{" "}
                <SourceLink path="test-vectors/matching/matching.json" />
              </p>
            </div>
            <div className="card">
              <div className="card-title-row">
                <h4 style={{ marginBottom: 0 }} className="mono">
                  go-independent-same-task
                </h4>
                <span className="badge">Independent control</span>
              </div>
              <p style={{ marginBottom: 0 }}>
                When someone writes a separate solution to the same summing task,{" "}
                <span className="mono">exact</span> reports{" "}
                <span className="mono">no-shared-fingerprints</span> (0/14) and{" "}
                <span className="mono">normalized</span> reports{" "}
                <span className="mono">below-minimum-evidence</span> (2/17 split across
                single-hash regions).{" "}
                <SourceLink path="test-vectors/matching/matching.json" />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="separation-heading">
        <div className="container">
          <div className="eyebrow">Design discipline</div>
          <h2 id="separation-heading">Separate questions stay separate</h2>
          <p className="prose">
            Traceweave forbids collapsing technical similarity, cryptographic
            authentication, timestamps, and legal permissions into a single pass/fail
            score. Each layer has its own field and status (
            <SourceLink path="spec/core.md" anchor="interpretation" />):
          </p>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Question</th>
                  <th scope="col">Mechanism</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Does a file match exact recorded bytes?</td>
                  <td>SHA-256 subject digest &amp; private salted catalogue commitment (32-byte nonce)</td>
                  <td><span className="badge badge-active">Draft format &amp; vectors</span></td>
                </tr>
                <tr>
                  <td>Does another file share token fingerprints?</td>
                  <td>Deterministic extraction, private catalogues, seed-merge report</td>
                  <td><span className="badge badge-active">Implemented (Go/Rust draft)</span></td>
                </tr>
                <tr>
                  <td>Did a specific key sign this record, and when?</td>
                  <td>DSSE / in-toto attestation, trust policy, optional RFC 3161 timestamp</td>
                  <td><span className="badge">Planned (M4.3–M4.6)</span></td>
                </tr>
                <tr>
                  <td>Where did the matched region originate, under what licence?</td>
                  <td>Separate review-packet record linked by <span className="mono">bodySha256</span></td>
                  <td><span className="badge">Planned (M2.7)</span></td>
                </tr>
                <tr>
                  <td>Can an agent run local checks without leaking private files?</td>
                  <td>Optional CLI-wrapping skill with transcript canary checks</td>
                  <td><span className="badge">Planned (SK.1–SK.2)</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="actions">
            <Link href="/coverage" className="btn btn-primary">
              See what content types are covered
            </Link>
            <Link href="/evidence" className="btn btn-secondary">
              Evidence &amp; limits
            </Link>
            <a href={DOCS_URL} className="btn btn-secondary" rel="noopener noreferrer">
              Technical specs on docs.traceweave.org ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
