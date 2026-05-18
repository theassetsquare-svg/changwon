import { SITE } from "@/lib/site";

export default function MobileCallBar() {
  return (
    <a
      href={SITE.phoneHref}
      className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-2 bg-gold py-4 text-base font-extrabold text-bg shadow-2xl md:hidden"
      aria-label={`${SITE.manager} 매니저 전화 ${SITE.phone}`}
    >
      <span aria-hidden>📞</span>
      <span>지금 짱구한테 전화하기</span>
      <span className="text-bg/80">· {SITE.phone}</span>
    </a>
  );
}
