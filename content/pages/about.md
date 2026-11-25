---
title: About
description: >-
  Traceweave is an open, non-commercial, independent specification for
  recognising your own work when it turns up somewhere else, and for producing
  evidence of the match that anyone can re-run and check.
canonical: /about
sections:
  - type: page-header
    eyebrow: About Traceweave
    heading: An open, non-commercial, independent specification
    lead: >-
      Traceweave is an open specification for recognising your own work when it
      turns up somewhere else, and for producing evidence of the match that
      anyone can re-run and check.
    body: >-
      It is an open, non-commercial, independent effort — not a company,
      standards body, certification program, or legal entity. Independent
      reference implementations in Rust and Go exist as evidence that the
      specification can be implemented independently, not as a closed product.
    maintainedByLabel: Maintained by
    maintainedByName: SEATBELT LABS
    maintainedByHref: https://seatbeltlabs.com

  - type: governance-grid
    id: governance-heading
    cards:
      - title: How decisions and reviews work
        items:
          - >-
            **One reviewable change per decision:** format changes move schemas,
            examples, negative fixtures, and version identifiers together.
          - >-
            **Committed evidence before progress:** roadmap gates close only
            when someone who did not do the work can re-run the check or recount
            the evidence from a clean clone.
          - >-
            **Non-author reviews:** contracts, protocols, and implementation
            merges receive independent review passes whose findings are recorded
            and dispositioned publicly.
          - >-
            **Two implementations for stability:** no profile is marked stable
            until two independent implementations reproduce every positive and
            negative vector byte for byte.
        footer: >-
          {{source:ROADMAP.md#how-work-is-accepted}} ·
          {{source:spec/conformance.md}}
      - title: Contributing and reporting problems
        paragraphs:
          - >-
            Discussion and pull requests live in the specification repository.
            Proposals should start from a concrete use case, cite primary
            sources for external claims, and separate measured results from open
            hypotheses.
        items:
          - >-
            **Design issues & pull requests:** open an issue or pull request in
            the specification repository following {{source:CONTRIBUTING.md}}.
          - >-
            **Never submit private evidence:** do not post private keys, real
            catalogues, nonces, or unpublished suspect content to public issues
            or pull requests. Use synthetic fixtures you have permission to
            share.
          - >-
            **Security & confidential reports:** follow {{source:SECURITY.md}} —
            use GitHub private vulnerability reporting if enabled, or ask for a
            private channel without posting the exploit or sensitive material.
          - "**Contact:** [connor@seatbeltlabs.com](mailto:connor@seatbeltlabs.com)."
        actions:
          - label: Open an issue
            href: "spec-issues:"
            variant: primary
          - label: Specification repo
            href: "spec-repo:"
            variant: secondary

  - type: licensing
    id: licences-heading
    eyebrow: Licensing
    heading: Open licences for prose and code
    intro: >-
      Both this website and the specification repository follow the same
      dual-scope open licence split ({{source:LICENSE.md}}):
    items:
      - >-
        **Prose and documentation:** [Creative Commons Attribution 4.0
        International (CC BY 4.0)](spec:LICENSES/CC-BY-4.0.txt).
      - >-
        **Source code, schemas, test vectors, and scripts:** [Apache License,
        Version 2.0 (Apache-2.0)](spec:LICENSES/Apache-2.0.txt).
    notes:
      - >-
        These licences govern Traceweave's own specification, website, and
        tooling. They do not change the copyright or licence status of any
        external content processed by an implementation, and no claim of patent
        clearance or standards-body endorsement is made.
      - >-
        Illustrations on this site are generated images, not photographs or
        results.
    actions:
      - label: Documentation site (docs.traceweave.org)
        href: "docs:"
        variant: secondary
      - label: Read CONTRIBUTING.md
        href: spec:CONTRIBUTING.md
        variant: secondary
      - label: Read SECURITY.md
        href: spec:SECURITY.md
        variant: secondary
---
