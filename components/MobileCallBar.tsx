import { SITE } from "@/lib/site";

export default function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex shadow-[0_-8px_24px_-4px_rgba(0,0,0,0.4)]">
      <a
        href={SITE.kakaoHref}
        className="flex flex-1 items-center justify-center gap-2 bg-[#FEE500] py-4 text-base font-extrabold text-[#3C1E1E]"
        aria-label="카카오톡 광고문의 besta12"
      >
        <span aria-hidden className="text-lg">💬</span>
        <span>광고문의 카카오톡</span>
        <span className="opacity-70">· ID: {SITE.kakao}</span>
      </a>
      <a
        href={SITE.lottoPhoneHref}
        className="flex flex-1 items-center justify-center gap-2 bg-gold py-4 text-base font-extrabold text-bg"
        aria-label={`${SITE.lotto} 전화 ${SITE.lottoPhone}`}
      >
        <span aria-hidden className="text-lg">📞</span>
        <span>{SITE.lotto}</span>
        <span>{SITE.lottoPhone}</span>
      </a>
    </div>
  );
}
