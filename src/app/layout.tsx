import "@fontsource/archivo/800.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SPEC_DRAFT_VERSION } from "@/data/facts";
import { DOCS_URL, SITE_URL, SPEC_REPO_URL } from "@/lib/sources";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#F9F9F7",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Traceweave — Open specification for checkable content reuse evidence",
    template: "%s — Traceweave",
  },
  description:
    "Traceweave is an open specification for recognising your own work when it turns up somewhere else, and for producing evidence of the match that anyone can re-run and check.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Traceweave",
    title: "Traceweave — Open specification for checkable content reuse evidence",
    description:
      "Traceweave is an open specification for recognising your own work when it turns up somewhere else, and for producing evidence of the match that anyone can re-run and check.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Traceweave — Open specification for checkable content reuse evidence",
    description:
      "Traceweave is an open specification for recognising your own work when it turns up somewhere else, and for producing evidence of the match that anyone can re-run and check.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("traceweave-theme");if(t==="dark"){document.documentElement.setAttribute("data-theme","dark");}}catch(e){}})();`;

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Traceweave",
      url: SITE_URL,
      description:
        "Traceweave is an open specification for recognising your own work when it turns up somewhere else, and for producing evidence of the match that anyone can re-run and check.",
      inLanguage: "en",
    },
    {
      "@type": "SoftwareSourceCode",
      name: "Traceweave Specification",
      version: SPEC_DRAFT_VERSION,
      codeRepository: SPEC_REPO_URL,
      url: SITE_URL,
      description:
        "Traceweave is an open specification for recognising your own work when it turns up somewhere else, and for producing evidence of the match that anyone can re-run and check. Designed to cover source code, writing, images and audio on one shared evidence format, with Go and Rust as the first two case studies.",
      programmingLanguage: ["Rust", "Go"],
      license: [
        "https://creativecommons.org/licenses/by/4.0/",
        "https://www.apache.org/licenses/LICENSE-2.0",
      ],
      sameAs: [DOCS_URL, SPEC_REPO_URL],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
