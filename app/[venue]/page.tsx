import type { Metadata, Viewport } from "next";
import HallPage from "@/components/HallPage";
import { HALL_BY_SLUG, HALL_VENUES } from "@/lib/hall-data";
import { hallMetadata, hallViewport } from "@/lib/hall-meta";
import { HALL_KEEP_OLD, HALL_URL_MAP, HALL_SLUG_BY_URL } from "@/lib/hall";

/**
 * ★ 2026-08-26 대표님 확정 — 가게 페이지 주소는 메인주소 바로 뒤에 가게이름.
 *   네이버에 이미 나오는 것만 옛 /hall/ 경로에 남고, 나머지는 여기서 만든다.
 *   Next.js 는 고정 라우트를 동적 라우트보다 먼저 찾으므로
 *   /about, /cheongdam-night 같은 기존 폴더와 부딪히지 않는다.
 */
export const viewport: Viewport = hallViewport;

export function generateStaticParams() {
  return HALL_VENUES
    .filter((v) => !HALL_KEEP_OLD.has(v.slug))
    .map((v) => ({ venue: HALL_URL_MAP[v.slug] ?? v.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { venue: string };
}): Metadata {
  const slug = HALL_SLUG_BY_URL[params.venue] ?? params.venue;
  const v = HALL_BY_SLUG[slug];
  return v ? hallMetadata(v) : {};
}

export default function Page({ params }: { params: { venue: string } }) {
  const slug = HALL_SLUG_BY_URL[params.venue] ?? params.venue;
  const v = HALL_BY_SLUG[slug];
  if (!v) return null;
  return <HallPage venue={v} />;
}
