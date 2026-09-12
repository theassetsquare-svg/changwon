import Link from "next/link";
import { NAV } from "@/lib/site";

/** 머리글에 쓰는 사이트 이름 — 지역 안내만 담고 가게이름은 담지 않는다 (설계도 5장 머리글 규칙). */
const CHROME_NAME = "창원 나이트 안내";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        {/* 2026-09-13 머리글 규칙(설계도 5장) — 사이트 머리글에는 특정 가게이름을 두지 않는다.
            사이트 이름과 지역 안내만 둔다. 가게이름은 그 가게 페이지 본문 안에서만 쓴다.
            왜 — 이 저장소가 여러 가게 쪽을 담는데 머리글이 한 가게로 고정돼 있었다.
            2026-09-13 실측: 86쪽 중 69쪽 머리글이 「창원 룰루랄라 나이트」, 그중 67쪽은 제목이 다른 가게였다.
            손님은 답십리미라클나이트 쪽을 열고 머리글에서 다른 가게를 보고, 메뉴를 누르면 남의 가게로 갔다.
            SITE.name 은 그대로 둔다 — 제목·본문·JSON-LD 는 건드리지 않는다. 머리글 표기만 바꾼다. */}
        <Link
          href="/"
          className="text-base font-extrabold text-gold sm:text-lg"
          aria-label={`${CHROME_NAME} 홈으로`}
        >
          {CHROME_NAME}
        </Link>
      </div>
      <nav
        aria-label="주요 페이지"
        className="mx-auto max-w-6xl overflow-x-auto px-4 pb-2"
      >
        <ul className="flex gap-2 whitespace-nowrap text-sm text-gray-300">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-full border border-transparent px-3 py-1.5 transition hover:border-gold/40 hover:bg-elev hover:text-gold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
