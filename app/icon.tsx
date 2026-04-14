import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0D0D0D",
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#F2EDE4",
            fontSize: 13,
            fontWeight: 900,
            letterSpacing: "0.08em",
            fontFamily: "sans-serif",
            lineHeight: 1,
          }}
        >
          MN
        </span>
      </div>
    ),
    { ...size }
  );
}
