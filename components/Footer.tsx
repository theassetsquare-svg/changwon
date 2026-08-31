import Link from "next/link";
import KakaoIdCopy from "./KakaoIdCopy";
import { PLACEHOLDERS, SITE } from "@/lib/site";
import { ADS } from "@/lib/venues";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-elev pb-24">
      {/* 광고 문의 — 전 페이지 공통 노출 */}
      <div className="border-b border-line bg-gold/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-6 text-center sm:flex-row sm:justify-center sm:text-left">
          <p className="text-base font-extrabold text-gold sm:text-lg">
            광고문의 카톡 : {ADS.kakao}
          </p>
          <KakaoIdCopy
            id={ADS.kakao}
            className="rounded-xl bg-gold px-5 py-2.5 text-sm font-extrabold text-bg transition active:scale-[0.99]"
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-3 px-4 py-10 text-sm text-gray-400">
        <p className="text-base font-extrabold text-gold">{SITE.name}</p>
        <p>
          {SITE.region} {SITE.city} {PLACEHOLDERS.address}
        </p>
        <p className="text-xs text-gray-500">도로명 — {PLACEHOLDERS.addressRoad}</p>
        {/* ★ 2026-08-31 — 사업자번호가 아직 확인되지 않아 화면에 "[입력필요]" 가
            그대로 나가고 있었다(g 의 모든 페이지 푸터). 지어내지 않고, 값이 들어올 때까지
            그 줄을 아예 내보내지 않는다. lib/site.ts 의 businessNumber 에 실제 번호를 넣으면
            자동으로 다시 보인다. */}
        {PLACEHOLDERS.businessNumber && !PLACEHOLDERS.businessNumber.includes("입력필요") ? (
          <p>사업자번호 {PLACEHOLDERS.businessNumber}</p>
        ) : null}
        <p className="pt-2">
          <Link href="/night-guide" className="text-gold underline">
            전국 나이트 예약 문의 →
          </Link>
        </p>
        <p>
          <Link href="/hall-guide" className="text-gold underline">
            전국 나이트 홀 도감 40 →
          </Link>
        </p>
        <p className="pt-2 text-xs text-gray-500">
          27세 이상 출입 가능한 합법 영업장 · 입장 시 신분증 확인 · 27세 미만 출입 불가
        </p>
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
