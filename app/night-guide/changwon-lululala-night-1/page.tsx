import type { Metadata, Viewport } from "next";
import AdNightPage from "@/components/AdNightPage";
import { AD_BY_SLUG } from "@/lib/adnight-data";
import { adVariantMetadata, adViewport } from "@/lib/adnight-meta";
import { 변형쪽들 } from "@/lib/variant-pages";

/**
 * ★★ 2026-09-03 대표님 지시로 바꾼 쪽 — 부산아시아드나이트 광고주 페이지.
 *
 *  주소(/night-guide/changwon-lululala-night-1/)는 **그대로 두고** 안에 든 내용만 바꿨다.
 *  네이버에 색인된 주소는 자산이라 버리지 않는다 · 301 리디렉션도 걸지 않는다.
 *
 *  ★ 원래 이 쪽은 `public/night-guide/changwon-lululala-night-1/index.html` 로
 *    **손으로 만든 HTML** 이었다(2026-08-28 색인 실험). 손 HTML 은 게이트·유사도 검사·
 *    썸네일 규칙이 적용되지 않아 관리가 안 된다. 같은 주소를 정식 라우트로 옮기고
 *    public 쪽 파일은 지웠다. 주소·상태코드는 그대로 200 이다.
 *  ★ 각도 「계절」 — 이 사이트의 다른 광고주 쪽과 겹치지 않게 배정했다.
 */
const VENUE = AD_BY_SLUG["busan-asiad-night"];
const 이주소 = "/night-guide/changwon-lululala-night-1";
const 변형 = 변형쪽들["/night-guide/changwon-lululala-night-1"];

export const metadata: Metadata = adVariantMetadata(VENUE, 이주소, 변형);
export const viewport: Viewport = adViewport;

export default function Page() {
  return <AdNightPage venue={VENUE} 변형={변형} path={이주소} />;
}
