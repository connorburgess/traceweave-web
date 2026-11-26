import type { CitedFact } from "@/lib/sources";

export const SPEC_DRAFT_VERSION = "0.1.0-draft.1";

export const ROADMAP_COUNTS = {
  asOf: "2026-11-25",
  updated: "2026-11-26",
  sourcePath: "ROADMAP.md",
  anchor: "progress-count",
  core: {
    label: "Core M0–M5",
    total: 47,
    met: 29,
    negativeResult: 0,
    open: 18,
    metIds: [
      "M0.1",
      "M0.2",
      "M0.3",
      "M0.4",
      "M1.1",
      "M1.2",
      "M1.3",
      "M1.4",
      "M1.5",
      "M1.6",
      "M2.1",
      "M2.2",
      "M2.3",
      "M2.4",
      "M2.5",
      "M2.6",
      "M2.7",
      "M2.8",
      "M2.9",
      "M2.10",
      "M2.11",
      "M2E.0",
      "M3.0",
      "M4.1",
      "M4.2",
      "M4.3",
      "M4.4",
      "M4.5",
      "M4.6",
    ],
  },
  later: {
    label: "Later profiles, EXT and RC",
    total: 55,
    met: 21,
    negativeResult: 2,
    open: 32,
    metIds: [
      "TS.3",
      "PY.1",
      "PY.2",
      "PY.3",
      "IMGF.2",
      "IMGF.3",
      "IMGF.4",
      "IMG.0",
      "IMG.1",
      "IMG.2",
      "IMG.3",
      "IMG.4",
      "TXT.3",
      "TXT.7",
      "RES.1",
      "C2PA.3",
      "SK.1",
      "SK.2",
      "WEB.0",
      "WEB.1",
      "WEB.2",
    ],
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

export const IMAGE_FP_ROWS = [
  {
    edit: "flip, png, jpeg90, jpeg75, jpeg50, jpeg30, resize50, resize25",
    pdq: "98 / 100 each",
    iscc: "100 / 100 each",
  },
  { edit: "screenshot (padded border + rescale)", pdq: "0 / 100", iscc: "100 / 100" },
  { edit: "crop90 (90% centre area)", pdq: "2 / 100", iscc: "69 / 100" },
  { edit: "crop75 (75% centre area)", pdq: "0 / 100", iscc: "5 / 100" },
  { edit: "crop50 (50% centre area)", pdq: "0 / 100", iscc: "0 / 100" },
  { edit: "Unenrolled negatives within threshold", pdq: "0 / 100", iscc: "0 / 100" },
  { edit: "Wrong-entry matches across all 12 edits", pdq: "0 / 1,200", iscc: "0 / 1,200" },
] as const;

/**
 * Single-sourced registry of every specification-backed figure referenced by
 * Markdown content files via {{fact:key}} or {{code:key}}.
 */
export const FACT_VALUES: Record<string, string> = {
  // Draft version & roadmap counts
  draftVersion: SPEC_DRAFT_VERSION,
  "roadmap.core.label": ROADMAP_COUNTS.core.label,
  "roadmap.core.total": String(ROADMAP_COUNTS.core.total),
  "roadmap.core.met": String(ROADMAP_COUNTS.core.met),
  "roadmap.core.negativeResult": String(ROADMAP_COUNTS.core.negativeResult),
  "roadmap.core.open": String(ROADMAP_COUNTS.core.open),
  "roadmap.core.metIds": ROADMAP_COUNTS.core.metIds.join(", "),
  "roadmap.later.label": ROADMAP_COUNTS.later.label,
  "roadmap.later.total": String(ROADMAP_COUNTS.later.total),
  "roadmap.later.met": String(ROADMAP_COUNTS.later.met),
  "roadmap.later.negativeResult": String(ROADMAP_COUNTS.later.negativeResult),
  "roadmap.later.open": String(ROADMAP_COUNTS.later.open),
  "roadmap.later.metIds": ROADMAP_COUNTS.later.metIds.join(", "),

  // Milestone gate breakdowns (ROADMAP.md)
  "milestone.m0.status": "4 of 4 met",
  "milestone.m1.status": "6 of 6 met (M1.1–M1.6; M1.4 with A16 caveat)",
  "milestone.m2.status": "11 of 11 met (M2.1–M2.11)",
  "milestone.m2e.status": "1 of 8 met; 7 deferred",
  "milestone.m3.status": "1 of 7 met (M3.0)",
  "milestone.m4.status": "6 of 6 met (M4.1–M4.6)",
  "milestone.m5.status": "0 of 5 met",
  "track.imgf.met": "3",
  "track.img.met": "5",

  // Worked example (test-vectors/matching/)
  "we.vectorId": WORKED_EXAMPLE.vectorId,
  "we.profile": WORKED_EXAMPLE.profile,
  "we.profileVersion": WORKED_EXAMPLE.profileVersion,
  "we.k": String(WORKED_EXAMPLE.k),
  "we.window": String(WORKED_EXAMPLE.window),
  "we.minRegionDistinctHashes": String(WORKED_EXAMPLE.minRegionDistinctHashes),
  "we.mergeGap": String(WORKED_EXAMPLE.mergeGap),
  "we.bodySha256": WORKED_EXAMPLE.bodySha256,
  "we.ref.id": WORKED_EXAMPLE.reference.id,
  "we.ref.tokenCount": String(WORKED_EXAMPLE.reference.tokenCount),
  "we.ref.exactFingerprints": String(WORKED_EXAMPLE.reference.exactFingerprints),
  "we.ref.normalizedFingerprints": String(WORKED_EXAMPLE.reference.normalizedFingerprints),
  "we.cand.id": WORKED_EXAMPLE.candidate.id,
  "we.cand.tokenCount": String(WORKED_EXAMPLE.candidate.tokenCount),
  "we.cand.exactFingerprints": String(WORKED_EXAMPLE.candidate.exactFingerprints),
  "we.cand.normalizedFingerprints": String(WORKED_EXAMPLE.candidate.normalizedFingerprints),
  "we.exact.outcome": WORKED_EXAMPLE.exact.outcome,
  "we.exact.referenceInCandidate": WORKED_EXAMPLE.exact.referenceInCandidate,
  "we.exact.jaccard": WORKED_EXAMPLE.exact.jaccard,
  "we.exact.referenceSpan": WORKED_EXAMPLE.exact.referenceSpan,
  "we.exact.candidateSpan": WORKED_EXAMPLE.exact.candidateSpan,
  "we.norm.outcome": WORKED_EXAMPLE.normalized.outcome,
  "we.norm.referenceInCandidate": WORKED_EXAMPLE.normalized.referenceInCandidate,
  "we.norm.jaccard": WORKED_EXAMPLE.normalized.jaccard,
  "we.norm.referenceSpan": WORKED_EXAMPLE.normalized.referenceSpan,
  "we.norm.candidateSpan": WORKED_EXAMPLE.normalized.candidateSpan,
  "we.renamed.exact": "0/4",
  "we.renamed.norm": "4/4",
  "we.indep.exact": "0/14",
  "we.indep.norm": "2/17",

  // Extraction & core parameters
  "spec.unicodeVersion": "17.0.0",
  "spec.hashBits": "64-bit",
  "spec.nonceBytes": "32-byte",

  // Python profile draft
  "py.vectors": "98",
  "py.refVersion": "3.14.6",

  // I1 / I2 independent implementation agreement
  "i1.cases": "9,887,008",
  "i1.divergences": "0",
  "i1.vectors": "163/163",
  "i1.determinism": "60,000",
  "i2.reports": "76 / 76",
  "i2.cases": "10,311",
  "i2.cleanRoom": "5,000/5,000",
  "i2.faultChecks": "3/3",

  // M3 operational false-alarm budget
  "m3.budget": "1 in 20",
  "m3.repos": "48",
  "m3.negSearches": "132",
  "m3.maxAlarms": "6",
  "m3.confidence": "95%",
  "m3.bound0": "0.0224",
  "m3.bound6": "0.0877",
  "m3.rate6": "0.0455",
  "m3.followUp": "1 in 100",

  // Winnowing prior art & bounds
  "winnow.year": "2003",
  "winnow.run": "8",
  "winnow.min": "6",
  "winnow.merged": "12",

  // Synthetic code carriers & 4-repo census
  "syn.nonzero": "55/55",
  "syn.total": "62/62",
  "syn.zero": "7",
  "census.spew.files": "8",
  "census.spew.fns": "63",
  "census.hey.files": "6",
  "census.hey.fns": "32",
  "census.itoa.files": "2",
  "census.itoa.fns": "16",
  "census.hexyl.files": "5",
  "census.hexyl.fns": "75",

  // Prose carriers (lane 09)
  "prose.awtBits": "4",
  "prose.awtWords": "80",
  "prose.awtPer1000": "50",
  "prose.awtWords1000": "1,000",

  // Image fingerprints (e-img-f-2)
  "imgf.pdqBits": "256-bit",
  "imgf.pdqThresh": "31",
  "imgf.pdqAbstain": "49",
  "imgf.isccBits": "64-bit",
  "imgf.isccThresh": "7",
  "imgf.total": "200",
  "imgf.enrolled": "100",
  "imgf.edits": "12",
  "imgf.queries": "1,300",
  "imgf.refFiles": "30/30",
  "imgf.extractions": "1,400/1,400",
  "imgf.pdqEnrol": "98/100",
  "imgf.pdqAbstained": "2",
  "imgf.isccEnrol": "100/100",
  "imgf.pdqZero": "0/100",

  // Image embedded marks (e-img-m-2)
  "imgm.images": "100",
  "imgm.tmBits": "61",
  "imgm.tmThresh": "49",
  "imgm.psBits": "256",
  "imgm.psThresh": "167",
  "imgm.psnrFloor": "38.0",
  "imgm.belowFloor": "0/100",
  "imgm.tmMedian": "44.96",
  "imgm.psMedian": "51.55",
  "imgm.queries": "7,500",
  "imgm.unitTests": "22",
  "imgm.clean": "100/100",
  "imgm.unmarked": "20,000",
  "imgm.wrongKey": "10,000",
  "imgm.wrongEntry": "9,900",
  "imgm.remarkTm": "1/100",
  "imgm.remarkPs": "99/100",
  "imgm.jpeg10Tm": "48/100",
  "imgm.jpeg10Ps": "18/100",
  "imgm.reembed": "100/100",
  "imgm.transplantTm": "82/100",
  "imgm.transplantPs": "90/100",
  "imgm.tetherAttempts": "240",
  "imgm.wmForger": "80.00%",
  "imgm.wmCopier": "90.83%",
  "imgm.x1Bch": "5.9–15.3%",

  // Signing interop (M4.1-M4.2)
  "m4.dsseOutcomes": "66",
  "m4.stmtBytes": "762-byte",
  "m4.commitOutcomes": "50",
  "m4.totalOutcomes": "126",
};

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
    numbers: ["47", "29", "0", "18", { value: "11", sourceMatch: "M2.1–M2.11" }],
  },
  {
    id: "roadmap-later-gates",
    sourcePath: "ROADMAP.md",
    anchor: "progress-count",
    label: "Later profiles, EXT and RC gate counts",
    numbers: ["55", "21", "2", "32"],
  },
  {
    id: "python-profile-draft",
    sourcePath: "profiles/python.md",
    label: "Promoted Python draft-1 profile vector count and reference version",
    numbers: ["98", "3.14.6"],
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
    id: "image-mark-results",
    sourcePath: "research/experiments/image-mark/results/e-img-m-2/RESULTS.md",
    label: "Committed synthetic image-mark study e-img-m-2 measured counts",
    numbers: [
      "100",
      "100/100",
      "20,000",
      "10,000",
      "9,900",
      "38.0",
      "44.96",
      "51.55",
      "1",
      "99",
      "48",
      "18",
      "82",
      "90",
      "0",
    ],
  },
  {
    id: "image-mark-recheck",
    sourcePath: "research/reviews/image-mark-protocol-review.md",
    label: "Non-author recheck of e-img-m-2 across 7,500 queries and 22 unit tests",
    numbers: ["7,500", "22"],
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
  {
    id: "registration-design",
    sourcePath: "ROADMAP.md",
    label: "M4 registration record design draft-5 and confirmed sections §4.7 and §9.1",
    numbers: [
      { value: "4.7", sourceMatch: "§4.7" },
      { value: "9.1", sourceMatch: "§9.1" },
    ],
  },
  {
    id: "c2pa-av-scoping",
    sourcePath: "ROADMAP.md",
    label: "C2PA 2.5 mapping pin and Lane 15 audio/video scoping",
    numbers: ["2.5", "15"],
  },
  {
    id: "m4-5-intoto",
    sourcePath: "ROADMAP.md",
    label: "M4.5 in-toto adapter accept/reject fixture counts",
    numbers: ["4", "26"],
  },
  {
    id: "web-wasm-engine",
    sourcePath: "ROADMAP.md",
    label: "WEB.1 pure-Rust WebAssembly engine binary size",
    numbers: [{ value: "1.13", sourceMatch: "1,128,365" }],
  },
];

export interface SpecimenAsset {
  base: string;
  alt: string;
}

export const HOME_HERO_SPECIMEN = {
  light: {
    base: "hero-light",
    alt: "Macro archival specimen of pale stone-grey woven linen on unbleached off-white cotton rag board with debossed corner crop marks and a single horizontal deep-green thread.",
  },
  dark: {
    base: "hero-dark",
    alt: "Macro archival specimen of dark charcoal woven linen on matte black board with blind-debossed corner registration marks and a single horizontal mint-green thread.",
  },
} as const;

export const PROVENANCE_SPECIMEN: SpecimenAsset = {
  base: "provenance",
  alt: "Overhead archival specimen plate with parallel pinned monochrome linen threads on the left interlacing into a plain-weave cloth on the right, with a single emerald-green thread traced continuously from its origin pin through the weave.",
};

export interface MediumPlate extends SpecimenAsset {
  label: string;
}

export const MEDIUM_PLATES: readonly MediumPlate[] = [
  {
    label: "Source code",
    base: "medium-code",
    alt: "Macro view of a dark monochrome stepped-twill woven cloth flanked by three matte-black perforated card strips, threaded with a single stepped mint-green thread.",
  },
  {
    label: "Writing",
    base: "medium-writing",
    alt: "Stacked blank cotton rag paper folios with fibrous deckle edges on dark archival board, bound down the folded spine by a single emerald-green linen stitch.",
  },
  {
    label: "Images",
    base: "medium-images",
    alt: "Bevelled glass specimen plate over a three-by-three grid of abstract greyscale silver-gelatin tonal squares with etched hairline crosshairs and a single horizontal mint-green silk filament.",
  },
  {
    label: "Audio",
    base: "medium-audio",
    alt: "Parallel silver-grey filaments stretched taut across matte-black archival bridges above gently undulating dark paper ridges, with one central taut mint-green thread.",
  },
] as const;

export interface CoverageItem {
  kind: string;
  profiles: string;
  status: string;
  statusTone: "active" | "specified" | "researched" | "unstarted";
  summary: string;
  sourcePath: string;
  anchor?: string;
}

export const COVERAGE_ITEMS: readonly CoverageItem[] = [
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
    profiles: "ts-tokens (draft-2, implemented); tsx-tokens (deferred draft)",
    status: "Implemented (draft)",
    statusTone: "active" as const,
    summary:
      "Stage-1 profile ts-tokens is implemented in both Rust and Go (gate TS.3 met, matching all vendored vectors with zero differential divergences) and covers TypeScript plus plain JavaScript (.js, .mjs, .cjs) without JSX. tsx-tokens stays a deferred draft; own M3 split (TS.4) is open.",
    sourcePath: "profiles/typescript.md",
  },
  {
    kind: "Python",
    profiles: "py-tokens (draft-1, promoted & implemented)",
    status: "Implemented (draft)",
    statusTone: "active" as const,
    summary:
      "Stage-1 profile py-tokens is promoted to profiles/python.md and test-vectors/extraction-python/ and implemented in both Rust and Go (gates PY.1–PY.3 met with zero differential divergences), covering Python 3.14.6 lexical rules including zero-width NEWLINE, INDENT, and DEDENT tokens. Own M3 split (PY.4) remains open.",
    sourcePath: "profiles/python.md",
  },
  {
    kind: "Plain text and Markdown",
    profiles: "text-plain (draft-1, implemented); text-markdown (draft-2)",
    status: "Implemented (draft)",
    statusTone: "active" as const,
    summary:
      "Stage-1 profile text-plain is implemented in both Rust and Go with three channels (exact, folded, skeleton) pinned to Unicode 17.0.0 (gate TXT.3 met; TXT.7 limits citations met). Stage-1 prose evaluation (TXT.4, e-txt-1) and Unicode text marks (TXT.8) closed as negative-result; text-markdown, UC-8 wording, and Stage-2 corpus work remain open.",
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
    profiles: "TrustMark-Q and PixelSeal (study e-img-m-2)",
    status: "Researched (synthetic run committed)",
    statusTone: "researched" as const,
    summary:
      "Completed 100-image synthetic measured run (e-img-m-2, gates IMG.0–IMG.4 met). Both schemes survived most edits (100/100 clean), but keyless decode-and-re-embed succeeded 100/100 for both and residual transplant succeeded 82/100 and 90/100 — confirming an embedded mark is only a finding aid, not evidence of origin.",
    sourcePath: "research/experiments/image-mark/results/e-img-m-2/RESULTS.md",
  },
  {
    kind: "Audio",
    profiles: "None (scoping note only)",
    status: "Scoped (no profile yet)",
    statusTone: "unstarted" as const,
    summary:
      "Lane 15 scopes exact-byte M4 registration for audio/video today and evaluates open offline deterministic fingerprint candidates while keeping watermarks finding-aid-only. No extraction profile or experiment exists yet.",
    sourcePath: "research/lanes/15-audio-video-scoping.md",
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
    gates: "M4.1–M4.6",
    status: "Met (6 of 6 M4 gates)",
    summary:
      "All 6 M4 gates are met: spec/registration-record.md, spec/trust-policy.md, test-vectors/registration/, and test-vectors/intoto-adapter/ (4 accept / 26 reject fixtures) are promoted, disclosure review is closed, and independent Rust and Go offline-first registration (draft-5 plus §4.7 claims.aiUse and §9.1 tw1-) passes every promoted vector with zero divergences.",
    sourcePath: "spec/registration-record.md",
  },
  {
    title: "Review packets for licence and origin history",
    gates: "M2.7",
    status: "Met (spec and CLI)",
    summary:
      "A separate record keyed by report bodySha256 and region key so origin records and archived licence texts never pollute the technical comparison report. Draft-2 schema, fixtures, and CLI support are met (M2.7).",
    sourcePath: "schemas/review-packet.schema.json",
  },
  {
    title: "C2PA soft-binding mapping",
    gates: "C2PA.1–C2PA.3",
    status: "In progress (C2PA.3 met)",
    summary:
      "Mapping Traceweave catalogues, reports, mark detection, and M4 tw1- registration links onto C2PA 2.5 assertions under org.traceweave.* (C2PA.1 audited with fixtures; C2PA.3 met). No C2PA compatibility is claimed until C2PA.2 round-trip tool fixtures pass.",
    sourcePath: "research/drafts/c2pa-mapping.md",
  },
  {
    title: "Agent interoperability skill and A2A",
    gates: "SK.1–SK.5",
    status: "SK.1–SK.2 met; A2A planned",
    summary:
      "An optional CLI-wrapping skill keeping private catalogues, paths, and keys out of model-visible transcripts (SK.1–SK.2 met with zero canary leaks across both Rust and Go CLIs), plus planned local-first A2A registration and verification skills (SK.3–SK.5).",
    sourcePath: "ROADMAP.md",
    anchor: "later-profiles-and-sequence",
  },
] as const;
