---
title: What it covers
description: >-
  Honest status of Traceweave content profiles across Go, Rust,
  TypeScript/JavaScript, Python, plain text, still images, audio, and compiled
  binaries.
canonical: /coverage
sections:
  - type: page-header
    eyebrow: Content profiles
    heading: What Traceweave covers
    lead: >-
      One shared evidence format sits underneath profile-specific extractors.
      Each medium defines its own extraction rules, transformations, and
      measured boundaries independently.

  - type: coverage-matrix
    id: matrix-heading
    heading: Content type status
    tableHeaders:
      - Content type
      - Profile / draft
      - Status
      - Current scope and limit
    rows:
      - kind: Source code — first case studies (Go and Rust)
        profiles: go-tokens (draft-1), rust2024-tokens (draft-1)
        status: Implemented (draft)
        statusTone: active
        summary: >-
          First two code case-study profiles, working end to end across two
          independent implementations (Rust and Go, hand-written lexers) as
          evidence that the specification can be implemented independently.
          Includes exact and normalized channels, local private catalogues, and
          byte-identical comparison reports. Held-out corpus evaluation (M3) has
          not been run yet.
        sourcePath: ROADMAP.md
        anchor: later-profiles-and-sequence
      - kind: TypeScript and JavaScript
        profiles: ts-tokens (draft-2, implemented); tsx-tokens (deferred draft)
        status: Implemented (draft)
        statusTone: active
        summary: >-
          Stage-1 profile ts-tokens is implemented in both Rust and Go (gate
          TS.3 met, matching all vendored vectors with zero differential
          divergences) and covers TypeScript plus plain JavaScript (.js, .mjs,
          .cjs) without JSX. tsx-tokens stays a deferred draft; own M3 split
          (TS.4) is open.
        sourcePath: profiles/typescript.md
      - kind: Python
        profiles: py-tokens (draft-1, frozen)
        status: Specified
        statusTone: specified
        summary: >-
          Stage-1 profile py-tokens is frozen for implementation after a
          clean-room review reproduced all {{fact:py.vectors}} vectors from the
          text alone, covering Python {{fact:py.refVersion}} lexical rules
          including zero-width NEWLINE, INDENT, and DEDENT tokens. Not yet
          promoted to profiles/ or implemented in the reference Rust or Go
          binaries.
        sourcePath: research/drafts/extraction-profile-python.md
      - kind: Plain text and Markdown
        profiles: text-plain (draft-1, implemented); text-markdown (draft-2)
        status: Implemented (draft)
        statusTone: active
        summary: >-
          Stage-1 profile text-plain is implemented in both Rust and Go with
          three channels (exact, folded, skeleton) pinned to Unicode
          {{fact:spec.unicodeVersion}} (gate TXT.3 met, matching all vendored
          vectors with zero differential divergences). text-markdown stays a
          draft; proposed UC-8 wording and corpus stages remain open.
        sourcePath: profiles/text.md
      - kind: Still images — fingerprints
        profiles: PDQ and ISCC Image-Code v0 (draft research)
        status: Researched
        statusTone: researched
        summary: >-
          Draft extraction profile and a completed {{fact:imgf.total}}-image
          synthetic conformance run (e-img-f-2, gates IMGF.2–IMGF.4 met). No
          natural-image false-match measurement has been run; deep crops and PDQ
          screenshots failed on synthetic inputs.
        sourcePath: research/experiments/image-fingerprint/results/e-img-f-2/RESULTS.md
      - kind: Still images — embedded marks
        profiles: TrustMark-Q and PixelSeal (study e-img-m-2)
        status: Researched (synthetic run committed)
        statusTone: researched
        summary: >-
          Completed {{fact:imgm.images}}-image synthetic measured run
          (e-img-m-2, gates IMG.0–IMG.4 met). Both schemes survived most edits
          ({{fact:imgm.clean}} clean), but keyless decode-and-re-embed succeeded
          {{fact:imgm.reembed}} for both and residual transplant succeeded
          {{fact:imgm.transplantTm}} and {{fact:imgm.transplantPs}} — confirming
          an embedded mark is only a finding aid, not evidence of origin.
        sourcePath: research/experiments/image-mark/results/e-img-m-2/RESULTS.md
      - kind: Audio
        profiles: None
        status: Not started
        statusTone: unstarted
        summary: >-
          Listed as future research scope only. No profile, extraction contract,
          or experiments exist yet.
        sourcePath: profiles/README.md
      - kind: Compiled binaries
        profiles: None
        status: Not started
        statusTone: unstarted
        summary: >-
          Gated behind M3.4 (gates BIN.1–BIN.2 open). No primary-source review
          or profile exists yet.
        sourcePath: ROADMAP.md
        anchor: later-profiles-and-sequence
    noteHeading: Note on Python
    noteBody: >-
      Python is a code-profile target: `py-tokens` `draft-1` is specified and
      frozen for stage-1 implementation, but not yet implemented in the Rust or
      Go binaries (gates `PY.1–PY.4`). Using Python in the specification
      repository for schema validation and vector checkers is separate from the
      Python profile ({{source:ROADMAP.md#pilot-languages}} ·
      {{source:research/drafts/extraction-profile-python.md}}).

  - type: planned-extensions
    id: planned-heading
    eyebrow: Planned extensions
    heading: Provenance, review packets, and interoperability
    intro: >-
      None of the items below is shipped yet. Each is gated behind explicit
      fixtures and non-author review in {{source:ROADMAP.md}}.
    cards:
      - title: Signed, timestamped registration records
        gates: M4.3–M4.6
        status: Planned (design draft-5 confirmed)
        summary: >-
          Library-based DSSE signing and verification, an in-toto statement
          adapter, explicit trust policies, and timestamp evidence. Design
          draft-5 plus §4.7 self-declared AI-use claim and §9.1 text reference
          (tw1-) are confirmed by non-author review and ready for offline-first
          implementation.
        sourcePath: research/drafts/registration-record.md
      - title: Review packets for licence and origin history
        gates: M2.7
        status: Met (spec and CLI)
        summary: >-
          A separate record keyed by report bodySha256 and region key so origin
          records and archived licence texts never pollute the technical
          comparison report. Draft-2 schema, fixtures, and CLI support are met
          (M2.7).
        sourcePath: schemas/review-packet.schema.json
      - title: C2PA soft-binding mapping
        gates: C2PA.1–C2PA.3
        status: In progress (draft)
        summary: >-
          Mapping Traceweave fingerprints and marks onto C2PA soft-binding
          assertions with round-trip fixtures. No C2PA compatibility is claimed
          until the fixtures pass.
        sourcePath: research/drafts/c2pa-mapping.md
      - title: Agent interoperability skill and A2A
        gates: SK.1–SK.5
        status: Planned
        summary: >-
          An optional CLI-wrapping skill keeping private catalogues, paths, and
          keys out of model-visible transcripts (SK.1–SK.2), plus local-first
          A2A registration and verification skills (SK.3–SK.5).
        sourcePath: ROADMAP.md
        anchor: later-profiles-and-sequence
    actions:
      - label: Read the research evidence & limits
        href: /evidence
        variant: primary
      - label: View roadmap gates
        href: /roadmap
        variant: secondary
      - label: Profile documents on docs.traceweave.org
        href: "docs:"
        variant: secondary
---
