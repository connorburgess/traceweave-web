import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt =
  "Traceweave — Open specification for checkable content reuse evidence";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const ogBgDataUri = `data:image/jpeg;base64,${fs
  .readFileSync(path.join(process.cwd(), "public", "imagery", "og-bg-1200x630.jpg"))
  .toString("base64")}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: "#0D1014",
          color: "#F2F4F7",
          fontFamily: "sans-serif",
          borderTop: "4px solid #34E5BC",
          overflow: "hidden",
        }}
      >
        <img
          src={ogBgDataUri}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            maxWidth: "520px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <svg
              width="42"
              height="42"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2H8V4H4V8H2V2ZM24 2H30V8H28V4H24V2ZM2 24H4V28H8V30H2V24ZM28 24H30V30H24V28H28V24Z"
                fill="#F2F4F7"
              />
              <rect x="8" y="8" width="6" height="6" fill="#F2F4F7" />
              <rect x="18" y="18" width="6" height="6" fill="#F2F4F7" />
              <path
                fillRule="evenodd"
                d="M8 18H14V24H8V18ZM10 20V22H12V20H10Z"
                fill="#F2F4F7"
              />
              <rect x="14" y="10" width="4" height="2" fill="#34E5BC" />
              <rect x="18" y="8" width="6" height="6" fill="#34E5BC" />
            </svg>
            <span
              style={{
                fontSize: "30px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "#F2F4F7",
              }}
            >
              Traceweave
            </span>
          </div>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#34E5BC",
              textTransform: "uppercase",
            }}
          >
            OPEN SPECIFICATION
          </span>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "510px",
          }}
        >
          <div
            style={{
              fontSize: "33px",
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: "-0.025em",
              color: "#F2F4F7",
            }}
          >
            Traceweave is an open specification for recognising your own work when it turns up
            somewhere else, and for producing evidence of the match that anyone can re-run and
            check.
          </div>
          <div
            style={{
              fontSize: "19px",
              lineHeight: 1.45,
              color: "#B4BCC8",
            }}
          >
            Source code, writing, images and audio on one shared evidence format. Your content
            never leaves your machine; only fingerprints are compared.
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2E3540",
            paddingTop: "18px",
            fontSize: "16px",
            color: "#B4BCC8",
            maxWidth: "560px",
          }}
        >
          <span style={{ color: "#34E5BC", fontWeight: 600 }}>traceweave.org</span>
          <span>Fingerprint · Private catalogue · Checkable report</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
