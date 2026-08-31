import type { Metadata, Viewport } from "next";
import AdNightPage from "@/components/AdNightPage";
import { AD_BY_SLUG } from "@/lib/adnight-data";
import { adMetadata, adViewport } from "@/lib/adnight-meta";
import { SITE } from "@/lib/site";
import { 변형쪽들 } from "@/lib/variant-pages";

/**
 * ★★ 2026-09-01 대표님 지시로 바꾼 쪽.
 *
 *  "사이트 1개당 창원룰루랄라나이트 페이지 2개만 놔두고,
 *   색인되는 나머지 창원룰루랄라나이트 페이지만 광고주 페이지로 수정하라고."
 *
 *  이 주소(/event)는 **이미 네이버에 색인돼 있다.** 그래서 주소는 그대로 두고
 *  안에 든 내용만 광고주 페이지로 바꿨다. 색인된 주소를 버리지 않기 위해서다.
 *
 *  ★ canonical·og:url 은 반드시 **이 주소(/event)** 여야 한다.
 *    adMetadata 가 기본으로 넣는 /club/…-night 로 두면
 *    네이버가 이 쪽을 그쪽의 사본으로 보고 색인에서 밀어낸다.
 *
 *  ★ AdNightPage 를 쓰는 이유 — 이 컴포넌트가 광고주 신원(이름·번호·고정전화바·관계 고지)을
 *    쪽 단위로 넣어 준다. 사이트 전역 렌더로 남의 번호가 새는 사고를 막는다.
 */
const VENUE = AD_BY_SLUG["ulsan-champion-night"];
const 이주소 = "/event";

const base = adMetadata(VENUE);
export const metadata: Metadata = {
  ...base,
  alternates: { canonical: 이주소 },
  openGraph: { ...base.openGraph, url: `${SITE.url}${이주소}` },
};
export const viewport: Viewport = adViewport;

export default function Page() {
  return <AdNightPage venue={VENUE} 변형={변형쪽들["/event"]} />;
}
