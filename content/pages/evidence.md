---
title: Evidence and limits
description: >-
  Measured results and failure boundaries from Traceweave research studies on
  code matching, code and prose watermarks, still-image fingerprints and marks,
  and signing interoperability.
canonical: /evidence
sections:
  - type: page-header
    eyebrow: Evidence and limits
    heading: Measured results and documented boundaries
    lead: >-
      Every figure on this page links directly to its committed record in the
      published specification repository, including negative results that bound
      the scope of each profile.

  - type: stat-section
    id: determinism-heading
    tight: true
    eyebrow: 1 · Independent implementations
    heading: Two independent implementations agree across test suites
    intro: >-
      As evidence that the specification can be implemented independently,
      separate Rust and Go implementations with hand-written lexers were built
      for the first two code case-study profiles (Go and Rust) and cross-checked
      offline across synthetic and differential test suites:
    columns: 4
    stats:
      - value: "{{fact:i1.cases}}"
        label: >-
          I1 differential extraction cases agreeing ({{fact:i1.divergences}}
          divergence classes, {{fact:i1.vectors}} vectors,
          {{fact:i1.determinism}} determinism checks)
      - value: "{{fact:i2.reports}}"
        label: >-
          I2 canonical report bodies byte-identical across Rust, Go, and
          clean-room re-implementation
      - value: "{{fact:i2.cases}}"
        label: >-
          I2 differential comparison cases agreeing (plus {{fact:i2.cleanRoom}}
          clean-room generated pairs)
      - value: 0 files
        label: >-
          Written inside git checkouts by default (M2.8 storage boundary;
          {{fact:i2.faultChecks}} atomic fault-injection checks per lane)
    outro: >-
      **Scope of this check:** implementation agreement measures determinism and
      contract conformance; real-world recall and false-alarm rates are measured
      separately in the held-out evaluation (M3), which has not run yet. Its
      operational false-alarm budget (gate `M3.0`) is **{{fact:m3.budget}}** per
      repository search across a {{fact:m3.repos}}-repository corpus
      ({{fact:m3.negSearches}} held-out negative searches, met when alarms are
      at most {{fact:m3.maxAlarms}}; binomial one-sided {{fact:m3.confidence}}
      upper bound is {{fact:m3.bound0}} at 0 alarms and {{fact:m3.bound6}} at
      {{fact:m3.maxAlarms}} alarms, where the observed rate is
      {{fact:m3.rate6}}). A {{fact:m3.followUp}} test on a larger corpus is
      planned as a follow-up if this passes.
      {{source:research/reviews/implementation-merge-i1-review.md}} ·
      {{source:research/reviews/implementation-merge-i2-review.md}} ·
      {{source:ROADMAP.md#owner-decisions-2026-11-23}} ·
      {{source:research/lanes/11-report-audit.md}}

  - type: prose-section
    id: prior-art-heading
    eyebrow: 2 · Matching baseline
    heading: "Token winnowing: locality and edit boundaries"
    paragraphs:
      - >-
        The baseline comparison builds on winnowing (Schleimer, Wilkerson, and
        Aiken, SIGMOD {{fact:winnow.year}}), pairing established fingerprinting
        prior art with a deterministic, cross-implementation evidence contract.
      - >-
        At the shipped experimental parameters (`k = {{fact:we.k}}`, `window =
        {{fact:we.window}}`, `minRegionDistinctHashes =
        {{fact:we.minRegionDistinctHashes}}`), locality covers any unchanged run
        of at least {{fact:winnow.run}} tokens (`k + w − 1`), the smallest
        reportable match is {{fact:winnow.min}} tokens, and a merged match
        across two windows needs {{fact:winnow.merged}} unchanged tokens.
        Inserting a single token every `k − 1` tokens breaks every
        {{fact:we.k}}-token window, so light rewriting, statement reordering,
        refactoring, paraphrasing, and cross-language ports fall outside k-gram
        matching. {{source:research/lanes/11-report-audit.md}} ·
        {{source:spec/extraction.md#8-winnowing-selection}}

  - type: card-pair
    id: code-prose-marks-heading
    eyebrow: 3 · Embedded marks in code and prose
    heading: Code and prose carrier measurements
    cards:
      - title: Source code carriers (Go & Rust)
        paragraphs:
          - >-
            In synthetic experiments, deliberate carrier insertions recovered
            **{{fact:syn.nonzero}}** nonzero states per language after `gofmt`
            and `rustfmt` ({{fact:syn.total}} including {{fact:syn.zero}}
            already-zero states). Under cheap canonicalization, all
            **{{fact:syn.nonzero}}** nonzero states per language reset to zero,
            and same-context signal transfers still decoded.
          - >-
            A four-repository source census (`go-spew`:
            {{fact:census.spew.files}} files, {{fact:census.spew.fns}}
            functions; `hey`: {{fact:census.hey.files}} files,
            {{fact:census.hey.fns}} functions; `itoa`:
            {{fact:census.itoa.files}} files, {{fact:census.itoa.fns}} lexical
            `fn`; `hexyl`: {{fact:census.hexyl.files}} files,
            {{fact:census.hexyl.fns}} lexical `fn`) established zero safe
            eligible embedding sites under those narrow patterns. No code mark
            carrier is selected.
        footer: >-
          {{source:research/experiment-checkpoint.md}} ·
          {{source:research/fragment-policy-checkpoint.md}} ·
          {{source:research/public-census-checkpoint.md}}
      - title: Existing prose carriers
        paragraphs:
          - >-
            In the text evidence review, homoglyph and zero-width Unicode
            carriers were erased across every tested language by a single
            published canonical fold (`NFKC` + `UTS #39` skeleton + deleting
            `Default_Ignorable_Code_Point`).
          - >-
            Post-hoc lexical rewriting (AWT) modifies the author's wording,
            carries roughly {{fact:prose.awtBits}} raw bits per
            {{fact:prose.awtWords}} words (about {{fact:prose.awtPer1000}} raw
            bits per {{fact:prose.awtWords1000}} words before framing), and had
            no licence file at its pinned commit. No embedded text mark was
            selected to test; gate `TXT.8` closed as `negative-result` for
            Unicode carriers after non-author verification.
        footer: >-
          {{source:research/lanes/09-evidence-review.md}} ·
          {{source:ROADMAP.md#later-profiles-and-sequence}}

  - type: image-fp-table
    id: image-fp-heading
    eyebrow: 4 · Still images — fingerprints
    heading: "Synthetic image fingerprint conformance check (`e-img-f-2`)"
    intro: >-
      Two perceptual hashes — PDQ ({{fact:imgf.pdqBits}}, threshold
      {{fact:imgf.pdqThresh}}, abstain at quality ≤ {{fact:imgf.pdqAbstain}})
      and ISCC Image-Code v0 ({{fact:imgf.isccBits}}, threshold
      {{fact:imgf.isccThresh}}) — were run offline on {{fact:imgf.total}} seeded
      synthetic images ({{fact:imgf.enrolled}} enrolled, {{fact:imgf.enrolled}}
      negatives, {{fact:imgf.edits}} edits = {{fact:imgf.queries}} queries). Two
      full runs were byte-identical, and all {{fact:imgf.refFiles}} reference
      vector files and {{fact:imgf.extractions}} port-vs-vendor extractions
      agreed. Enrolment was {{fact:imgf.pdqEnrol}} for PDQ
      ({{fact:imgf.pdqAbstained}} abstained for low quality) and
      {{fact:imgf.isccEnrol}} for ISCC.
    tableHeaders:
      - Synthetic edit / check
      - PDQ
      - ISCC Image-Code v0
    outro: >-
      **Scope of this check:** procedural synthetic shapes test contract
      conformance rather than natural photographs or real-world false-match
      rates. On these synthetic edits, deep crops missed for both hashes and the
      screenshot transform returned {{fact:imgf.pdqZero}} for PDQ.
      {{source:research/experiments/image-fingerprint/results/e-img-f-2/RESULTS.md}}

  - type: prose-section
    id: image-mark-heading
    eyebrow: 5 · Still images — embedded marks
    heading: "Image watermarks as a finding aid (`e-img-m-2`)"
    paragraphs:
      - >-
        Study `e-img-m-2` ran offline on {{fact:imgm.images}} synthetic marked
        images and {{fact:imgm.images}} hosts for two post-hoc neural image
        marks — TrustMark-Q (tested on its {{fact:imgm.tmBits}} direct HMAC data
        bits, threshold {{fact:imgm.tmThresh}}) and PixelSeal
        ({{fact:imgm.psBits}} payload bits, threshold {{fact:imgm.psThresh}}),
        with a {{fact:imgm.psnrFloor}} dB PSNR quality floor
        ({{fact:imgm.belowFloor}} below floor; medians {{fact:imgm.tmMedian}} dB
        and {{fact:imgm.psMedian}} dB). Two full runs were byte-identical, and a
        non-author recount reproduced every figure with 0 mismatches across
        {{fact:imgm.queries}} queries ({{fact:imgm.unitTests}} unit tests
        passing; gates `IMG.0–IMG.4` met).
      - >-
        Both schemes matched **{{fact:imgm.clean}}** clean marked images and
        produced 0 accepts on implementation checks ({{fact:imgm.unmarked}}
        unmarked, {{fact:imgm.wrongKey}} wrong-key, and {{fact:imgm.wrongEntry}}
        wrong-entry comparisons per scheme). Under removal attempts, ReMark left
        **{{fact:imgm.remarkTm}}** accepted for TrustMark-Q and
        **{{fact:imgm.remarkPs}}** for PixelSeal, while JPEG quality 10 left
        **{{fact:imgm.jpeg10Tm}}** and **{{fact:imgm.jpeg10Ps}}**. Because both
        encoders and decoders are public and unkeyed, keyless
        decode-and-re-embed into an unrelated host was accepted
        **{{fact:imgm.reembed}}** for both TrustMark-Q and PixelSeal, and plain
        residual transplant was accepted **{{fact:imgm.transplantTm}}**
        (TrustMark-Q) and **{{fact:imgm.transplantPs}}** (PixelSeal).
      - >-
        In the external literature reviewed in lane 10, the author-run
        TetherMark preprint ({{fact:imgm.tetherAttempts}} attempts per attack)
        reported a TrustMark-P baseline accepting **{{fact:imgm.wmForger}}** of
        WmForger and **{{fact:imgm.wmCopier}}** of WMCopier forgery attempts,
        and benchmark X1 measured blind BCH decodes on **{{fact:imgm.x1Bch}}**
        of unmarked images. An embedded image mark therefore acts as a locator
        for a private catalogue entry, not as evidence of origin.
        {{source:research/experiments/image-mark/results/e-img-m-2/RESULTS.md}}
        · {{source:research/drafts/image-mark-protocol.md}} ·
        {{source:research/drafts/image-mark-use-case.md}} ·
        {{source:research/reviews/image-mark-protocol-review.md#results-recheck-e-img-m-2}}
        · {{source:research/lanes/10-evidence-review.md}}

  - type: prose-section
    id: signing-heading
    eyebrow: 6 · Cryptographic envelopes and commitments
    heading: DSSE and commitment interoperability (M4.1–M4.2)
    paragraphs:
      - >-
        Offline interoperability harnesses passed **{{fact:m4.dsseOutcomes}}**
        DSSE outcomes across all four Go/Rust producer/consumer pairs on the
        {{fact:m4.stmtBytes}} example statement (gate `M4.1`) and
        **{{fact:m4.commitOutcomes}}** native commitment outcomes across
        independent Go and Rust implementations ({{fact:m4.totalOutcomes}} total
        signing-policy outcomes; gate `M4.2`).
      - >-
        Gates `M4.3`, `M4.5`, and `M4.6` are met with promoted normative files
        (`spec/registration-record.md`, `spec/trust-policy.md`,
        `test-vectors/registration/`, and `test-vectors/intoto-adapter/` with 4
        accept / 26 reject fixtures, plus non-author commitment/disclosure
        review). Offline-first registration records (draft-5 plus §4.7
        `claims.aiUse` and §9.1 `tw1-` text references) are implemented in both
        Rust and Go; only `M4.4` remains open pending re-vendoring against the
        promoted spec commit. A signature authenticates the record bytes
        separately from any similarity comparison.
        {{source:research/experiment-checkpoint.md}} ·
        {{source:research/fragment-policy-checkpoint.md}} ·
        {{source:spec/registration-record.md}} ·
        {{source:spec/trust-policy.md}} ·
        {{source:spec/attestations.md}}
    actions:
      - label: See all roadmap gates
        href: /roadmap
        variant: primary
      - label: Read full evaluation notes on docs.traceweave.org
        href: "docs:"
        variant: secondary
---
