import Link from "next/link";
import { NAV, SITE } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/"
          className="text-base font-extrabold text-gold sm:text-lg"
          aria-label={`${SITE.name} 홈으로`}
        >
          {SITE.name}
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-3 py-1.5 text-sm font-bold text-gold ring-1 ring-gold/30"
        >
          문의
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
