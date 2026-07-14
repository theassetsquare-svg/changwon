import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} 공식 사이트 · 카카오톡 $`;
export const size = { width: 1200, height: 1200 };
export const contentType = "image/png";

export default async function Image() {
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
          background: "linear-gradient(135deg, #0A0A0F 0%, #1F2937 100%)",
          color: "#FFFFFF",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 36,
            color: "#FCD34D",
            letterSpacing: 6,
            marginBottom: 24,
          }}
        >
          CHANGWON · OFFICIAL
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: "#FCD34D",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 64,
            fontWeight: 700,
            color: "#FFFFFF",
          }}
        >
          카카오톡 문의
        </div>
        <div
          style={{
            marginTop: 56,
            fontSize: 120,
            fontWeight: 900,
            color: "#FEE500",
            letterSpacing: 2,
          }}
        >
          {`💬 $`}
        </div>
        <div
          style={{
            marginTop: 56,
            fontSize: 28,
            color: "#9CA3AF",
          }}
        >
          19세 이상 합법 영업장 · 신분증 확인
        </div>
      </div>
    ),
    { ...size }
  );
}
