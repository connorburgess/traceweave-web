import type { Metadata } from "next";
import Link from "next/link";
import { SourceLink } from "@/components/SourceLink";
import { ROADMAP_COUNTS } from "@/data/facts";
import { DOCS_URL, specUrl } from "@/lib/sources";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "Summary of Traceweave milestones, verifiable gate counts, and open work from ROADMAP.md. No dates or detection promises.",
  alternates: {
    canonical: "/roadmap",
  },
};

const CORE_MILESTONES = [
  {
    id: "M0",
    name: "Explain and bound",
    gates: "M0.1–M0.4",
    met: "4 of 4 met",
    summary:
      "Use cases, verification plans, discovery checkpoint, example matrix, and repository validation checks.",
  },
  {
    id: "M1",
    name: "Freeze one code experiment",
    gates: "M1.1–M1.6",
    met: "0 of 6 met",
    summary:
      "Go and Rust token extraction contract, hand-derived positive/negative vectors, catalogue and report schemas, requirement map, and strict pinned reproduction in both implementations.",
  },
  {
    id: "M2",
    name: "Local comparison",
    gates: "M2.1–M2.11",
    met: "4 of 11 met (M2.5, M2.8, M2.10, M2.11)",
    summary:
      "Offline walkthrough, frozen fixture manifest, control classes including vendor boilerplate, separate fragment containment, atomic private storage, review packets (M2.7), and candidate-generation records (M2.9).",
  },
  {
    id: "M2E",
    name: "Embed and detect",
    gates: "M2E.0–M2E.7",
    met: "0 of 8 met",
    summary:
      "Owner decision to select a new carrier candidate or omit embedding from the next release, plus reproducibility, quality, normalization, and transplant controls.",
  },
  {
    id: "M3",
    name: "Measure usefulness",
    gates: "M3.0–M3.6",
    met: "1 of 7 met (M3.0)",
    summary:
      "Operational false-alarm budget (1 in 20 per repository search across 132 held-out negative searches), licensed 48-repository corpus manifest, disjoint splits, git-ancestor freeze check, and independent rerun.",
  },
  {
    id: "M4",
    name: "Verify evidence",
    gates: "M4.1–M4.6",
    met: "2 of 6 met (M4.1, M4.2)",
    summary:
      "Library-based DSSE signing and verification, independent commitment code, negative cryptographic vectors, in-toto adapter, trust policy, optional timestamp adapter decision, and non-author review.",
  },
  {
    id: "M5",
    name: "Candidate release",
    gates: "M5.1–M5.5",
    met: "0 of 5 met",
    summary:
      "Full requirement map, README claim audit, offline clean-clone demo reproduction, explicit scope/limit release notes, and conformance matrix.",
  },
] as const;

const LATER_TRACKS = [
  {
    track: "TS (TS.1–TS.4)",
    scope: "TypeScript & JavaScript profile",
    state: "ts-tokens frozen for stage 1; implementation and M3 split open.",
  },
  {
    track: "IMGF (IMGF.1–IMGF.6)",
    scope: "Still-image fingerprints (PDQ & ISCC)",
    state: "3 met (IMGF.2–IMGF.4 synthetic conformance run); item map, C++ comparison, and owner-gated natural-image check open.",
  },
  {
    track: "IMG (IMG.0–IMG.5)",
    scope: "Still-image embedded marks (TrustMark-Q & PixelSeal)",
    state: "Protocol e-img-m-2 frozen and reviewed; UC-7 wording and full measured run open.",
  },
  {
    track: "TXT (TXT.0–TXT.8)",
    scope: "Plain text & Markdown prose",
    state: "text-plain frozen for stage 1; UC-8 acceptance, two-implementation check, and corpus stages open.",
  },
  {
    track: "C2PA (C2PA.1–C2PA.3)",
    scope: "C2PA soft-binding mapping",
    state: "In progress with draft fixtures; no compatibility claimed until round-trip fixtures pass.",
  },
  {
    track: "SK (SK.1–SK.2)",
    scope: "Optional agent interoperability skill",
    state: "Planned after I2; wraps stable CLI commands with transcript canary tests.",
  },
  {
    track: "BIN, RES, STRUCT, KEYED",
    scope: "Binaries, resolver threat model, structural & keyed matching",
    state: "Gated after M3.4; not started.",
  },
  {
    track: "EXT & RC (EXT.1, RC.1–RC.3)",
    scope: "External review and 1.0 candidate criteria",
    state: "Open; requires named non-contributor review and two conforming implementations per stable profile.",
  },
] as const;

export default function RoadmapPage() {
  return (
    <>
      <section className="page-header">
        <div className="container prose">
          <div className="eyebrow">Roadmap</div>
          <h1>Gate-based progress, with no promised dates</h1>
          <p className="lead">
            Traceweave tracks work by verifiable gates rather than calendar deadlines. No
            delivery dates and no detection ceilings are promised.
          </p>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="gate-rules-heading">
        <div className="container">
          <h2 id="gate-rules-heading">How progress is counted</h2>
          <div className="grid-3">
            <div className="card">
              <h3>Engineering gates (E)</h3>
              <p style={{ marginBottom: 0 }}>
                Close only when <strong>met</strong> with committed evidence that a
                non-author can re-run or recount from a clean clone.
              </p>
            </div>
            <div className="card">
              <h3>Research gates (R)</h3>
              <p style={{ marginBottom: 0 }}>
                Close when <strong>met</strong> or <strong>negative-result</strong>. A
                negative finding is a valid, preserved answer to the question.
              </p>
            </div>
            <div className="card">
              <h3>Owner decisions (O)</h3>
              <p style={{ marginBottom: 0 }}>
                Close when a decision record is committed — for example setting a
                false-alarm budget or choosing whether to omit embedding.
              </p>
            </div>
          </div>

          <h2 style={{ marginTop: "2.25rem" }}>Current gate counts</h2>
          <p className="prose">
            Taken directly from{" "}
            <SourceLink path={ROADMAP_COUNTS.sourcePath} anchor={ROADMAP_COUNTS.anchor} />:
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Gate group</th>
                  <th scope="col" className="num">Total</th>
                  <th scope="col" className="num">Met</th>
                  <th scope="col" className="num">Negative-result</th>
                  <th scope="col" className="num">Open</th>
                  <th scope="col">Met gate IDs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>{ROADMAP_COUNTS.core.label}</strong></td>
                  <td className="num">{ROADMAP_COUNTS.core.total}</td>
                  <td className="num">{ROADMAP_COUNTS.core.met}</td>
                  <td className="num">{ROADMAP_COUNTS.core.negativeResult}</td>
                  <td className="num">{ROADMAP_COUNTS.core.open}</td>
                  <td className="mono" style={{ fontSize: "0.82rem" }}>
                    {ROADMAP_COUNTS.core.metIds.join(", ")}
                  </td>
                </tr>
                <tr>
                  <td><strong>{ROADMAP_COUNTS.later.label}</strong></td>
                  <td className="num">{ROADMAP_COUNTS.later.total}</td>
                  <td className="num">{ROADMAP_COUNTS.later.met}</td>
                  <td className="num">{ROADMAP_COUNTS.later.negativeResult}</td>
                  <td className="num">{ROADMAP_COUNTS.later.open}</td>
                  <td className="mono" style={{ fontSize: "0.82rem" }}>
                    {ROADMAP_COUNTS.later.metIds.join(", ")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="milestones-heading">
        <div className="container">
          <div className="eyebrow">Core sequence</div>
          <h2 id="milestones-heading">Milestones M0 through M5</h2>
          <p className="prose">
            Order: <span className="mono">M0 → M1 → parallel M2 and M2E → M3 → M5</span>.{" "}
            <span className="mono">M4</span> can run independently after M1, and is
            required before any release claims cryptographic verification.
          </p>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Milestone</th>
                  <th scope="col">Gates</th>
                  <th scope="col">Status</th>
                  <th scope="col">What becomes possible</th>
                </tr>
              </thead>
              <tbody>
                {CORE_MILESTONES.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <strong>
                        {m.id} — {m.name}
                      </strong>
                    </td>
                    <td className="mono">{m.gates}</td>
                    <td>{m.met}</td>
                    <td>{m.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="later-heading">
        <div className="container">
          <div className="eyebrow">Later profiles and release criteria</div>
          <h2 id="later-heading">Expansion tracks beyond core Go and Rust</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Track</th>
                  <th scope="col">Scope</th>
                  <th scope="col">Current state</th>
                </tr>
              </thead>
              <tbody>
                {LATER_TRACKS.map((row) => (
                  <tr key={row.track}>
                    <td className="mono"><strong>{row.track}</strong></td>
                    <td>{row.scope}</td>
                    <td>{row.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="actions">
            <a
              href={specUrl("ROADMAP.md")}
              className="btn btn-primary"
              rel="noopener noreferrer"
            >
              Read full ROADMAP.md ↗
            </a>
            <a
              href={specUrl("research/work-queue.md")}
              className="btn btn-secondary"
              rel="noopener noreferrer"
            >
              Active work queue ↗
            </a>
            <a
              href={specUrl("docs/implementation-repo-plan.md")}
              className="btn btn-secondary"
              rel="noopener noreferrer"
            >
              Implementation plan ↗
            </a>
            <a href={DOCS_URL} className="btn btn-secondary" rel="noopener noreferrer">
              Docs site ↗
            </a>
          </div>
          <p style={{ marginTop: "1rem", marginBottom: 0 }}>
            <Link href="/about">Learn how decisions, reviews, and contributions work →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
