import { PLACEHOLDERS, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-800 bg-ink/95">
      <div className="mx-auto max-w-6xl space-y-3 px-4 py-8 text-sm text-gray-400">
        <p className="text-base font-bold text-gold">{SITE.name}</p>
        <p>
          매니저 {SITE.manager} ·{" "}
          <a href={SITE.phoneHref} className="text-gold underline">
            {SITE.phone}
          </a>
        </p>
        <p>
          위치: {SITE.city} {SITE.region} · 주소{" "}
          <span className="placeholder">{PLACEHOLDERS.address}</span>
        </p>
        <p>
          사업자번호 <span className="placeholder">{PLACEHOLDERS.businessNumber}</span>
        </p>
        <p className="text-xs text-gray-500">
          19세 이상 합법 영업장 · 입장 시 신분증 확인 · 미성년자 출입 불가
        </p>
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
