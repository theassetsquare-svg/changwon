// 페이지별 썸네일(/og/{슬러그}.png) 단일 소스.
//
// [원칙 1] 한 페이지의 og:image 와 본문 <img> 는 반드시 같은 파일이어야 한다.
//   그래서 경로 계산은 이 파일의 ogSlug() 하나만 쓴다.
// [원칙 2] 절대 URL 로만 내보낸다. 네이버는 상대 경로 og:image 를 잡지 못한다.
// [원칙 3] 파일은 1200x1200 PNG. 생성기는 scripts/og/thumbs.mjs.

import { SITE } from "./site";

/**
 * 라우트 경로 → 썸네일 파일 슬러그.
 *   "/"                       → "home"
 *   "/about"                  → "about"
 *   "/hall"                   → "hall"
 *   "/hall/sillim-grandprix-guide"  → "hall-sillim-grandprix"
 *   "/night/sillim-grandprix" → "night-sillim-grandprix"
 * /hall/x 와 /night/x 는 슬러그가 겹치므로 반드시 접두사를 붙인다.
 */
export function ogSlug(pathname: string): string {
  const p = pathname.replace(/\/+$/, "");
  if (p === "" || p === "/") return "home";
  return p.replace(/^\//, "").replace(/\//g, "-");
}

export const ogFile = (slug: string) => `/og/${slug}.png`;
export const ogAbsolute = (slug: string) => `${SITE.url}${ogFile(slug)}`;

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 1200;
export const OG_TYPE = "image/png";

export type ThumbInput = {
  /** 라우트 경로 */
  pathname: string;
  /** 가게이름 + 페이지 주제. 네이버·트위터 alt 로 그대로 나간다 */
  alt: string;
  /** 썸네일 그림을 바꿨을 때 캐시를 피하려고 붙이는 판 번호. 없으면 기존 파일명 그대로. */
  v?: string;
};

/**
 * 썸네일 관련 메타를 한 번에 만든다.
 * openGraph.images / twitter / other.thumbnail 세 곳에 나눠 넣어야 하므로
 * 조립된 조각을 그대로 돌려준다. 페이지에서 spread 로 합친다.
 */
export function thumb({ pathname, alt, v }: ThumbInput) {
  const url = ogAbsolute(ogSlug(pathname) + (v ?? ""));
  return {
    url,
    /** openGraph.images 에 그대로 넣는다 */
    images: [
      {
        url,
        secureUrl: url,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        type: OG_TYPE,
        alt,
      },
    ],
    /** metadata.other 에 합친다 — 네이버가 읽는 비표준 태그 */
    other: {
      thumbnail: url,
    },
    alt,
  };
}
