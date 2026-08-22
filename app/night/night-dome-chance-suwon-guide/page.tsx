import type { Metadata, Viewport } from "next";
import AdNightPage from "@/components/AdNightPage";
import { AD_BY_SLUG } from "@/lib/adnight-data";
import { adMetadata, adViewport } from "@/lib/adnight-meta";

const VENUE = AD_BY_SLUG["night-dome-chance-suwon-guide"];

export const metadata: Metadata = adMetadata(VENUE);
export const viewport: Viewport = adViewport;

export default function Page() {
  return <AdNightPage venue={VENUE} />;
}
