import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SISU Ventures — We acquire, we build.";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: "linear-gradient(180deg, #0B0420 0%, #160830 60%, #0B0420 100%)",
          color: "#F5EFFF",
          fontFamily: "Inter, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -100,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, #00E5C7 0%, transparent 65%)",
            opacity: 0.45,
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -100,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, #FF3DA5 0%, transparent 65%)",
            opacity: 0.35,
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.02em",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "conic-gradient(from 0deg, #00E5C7, #7B2FFF, #FF3DA5, #00E5C7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#0B0420" }} />
          </div>
          SISU Ventures
        </div>
        <div
          style={{
            fontSize: 124,
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>We acquire,</span>
          <span
            style={{
              backgroundImage: "linear-gradient(95deg, #00E5C7, #7B2FFF, #FF3DA5, #FFD93D)",
              backgroundClip: "text",
              color: "transparent",
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            we build.
          </span>
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 26,
            color: "rgba(245,239,255,0.78)",
            maxWidth: 900,
            lineHeight: 1.45,
          }}
        >
          A private investment company. Real estate, equities, and operating companies.
        </div>
      </div>
    ),
    size
  );
}
