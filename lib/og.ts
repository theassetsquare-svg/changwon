// 페이지별 썸네일(/og/{슬러그}.png) 단일 소스.
//
// [원칙 1] 한 페이지의 og:image 와 본문 <img> 는 반드시 같은 파일이어야 한다.
//   그래서 경로 계산은 이 파일의 ogSlug() 하나만 쓴다.
// [원칙 2] 결코 URL 로만 내보낸다. 네이버는 상대 경로 og:image 를 잡지 못한다.
// [원칙 3] 파일은 1200x1200 PNG. 생성기는 scripts/og/thumbs.mjs.

import { SITE } from "./site";

/**
 * 라우트 경로 → 썸네일 파일 슬러그.
 *   "/"                       → "home"
 *   "/about"                  → "about"
 *   "/hall-guide/"                   → "hall"
 *   "/hall-guide/sillim-grandprix-guide"  → "hall-sillim-grandprix"
 *   "/night-guide/sillim-grandprix" → "night-sillim-grandprix"
 * /hall/x 와 /night/x 는 슬러그가 겹치므로 반드시 접두사를 붙인다.
 */
export function ogSlug(pathname: string): string {
  const p = pathname.replace(/\/+$/, "");
  if (p === "" || p === "/") return "home";
  return p.replace(/^\//, "").replace(/\//g, "-");
}

export const ogFile = (slug: string) => `/og/${slug}.png`;

/* 2026-09-24 대표님 지시 「썸네일 19곳 모든 쪽」 — 쪽마다 고유 카드(전 네트워크 중복 0).
   lib/thumb-map.json(쪽 경로 → 카드 파일·alt)에 있으면 그 카드를 og·본문·JSON-LD 에 같이 쓴다.
   표는 naver-watch/scripts/thumb/apply-thumbs.mjs 가 만든다. 없는 쪽은 옛 ogSlug 파일 그대로. */
import 카드표 from "./thumb-map.json";
type 카드 = { file: string; alt: string; ogOnly?: boolean };
/** JSON-LD 대표 객체(글·쪽·가게)의 image 를 이 쪽 카드로 — 질문·경로 객체는 건드리지 않는다 */
const 대표형 = ["NightClub", "LocalBusiness", "Article", "BlogPosting", "WebPage", "CollectionPage", "Place", "ItemList"];
export function 이미지바꾸기<T>(ld: T, url: string): T {
  const 손 = (o: any): any => {
    if (Array.isArray(o)) return o.map(손);
    if (!o || typeof o !== "object") return o;
    const ty = ([] as string[]).concat(o["@type"] || []);
    const n: any = { ...o };
    if (ty.some((t) => 대표형.includes(t))) n.image = url;
    if (Array.isArray(o["@graph"])) n["@graph"] = o["@graph"].map(손);
    return n;
  };
  return 손(ld);
}
export function 쪽카드(pathname: string): 카드 | undefined {
  const p = pathname.endsWith("/") ? pathname : pathname + "/";
  return (카드표 as { 쪽: Record<string, 카드> }).쪽[p === "//" ? "/" : p];
}
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
export function thumb({ pathname, alt: alt0, v }: ThumbInput) {
  const 표 = 쪽카드(pathname);
  const url = 표 ? `${SITE.url}${표.file}` : ogAbsolute(ogSlug(pathname) + (v ?? ""));
  const alt = 표 ? 표.alt : alt0;
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
