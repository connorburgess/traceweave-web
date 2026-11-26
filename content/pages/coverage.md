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
          TS.1–TS.3 met for frozen Stage-1 ts-tokens/draft-2, matching all vendored vectors with zero differential
          divergences) and covers TypeScript plus plain JavaScript (.js, .mjs,
          .cjs) without JSX. tsx-tokens stays a deferred draft; own M3 split
          (TS.4) is open. The [profile/vector closure](spec:research/reviews/img-ts-txt-five-gate-closure-73b6d5c.md)
          establishes no JSX detector or exclusion/deferral overlap precedence.
        sourcePath: profiles/typescript.md
      - kind: Python
        profiles: py-tokens (draft-1, promoted & implemented)
        status: Implemented (draft)
        statusTone: active
        summary: >-
          Stage-1 profile py-tokens is promoted to profiles/python.md and
          test-vectors/extraction-python/ and implemented in both Rust and Go
          (gates PY.1–PY.3 met with zero differential divergences), covering
          Python {{fact:py.refVersion}} lexical rules including zero-width
          NEWLINE, INDENT, and DEDENT tokens. Own M3 split (PY.4) remains open.
        sourcePath: profiles/python.md
      - kind: Plain text and Markdown
        profiles: text-plain (draft-1, implemented); text-markdown (draft-2)
        status: Implemented (draft)
        statusTone: active
        summary: >-
          Stage-1 profile text-plain is implemented in both Rust and Go with
          three channels (exact, folded, skeleton) pinned to Unicode
          {{fact:spec.unicodeVersion}} (gates TXT.1–TXT.3 met for frozen Stage-1 text-plain/draft-1; TXT.7 limits citations
          met). Stage-1 prose evaluation (TXT.4, e-txt-1) and Unicode text marks
          (TXT.8) closed as negative-result; text-markdown, UC-8 wording, and
          Stage-2 corpus work remain open. TXT.2 pairs mutated-result
          rejections under OD-T12, not rejected-input partners.
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
          [IMGF.1 is met for draft-3 research specification only](spec:research/reviews/imgf1-gate-closure-db2848c.md),
          with finite single-host normalization checks; no fresh upstream
          C-source verification, normative promotion or universal/cross-host
          equivalence. Historical draft-2 evidence retains its identity.
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
          IMG.5 is met through reviewed draft schema accommodation only; no
          normative promotion or C2PA interoperability is claimed.
        sourcePath: research/experiments/image-mark/results/e-img-m-2/RESULTS.md
      - kind: Audio
        profiles: None (scoping note only)
        status: Scoped (no profile yet)
        statusTone: unstarted
        summary: >-
          Lane 15 scopes exact-byte M4 registration for audio/video today and
          evaluates open offline deterministic fingerprint candidates while
          keeping watermarks finding-aid-only. No extraction profile or
          experiment exists yet.
        sourcePath: research/lanes/15-audio-video-scoping.md
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
      Python is a code-profile target: `py-tokens` `draft-1` is promoted to
      `profiles/python.md` and `test-vectors/extraction-python/` and implemented
      in both Rust and Go (gates `PY.1–PY.3` met), while the M3 evaluation split
      (`PY.4`) stays open. Using Python in the specification repository for
      schema validation and vector checkers is separate from the Python profile
      ({{source:ROADMAP.md#pilot-languages}} · {{source:profiles/python.md}}).

  - type: planned-extensions
    id: planned-heading
    eyebrow: Planned extensions
    heading: Provenance, review packets, and interoperability
    intro: >-
      None of the items below is shipped yet. Each is gated behind explicit
      fixtures and non-author review in {{source:ROADMAP.md}}.
    cards:
      - title: Signed, timestamped registration records
        gates: M4.1–M4.6
        status: Met (6 of 6 M4 gates)
        summary: >-
          All 6 M4 gates are met: spec/registration-record.md,
          spec/trust-policy.md, test-vectors/registration/, and
          test-vectors/intoto-adapter/ (4 accept / 26 reject fixtures) are
          promoted, disclosure review is closed, and independent Rust and Go
          offline-first registration (draft-5 plus §4.7 claims.aiUse and §9.1
          tw1-) passes every promoted vector with zero divergences.
        sourcePath: spec/registration-record.md
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
        status: In progress (C2PA.3 met)
        summary: >-
          Mapping Traceweave catalogues, reports, mark detection, and M4 tw1-
          registration links onto C2PA 2.5 assertions under org.traceweave.*
          (C2PA.1 audited with fixtures; C2PA.3 met). No C2PA compatibility is
          claimed until C2PA.2 round-trip tool fixtures pass.
        sourcePath: research/drafts/c2pa-mapping.md
      - title: Agent interoperability skill and A2A
        gates: SK.1–SK.5
        status: SK.1–SK.2 met; A2A planned
        summary: >-
          An optional CLI-wrapping skill keeping private catalogues, paths, and
          keys out of model-visible transcripts (SK.1–SK.2 met with zero canary
          leaks across both Rust and Go CLIs), plus planned local-first A2A
          registration and verification skills (SK.3–SK.5).
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
