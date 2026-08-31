import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

// 네이버/구글/카카오 공유 썸네일 — 1:1 (1200x1200)
// [규칙] 배경은 단색 버건디, 가장 큰 글자는 로또 전화번호.
export const alt = `창원룰루랄라 · ${SITE.lotto} ${SITE.lottoPhoneDash}`;
export const size = { width: 1200, height: 1200 };
export const contentType = "image/png";

const BURGUNDY = "#2A0A12";
const GOLD = "#E8C766";

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
          background: BURGUNDY,
          color: "#FFFFFF",
          padding: 48,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: GOLD,
            letterSpacing: 6,
            marginBottom: 16,
          }}
        >
          창원룰루랄라나이트
        </div>

        <div
          style={{
            display: "flex",
            paddingLeft: 60,
            paddingRight: 60,
            paddingTop: 12,
            paddingBottom: 20,
            background: GOLD,
            color: BURGUNDY,
            fontSize: 132,
            fontWeight: 900,
            letterSpacing: 6,
          }}
        >
          로또
        </div>

        {/* 썸네일에서 가장 큰 요소 = 전화번호 */}
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 148,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: 2,
          }}
        >
          {SITE.lottoPhoneDash}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 38,
            fontWeight: 700,
            color: GOLD,
          }}
        >
          상남동 22-4 지하 3층 · 홀 한 바퀴
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 28,
            color: "#C9AFA8",
          }}
        >
          27세 이상 출입 가능한 합법 영업장 · 신분증 확인
        </div>
      </div>
    ),
    { ...size }
  );
}
