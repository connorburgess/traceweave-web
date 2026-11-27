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
    countsIntro: "Taken from published `roadmap-v2` commit `170cf5df3150874dc8f11ad9903e485285ccec97` (verified 2026-11-27; spec `main` remains at `7e30cb7`), {{source:ROADMAP.md#progress-count}}:"
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
          The owner [decided to omit source-code embedding from the next
          release](spec:docs/decisions/code-embedding-decision.md), closing
          M2E.0. M2E.1–M2E.7 remain deferred and are not counted as met.
          Still-image finding-aid research remains separate.
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
          code, promoted registration fixtures, trust policy, timestamp adapter
          decision and non-author commitment/disclosure review. Independent
          Rust and Go offline-first registration (draft-5 + §4.7 claims.aiUse +
          §9.1 tw1-) passes the recorded registration fixture suite with zero
          divergences (all M4.1–M4.6 met). The separate minimal-core in-toto
          adapter has Python fixture evidence (4 accept / 26 reject);
          implementation parity is unverified.
          {{source:docs/release/conformance-matrix.md}}
      - id: M5
        name: Candidate release
        gates: M5.1–M5.5
        status: "{{fact:milestone.m5.status}}"
        summary: >-
          Full requirement map, README claim audit, offline clean-clone demo
          reproduction, explicit scope/limit release notes, and conformance
          matrix. [M5.1/2/4/5 closure](spec:research/reviews/m5-gate-closure-07c98ca.md)
          and [M5.3 closure](spec:research/reviews/m5-3-gate-closure-24bb4b8.md)
          record scoped non-author review. The
          [pinned offline native demo](https://github.com/connorburgess/traceweave-spec/blob/d66e4b942c8ca7da1585cc5f19932456a82f5f1d/docs/release/offline-demo.md)
          covers one synthetic Go fixture in stamped Rust and Go at dcaa0d4,
          spec pin 9cf78ee, under OS network denial after dependency fetch.
          Linux recipe execution is unverified; remote implementation access
          was not tested. M3 stays held. Release approval and full
          implementation/Shelf conformance are not implied; see the
          [conformance matrix](spec:docs/release/conformance-matrix.md).

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
          3 met (TS.1–TS.3) for frozen Stage-1 ts-tokens/draft-2;
          [reviewed profile and vector closure](spec:research/reviews/img-ts-txt-five-gate-closure-73b6d5c.md).
          TSX/JSX remains deferred, with no JSX detector or exclusion/deferral
          overlap precedence established. Two implementations agree; TS.4
          evaluation remains open.
      - track: PY (PY.1–PY.4)
        scope: Python profile (py-tokens)
        state: >-
          3 met (PY.1–PY.3: promoted to profiles/python.md and
          test-vectors/extraction-python/, implemented in both Rust and Go with
          zero divergences); M3 split (PY.4) open.
      - track: IMGF (IMGF.1–IMGF.6)
        scope: Still-image fingerprints (PDQ & ISCC)
        state: >-
          {{fact:track.imgf.met}} met (IMGF.1–IMGF.4).
          [IMGF.1 closes draft-3 research specification only](spec:research/reviews/imgf1-gate-closure-db2848c.md):
          explicit ISCC arithmetic, finite single-host normalization checks,
          no fresh upstream C-source verification, normative promotion or
          universal/cross-host equivalence. Historical draft-2 results remain
          frozen. IMGF.5 and owner-gated IMGF.6 remain open.
      - track: IMG (IMG.0–IMG.5)
        scope: Still-image embedded marks (TrustMark-Q & PixelSeal)
        state: >-
          {{fact:track.img.met}} met (IMG.0–IMG.5). Synthetic e-img-m-2 remains
          bounded; IMG.5 closes reviewed draft schema accommodation only,
          without normative promotion, origin proof or C2PA interoperability.
      - track: TXT (TXT.0–TXT.8)
        scope: Plain text & Markdown prose
        state: >-
          4 met (TXT.1–TXT.3 for frozen Stage-1 text-plain/draft-1; TXT.7
          limits citations). TXT.2 uses mutated-result rejections under OD-T12,
          not rejected-input partners; Markdown masking remains deferred.
          Two implementations agree. 2 negative-result
          (TXT.4 Stage-1 prose evaluation e-txt-1; TXT.8 Unicode text marks);
          UC-8 acceptance and Stage-2 corpus open.
      - track: C2PA (C2PA.1–C2PA.3)
        scope: C2PA soft-binding mapping
        state: >-
          1 met (C2PA.3: no compatibility claim until C2PA.2 passes); C2PA.1
          (C2PA 2.5 mapping + M4 registration link) audited with fixtures,
          C2PA.2 round-trip fixtures open.
      - track: SK (SK.1–SK.5)
        scope: Optional agent skill and A2A design
        state: >-
          3 met (SK.1–SK.2: CLI-wrapping skill and canary leak suite met across
          Rust and Go CLIs). SK.3 is also met for
          [local-first design only](spec:research/reviews/sk3-design-gate-closure-4fa00c7.md),
          exact design 4fa00c7 independently reviewed at 12a1459. Proposed
          register/verify semantics hold initial outbound contact. I1–I4
          (notice count, description enforcement, hosted extra-text bypass,
          witness version drift) remain unresolved; C1 is a nonblocking
          clarification. No implementation, interoperability or hosting is
          established. SK.4/SK.5, key/identity/policy defaults and namespace
          publication remain undecided.
      - track: WEB (WEB.0–WEB.6)
        scope: Browser tool and testing page
        state: >-
          5 met (WEB.0–WEB.4). Earlier WEB.1–WEB.2 engine evidence remains
          scoped to its harness. [WEB.3 bounded acceptance](spec:research/reviews/web3-bounded-gate-closure-99a1a8b.md)
          on Shelf 99a1a8b covers fixed catalogue/body/replay fixtures, not
          physical-device, privacy or full provenance construction acceptance.
          [Open Shelf](https://shelf.traceweave.org): published source c0c34cc
          includes Fingerprint, Catalogue comparison, Replay report and Testing
          page tabs. Replay is separate from registration verification. The
          [testing-page source notes](https://github.com/connorburgess/traceweave-shelf/blob/c0c34cc407e39b80b293ccec6e255db0207acd4a/docs/testing-page.md)
          describe six scoped Go lexical operations and six synthetic demos,
          with three both-mode misses and two distinct controls. Ambiguity is
          not counted as a miss; operations can produce invalid or
          behavior-changing Go. [WEB.4 is bounded met](spec:research/reviews/web4-bounded-gate-closure-c0c34cc.md)
          at this published spec pin. Its separate evidence layers include
          8 body/16 catalogue comparisons plus 8 repeats; 6 operation outputs,
          6 repeats, 6 actual-WASM body cases and 30 refusals; and 7 browser
          operation/chaining steps in one custom source scenario, not seven
          demos. Synthetic DOM/CDP input and finite/shared-ancestry comparisons
          do not prove physical chooser/drag, full keyboard/AT/device support,
          an independent matching oracle, privacy, offline reload or current
          live interaction. Input/output refusals are not WEB.6 performance
          certification. WEB.5 is uncertified; WEB.6 remains
          planned. Its [prospective timing decision](spec:docs/decisions/web6-prospective-timing-2026-11-27.md)
          permits protocol preparation, not conformance execution, budget
          freeze or retrospective compliance. Native registration evidence is
          private; no public native signing tool is announced. M3 stays held.
      - track: BIN, RES, STRUCT, KEYED
        scope: Binaries, resolver threat model, structural & keyed matching
        state: >-
          1 met (RES.1: optional-only resolver threat model confirmed); BIN,
          RES.2–RES.3, STRUCT, and KEYED gated after M3.4.
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
