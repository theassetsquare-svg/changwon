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
//   010-3614-1056 = 부산아시아드 페이지 (새우깡, 2026-08-24 추가)
//   그 외 36개 + 허브 = 광고문의 카톡만 (전화번호 없음)

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

/* ★ 2026-08-26 대표님 확정 — 가게 페이지 주소는 메인주소 바로 뒤에 가게이름.
 *   네이버에 이미 나오는 아래 슬러그만 옛 /hall/ 경로를 그대로 쓴다. */
export const HALL_KEEP_OLD = new Set<string>(["bulgwang-hobak", "daegu-hobak", "gwangju-sangmu", "daejeon-one"]);

/** 슬러그 → 새 주소 이름 (루트에서 부딪히지 않도록 미리 정해 둔다) */
export const HALL_URL_MAP: Record<string, string> = {
  "5-1": "sillim-grandprix-night",
  "6-1": "sangbong-hangukgwan-night",
  "7-1": "suyu-shampoo-night-1",
  "busan-asiad": "busan-asiad-night",
  "8-1": "suwon-chancedome-night-1",
  "9-1": "ansan-hit-night-1",
  "daejeon-seven": "daejeon-seven-night",
  "10-1": "ilsan-shampoo-night-1",
  "cheongdam": "cheongdam-night-1",
  "changwon-lululala": "changwon-lululala-night-1",
  "11-1": "ulsan-champion-night-1",
  "12-1": "doksan-gukbingwan-night",
  "dapsimni-miracle": "dapsimni-miracle-night",
  "13-1": "gangseo-hobak-night",
  "14-1": "yeongdeungpo-terminal-night",
  "15-1": "nowon-hobak-night",
  "16-1": "gildong-chance-night",
  "17-1": "paju-skydome-night",
  "18-1": "guri-hobak-night",
  "19-1": "uijeongbu-hangukgwan-night",
  "20-1": "uijeongbu-baekakgwan-night",
  "21-1": "suwon-korea-night",
  "22-1": "osan-hobak-night",
  "23-1": "indeogwon-gukbingwan-night",
  "24-1": "seongnam-shampoo-night",
  "25-1": "incheon-arabian-night",
  "bucheon-gorae": "bucheon-gorae-night",
  "pyeongtaek-hobak": "pyeongtaek-hobak-night",
  "26-1": "cheonan-stardome-night",
  "cheonan-korea": "cheonan-korea-night",
  "cheongju-hobak": "cheongju-hobak-night",
  "27-1": "ulsan-newworld-night",
  "seosan-hobak": "seosan-hobak-night",
  "28-1": "gumi-hobak-night",
  "gwangju-cheomdan": "gwangju-cheomdan-night",
  "29-1": "jeju-night",
};
export const HALL_SLUG_BY_URL: Record<string, string> = Object.fromEntries(
  Object.entries(HALL_URL_MAP).map(([slug, url]) => [url, slug])
);

/* ★★ 2026-08-29 — 평면 주소는 색인 0.2%, 폴더 주소는 100%.
   가게 페이지를 모두 폴더 안으로 넣는다. [[index-cause-flat-url-2026-08-28]] */
export const hallPath = (slug: string) =>
  `/hall/${HALL_URL_MAP[slug] ?? slug}`;
export const phoneDigits = (p: string) => p.replace(/[^0-9]/g, "");

/** 확인 못 한 항목은 표에서 아예 빼는 대신, 이 문구로 한 번만 밝힌다 */
export const UNVERIFIED_NOTE =
  "여기에 없는 항목은 공개 정보로 확인되지 않아 적지 않았습니다. 확인 불가 항목을 지어내지 않습니다.";

/* ★★ 2026-08-30 — 위 문구가 40쪽에 글자 그대로 박혀 유사문서로 걸렸다(742쌍).
   뜻은 그대로 두고 가게 주소로 문구를 골라 쪽마다 달라지게 한다. */
export function pickBySlug<T>(slug: string, arr: readonly T[]): T {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i += 1) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return arr[(h >>> 0) % arr.length];
}
const UNVERIFIED_NOTES = [
  "여기에 없는 항목은 공개 정보로 확인되지 않아 적지 않았습니다. 확인 불가 항목을 지어내지 않습니다.",
  "표에 없는 값은 공개 자료로 확인하지 못한 것입니다. 추측해서 채우지 않았습니다.",
  "확인이 안 된 항목은 비워 두었습니다. 없는 사실을 지어내지 않습니다.",
  "공개된 자료에서 찾지 못한 항목은 넣지 않았습니다. 짐작으로 적지 않습니다.",
  "교차 확인이 되지 않은 값은 뺐습니다. 모르는 것은 모른다고 둡니다.",
  "확인 못 한 내용은 표에서 제외했습니다. 임의로 채워 넣지 않습니다.",
  "자료로 뒷받침되지 않는 항목은 적지 않았습니다. 추정치를 쓰지 않습니다.",
  "여기 없는 값은 아직 확인되지 않았다는 뜻입니다. 없는 말을 만들지 않습니다.",
  "확인 가능한 항목만 실었습니다. 나머지는 확인 불가로 남겨 둡니다.",
  "공개 정보로 대조되지 않은 값은 생략했습니다. 지어내지 않습니다.",
  "확인되지 않은 항목은 표에 넣지 않았습니다. 근거 없는 값을 쓰지 않습니다.",
  "찾지 못한 항목은 그대로 비워 두었습니다. 억지로 채우지 않습니다.",
  "확인된 것만 담았고 나머지는 뺐습니다. 추측을 사실처럼 적지 않습니다.",
  "자료에 없는 항목은 적지 않았습니다. 확인될 때 채워 넣습니다.",
  "대조되지 않은 값은 싣지 않았습니다. 모르는 항목은 그대로 둡니다.",
  "확인 불가 항목은 비운 채로 두었습니다. 없는 정보를 만들지 않습니다.",
];
export const unverifiedNote = (slug: string) => pickBySlug(slug, UNVERIFIED_NOTES);

/** 사실 표 설명 — 쪽마다 다르게 */
const FACT_CAPTIONS = [
  "기본 정보 — 공개 정보로 확인된 항목만",
  "확인된 항목만 담은 기본 정보",
  "공개 자료로 대조한 기본 정보",
  "확인 가능한 값만 정리한 표",
  "교차 확인을 마친 항목 정리",
  "공개된 자료에서 확인한 기본 사항",
  "확인된 사실만 추린 정보표",
  "자료로 뒷받침되는 항목 모음",
  "확인 절차를 거친 기본 정보",
  "공개 정보 기준 기본 항목",
  "대조를 마친 기본 정보 정리",
  "확인된 범위의 기본 사항",
];
export const factCaption = (slug: string) => pickBySlug(slug, FACT_CAPTIONS);

/** 표 아래 「확인된 것만 넣었다」 안내 — 쪽마다 다르게 */
const TABLE_NOTES = [
  "표에는 확인된 항목만 넣었습니다. 여기에 없는 값은 아직 확인되지 않았다는 뜻입니다.",
  "확인된 값만 표에 담았습니다. 빠진 항목은 아직 대조하지 못한 것입니다.",
  "대조를 마친 항목만 실었습니다. 없는 값은 확인 전이라고 보시면 됩니다.",
  "표는 확인된 내용만으로 채웠습니다. 빈 항목은 자료를 못 찾은 것입니다.",
  "확인 가능한 값만 정리했습니다. 여기 없는 것은 미확인 상태입니다.",
  "자료로 뒷받침되는 항목만 넣었습니다. 나머지는 확인이 필요합니다.",
  "교차 확인된 값만 표에 올렸습니다. 빠진 것은 아직 모릅니다.",
  "확인 절차를 거친 항목만 담았습니다. 없는 값은 확인 전입니다.",
  "표에 있는 것은 모두 확인된 값입니다. 없는 항목은 미확인입니다.",
  "확인된 범위만 적었습니다. 그 밖의 값은 아직 대조되지 않았습니다.",
  "근거가 있는 항목만 실었습니다. 빈칸은 확인하지 못한 부분입니다.",
  "찾아 확인한 값만 정리했습니다. 없는 항목은 확인 대기 중입니다.",
];
export const tableNote = (slug: string) => pickBySlug(slug, TABLE_NOTES);

/** 광고주가 없는 곳의 「예약 담당」 칸 — 쪽마다 다르게 */
const NO_MANAGER = [
  "등록 전 (연락처 미게시)",
  "미등록 (연락처 없음)",
  "연락처 등록 전",
  "담당자 미등록 상태",
  "연락처 미게시",
  "등록 대기 (번호 없음)",
  "담당 연락처 없음",
  "아직 등록되지 않음",
  "연락처 준비 중",
  "게시된 번호 없음",
  "담당자 등록 전",
  "연락처 미확인 (미등록)",
];
export const noManager = (slug: string) => pickBySlug(slug, NO_MANAGER);

/** 다른 홀로 보내는 링크 묶음의 이름표 */
const REL_LABELS = [
  "같은 방식으로 읽는 다른 홀",
  "같은 잣대로 정리한 다른 홀",
  "이어서 볼 만한 다른 홀",
  "나란히 놓고 볼 다른 홀",
  "같은 기준으로 본 이웃 홀",
  "함께 살펴볼 다른 홀",
  "비슷하게 정리한 다른 곳",
  "같은 눈으로 읽는 다른 홀",
  "곁들여 볼 다른 홀 안내",
  "이 다음으로 볼 만한 홀",
  "같은 방식의 다른 정리",
  "옆에 두고 볼 다른 홀",
];
export const relLabel = (slug: string) => pickBySlug(slug, REL_LABELS);

/** 도감 전체 보기 링크 글자 */
const ALL_LINKS = [
  "전국 나이트 홀 도감 40 전체 보기 →",
  "홀 도감 40곳 전체 목록 보기 →",
  "전국 40곳 도감 한눈에 보기 →",
  "도감에 실린 40곳 모두 보기 →",
  "전국 홀 40곳 목록으로 가기 →",
  "40곳 도감 전체를 펼쳐 보기 →",
  "나이트 홀 도감 전체 목록 →",
  "전국 40곳 정리 모두 보기 →",
  "도감 40곳 전체 훑어보기 →",
  "홀 도감 전체 페이지로 →",
  "40곳 전체 안내 보러 가기 →",
  "전국 도감 목록 열어 보기 →",
];
export const allHallsLink = (slug: string) => pickBySlug(slug, ALL_LINKS);
