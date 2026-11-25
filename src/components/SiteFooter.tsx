import Link from "next/link";
import { ExternalArrowIcon } from "@/components/Button";
import { RichText, resolveHref } from "@/components/RichText";
import { TraceweaveMark } from "@/components/TraceweaveMark";
import type { SiteFooterContent } from "@/lib/content";

export function SiteFooter({ content }: { content: SiteFooterContent }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: "0.65rem" }}>
              <TraceweaveMark size={22} />
              <span>{content.brandName}</span>
            </div>
            <p style={{ marginBottom: "0.6rem", maxWidth: "40ch" }}>
              <RichText text={content.statusLine} />
            </p>
            <p style={{ marginBottom: 0, maxWidth: "40ch", fontSize: "0.84rem" }}>
              <RichText text={content.summary} />
            </p>
          </div>

          <div>
            <div className="footer-heading">{content.pagesHeading}</div>
            <ul className="footer-links">
              {content.pageLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-heading">{content.sourcesHeading}</div>
            <ul className="footer-links">
              {content.sourceLinks.map((item) => {
                const { url, external, mailto } = resolveHref(item.href);
                if (mailto) {
                  return (
                    <li key={item.href}>
                      <a href={url}>{item.label}</a>
                    </li>
                  );
                }
                if (external) {
                  return (
                    <li key={item.href}>
                      <a href={url} className="footer-external-link" rel="noopener noreferrer">
                        <span>{item.label}</span>
                        <ExternalArrowIcon size={14} className="inline-arrow" />
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <Link href={url}>{item.label}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-credit">
            <a
              href={content.maintainerHref}
              rel="noopener noreferrer"
              className="seatbelt-wordmark"
            >
              {content.maintainerName}
            </a>
            <span>{content.copyrightLine}</span>
          </div>
          <div>
            <RichText text={content.licenceLine} />
          </div>
        </div>
      </div>
    </footer>
  );
}
