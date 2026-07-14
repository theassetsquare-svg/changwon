import { PLACEHOLDERS, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-elev">
      <div className="mx-auto max-w-6xl space-y-3 px-4 py-10 text-sm text-gray-400">
        <p className="text-base font-extrabold text-gold">{SITE.name}</p>
        <p>
          카카오톡{" "}
          <a href={SITE.kakaoHref} className="font-bold text-[#c9a800] underline">
            {SITE.kakao}
          </a>
        </p>
        <p>
          {SITE.region} {SITE.city} {PLACEHOLDERS.address}
        </p>
        <p className="text-xs text-gray-500">도로명 — {PLACEHOLDERS.addressRoad}</p>
        <p>
          사업자번호 <span className="placeholder">{PLACEHOLDERS.businessNumber}</span>
        </p>
        <p className="pt-2 text-xs text-gray-500">
          19세 이상 합법 영업장 · 입장 시 신분증 확인 · 미성년자 출입 불가
        </p>
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
