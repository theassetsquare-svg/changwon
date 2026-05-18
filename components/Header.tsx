import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import CallButton from "./CallButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-base font-extrabold text-gold sm:text-lg">
          {SITE.name}
        </Link>
        <div className="hidden sm:block">
          <CallButton size="sm" />
        </div>
        <a
          href={SITE.phoneHref}
          className="sm:hidden text-sm font-bold text-gold"
          aria-label="전화"
        >
          📞 {SITE.phone}
        </a>
      </div>
      <nav className="mx-auto max-w-6xl overflow-x-auto px-4 pb-2">
        <ul className="flex gap-3 whitespace-nowrap text-sm text-gray-300">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-gold">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
