import type { Metadata, Viewport } from "next";
import type { AdVenue } from "./adnight";
import { nightPath } from "./adnight";
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
  const image = `${SITE.url}/og/${v.slug}-og.png`;

  return {
    title: v.title,
    description: v.description,
    keywords: [v.keyword, v.spaced, v.regionType, `${v.keyword} 예약`],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url,
      siteName: SITE.name,
      title: v.title,
      description: v.description,
      images: [{ url: image, width: 1200, height: 1200, alt: v.ogAlt }],
    },
    twitter: {
      card: "summary",
      title: v.title,
      description: v.description,
      images: [image],
    },
    // 루트 레이아웃의 other 를 통째로 덮어쓴다 (연령 축약 표기 상속 차단)
    other: {
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
