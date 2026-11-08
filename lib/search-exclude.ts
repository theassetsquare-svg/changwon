/* [네이버70-1나 · 2026-11-08] 가게마다 검색에 남기는 쪽은 대표 1쪽 — 대표님 2026-11-07 17:31 「가게당 1쪽」
 * (대표·겹침 표 = naver-watch config/naver-rep-pages.json · 판정 한 곳 scripts/naver/rep-guard.mjs)
 *
 * 여기 적힌 쪽은 같은 가게를 다른 우리 사이트의 대표 쪽이 맡고 있다. 그래서
 *   ① robots 「noindex, follow」(hall-meta.ts)
 *   ② 사이트맵 · llms.txt 에서 뺀다(app/sitemap.ts · app/llms.txt/route.ts)
 *   ③ 본문 맨 위에 대표 쪽으로 가는 한 줄(components/HallPage.tsx)
 * 주소와 쪽은 그대로 둔다 — 지우지 않고 다른 주소로 보내지도 않는다. 손님에게는 지금처럼 보인다.
 * 한 쪽을 더할 때는 그 가게 대표 쪽이 라이브에 오르고 rank-loop 가 「기다림」이 된 뒤에 줄 하나만 더한다. */

export type 대표로가는쪽 = {
  /** 이 사이트 안의 주소(끝 / 까지) */
  경로: string;
  /** 그 가게 대표 쪽 전체 주소 */
  대표: string;
  /** 링크 앞 글 · 링크 글자 · 링크 뒤 글 — 대표 쪽에 실제로 있는 내용만 */
  앞: string;
  링크: string;
  뒤: string;
};

export const 대표로가는쪽들: 대표로가는쪽[] = [
  {
    경로: "/hall/nowon-hobak-night/",
    대표: "https://d.nolcool.com/hall/nowon-hobak-night/",
    앞: "노원호박나이트 안내는 ",
    링크: "노원호박나이트 허가 기록과 위치",
    뒤: "에서 이어집니다. 구청 인허가 자료와 노원역 거리, 근처 주차장 운영 시간을 다시 확인해 그쪽에 모았습니다.",
  },
  {
    경로: "/hall/yeongdeungpo-terminal-night/",
    대표: "https://k.nolcool.com/club/yeongdeungpo-terminal-night/",
    앞: "1호선 영등포역·5호선 영등포시장역까지의 거리와 600m 안 공영주차장 다섯 곳의 요금은 ",
    링크: "영등포터미널나이트 위치 안내",
    뒤: "에 정리해 두었습니다.",
  },
];

const 끝슬래시 = (경로: string) => {
  const p = String(경로 || "").split(/[?#]/)[0];
  return p.endsWith("/") ? p : p + "/";
};

/** 이 주소가 대표 쪽으로 넘긴 쪽이면 그 줄을, 아니면 undefined */
export function 대표로가는쪽찾기(경로: string): 대표로가는쪽 | undefined {
  const k = 끝슬래시(경로);
  return 대표로가는쪽들.find((x) => x.경로 === k);
}

/** 검색에서 뺄 쪽인가(사이트맵 · llms · robots 가 같은 답을 쓴다) */
export const 검색제외인가 = (경로: string): boolean => !!대표로가는쪽찾기(경로);
