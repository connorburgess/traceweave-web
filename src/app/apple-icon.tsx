import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0D1014",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="140"
          height="140"
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
      </div>
    ),
    { ...size }
  );
}
