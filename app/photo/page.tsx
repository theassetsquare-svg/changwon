import type { Metadata, Viewport } from "next";
import AdNightPage from "@/components/AdNightPage";
import { AD_BY_SLUG } from "@/lib/adnight-data";
import { adVariantMetadata, adViewport } from "@/lib/adnight-meta";
import { 변형쪽들 } from "@/lib/variant-pages";

/**
 * ★★ 2026-09-03 대표님 지시로 바꾼 쪽 — 파주야당스카이돔나이트 광고주 페이지.
 *
 *  주소(/photo/)는 **그대로 두고** 안에 든 내용만 바꿨다.
 *  네이버에 색인된 주소는 자산이라 버리지 않는다 · 301 리디렉션도 걸지 않는다.
 *
 *  ★ canonical·og:url·설명문은 반드시 **이 쪽 자신의 것**이어야 한다.
 *    기본값(/club/…)으로 두면 네이버가 이 쪽을 그쪽의 사본으로 보고 밀어낸다.
 *  ★ AdNightPage 가 신원(이름·번호·고정 전화바·관계 고지·JSON-LD)을 쪽 단위로 넣는다.
 *    사이트 전역 렌더로 남의 번호가 새는 사고를 막는다.
 *  ★ 각도 「준비물」 — 이 사이트의 다른 광고주 쪽과 겹치지 않게 배정했다.
 */
const VENUE = AD_BY_SLUG["paju-yadang-skydome-night"];
const 이주소 = "/photo";
const 변형 = 변형쪽들["/photo"];

export const metadata: Metadata = adVariantMetadata(VENUE, 이주소, 변형);
export const viewport: Viewport = adViewport;

export default function Page() {
  return <AdNightPage venue={VENUE} 변형={변형} path={이주소} />;
}
