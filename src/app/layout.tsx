import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SPEC_DRAFT_VERSION } from "@/data/facts";
import { DOCS_URL, SITE_URL, SPEC_REPO_URL } from "@/lib/sources";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#111417" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Traceweave — Open specification for checkable content reuse evidence",
    template: "%s — Traceweave",
  },
  description:
    "An open, non-commercial, independent specification (experimental draft 0.1.0-draft.1) for recognising reused content using private local catalogues and producing deterministic, re-runnable comparison reports.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Traceweave",
    title: "Traceweave — Open specification for checkable content reuse evidence",
    description:
      "Recognise your own content when it reappears elsewhere and produce deterministic comparison evidence someone else can re-run and check. Experimental draft.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Traceweave — Open specification for checkable content reuse evidence",
    description:
      "Open, non-commercial specification for private local content fingerprinting and deterministic comparison reports. Experimental draft.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("traceweave-theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`;

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Traceweave",
      url: SITE_URL,
      description:
        "Main website for the Traceweave experimental open specification for content fingerprinting, private catalogues, and deterministic comparison reports.",
      inLanguage: "en",
    },
    {
      "@type": "SoftwareSourceCode",
      name: "Traceweave Specification",
      version: SPEC_DRAFT_VERSION,
      codeRepository: SPEC_REPO_URL,
      url: SITE_URL,
      description:
        "An open, non-commercial, independent experimental specification for deterministic token-fingerprint extraction, private local catalogues, and byte-identical comparison reports, with two independent reference implementations in Rust and Go.",
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
