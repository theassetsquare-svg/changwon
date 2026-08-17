import type { Metadata, Viewport } from "next";
import HallPage from "@/components/HallPage";
import { HALL_BY_SLUG, HALL_VENUES } from "@/lib/hall-data";
import { hallMetadata, hallViewport } from "@/lib/hall-meta";

export const viewport: Viewport = hallViewport;

export function generateStaticParams() {
  return HALL_VENUES.map((v) => ({ venue: v.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { venue: string };
}): Metadata {
  const v = HALL_BY_SLUG[params.venue];
  return v ? hallMetadata(v) : {};
}

export default function Page({ params }: { params: { venue: string } }) {
  const v = HALL_BY_SLUG[params.venue];
  if (!v) return null;
  return <HallPage venue={v} />;
}
