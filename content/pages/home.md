---
title: Traceweave — Open specification for checkable content reuse evidence
description: >-
  Traceweave is an open specification for recognising your own work when it
  turns up somewhere else, and for producing evidence of the match that anyone
  can re-run and check.
canonical: /
sections:
  - type: hero
    heading: Recognise your own work when it turns up somewhere else.
    leads:
      - >-
        Traceweave is an open specification for recognising your own work when
        it turns up somewhere else, and for producing evidence of the match that
        anyone can re-run and check.
      - >-
        It is designed to cover any kind of work: source code, writing, images
        and audio. One shared evidence format sits underneath, with a profile
        for each medium. Your content never leaves your machine; only
        fingerprints are compared.
    actions:
      - label: How it works
        href: /how-it-works
        variant: primary
      - label: Read the docs
        href: "docs:"
        variant: secondary
      - label: Specification repository
        href: "spec-repo:"
        variant: secondary
      - label: Roadmap
        href: /roadmap
        variant: secondary
    statusLabel: "Where it stands today:"
    statusBody: >-
      source code is working end to end across Go, Rust, TypeScript, and
      JavaScript, alongside plain text (draft profiles implemented in both Rust
      and Go). Python is specified. Images have been measured in two studies.
      More languages, audio, and signed, timestamped registration records are
      planned. It is experimental and not yet evaluated on real-world data.
    statusSources: >-
      Sources: {{source:README.md}} ·
      {{source:ROADMAP.md#pilot-languages|ROADMAP.md#pilot-languages}} ·
      {{source:ROADMAP.md#later-profiles-and-sequence|ROADMAP.md#later-profiles-and-sequence}}

  - type: workflow
    id: workflow-heading
    eyebrow: How it works
    heading: Three local steps, zero content uploads
    intro: >-
      Each medium profile extracts fingerprints locally into a private catalogue
      that holds no raw content, then compares catalogues to emit a report
      anyone with the same inputs can reproduce. Source code — with Go and Rust
      as the first two case studies, validated across two independent
      implementations to show the specification can be built independently —
      exercises this pipeline end to end today.
    linkText: Walk through a real published example
    linkHref: /how-it-works

  - type: evidence-scope
    id: scope-heading
    eyebrow: Evidence and scope
    heading: What a comparison records
    intro: >-
      Traceweave records technical similarity separately from timestamps,
      signatures, and human origin review so each piece of evidence can be
      checked on its own terms.
    cards:
      - title: What it records
        badge: Checkable output
        badgeTone: active
        items:
          - >-
            **Shared fingerprints:** exact and normalized token matches between
            a candidate and your private reference catalogue.
          - >-
            **Exact byte coordinates:** half-open UTF-8 byte spans in both the
            reference and candidate where matching regions sit.
          - >-
            **Fragment and whole-file counts:** directional fragment containment
            reported alongside whole-file Jaccard similarity so a small copied
            region stays visible inside a larger file.
          - >-
            **Reproducible reports:** canonical report bytes and a SHA-256
            digest that another party holding the same catalogues and
            configuration can re-run and verify.
      - title: Where matching stops
        badge: Scope boundary
        badgeTone: default
        items:
          - >-
            **Shared content, not chronology:** a match shows overlapping
            material; a fingerprint made today says nothing about when a version
            existed.
          - >-
            **Rewriting and edits:** token matching builds on established prior
            art and light rewriting defeats it; no match means insufficient
            matching evidence rather than absence of reuse.
          - >-
            **Embedded marks:** tested marks in source code and prose did not
            survive normalization, and public image watermark encoders let
            anyone copy a mark onto another image without the key — making a
            mark a finding aid rather than evidence of origin.
    provenance:
      heading: Built for provenance
      lead: >-
        Traceweave helps you show where your work appears, and how copies relate
        to the original, with evidence anyone can check. It records facts. It
        leaves the judgments to people.
      items:
        - >-
          **Working today, in draft:** fingerprint Go and Rust code on your own
          machine, keep a private catalogue that holds no source text, and
          produce comparison reports anyone can re-run.
        - >-
          **Coming next:** signed, timestamped registration records, so you can
          show a version of your work existed by a given date. Licence-history
          packets follow.
        - >-
          **What you do with it is up to you.** Traceweave produces checkable
          facts about your work. It does not lock content, and it does not make
          the call on ownership or permission.
      footer: >-
        [See what the research measured](/evidence) · {{source:spec/core.md}} ·
        {{source:spec/threat-model.md}}

  - type: audience
    id: audience-heading
    eyebrow: Use cases
    heading: Who Traceweave is built for
    intro: >-
      The specification is organised around five provenance workflows documented
      in {{source:docs/use-cases.md}}.
    cards:
      - role: Software maintainers
        summary: >-
          Locate fragments of reference source code inside a local candidate
          project, with exact byte spans and fragment containment reported
          separately from whole-file similarity.
      - role: Origin & licence reviewers
        summary: >-
          Pair technical match regions with separate origin records and archived
          licence notices so provenance facts stay distinct from human review.
      - role: Creators keeping private records
        summary: >-
          Keep local fingerprint catalogues and exact-byte commitments on your
          own machine without uploading work or publishing an identity.
      - role: Auditors & recipients
        summary: >-
          Re-run a comparison from catalogues and pinned configuration bytes to
          verify every count and span in a received report independently.
      - role: Researchers & implementers
        summary: >-
          Measure how code, writing, and image profiles behave across
          transformations and control sets, with explicit denominators and
          abstentions.

  - type: progress
    id: status-heading
    eyebrow: Progress
    heading: Tracked by committed, verifiable gates
    intro: >-
      Each milestone splits into verifiable gates that close only when someone
      else can re-run or recount the committed evidence from a clean clone.
      Counts below come directly from {{source:ROADMAP.md#progress-count}}.
    stats:
      - value: "{{fact:roadmap.core.met}} / {{fact:roadmap.core.total}}"
        label: >-
          Core milestone gates met ({{fact:roadmap.core.open}} open,
          {{fact:roadmap.core.negativeResult}} negative-result)
      - value: "{{fact:roadmap.later.met}} / {{fact:roadmap.later.total}}"
        label: >-
          Later-profile and release gates met ({{fact:roadmap.later.open}} open,
          {{fact:roadmap.later.negativeResult}} negative-result)
      - value: "0 / 1"
        label: Held-out real-world corpus evaluation run (pending)
    actions:
      - label: View roadmap and gates
        href: /roadmap
        variant: primary
      - label: Content coverage
        href: /coverage
        variant: secondary
      - label: Full documentation
        href: "docs:"
        variant: secondary
      - label: Read ROADMAP.md
        href: spec:ROADMAP.md
        variant: secondary
---
