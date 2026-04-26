import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "conic-gradient(from 0deg, #00E5C7, #7B2FFF, #FF3DA5, #00E5C7)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#0B0420" }} />
      </div>
    ),
    size
  );
}
