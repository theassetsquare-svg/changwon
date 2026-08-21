import type { Metadata, Viewport } from "next";
import type { HallVenue } from "./hall";
import { hallPath } from "./hall";
import { thumb } from "./og";
import { SITE } from "./site";

/** 고정바가 홈 인디케이터에 가리지 않도록 cover 를 얹는다 */
export const hallViewport: Viewport = {
  themeColor: "#2A0A12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export function hallMetadata(v: HallVenue): Metadata {
  const path = hallPath(v.slug);
  const url = `${SITE.url}${path}`;
  const t = thumb({ pathname: path, alt: v.ogAlt, v: (v as any).ogV });

  return {
    title: v.title,
    description: v.description,
    keywords: [
      v.keyword,
      v.spaced,
      v.regionType,
      `${v.keyword} 홀`,
      `${v.keyword} 자리`,
    ],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url,
      siteName: SITE.name,
      title: v.title,
      description: v.description,
      // 홀마다 자기 썸네일 파일을 쓴다. 본문 <img> 와 반드시 같은 파일.
      images: t.images,
    },
    twitter: {
      card: "summary",
      title: v.title,
      description: v.description,
      images: [t.url],
    },
    // 루트 레이아웃의 other 를 통째로 덮어쓴다 (창원 전용 메타 상속 차단)
    other: {
      ...t.other,
      "geo.placename": v.areaLabel,
      "dc.title": v.keyword,
      "dc.subject": `${v.keyword} 홀 구조`,
      "dc.language": "ko-KR",
      "twitter:label1": "홀 유형",
      "twitter:data1": v.hallType,
      "twitter:label2": v.ageFull ? "출입 연령" : "지역",
      "twitter:data2": v.ageFull ?? v.areaLabel,
    },
  };
}
