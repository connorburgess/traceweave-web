---
title: Roadmap
description: >-
  Summary of Traceweave milestones, verifiable gate counts, and open work from
  ROADMAP.md. No dates or detection promises.
canonical: /roadmap
sections:
  - type: page-header
    eyebrow: Roadmap
    heading: Verifiable milestones and gates
    lead: >-
      Traceweave tracks progress by verifiable gates rather than calendar dates.
      Every gate closes only with committed evidence that someone else can
      re-check.

  - type: gate-rules
    id: gate-rules-heading
    heading: How progress is counted
    cards:
      - title: Engineering gates (E)
        body: >-
          Close only when **met** with committed evidence that a non-author can
          re-run or recount from a clean clone.
      - title: Research gates (R)
        body: >-
          Close when **met** or **negative-result**. A negative finding is a
          valid, preserved answer to the question.
      - title: Owner decisions (O)
        body: >-
          Close when a decision record is committed — for example setting a
          false-alarm budget or choosing whether to omit embedding.
    countsHeading: Current gate counts
    countsIntro: "Taken directly from {{source:ROADMAP.md#progress-count}}:"
    countsHeaders:
      - Gate group
      - Total
      - Met
      - Negative-result
      - Open
      - Met gate IDs

  - type: milestones-table
    id: milestones-heading
    eyebrow: Core sequence
    heading: Milestones M0 through M5
    intro: >-
      Order: `M0 → M1 → parallel M2 and M2E → M3 → M5`. `M4` can run
      independently after M1, and is required before any release claims
      cryptographic verification.
    tableHeaders:
      - Milestone
      - Gates
      - Status
      - What becomes possible
    rows:
      - id: M0
        name: Explain and bound
        gates: M0.1–M0.4
        status: "{{fact:milestone.m0.status}}"
        summary: >-
          Use cases, verification plans, discovery checkpoint, example matrix,
          and repository validation checks.
      - id: M1
        name: Freeze one code experiment
        gates: M1.1–M1.6
        status: "{{fact:milestone.m1.status}}"
        summary: >-
          Go and Rust token extraction contract, hand-derived positive/negative
          vectors, catalogue and report schemas, requirement map, and strict
          pinned reproduction in both implementations.
      - id: M2
        name: Local comparison
        gates: M2.1–M2.11
        status: "{{fact:milestone.m2.status}}"
        summary: >-
          Offline walkthrough (verified on macOS and Linux CI), frozen fixture
          manifest, control classes including vendor boilerplate, separate
          fragment containment, atomic private storage, review packets (M2.7),
          and candidate-generation records (M2.9).
      - id: M2E
        name: Embed and detect
        gates: M2E.0–M2E.7
        status: "{{fact:milestone.m2e.status}}"
        summary: >-
          Owner decision to select a new carrier candidate or omit embedding
          from the next release, plus reproducibility, quality, normalization,
          and transplant controls.
      - id: M3
        name: Measure usefulness
        gates: M3.0–M3.6
        status: "{{fact:milestone.m3.status}}"
        summary: >-
          Operational false-alarm budget ({{fact:m3.budget}} per repository
          search across {{fact:m3.negSearches}} held-out negative searches),
          licensed {{fact:m3.repos}}-repository corpus manifest, disjoint
          splits, git-ancestor freeze check, and independent rerun.
      - id: M4
        name: Verify evidence
        gates: M4.1–M4.6
        status: "{{fact:milestone.m4.status}}"
        summary: >-
          Library-based DSSE signing and verification, independent commitment
          code, negative cryptographic vectors, in-toto adapter, trust policy,
          optional timestamp adapter decision, and non-author review.
          Registration design draft-5 (§4.7 self-declared AI-use claim, §9.1
          tw1- text reference) is confirmed by non-author review.
      - id: M5
        name: Candidate release
        gates: M5.1–M5.5
        status: "{{fact:milestone.m5.status}}"
        summary: >-
          Full requirement map, README claim audit, offline clean-clone demo
          reproduction, explicit scope/limit release notes, and conformance
          matrix.

  - type: tracks-table
    id: later-heading
    eyebrow: Later profiles and release criteria
    heading: Expansion tracks beyond the first case-study profiles
    tableHeaders:
      - Track
      - Scope
      - Current state
    rows:
      - track: TS (TS.1–TS.4)
        scope: TypeScript & JavaScript profile
        state: >-
          1 met (TS.3: ts-tokens implemented in both Rust and Go with zero
          differential divergences); profile/vector sign-offs and M3 split
          (TS.4) open.
      - track: PY (PY.1–PY.4)
        scope: Python profile (py-tokens)
        state: >-
          py-tokens draft-1 frozen for stage-1 implementation after clean-room
          review; specified, not implemented.
      - track: IMGF (IMGF.1–IMGF.6)
        scope: Still-image fingerprints (PDQ & ISCC)
        state: >-
          {{fact:track.imgf.met}} met (IMGF.2–IMGF.4 synthetic conformance run);
          item map, C++ comparison, and owner-gated natural-image check open.
      - track: IMG (IMG.0–IMG.5)
        scope: Still-image embedded marks (TrustMark-Q & PixelSeal)
        state: >-
          {{fact:track.img.met}} met (IMG.0–IMG.4, synthetic measured run
          e-img-m-2 committed and rechecked); container field placement (IMG.5)
          open.
      - track: TXT (TXT.0–TXT.8)
        scope: Plain text & Markdown prose
        state: >-
          1 met (TXT.3: text-plain implemented in both Rust and Go with zero
          differential divergences); UC-8 acceptance and corpus stages open.
      - track: C2PA (C2PA.1–C2PA.3)
        scope: C2PA soft-binding mapping
        state: >-
          In progress with draft fixtures; no compatibility claimed until
          round-trip fixtures pass.
      - track: SK (SK.1–SK.5)
        scope: Optional agent skill and A2A design
        state: >-
          SK.1–SK.2 planned after I2 (CLI wrapping and canary tests); SK.3–SK.5
          (A2A registration/verification skills and hosted-service decision)
          planned.
      - track: WEB (WEB.0–WEB.6)
        scope: Browser tool and testing page
        state: >-
          Planned (not started); offline WebAssembly fingerprint, compare, and
          verify flows after M3.4.
      - track: BIN, RES, STRUCT, KEYED
        scope: Binaries, resolver threat model, structural & keyed matching
        state: Gated after M3.4; not started.
      - track: EXT & RC (EXT.1, RC.1–RC.3)
        scope: External review and 1.0 candidate criteria
        state: >-
          Open; requires named non-contributor review and two conforming
          implementations per stable profile.
    actions:
      - label: Read full ROADMAP.md
        href: spec:ROADMAP.md
        variant: primary
      - label: Active work queue
        href: spec:research/work-queue.md
        variant: secondary
      - label: Implementation plan
        href: spec:docs/implementation-repo-plan.md
        variant: secondary
      - label: Docs site
        href: "docs:"
        variant: secondary
    footerLinkText: Learn how decisions, reviews, and contributions work
    footerLinkHref: /about
---
