import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import CallButton from "./CallButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-800 bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-extrabold text-gold">
          {SITE.name}
        </Link>
        <CallButton size="sm" />
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
