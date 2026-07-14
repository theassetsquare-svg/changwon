import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)",
          color: "#0A0A0F",
        }}
      >
        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          ㄹ
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          룰루랄라
        </div>
      </div>
    ),
    { ...size }
  );
}
