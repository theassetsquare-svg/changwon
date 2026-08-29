import type { Metadata, Viewport } from "next";
import HallPage from "@/components/HallPage";
import { HALL_BY_SLUG, HALL_VENUES } from "@/lib/hall-data";
import { HALL_URL_MAP, HALL_SLUG_BY_URL } from "@/lib/hall";
import { hallMetadata, hallViewport } from "@/lib/hall-meta";

export const viewport: Viewport = hallViewport;

export function generateStaticParams() {
  return HALL_VENUES.map((v) => ({ venue: HALL_URL_MAP[v.slug] ?? v.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { venue: string };
}): Metadata {
  const v = HALL_BY_SLUG[HALL_SLUG_BY_URL[params.venue] ?? params.venue];
  return v ? hallMetadata(v) : {};
}

export default function Page({ params }: { params: { venue: string } }) {
  const v = HALL_BY_SLUG[HALL_SLUG_BY_URL[params.venue] ?? params.venue];
  if (!v) return null;
  return <HallPage venue={v} />;
}
