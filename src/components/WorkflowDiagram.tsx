export function WorkflowDiagram() {
  return (
    <figure className="diagram-frame">
      <svg
        viewBox="0 0 880 236"
        role="img"
        aria-labelledby="workflow-svg-title workflow-svg-desc"
        style={{ width: "100%", height: "auto", display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title id="workflow-svg-title">
          Three-step Traceweave workflow: Fingerprint, Private catalogue, Checkable report
        </title>
        <desc id="workflow-svg-desc">
          Step 1 extracts deterministic token fingerprints and original byte spans from local source
          files. Step 2 stores those fingerprints in a private local catalogue that contains no source
          text. Step 3 compares two catalogues under a pinned configuration to emit a byte-identical,
          checkable comparison report.
        </desc>

        {/* Step 1 */}
        <g>
          <rect
            x="10"
            y="14"
            width="256"
            height="208"
            rx="12"
            fill="var(--surface-muted)"
            stroke="var(--border-strong)"
            strokeWidth="1.5"
          />
          <text
            x="30"
            y="44"
            fill="var(--accent)"
            fontFamily="var(--font-mono)"
            fontSize="12"
            fontWeight="700"
          >
            STEP 01 · EXTRACT
          </text>
          <text
            x="30"
            y="72"
            fill="var(--ink)"
            fontFamily="var(--font-sans)"
            fontSize="20"
            fontWeight="650"
          >
            Fingerprint
          </text>
          {/* Token bars */}
          <rect x="30" y="92" width="54" height="10" rx="3" fill="var(--border-strong)" />
          <rect x="90" y="92" width="72" height="10" rx="3" fill="var(--accent)" opacity="0.85" />
          <rect x="168" y="92" width="52" height="10" rx="3" fill="var(--border-strong)" />
          <rect x="30" y="110" width="90" height="10" rx="3" fill="var(--accent)" opacity="0.45" />
          <rect x="126" y="110" width="66" height="10" rx="3" fill="var(--border-strong)" />
          <text
            x="30"
            y="148"
            fill="var(--ink-secondary)"
            fontFamily="var(--font-sans)"
            fontSize="13.5"
          >
            Turns local files into
          </text>
          <text
            x="30"
            y="167"
            fill="var(--ink-secondary)"
            fontFamily="var(--font-sans)"
            fontSize="13.5"
          >
            deterministic fingerprints
          </text>
          <text
            x="30"
            y="186"
            fill="var(--ink-secondary)"
            fontFamily="var(--font-sans)"
            fontSize="13.5"
          >
            and exact content spans.
          </text>
        </g>

        {/* Arrow 1 -> 2 */}
        <g stroke="var(--accent)" strokeWidth="2" fill="none">
          <line x1="274" y1="118" x2="304" y2="118" />
          <polyline points="296,111 304,118 296,125" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Step 2 */}
        <g>
          <rect
            x="312"
            y="14"
            width="256"
            height="208"
            rx="12"
            fill="var(--surface-muted)"
            stroke="var(--border-strong)"
            strokeWidth="1.5"
          />
          <text
            x="332"
            y="44"
            fill="var(--accent)"
            fontFamily="var(--font-mono)"
            fontSize="12"
            fontWeight="700"
          >
            STEP 02 · STORE LOCALLY
          </text>
          <text
            x="332"
            y="72"
            fill="var(--ink)"
            fontFamily="var(--font-sans)"
            fontSize="20"
            fontWeight="650"
          >
            Private catalogue
          </text>
          {/* Catalogue hash rows */}
          <rect
            x="332"
            y="90"
            width="216"
            height="34"
            rx="6"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x="342"
            y="104"
            fill="var(--ink-subtle)"
            fontFamily="var(--font-mono)"
            fontSize="10.5"
          >
            13c53975ffd60dcc · [16, 29]
          </text>
          <text
            x="342"
            y="118"
            fill="var(--accent)"
            fontFamily="var(--font-mono)"
            fontSize="10.5"
          >
            no source text stored
          </text>
          <text
            x="332"
            y="148"
            fill="var(--ink-secondary)"
            fontFamily="var(--font-sans)"
            fontSize="13.5"
          >
            Kept offline outside git trees.
          </text>
          <text
            x="332"
            y="167"
            fill="var(--ink-secondary)"
            fontFamily="var(--font-sans)"
            fontSize="13.5"
          >
            Holds digests and fingerprints,
          </text>
          <text
            x="332"
            y="186"
            fill="var(--ink-secondary)"
            fontFamily="var(--font-sans)"
            fontSize="13.5"
          >
            never your raw content.
          </text>
        </g>

        {/* Arrow 2 -> 3 */}
        <g stroke="var(--accent)" strokeWidth="2" fill="none">
          <line x1="576" y1="118" x2="606" y2="118" />
          <polyline points="598,111 606,118 598,125" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Step 3 */}
        <g>
          <rect
            x="614"
            y="14"
            width="256"
            height="208"
            rx="12"
            fill="var(--surface-muted)"
            stroke="var(--accent)"
            strokeWidth="1.75"
          />
          <text
            x="634"
            y="44"
            fill="var(--accent)"
            fontFamily="var(--font-mono)"
            fontSize="12"
            fontWeight="700"
          >
            STEP 03 · COMPARE
          </text>
          <text
            x="634"
            y="72"
            fill="var(--ink)"
            fontFamily="var(--font-sans)"
            fontSize="20"
            fontWeight="650"
          >
            Checkable report
          </text>
          {/* Report badge */}
          <rect
            x="634"
            y="90"
            width="216"
            height="34"
            rx="6"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x="644"
            y="104"
            fill="var(--ink)"
            fontFamily="var(--font-mono)"
            fontSize="10.5"
          >
            containment: 14/14 · jaccard: 14/39
          </text>
          <text
            x="644"
            y="118"
            fill="var(--ink-subtle)"
            fontFamily="var(--font-mono)"
            fontSize="10.5"
          >
            bodySha256: 081d8600…
          </text>
          <text
            x="634"
            y="148"
            fill="var(--ink-secondary)"
            fontFamily="var(--font-sans)"
            fontSize="13.5"
          >
            Emits matched byte ranges,
          </text>
          <text
            x="634"
            y="167"
            fill="var(--ink-secondary)"
            fontFamily="var(--font-sans)"
            fontSize="13.5"
          >
            config digests, and exact counts
          </text>
          <text
            x="634"
            y="186"
            fill="var(--ink-secondary)"
            fontFamily="var(--font-sans)"
            fontSize="13.5"
          >
            that another party can re-run.
          </text>
        </g>
      </svg>
      <figcaption className="diagram-caption">
        Comparison reads only catalogues and pinned configuration bytes — never source text — so a
        recipient with the same inputs reproduces the exact canonical report bytes.
      </figcaption>
    </figure>
  );
}
