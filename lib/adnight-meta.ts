import type { Metadata, Viewport } from "next";
import type { AdVenue } from "./adnight";
import { nightPath } from "./adnight";
import { thumb } from "./og";
import { SITE } from "./site";

/**
 * [12] 필수1 — viewport-fit=cover.
 * 루트 레이아웃 viewport 에는 cover 가 없다. 기존 파일을 수정하지 않기 위해
 * 광고 페이지에서만 viewport 를 다시 내보내 cover 를 얹는다.
 */
export const adViewport: Viewport = {
  themeColor: "#0A0A0F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export function adMetadata(v: AdVenue): Metadata {
  const path = nightPath(v.slug);
  const url = `${SITE.url}${path}`;
  // 썸네일 파일 경로는 lib/og.ts 한 곳에서만 계산한다 (본문 <img> 와 동일 보장)
  const t = thumb({ pathname: path, alt: v.ogAlt, v: (v as any).ogV });
  const image = t.url;

  return {
    title: v.title,
    description: v.description,
    /* ★ 2026-09-02 — 같은 가게이름이 두 번 들어가 keywords 메타가 낱말 나열처럼 보였다.
       네이버 가이드가 키워드 반복을 어뷰징으로 본다(AI 검토관 C2 지적). 겹치는 것을 지운다. */
    keywords: [...new Set([v.keyword, v.spaced, v.regionType])],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url,
      siteName: SITE.name,
      title: v.title,
      description: v.description,
      images: t.images,
    },
    twitter: {
      card: "summary",
      title: v.title,
      description: v.description,
      images: [image],
    },
    // 루트 레이아웃의 other 를 통째로 덮어쓴다 (연령 축약 표기 상속 차단)
    /* ★★ 2026-09-02 — 여기서 좌표·지역 태그를 덮어쓰지 않아, 루트 레이아웃의
       **창원 값**이 남의 가게 쪽에 그대로 실려 나갔다. 실측(g 전 club 쪽):
         geo.position 35.2237;128.681 (창원) · ICBM 같은 값 · geo.region KR-48(경남)
         og:locality 창원시 · og:region 경상남도
       대전세븐나이트 쪽에 창원 좌표가 붙으면 네이버는 지역 신호를 서로 어긋나게 읽고,
       "가게이름 검색 상위노출" 목표와 정면으로 어긋난다. C7(허위 표시) 위험이기도 하다.
       AI 검토관이 잡아 준 것이다.
       가게별 좌표는 확인된 값이 없으므로 **지어내지 않고 태그 자체를 뺀다.**
       창원룰루랄라나이트 자기 쪽에서만 원래 값을 그대로 둔다. */
    other: {
      ...t.other,
      /* Next.js 는 layout 의 other 와 page 의 other 를 **합친다**(덮어쓰지 않는다).
         그래서 빼려면 같은 열쇠에 null 을 줘야 한다. 실측으로 확인했다. */
      ...(v.slug === "changwon-lululala-night"
        ? {
          "geo.region": "KR-48",
          "geo.position": `${SITE.geo.latitude};${SITE.geo.longitude}`,
          ICBM: `${SITE.geo.latitude}, ${SITE.geo.longitude}`,
          "og:locality": SITE.city,
          "og:region": SITE.region,
        }
        : {
          "geo.region": null as unknown as string,
          "geo.position": null as unknown as string,
          ICBM: null as unknown as string,
          "og:locality": null as unknown as string,
          "og:region": null as unknown as string,
          "dc.creator": null as unknown as string,
        }),
      "og:country-name": "대한민국",
      "geo.placename": v.areaLabel,
      "dc.title": v.keyword,
      "dc.subject": v.keyword,
      "dc.language": "ko-KR",
      "twitter:label1": v.phone ? "예약 문의" : "예약 담당자",
      "twitter:data1": v.phone ?? "등록 전",
      "twitter:label2": v.ageFull ? "출입 연령" : "지역",
      "twitter:data2": v.ageFull ?? v.areaLabel,
    },
  };
}

/**
 * [변형 쪽 전용] 색인된 주소에 광고주 페이지를 얹을 때 쓰는 메타.
 *
 *  ★ 2026-09-02 — 왜 따로 두나
 *   ① canonical·og:url 이 기본값(/club/…)으로 남으면 네이버가 이 쪽을 그쪽의 **사본**으로 보고
 *      색인에서 밀어낸다. 반드시 **이 쪽 자신의 주소**여야 한다(주소 한 벌 원칙).
 *   ② 설명문(description)을 /club/ 쪽과 나눠 쓰면 그것만으로 색인이 막힌다
 *      [[description-must-be-unique]]. 그래서 쪽마다 다른 설명문을 받는다.
 *   ③ 제목도 쪽마다 달라야 한다. 가게이름은 그대로 맨 앞에 온다.
 *
 *  사실(주소·번호·연령·썸네일)은 건드리지 않는다 — venue 값 그대로다.
 */
export function adVariantMetadata(
  v: AdVenue,
  이주소: string,
  변형: { title?: string; description?: string },
): Metadata {
  const base = adMetadata(v);
  const url = `${SITE.url}${이주소}`;
  const title = 변형.title ?? v.title;
  const description = 변형.description ?? v.description;
  return {
    ...base,
    title,
    description,
    alternates: { canonical: 이주소 },
    openGraph: { ...base.openGraph, url, title, description },
    twitter: { ...base.twitter, title, description },
  };
}
