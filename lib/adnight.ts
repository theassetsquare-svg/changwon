// 전국 나이트 광고 페이지(/night/{slug}) 타입 · 헬퍼
//
// [원칙] 업소 고유 사실은 [웹 실사]로 2곳 이상 확인된 것만 facts 에 넣는다.
// 확인되지 않은 항목(요금·연령·주차 등)은 필드째 비워 둔다. 추측 금지.
//
// 각도 공식: 각도번호 = ((SITE_INDEX - 1) + (업소번호 - 1)) mod 13 + 1
// 이 사이트의 SITE_INDEX = 6

export const SITE_INDEX = 6;

export type AdSection = {
  /** H2 제목 */
  h2: string;
  /** 본문 문단. 첫 문단의 앞부분이 FAQ 답변으로 재사용된다 */
  body: string[];
  /** 다음 섹션으로 넘기는 연결 문장 (섹션 마지막 줄) */
  bridge: string;
  /** 목록형 보조 블록 (각도10 요약형에서 주로 쓴다) */
  list?: string[];
  /** FAQPage 로 올릴 검색어형 질문. 없으면 FAQ 에서 제외 */
  faqQ?: string;
};

export type AdVenue = {
  no: number;
  slug: string;
  angleNo: number;
  angleName: string;
  suffix: string;
  /** A형 — 붙여쓰기 */
  keyword: string;
  /** B형 — 띄어쓰기 */
  spaced: string;
  /** C형 — 지역 + 업종 */
  regionType: string;
  areaLabel: string;
  locality: string;
  region: string;
  group: "A" | "B";
  contactName?: string;
  /** 썸네일 그림을 바꿨을 때 캐시를 피하려고 붙이는 판 번호. 없으면 기존 파일명 그대로. */
  ogV?: string;
  phone?: string;
  /** "만 27세 이상" 같은 완전문. 확인된 업소만 */
  ageFull?: string;
  title: string;
  description: string;
  ogAlt: string;
  ogBg: string;
  ogFg: string;
  /** AI 인용 블록 두 번째 문장 — 13개 전부 다르게 */
  answer2: string;
  /** 첫 문단 (3줄 이내) + 이어지는 도입 문단 */
  lead: string[];
  sections: AdSection[];
  /** 확인된 사실 표 [항목, 값] */
  facts: [string, string][];
  /** 마무리 요약 3줄 */
  summary: string[];
  /** 페이지 하단 이용 안내 3줄 — 페이지마다 다른 문장을 쓴다 */
  notice: string[];
  /** 마지막 문단 — A형 1회 포함 */
  outro: string;
  /** 관련 업소 slug 3~4개 */
  related: string[];
  /** JSON-LD openingHours. 2곳 이상 확인된 경우만 */
  openingHours?: string[];
};

export const phoneDigits = (p: string) => p.replace(/[^0-9]/g, "");
/* ★ 2026-08-26 — 가게 페이지 주소는 메인주소 바로 뒤에 가게이름.
 *   단 네이버에 이미 나오는 아래 슬러그만 옛 /night/ 경로를 그대로 쓴다. */
const NIGHT_KEEP_OLD = new Set(["sillim-grandprix-night", "sangbong-hangukgwan-night", "busan-asiad-night", "daejeon-seven-night"]);
/** 폴더를 옮기면서 이름이 바뀐 것들 — 데이터의 슬러그는 그대로라 여기서 이어 준다 */
const NIGHT_URL_MAP: Record<string, string> = {
  "1-1": "cheongdam-night",
  "2-1": "suyu-shampoo-night",
  "3-1": "suwon-chancedome-night",
  "4-1": "ilsan-shampoo-night",
};
export const nightPath = (slug: string) =>
  NIGHT_KEEP_OLD.has(slug) ? `/night/${slug}` : `/${NIGHT_URL_MAP[slug] ?? slug}`;

/**
 * 섹션 본문 첫 문단에서 40~90자 사이의 문장 덩어리를 잘라 FAQ 답변으로 쓴다.
 * 본문에 그대로 존재하는 문장만 쓰기 때문에 화면에 보이지 않는 답변이 생기지 않는다.
 */
export function deriveFaqAnswer(paragraph: string): string {
  const parts = paragraph.split(/(?<=[.!?])\s+/);
  let out = "";
  for (const p of parts) {
    const next = out ? `${out} ${p}` : p;
    if (next.length > 90) break;
    out = next;
    if (out.length >= 40) break;
  }
  return out;
}
