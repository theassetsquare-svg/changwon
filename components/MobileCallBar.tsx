import { SITE } from "@/lib/site";

export default function MobileCallBar() {
  return (
    <a
      href={SITE.lottoPhoneHref}
      className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-3 bg-gold py-5 text-xl font-extrabold text-bg shadow-[0_-8px_24px_-4px_rgba(0,0,0,0.4)] sm:text-2xl"
      aria-label={`${SITE.lotto} 전화 ${SITE.lottoPhone}`}
    >
      <span aria-hidden className="text-2xl">📞</span>
      <span>{SITE.lotto}</span>
      <span>{SITE.lottoPhone}</span>
    </a>
  );
}
