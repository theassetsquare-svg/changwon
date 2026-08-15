import KakaoIdCopy from "./KakaoIdCopy";
import { ADS } from "@/lib/venues";

/**
 * 모바일·PC 공통 하단 고정 바.
 * position: fixed 라서 스크롤해도 위치가 움직이지 않는다.
 * 바 높이만큼은 globals.css의 body padding-bottom으로 확보한다.
 */
export default function StickyCallBar({
  name,
  phone,
  phoneHref,
  kakao = ADS.kakao,
  contextLabel,
}: {
  /** 버튼에 표시할 담당자/브랜드 이름 */
  name: string;
  /** 표시용 전화번호. 없으면 카톡이 주 CTA가 된다 */
  phone?: string;
  phoneHref?: string;
  kakao?: string;
  /** PC에서 바 왼쪽에 표시할 업소명 */
  contextLabel?: string;
}) {
  const hasPhone = Boolean(phone && phoneHref);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/30 bg-bg/95 shadow-[0_-10px_30px_-8px_rgba(0,0,0,0.75)] backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
        {contextLabel ? (
          <p className="hidden shrink-0 text-sm font-extrabold text-gold lg:block">
            {contextLabel}
          </p>
        ) : null}

        {hasPhone ? (
          <a
            href={phoneHref}
            className="callbar-pulse flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-lg font-extrabold text-bg transition active:scale-[0.99] sm:text-xl"
            aria-label={`${name} 전화 ${phone}`}
          >
            <span aria-hidden className="text-xl">
              📞
            </span>
            <span className="truncate">
              {name} {phone}
            </span>
          </a>
        ) : (
          <KakaoIdCopy
            id={kakao}
            label={`${name} 카톡`}
            className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gold px-4 py-3 text-base font-extrabold text-bg transition active:scale-[0.99] sm:text-xl"
          />
        )}

        {hasPhone ? (
          <KakaoIdCopy
            id={kakao}
            label="광고문의 카톡"
            className="hidden shrink-0 rounded-xl border border-gold/40 bg-elev px-4 py-3 text-sm font-bold text-gold transition hover:bg-elev2 sm:block"
          />
        ) : null}
      </div>
    </div>
  );
}
