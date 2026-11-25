---
title: How it works
description: >-
  Plain-language walkthrough of Traceweave token extraction, private local
  catalogues, deterministic comparison reports, and a worked example from the
  published test vectors.
canonical: /how-it-works
sections:
  - type: page-header
    eyebrow: How it works
    heading: From local files to a deterministic, byte-identical comparison report
    lead: >-
      Traceweave puts one shared evidence format underneath profile-specific
      extractors. Every comparison runs in three local steps so your content
      stays on your machine and anyone with the same catalogues can reproduce
      the exact report bytes.

  - type: pipeline
    id: pipeline-heading
    heading: The three-stage pipeline
    stages:
      - eyebrow: Stage 1
        title: Extract fingerprints
        paragraphs:
          - >-
            A profile lexer scans UTF-8 input bytes with pinned `Unicode
            {{fact:spec.unicodeVersion}}` tables — no parser, compiler, or
            network access. It produces two streams: an **exact** channel
            keeping names and literals, and a **normalized** channel clearing
            identifier and literal values so simple renaming still aligns.
          - >-
            Overlapping token k-grams are hashed to {{fact:spec.hashBits}}
            SHA-256 prefixes and selected with rightmost-minimum winnowing.
            Every fingerprint keeps its original half-open UTF-8 byte span.
            {{source:spec/extraction.md}}
      - eyebrow: Stage 2
        title: Build a private catalogue
        paragraphs:
          - >-
            Selected fingerprints, artifact SHA-256 digests, and the exact
            extraction configuration bytes are serialized into a canonical JSON
            catalogue. Source text, token strings, and file paths are discarded.
          - >-
            Catalogues are stored outside git working trees by default. Because
            hashes are unkeyed, someone holding a catalogue can still test
            guessed code against it — so catalogues are treated as private
            material. {{source:spec/catalogue-report.md#35-not-stored}}
      - eyebrow: Stage 3
        title: Compare and report
        paragraphs:
          - >-
            Comparison reads only the reference catalogue, candidate catalogue,
            optional boilerplate-suppression catalogue, and comparison
            configuration bytes. It never reads source text.
          - >-
            Matching hashes on a consistent offset diagonal merge into regions
            when their reference-position gap is at most `mergeGap`, and become
            reportable once they reach `minRegionDistinctHashes` distinct
            non-common hashes.
            {{source:spec/catalogue-report.md#5-comparison-algorithm-traceweave-seed-merge-draft-2}}

  - type: worked-example
    id: example-heading
    eyebrow: Worked example from published test vectors
    heading: "Finding a small Go function inside a larger file (`{{fact:we.vectorId}}`)"
    intro: >-
      This example comes verbatim from the published matching vectors
      ({{source:test-vectors/matching/extraction-go.json}} and
      {{source:test-vectors/matching/example-report.json}}). Both files are
      extracted under `{{fact:we.profile}}` `{{fact:we.profileVersion}}` with
      `k = {{fact:we.k}}` and `window = {{fact:we.window}}`, and compared with
      `minRegionDistinctHashes = {{fact:we.minRegionDistinctHashes}}` and
      `mergeGap = {{fact:we.mergeGap}}`.
    referenceTitle: "Reference: `{{fact:we.ref.id}}`"
    referenceMeta: >-
      {{fact:we.ref.tokenCount}} tokens · {{fact:we.ref.exactFingerprints}}
      exact fingerprints · {{fact:we.ref.normalizedFingerprints}} normalized
      fingerprints
    candidateTitle: "Candidate: `{{fact:we.cand.id}}`"
    candidateMeta: >-
      {{fact:we.cand.tokenCount}} tokens · {{fact:we.cand.exactFingerprints}}
      exact fingerprints · {{fact:we.cand.normalizedFingerprints}} normalized
      fingerprints
    reportHeading: What the canonical report records
    tableHeaders:
      - Channel / mode
      - Outcome
      - Reference in candidate
      - Whole-file Jaccard
      - Reference byte span
      - Candidate byte span
    calloutParagraphs:
      - >-
        **Why two metrics matter:** in the exact channel, every fingerprint from
        `{{fact:we.ref.id}}` appears inside `{{fact:we.cand.id}}`
        (**{{fact:we.exact.referenceInCandidate}}** directional containment),
        while whole-file Jaccard similarity is only
        **{{fact:we.exact.jaccard}}** because `{{fact:we.cand.id}}` has
        surrounding code. Reporting raw unreduced fractions keeps the small
        copied fragment visible.
      - >-
        **Canonical digest:** the RFC 8785 canonical report body hashes to
        {{code:we.bodySha256}}. As evidence that the specification can be
        implemented independently, both the Rust and Go implementations emit
        those exact deterministic, byte-identical report bytes for this vector.
    companionsHeading: Two companion cases from the same vector set
    companions:
      - title: go-renamed
        titleMono: true
        badge: Identifiers changed
        badgeTone: default
        paragraphs:
          - >-
            When variable and function names are renamed, the `exact` channel
            reports `no-shared-fingerprints` ({{fact:we.renamed.exact}}), while
            the `normalized` channel still matches ({{fact:we.renamed.norm}}).
            {{source:test-vectors/matching/matching.json}}
      - title: go-independent-same-task
        titleMono: true
        badge: Independent control
        badgeTone: default
        paragraphs:
          - >-
            When someone writes a separate solution to the same summing task,
            `exact` reports `no-shared-fingerprints` ({{fact:we.indep.exact}})
            and `normalized` reports `below-minimum-evidence`
            ({{fact:we.indep.norm}} split across single-hash regions).
            {{source:test-vectors/matching/matching.json}}

  - type: layers
    id: separation-heading
    eyebrow: Evidence architecture
    heading: Independent layers, recorded separately
    intro: >-
      Traceweave keeps exact byte digests, similarity comparison, cryptographic
      signing, timestamps, and origin notes in separate fields so each layer can
      be verified on its own ({{source:spec/core.md#interpretation}}):
    tableHeaders:
      - Layer
      - What it records
      - Status
    rows:
      - layer: Exact artifact & commitment
        records: >-
          SHA-256 subject digest and private salted catalogue commitment
          ({{fact:spec.nonceBytes}} nonce)
        status: Draft format & vectors
        statusTone: active
      - layer: Fingerprint comparison
        records: >-
          Deterministic extraction, private catalogues, and seed-merge
          comparison reports
        status: Working (Go & Rust case studies)
        statusTone: active
      - layer: Signed & timestamped records
        records: >-
          DSSE / in-toto attestation, explicit trust policy, and optional RFC
          3161 timestamp
        status: Working draft (all 6 of 6 M4 gates met)
        statusTone: active
      - layer: Origin & licence history
        records: Separate review-packet record linked by `bodySha256`
        status: Working draft (M2.7 spec & CLI met)
        statusTone: active
      - layer: Agent interoperability
        records: Optional CLI-wrapping skill with transcript canary checks
        status: Working draft (SK.1–SK.2 met; A2A planned)
        statusTone: active
    actions:
      - label: See what content types are covered
        href: /coverage
        variant: primary
      - label: Evidence & limits
        href: /evidence
        variant: secondary
      - label: Technical specs on docs.traceweave.org
        href: "docs:"
        variant: secondary
---
