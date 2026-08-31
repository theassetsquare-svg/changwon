import Link from "next/link";
import { NAV, PAGE_META } from "@/lib/site";

export default function RelatedPages({ exclude = [] }: { exclude?: string[] }) {
  const items = NAV.filter(
    (n) => n.href !== "/" && !exclude.includes(n.href)
  ).slice(0, 6);
  /* ★ 2026-08-30 — 다른 쪽으로 보내는 링크 묶음이라 nav 가 맞는 태그다.
     section 으로 두면 본문으로 세어져 쪽마다 같은 줄이 겹치는 것으로 잡힌다. */
  return (
    <nav aria-label="이 페이지와 함께 보는 안내" className="mt-12 border-t border-line pt-8">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
        이 페이지 본 사람들이 다음으로 본 페이지
      </h2>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((n) => (
          <li key={n.href}>
            <Link
              href={n.href}
              className="block rounded-xl border border-line bg-elev p-4 transition hover:border-gold hover:bg-elev2"
            >
              <p className="text-sm font-bold text-gold">{n.label}</p>
              <p className="mt-1 text-xs text-gray-400">
                {PAGE_META[n.href]?.hook ?? ""}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
