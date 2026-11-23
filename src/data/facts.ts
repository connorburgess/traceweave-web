import type { CitedFact } from "@/lib/sources";

export const SPEC_DRAFT_VERSION = "0.1.0-draft.1";

export const ROADMAP_COUNTS = {
  asOf: "2026-11-22",
  updated: "2026-11-23",
  sourcePath: "ROADMAP.md",
  anchor: "progress-count",
  core: {
    label: "Core M0–M5",
    total: 47,
    met: 11,
    negativeResult: 0,
    open: 36,
    metIds: [
      "M0.1",
      "M0.2",
      "M0.3",
      "M0.4",
      "M2.5",
      "M2.8",
      "M2.10",
      "M2.11",
      "M3.0",
      "M4.1",
      "M4.2",
    ],
  },
  later: {
    label: "Later profiles, EXT and RC",
    total: 41,
    met: 3,
    negativeResult: 0,
    open: 38,
    metIds: ["IMGF.2", "IMGF.3", "IMGF.4"],
  },
} as const;

export const WORKED_EXAMPLE = {
  vectorId: "go-function-in-host",
  profile: "go-tokens",
  profileVersion: "draft-1",
  k: 5,
  window: 4,
  minRegionDistinctHashes: 2,
  mergeGap: 4,
  bodySha256:
    "081d860084af229d77137e32dedd9f40f7d0bbeca6b18424b6d51cc1d89ed3be",
  reference: {
    id: "sum.go",
    vectorId: "mv-go-sum",
    tokenCount: 40,
    exactFingerprints: 14,
    normalizedFingerprints: 17,
    code: `func sumPositive(values []int) int {
\ttotal := 0
\tfor _, v := range values {
\t\tif v > 0 {
\t\t\ttotal += v
\t\t}
\t}
\treturn total
}`,
  },
  candidate: {
    id: "host.go",
    vectorId: "mv-go-host",
    tokenCount: 100,
    exactFingerprints: 39,
    normalizedFingerprints: 42,
    code: `package stats

type Point struct {
\tX, Y float64
}

func (p Point) String() string {
\treturn fmt.Sprintf("(%g, %g)", p.X, p.Y)
}

func sumPositive(values []int) int {
\ttotal := 0
\tfor _, v := range values {
\t\tif v > 0 {
\t\t\ttotal += v
\t\t}
\t}
\treturn total
}

var names = map[string]bool{"a": true, "b": false}`,
  },
  exact: {
    outcome: "match",
    referenceInCandidate: "14/14",
    candidateInReference: "14/39",
    jaccard: "14/39",
    referenceSpan: "[16, 124]",
    candidateSpan: "[146, 254]",
    distinctHashes: 14,
  },
  normalized: {
    outcome: "match",
    referenceInCandidate: "17/17",
    candidateInReference: "17/42",
    jaccard: "17/42",
    referenceSpan: "[0, 126]",
    candidateSpan: "[130, 256]",
    distinctHashes: 17,
  },
} as const;

/**
 * Registry of every numerical claim rendered on the website, paired with the
 * exact specification checkout file that verifies it. scripts/check-content.mjs
 * reads this registry and checks every path and every number against the
 * read-only specification checkout.
 */
export const CITED_FACTS: readonly CitedFact[] = [
  {
    id: "draft-version",
    sourcePath: "README.md",
    label: "Experimental specification draft identifier",
    numbers: ["0.1.0-draft.1"],
  },
  {
    id: "roadmap-core-gates",
    sourcePath: "ROADMAP.md",
    anchor: "progress-count",
    label: "Core M0–M5 roadmap gate counts",
    numbers: ["47", "11", "0", "36"],
  },
  {
    id: "roadmap-later-gates",
    sourcePath: "ROADMAP.md",
    anchor: "progress-count",
    label: "Later profiles, EXT and RC gate counts",
    numbers: ["41", "3", "0", "38"],
  },
  {
    id: "m3-budget",
    sourcePath: "ROADMAP.md",
    anchor: "owner-decisions-2026-11-23",
    label: "M3.0 operational false-alarm budget",
    numbers: ["1 in 20", "48", "132", "6", "1 in 100"],
  },
  {
    id: "i1-extraction-agreement",
    sourcePath: "research/reviews/implementation-merge-i1-review.md",
    label: "I1 Rust and Go extraction differential agreement",
    numbers: ["9,887,008", "163/163", "60,000", "0"],
  },
  {
    id: "i2-comparison-agreement",
    sourcePath: "research/reviews/implementation-merge-i2-review.md",
    label: "I2 Rust and Go comparison and storage boundary review",
    numbers: ["76/76", "5,000/5,000", "10,311/10,311", "3/3", "0"],
  },
  {
    id: "worked-example-extraction",
    sourcePath: "test-vectors/matching/extraction-go.json",
    label: "Worked example mv-go-sum and mv-go-host token counts and config",
    numbers: [
      { value: "k = 5", sourceMatch: '"k": 5' },
      { value: "window = 4", sourceMatch: '"window": 4' },
      { value: "40", sourceMatch: '"tokenCount": 40' },
      { value: "100", sourceMatch: '"tokenCount": 100' },
    ],
  },
  {
    id: "worked-example-report",
    sourcePath: "test-vectors/matching/example-report.json",
    label: "Worked example go-function-in-host report counts and spans",
    numbers: [
      { value: "14", sourceMatch: '"numerator": 14' },
      { value: "39", sourceMatch: '"denominator": 39' },
      { value: "17", sourceMatch: '"numerator": 17' },
      { value: "42", sourceMatch: '"denominator": 42' },
      { value: "16", sourceMatch: "16," },
      { value: "124", sourceMatch: "124" },
      { value: "146", sourceMatch: "146," },
      { value: "254", sourceMatch: "254" },
      { value: "130", sourceMatch: "130," },
      { value: "256", sourceMatch: "256" },
      { value: "126", sourceMatch: "126" },
      { value: "2", sourceMatch: '"minRegionDistinctHashes": 2' },
      { value: "4", sourceMatch: '"mergeGap": 4' },
    ],
  },
  {
    id: "worked-example-companions",
    sourcePath: "test-vectors/matching/matching.json",
    label: "Companion published vectors go-renamed and go-independent-same-task",
    numbers: [
      { value: "go-renamed", sourceMatch: '"id": "go-renamed"' },
      { value: "go-independent-same-task", sourceMatch: '"id": "go-independent-same-task"' },
    ],
  },
  {
    id: "extraction-contract-params",
    sourcePath: "spec/extraction.md",
    label: "Extraction contract hashing and Unicode version",
    numbers: ["64-bit", "17.0.0", "16"],
  },
  {
    id: "catalogue-contract-bounds",
    sourcePath: "spec/catalogue-report.md",
    label: "Catalogue and comparison bounds",
    numbers: ["16", "128", "8,388,608", "64"],
  },
  {
    id: "core-commitment",
    sourcePath: "spec/core.md",
    label: "Private catalogue commitment parameters",
    numbers: ["32-byte", "64"],
  },
  {
    id: "prior-art-winnowing",
    sourcePath: "research/lanes/11-report-audit.md",
    label: "Winnowing prior art, token bounds, and M3 binomial upper bounds",
    numbers: ["2003", "8", "6", "12", "95%", "0.0224", "0.0455", "0.0877", "132"],
  },
  {
    id: "code-carriers-syn",
    sourcePath: "research/experiment-checkpoint.md",
    label: "Synthetic Go and Rust carrier insertion and normalization reset",
    numbers: ["55", "62/62", "7", "66", "762-byte"],
  },
  {
    id: "code-census",
    sourcePath: "research/public-census-checkpoint.md",
    label: "Four-repository public-code eligibility census",
    numbers: ["8", "63", "6", "32", "2", "16", "5", "75"],
  },
  {
    id: "prose-marks-lane09",
    sourcePath: "research/lanes/09-evidence-review.md",
    label: "Embedded text mark review (Unicode fold and AWT capacity)",
    numbers: ["4", "80", "1,000"],
  },
  {
    id: "image-fingerprint-results",
    sourcePath: "research/experiments/image-fingerprint/results/e-img-f-2/RESULTS.md",
    label: "Synthetic image fingerprint study e-img-f-2 counts",
    numbers: [
      "200",
      "100",
      "1,300",
      "12",
      "31",
      "256",
      "49",
      "7",
      "64",
      "98/100",
      "100/100",
      "0/100",
      "1200",
      "69",
      "5",
      "2",
      "1,400/1,400",
      "30/30",
    ],
  },
  {
    id: "image-fingerprint-roadmap",
    sourcePath: "ROADMAP.md",
    anchor: "later-profiles-and-sequence",
    label: "IMGF.4 summary wrong-entry denominator",
    numbers: ["0/1,200"],
  },
  {
    id: "image-mark-protocol",
    sourcePath: "research/drafts/image-mark-protocol.md",
    label: "Image embedded-mark protocol e-img-m-2 parameters",
    numbers: ["61", "49", "256", "167", "38.0"],
  },
  {
    id: "image-mark-smoke",
    sourcePath: "research/reviews/image-mark-protocol-review.md",
    label: "Confirmation pass smoke dry-run keyless re-embed counts",
    numbers: ["3/3", "61/61", "256/256", "22"],
  },
  {
    id: "image-mark-literature",
    sourcePath: "research/lanes/10-evidence-review.md",
    label: "Published TetherMark forgery rates, crop percentages, and X1 blind BCH rate",
    numbers: [
      { value: "10", sourceMatch: "Lane 10" },
      "90%",
      "75%",
      "50%",
      "240",
      "80.00%",
      "90.83%",
      "5.9–15.3%",
    ],
  },
  {
    id: "signing-policy",
    sourcePath: "research/fragment-policy-checkpoint.md",
    label: "Signing policy and independent commitment outcomes",
    numbers: ["126", "50"],
  },
];

export const COVERAGE_ITEMS = [
  {
    kind: "Source code — first case studies (Go and Rust)",
    profiles: "go-tokens (draft-1), rust2024-tokens (draft-1)",
    status: "Implemented (draft)",
    statusTone: "active" as const,
    summary:
      "First two code case-study profiles, working end to end across two independent implementations (Rust and Go, hand-written lexers) as evidence that the specification can be implemented independently. Includes exact and normalized channels, local private catalogues, and byte-identical comparison reports. Held-out corpus evaluation (M3) has not been run yet.",
    sourcePath: "ROADMAP.md",
    anchor: "later-profiles-and-sequence",
  },
  {
    kind: "TypeScript and JavaScript",
    profiles: "ts-tokens (draft-2, frozen); tsx-tokens (deferred draft)",
    status: "Specified",
    statusTone: "specified" as const,
    summary:
      "Stage-1 profile ts-tokens is frozen for implementation and covers TypeScript plus plain JavaScript (.js, .mjs, .cjs) without JSX. tsx-tokens is a deferred draft. Neither is implemented in the reference Rust or Go binaries yet.",
    sourcePath: "profiles/typescript.md",
  },
  {
    kind: "Plain text and Markdown",
    profiles: "text-plain (draft-1, frozen); text-markdown (draft-2)",
    status: "Specified",
    statusTone: "specified" as const,
    summary:
      "Stage-1 profile text-plain is frozen for implementation with three channels (exact, folded, skeleton) pinned to Unicode 17.0.0. text-markdown stays a draft. Not yet implemented; proposed UC-8 wording awaits owner acceptance.",
    sourcePath: "profiles/text.md",
  },
  {
    kind: "Still images — fingerprints",
    profiles: "PDQ and ISCC Image-Code v0 (draft research)",
    status: "Researched",
    statusTone: "researched" as const,
    summary:
      "Draft extraction profile and a completed 200-image synthetic conformance run (e-img-f-2, gates IMGF.2–IMGF.4 met). No natural-image false-match measurement has been run; deep crops and PDQ screenshots failed on synthetic inputs.",
    sourcePath: "research/experiments/image-fingerprint/results/e-img-f-2/RESULTS.md",
  },
  {
    kind: "Still images — embedded marks",
    profiles: "TrustMark-Q and PixelSeal (protocol e-img-m-2)",
    status: "Researched (study frozen)",
    statusTone: "researched" as const,
    summary:
      "Protocol e-img-m-2 is frozen and reviewed, with no full measured run committed in the published specification checkout yet. Because the public encoders and decoders use no key, anyone can copy a mark onto an unrelated image — a detected mark is only a finding aid, not evidence of origin.",
    sourcePath: "research/drafts/image-mark-use-case.md",
  },
  {
    kind: "Audio",
    profiles: "None",
    status: "Not started",
    statusTone: "unstarted" as const,
    summary:
      "Listed as future research scope only. No profile, extraction contract, or experiments exist yet.",
    sourcePath: "profiles/README.md",
  },
  {
    kind: "Compiled binaries",
    profiles: "None",
    status: "Not started",
    statusTone: "unstarted" as const,
    summary:
      "Gated behind M3.4 (gates BIN.1–BIN.2 open). No primary-source review or profile exists yet.",
    sourcePath: "ROADMAP.md",
    anchor: "later-profiles-and-sequence",
  },
] as const;

export const PLANNED_CAPABILITIES = [
  {
    title: "Signed, timestamped registration records",
    gates: "M4.3–M4.6",
    status: "Planned",
    summary:
      "Library-based DSSE signing and verification, an in-toto statement adapter, explicit trust policies, and an optional RFC 3161 timestamp adapter. Interop proofs (M4.1, M4.2) exist; shipping signing/verification is open.",
    sourcePath: "spec/attestations.md",
  },
  {
    title: "Review packets for licence and origin history",
    gates: "M2.7",
    status: "Planned",
    summary:
      "A separate record keyed by report bodySha256 and region key so origin records and archived licence texts never pollute the technical comparison report.",
    sourcePath: "docs/use-cases.md",
    anchor: "uc-2-verification-plan",
  },
  {
    title: "C2PA soft-binding mapping",
    gates: "C2PA.1–C2PA.3",
    status: "In progress (draft)",
    summary:
      "Mapping Traceweave fingerprints and marks onto C2PA soft-binding assertions with round-trip fixtures. No C2PA compatibility is claimed until the fixtures pass.",
    sourcePath: "research/drafts/c2pa-mapping.md",
  },
  {
    title: "Agent interoperability skill",
    gates: "SK.1–SK.2",
    status: "Planned",
    summary:
      "An optional skill wrapping stable CLI commands so diagnostics pass through unchanged and private catalogues, paths, and keys never leak into model-visible transcripts.",
    sourcePath: "ROADMAP.md",
    anchor: "later-profiles-and-sequence",
  },
] as const;
