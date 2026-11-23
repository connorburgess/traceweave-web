import type { Metadata } from "next";
import Link from "next/link";
import { SourceLink } from "@/components/SourceLink";
import { DOCS_URL } from "@/lib/sources";

export const metadata: Metadata = {
  title: "Evidence and limits",
  description:
    "Measured results and failure boundaries from Traceweave research studies on code matching, code and prose watermarks, still-image fingerprints and marks, and signing interoperability.",
  alternates: {
    canonical: "/evidence",
  },
};

const IMAGE_FP_ROWS = [
  { edit: "flip, png, jpeg90, jpeg75, jpeg50, jpeg30, resize50, resize25", pdq: "98 / 100 each", iscc: "100 / 100 each" },
  { edit: "screenshot (padded border + rescale)", pdq: "0 / 100", iscc: "100 / 100" },
  { edit: "crop90 (90% centre area)", pdq: "2 / 100", iscc: "69 / 100" },
  { edit: "crop75 (75% centre area)", pdq: "0 / 100", iscc: "5 / 100" },
  { edit: "crop50 (50% centre area)", pdq: "0 / 100", iscc: "0 / 100" },
  { edit: "Unenrolled negatives within threshold", pdq: "0 / 100", iscc: "0 / 100" },
  { edit: "Wrong-entry matches across all 12 edits", pdq: "0 / 1,200", iscc: "0 / 1,200" },
] as const;

export default function EvidencePage() {
  return (
    <>
      <section className="page-header">
        <div className="container prose">
          <div className="eyebrow">Evidence and limits</div>
          <h1>Measured results and documented boundaries</h1>
          <p className="lead">
            Every figure on this page links directly to its committed record in the
            published specification repository, including negative results that bound the
            scope of each profile.
          </p>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="determinism-heading">
        <div className="container">
          <div className="eyebrow">1 · Independent implementations</div>
          <h2 id="determinism-heading">
            Two independent implementations agree across test suites
          </h2>
          <p className="prose">
            As evidence that the specification can be implemented independently, separate
            Rust and Go implementations with hand-written lexers were built for the first
            two code case-study profiles (Go and Rust) and cross-checked offline across
            synthetic and differential test suites:
          </p>

          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-value">9,887,008</div>
              <div className="stat-label">
                I1 differential extraction cases agreeing (0 divergence classes, 163/163
                vectors, 60,000 determinism checks)
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-value">76 / 76</div>
              <div className="stat-label">
                I2 canonical report bodies byte-identical across Rust, Go, and clean-room
                re-implementation
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-value">10,311</div>
              <div className="stat-label">
                I2 differential comparison cases agreeing (plus 5,000/5,000 clean-room
                generated pairs)
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-value">0 files</div>
              <div className="stat-label">
                Written inside git checkouts by default (M2.8 storage boundary; 3/3 atomic
                fault-injection checks per lane)
              </div>
            </div>
          </div>

          <p className="prose">
            <strong>Scope of this check:</strong> implementation agreement measures
            determinism and contract conformance; real-world recall and false-alarm rates
            are measured separately in the held-out evaluation (M3), which has not run
            yet. Its operational false-alarm budget (gate <span className="mono">M3.0</span>
            ) is <strong>1 in 20</strong> per repository search across a 48-repository
            corpus (132 held-out negative searches, met when alarms are at most 6;
            binomial one-sided 95% upper bound is 0.0224 at 0 alarms and 0.0877 at 6
            alarms, where the observed rate is 0.0455). A 1 in 100 test on a larger corpus
            is planned as a follow-up if this passes.{" "}
            <SourceLink path="research/reviews/implementation-merge-i1-review.md" /> ·{" "}
            <SourceLink path="research/reviews/implementation-merge-i2-review.md" /> ·{" "}
            <SourceLink path="ROADMAP.md" anchor="owner-decisions-2026-11-23" /> ·{" "}
            <SourceLink path="research/lanes/11-report-audit.md" />
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="prior-art-heading">
        <div className="container prose">
          <div className="eyebrow">2 · Matching baseline</div>
          <h2 id="prior-art-heading">
            Token winnowing: locality and edit boundaries
          </h2>
          <p>
            The baseline comparison builds on winnowing (Schleimer, Wilkerson, and Aiken,
            SIGMOD 2003), pairing established fingerprinting prior art with a
            deterministic, cross-implementation evidence contract.
          </p>
          <p>
            At the shipped experimental parameters (<span className="mono">k = 5</span>,{" "}
            <span className="mono">window = 4</span>,{" "}
            <span className="mono">minRegionDistinctHashes = 2</span>), locality covers any
            unchanged run of at least 8 tokens (<span className="mono">k + w − 1</span>),
            the smallest reportable match is 6 tokens, and a merged match across two
            windows needs 12 unchanged tokens. Inserting a single token every{" "}
            <span className="mono">k − 1</span> tokens breaks every 5-token window, so
            light rewriting, statement reordering, refactoring, paraphrasing, and
            cross-language ports fall outside k-gram matching.{" "}
            <SourceLink path="research/lanes/11-report-audit.md" /> ·{" "}
            <SourceLink path="spec/extraction.md" anchor="8-winnowing-selection" />
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="code-prose-marks-heading">
        <div className="container">
          <div className="eyebrow">3 · Embedded marks in code and prose</div>
          <h2 id="code-prose-marks-heading">
            Code and prose carrier measurements
          </h2>

          <div className="grid-2" style={{ marginTop: "1rem" }}>
            <div className="card">
              <h3>Source code carriers (Go &amp; Rust)</h3>
              <p>
                In synthetic experiments, deliberate carrier insertions recovered{" "}
                <strong>55/55</strong> nonzero states per language after{" "}
                <span className="mono">gofmt</span> and{" "}
                <span className="mono">rustfmt</span> (62/62 including 7 already-zero
                states). Under cheap canonicalization, all <strong>55/55</strong> nonzero
                states per language reset to zero, and same-context signal transfers still
                decoded.
              </p>
              <p>
                A four-repository source census (<span className="mono">go-spew</span>: 8
                files, 63 functions; <span className="mono">hey</span>: 6 files, 32
                functions; <span className="mono">itoa</span>: 2 files, 16 lexical{" "}
                <span className="mono">fn</span>; <span className="mono">hexyl</span>: 5
                files, 75 lexical <span className="mono">fn</span>) established zero safe
                eligible embedding sites under those narrow patterns. No code mark carrier
                is selected.
              </p>
              <p style={{ marginBottom: 0 }}>
                <SourceLink path="research/experiment-checkpoint.md" /> ·{" "}
                <SourceLink path="research/fragment-policy-checkpoint.md" /> ·{" "}
                <SourceLink path="research/public-census-checkpoint.md" />
              </p>
            </div>

            <div className="card">
              <h3>Existing prose carriers</h3>
              <p>
                In the text evidence review, homoglyph and zero-width Unicode carriers
                were erased across every tested language by a single published canonical
                fold (<span className="mono">NFKC</span> +{" "}
                <span className="mono">UTS #39</span> skeleton + deleting{" "}
                <span className="mono">Default_Ignorable_Code_Point</span>).
              </p>
              <p>
                Post-hoc lexical rewriting (AWT) modifies the author&apos;s wording,
                carries roughly 4 raw bits per 80 words (about 50 raw bits per 1,000 words
                before framing), and had no licence file at its pinned commit. No embedded
                text mark was selected to test.
              </p>
              <p style={{ marginBottom: 0 }}>
                <SourceLink path="research/lanes/09-evidence-review.md" /> ·{" "}
                <SourceLink path="ROADMAP.md" anchor="later-profiles-and-sequence" />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="image-fp-heading">
        <div className="container">
          <div className="eyebrow">4 · Still images — fingerprints</div>
          <h2 id="image-fp-heading">
            Synthetic image fingerprint conformance check (
            <span className="mono">e-img-f-2</span>)
          </h2>
          <p className="prose">
            Two perceptual hashes — PDQ (256-bit, threshold 31, abstain at quality ≤ 49)
            and ISCC Image-Code v0 (64-bit, threshold 7) — were run offline on 200 seeded
            synthetic images (100 enrolled, 100 negatives, 12 edits = 1,300 queries). Two
            full runs were byte-identical, and all 30/30 reference vector files and
            1,400/1,400 port-vs-vendor extractions agreed. Enrolment was 98/100 for PDQ (2
            abstained for low quality) and 100/100 for ISCC.
          </p>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Synthetic edit / check</th>
                  <th scope="col">PDQ</th>
                  <th scope="col">ISCC Image-Code v0</th>
                </tr>
              </thead>
              <tbody>
                {IMAGE_FP_ROWS.map((row) => (
                  <tr key={row.edit}>
                    <td>{row.edit}</td>
                    <td className="num">{row.pdq}</td>
                    <td className="num">{row.iscc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="prose">
            <strong>Scope of this check:</strong> procedural synthetic shapes test
            contract conformance rather than natural photographs or real-world
            false-match rates. On these synthetic edits, deep crops missed for both hashes
            and the screenshot transform returned 0/100 for PDQ.{" "}
            <SourceLink path="research/experiments/image-fingerprint/results/e-img-f-2/RESULTS.md" />
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="image-mark-heading">
        <div className="container prose">
          <div className="eyebrow">5 · Still images — embedded marks</div>
          <h2 id="image-mark-heading">
            Image watermarks as a finding aid (<span className="mono">e-img-m-2</span>)
          </h2>
          <p>
            Protocol <span className="mono">e-img-m-2</span> specifies an offline study of
            two post-hoc neural image marks — TrustMark-Q (tested on its 61 direct HMAC
            data bits, threshold 49) and PixelSeal (256 payload bits, threshold 167), with
            a 38.0 dB PSNR quality floor. In the published specification checkout, the
            protocol is frozen and reviewed (22 unit tests passing), and the full measured
            run is not yet committed.
          </p>
          <p>
            Because both encoders and decoders are public and unkeyed, anyone can decode a
            marked image&apos;s raw bits and re-embed them into another image without the
            key. In the protocol review&apos;s confirmation smoke dry run (3 smoke images,
            not a full measured run), keyless decode-and-re-embed was accepted{" "}
            <strong>3/3</strong> for TrustMark-Q (61/61 bits) and <strong>3/3</strong> for
            PixelSeal (256/256 bits).
          </p>
          <p>
            In the external literature reviewed in lane 10, the author-run TetherMark
            preprint (240 attempts per attack) reported a TrustMark-P baseline accepting{" "}
            <strong>80.00%</strong> of WmForger and <strong>90.83%</strong> of WMCopier
            forgery attempts, and benchmark X1 measured blind BCH decodes on{" "}
            <strong>5.9–15.3%</strong> of unmarked images. An embedded image mark
            therefore acts as a locator for a private catalogue entry, not as evidence of
            origin.{" "}
            <SourceLink path="research/drafts/image-mark-protocol.md" /> ·{" "}
            <SourceLink path="research/drafts/image-mark-use-case.md" /> ·{" "}
            <SourceLink path="research/reviews/image-mark-protocol-review.md" /> ·{" "}
            <SourceLink path="research/lanes/10-evidence-review.md" />
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="signing-heading">
        <div className="container prose">
          <div className="eyebrow">6 · Cryptographic envelopes and commitments</div>
          <h2 id="signing-heading">
            DSSE and commitment interoperability (M4.1–M4.2)
          </h2>
          <p>
            Offline interoperability harnesses passed <strong>66</strong> DSSE outcomes
            across all four Go/Rust producer/consumer pairs on the 762-byte example
            statement (gate <span className="mono">M4.1</span>) and <strong>50</strong>{" "}
            native commitment outcomes across independent Go and Rust implementations
            (126 total signing-policy outcomes; gate <span className="mono">M4.2</span>).
          </p>
          <p>
            Production signing, negative cryptographic vectors, trust policies, and
            optional RFC 3161 timestamp adapters are planned under gates{" "}
            <span className="mono">M4.3–M4.6</span>. A signature authenticates the record
            bytes separately from any similarity comparison.{" "}
            <SourceLink path="research/experiment-checkpoint.md" /> ·{" "}
            <SourceLink path="research/fragment-policy-checkpoint.md" /> ·{" "}
            <SourceLink path="spec/attestations.md" />
          </p>

          <div className="actions">
            <Link href="/roadmap" className="btn btn-primary">
              See all roadmap gates
            </Link>
            <a href={DOCS_URL} className="btn btn-secondary" rel="noopener noreferrer">
              Read full evaluation notes on docs.traceweave.org ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
