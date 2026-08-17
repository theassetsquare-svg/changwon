import type { Metadata, Viewport } from "next";
import type { HallVenue } from "./hall";
import { hallPath } from "./hall";
import { OG_IMAGE, SITE } from "./site";

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
      // 홀 페이지는 공통 썸네일을 쓰되 alt 는 해당 홀 문구로 바꾼다.
      // (공통 alt 에는 창원 로또 번호가 들어 있어 다른 업소 페이지에 맞지 않는다)
      images: OG_IMAGE.map((img) => ({ ...img, alt: v.ogAlt })),
    },
    twitter: {
      card: "summary",
      title: v.title,
      description: v.description,
    },
    // 루트 레이아웃의 other 를 통째로 덮어쓴다 (창원 전용 메타 상속 차단)
    other: {
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
