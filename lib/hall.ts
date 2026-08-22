// 전국 나이트 "홀 구조 · 자리 도감" (/hall/{slug}) 타입 · 헬퍼
//
// [콘셉트] 모든 글을 공간 축으로 푼다.
//   입구 → 플로어 → 테이블 구역 → 부스/룸 구역. 자리에 따라 달라지는 밤.
//
// [원칙 1] 업소 고유 사실(주소·역·층·연령)은 공개 정보로 확인된 것만 facts 에 단정해 넣는다.
//   확인되지 않은 항목은 필드째 비우고, 본문에서는 "일반적인 나이트 홀 기준"이라고
//   분명히 구분해 서술한다. 추측을 사실처럼 적지 않는다.
//
// [원칙 2] 전화번호는 페이지 단위 허용표를 따른다.
//   010-7528-4936 = 홈 + 창원룰루랄라 페이지
//   010-5653-0069 = 울산챔피언 페이지
//   010-2221-1937 = 불광동호박 페이지
//   010-8156-6558 = 답십리미라클 페이지
//   그 외 37개 + 허브 = 광고문의 카톡만 (전화번호 없음)

export const HALL_UPDATED = "2026-08-17";

export type HallSection = {
  /** H2 제목. 최소 2개는 질문형이어야 한다 */
  h2: string;
  /** 공간 라벨 — 입구 / 플로어 / 테이블 / 부스 / 룸 / 무대 */
  zone: string;
  /** 본문 문단 */
  body: string[];
  /** 도면 라인 박스에 들어가는 좌석 메모 */
  note?: string;
};

export type HallFaq = { q: string; a: string };

export type HallVenue = {
  no: number;
  slug: string;
  /** A형 — 붙여쓰기. 검색 대상 1순위 */
  keyword: string;
  /** B형 — 띄어쓰기 */
  spaced: string;
  /** C형 — 지역 + 업종 */
  regionType: string;
  areaLabel: string;
  locality: string;
  region: string;
  /** 홀 성격 한 단어 — 카드/허브 정렬에 쓴다 */
  hallType: string;
  contactName?: string;
  /** 썸네일 그림을 바꿨을 때 캐시를 피하려고 붙이는 판 번호. 없으면 기존 파일명 그대로. */
  ogV?: string;
  phone?: string;
  /** "만 27세 이상" 같은 완전문. 확인된 업소만 */
  ageFull?: string;
  /** 20~30자, 전부 다르게. [가게이름 맨 앞] + 자리/공간 훅 */
  title: string;
  description: string;
  ogAlt: string;
  /** ② 핵심 3줄 직답 박스 */
  answer3: [string, string, string];
  /** ① 도입 — 답은 끝에 둔다 */
  lead: string[];
  /** ③ 확인된 사실 표. 확인된 항목만 */
  facts: [string, string][];
  /** ④ 공간 소제목 4~6개 */
  sections: HallSection[];
  /** ⑤ 맨 끝, 제목이 던진 질문의 답 */
  finalAnswer: string[];
  /** ⑥ FAQ 3개. 답변은 반드시 본문에도 보이는 내용이어야 한다 */
  faq: [HallFaq, HallFaq, HallFaq];
  /** ⑦ 한 줄 정리 */
  oneline: string;
  /** 이용 안내 — 페이지마다 다른 문장 */
  notice: string[];
  /** 관련 업소 slug 3~4개 */
  related: string[];
};

export const hallPath = (slug: string) => `/hall/${slug}`;
export const phoneDigits = (p: string) => p.replace(/[^0-9]/g, "");

/** 확인 못 한 항목은 표에서 아예 빼는 대신, 이 문구로 한 번만 밝힌다 */
export const UNVERIFIED_NOTE =
  "여기에 없는 항목은 공개 정보로 확인되지 않아 적지 않았습니다. 확인 불가 항목을 지어내지 않습니다.";
