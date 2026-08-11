import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

// 네이버/구글/카카오 공유 썸네일 — 1:1 (1200x1200)
export const alt = `창원룰루랄라 · ${SITE.lotto} ${SITE.lottoPhone}`;
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
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#FCD34D",
            letterSpacing: 8,
            marginBottom: 20,
          }}
        >
          CHANGWON · OFFICIAL
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 900,
            color: "#FCD34D",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          창원룰루랄라
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 44,
            paddingLeft: 56,
            paddingRight: 56,
            paddingTop: 16,
            paddingBottom: 22,
            borderRadius: 999,
            background: "#FCD34D",
            color: "#0A0A0F",
            fontSize: 128,
            fontWeight: 900,
            letterSpacing: 4,
          }}
        >
          로또
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 132,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: 6,
          }}
        >
          010 7528 4936
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 40,
            fontWeight: 700,
            color: "#FCD34D",
          }}
        >
          창원룰루랄라 로또 010 7528 4936
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 28,
            color: "#9CA3AF",
          }}
        >
          27세 이상 출입 가능한 합법 영업장 · 신분증 확인
        </div>
      </div>
    ),
    { ...size }
  );
}
