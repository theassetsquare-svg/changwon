import { SITE } from "@/lib/site";

export default function MobileCallBar() {
  return (
    <a
      href={SITE.kakaoHref}
      className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-2 bg-[#FEE500] py-4 text-base font-extrabold text-[#3C1E1E] shadow-[0_-8px_24px_-4px_rgba(0,0,0,0.4)]"
      aria-label="카카오톡 광고문의 besta12"
    >
      <span aria-hidden className="text-lg">💬</span>
      <span>광고문의 카카오톡</span>
      <span className="opacity-70">· ID: {SITE.kakao}</span>
    </a>
  );
}
