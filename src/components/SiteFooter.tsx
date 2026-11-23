import Image from "next/image";
import Link from "next/link";
import { TraceweaveMark } from "@/components/TraceweaveMark";
import { SPEC_DRAFT_VERSION } from "@/data/facts";
import { DOCS_URL, SPEC_ISSUES_URL, SPEC_TREE_URL, specUrl } from "@/lib/sources";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: "0.65rem" }}>
              <TraceweaveMark size={22} />
              <span>Traceweave</span>
            </div>
            <p style={{ marginBottom: "0.6rem", maxWidth: "40ch" }}>
              <strong>Experimental draft ({SPEC_DRAFT_VERSION}).</strong>{" "}
              Not a standard and not yet evaluated on real-world data.
            </p>
            <p style={{ marginBottom: 0, maxWidth: "40ch", fontSize: "0.84rem" }}>
              Traceweave is an open specification for recognising your own work when it
              turns up somewhere else, and for producing evidence of the match that anyone
              can re-run and check.
            </p>
          </div>

          <div>
            <div className="footer-heading">Pages</div>
            <ul className="footer-links">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/how-it-works">How it works</Link>
              </li>
              <li>
                <Link href="/coverage">What it covers</Link>
              </li>
              <li>
                <Link href="/evidence">Evidence &amp; limits</Link>
              </li>
              <li>
                <Link href="/roadmap">Roadmap</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-heading">Project &amp; Sources</div>
            <ul className="footer-links">
              <li>
                <a href={DOCS_URL} rel="noopener noreferrer">
                  Documentation site ↗
                </a>
              </li>
              <li>
                <a href={SPEC_TREE_URL} rel="noopener noreferrer">
                  Specification repository ↗
                </a>
              </li>
              <li>
                <a href={specUrl("ROADMAP.md")} rel="noopener noreferrer">
                  Published roadmap ↗
                </a>
              </li>
              <li>
                <a href={SPEC_ISSUES_URL} rel="noopener noreferrer">
                  Report an issue ↗
                </a>
              </li>
              <li>
                <a href={specUrl("SECURITY.md")} rel="noopener noreferrer">
                  Security &amp; private evidence ↗
                </a>
              </li>
              <li>
                <a href={specUrl("LICENSE.md")} rel="noopener noreferrer">
                  Licences ↗
                </a>
              </li>
              <li>
                <a href="mailto:connor@seatbeltlabs.com">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026{" "}
            <a
              href="https://seatbeltlabs.com"
              rel="noopener noreferrer"
              className="seatbelt-link"
            >
              <Image
                src="/brand/seatbelt-labs-mark.svg"
                alt=""
                width={20}
                height={20}
                className="seatbelt-mark"
              />
              <span>Seatbelt Labs</span>
            </a>{" "}
            · Prose licensed under{" "}
            <a href={specUrl("LICENSES/CC-BY-4.0.txt")} rel="noopener noreferrer">
              CC BY 4.0
            </a>
            . Code, schemas, and test vectors licensed under{" "}
            <a href={specUrl("LICENSES/Apache-2.0.txt")} rel="noopener noreferrer">
              Apache-2.0
            </a>
            .
          </div>
          <div>
            Static site · No tracking, cookies, or third-party scripts.
          </div>
        </div>
      </div>
    </footer>
  );
}
