import { ImageResponse } from "next/og";
import { SPEC_DRAFT_VERSION } from "@/data/facts";

export const dynamic = "force-static";
export const alt =
  "Traceweave — Open specification for checkable content reuse evidence";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#111417",
          color: "#eef1f4",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.5"
                y="1.5"
                width="25"
                height="25"
                rx="6"
                stroke="#3c4654"
                strokeWidth="1.5"
              />
              <path
                d="M6.5 9.5H12.5L15.5 18.5H21.5"
                stroke="#52cfc4"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.5 18.5H11.2M16.8 9.5H21.5"
                stroke="#eef1f4"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <circle cx="14" cy="14" r="2.2" fill="#52cfc4" />
            </svg>
            <span style={{ fontSize: "34px", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Traceweave
            </span>
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: "999px",
              background: "#271e10",
              border: "1px solid #6f4c1a",
              color: "#f2c078",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            Experimental draft · {SPEC_DRAFT_VERSION}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "1000px" }}>
          <div
            style={{
              fontSize: "44px",
              fontWeight: 700,
              lineHeight: 1.16,
              letterSpacing: "-0.025em",
              color: "#eef1f4",
            }}
          >
            Traceweave is an open specification for recognising your own work when it turns up
            somewhere else, and for producing evidence of the match that anyone can re-run and
            check.
          </div>
          <div
            style={{
              fontSize: "24px",
              lineHeight: 1.42,
              color: "#b0b9c6",
            }}
          >
            Designed to cover source code, writing, images and audio on one shared evidence
            format. Your content never leaves your machine; only fingerprints are compared.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2a313b",
            paddingTop: "24px",
            fontSize: "22px",
            color: "#95a0b0",
          }}
        >
          <span style={{ color: "#52cfc4", fontWeight: 600 }}>traceweave.org</span>
          <span>Fingerprint → Private catalogue → Checkable report</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
