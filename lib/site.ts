export const SITE = {
  name: "창원 룰루랄라 나이트",
  nameNoSpace: "창원룰루랄라나이트",
  shortName: "룰루랄라 나이트",
  // 창원 룰루랄라 나이트의 연락처는 로또 010-7528-4936 하나뿐이다.
  // (2026-08-20 통일. 그 전에는 본문에 다른 번호가 섞여 있었다.)
  // phone / lottoPhone* 는 같은 번호의 표기 차이일 뿐이니 함께 고쳐야 한다.
  phone: "010-7528-4936",
  phoneHref: "tel:01075284936",
  lotto: "로또",
  lottoPhone: "010 7528 4936",
  /** 하이픈 표기 — 홈 CTA·고정바·썸네일에서 쓰는 정식 표기 */
  lottoPhoneDash: "010-7528-4936",
  lottoPhoneHref: "tel:01075284936",
  url: "https://changwonb.pages.dev",
  domain: "changwonb.pages.dev",
  city: "창원시",
  district: "성산구",
  region: "경상남도",
  country: "대한민국",
  description:
    "창원 룰루랄라 나이트 공식 사이트. 창원시 성산구 상남동 22-4 지하 3층, 27세 이상 출입 가능한 합법 영업장.",
  shortDescription:
    "창원 룰루랄라 나이트. 상남동 22-4 지하 3층, 27세 이상 출입 가능한 합법 영업장.",
  keywords: [
    "창원 룰루랄라 나이트",
    "창원룰루랄라나이트",
    "창원 룰루랄라",
    "창원룰루랄라",
    "룰루랄라 나이트",
    "룰루랄라나이트",
    "창원 나이트",
    "창원나이트",
    "창원 룰루랄라 예약",
    "창원 룰루랄라 나이트 예약",
    "창원 나이트 예약",
    "창원 클럽",
    "창원 나이트 추천",
    "창원 룰루랄라 가격",
    "창원 룰루랄라 후기",
    "창원 룰루랄라 위치",
    "창원 룰루랄라 매니저",
    "창원 상남동 나이트",
    "상남동 룰루랄라",
    "상남동 룰루랄라 나이트",
    "성산구 나이트",
    "경상남도 나이트",
    "창원시 나이트",
  ],
  priceRange: "₩₩",
  openingHoursSpec: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "20:00",
      closes: "05:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "PublicHolidays",
      opens: "20:00",
      closes: "05:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/rulruralra_nightclub_",
    "https://www.instagram.com/lulu__lala._.cw",
    "https://www.facebook.com/61559700813935",
    "https://www.facebook.com/p/%EC%B0%BD%EC%9B%90-%EB%A3%B0%EB%A3%A8%EB%9E%84%EB%9D%BC-%EB%82%98%EC%9D%B4%ED%8A%B8-100065127218270/",
    "https://search.naver.com/search.naver?query=%EC%B0%BD%EC%9B%90+%EB%A3%B0%EB%A3%A8%EB%9E%84%EB%9D%BC+%EB%82%98%EC%9D%B4%ED%8A%B8",
    "https://www.google.com/search?q=%EC%B0%BD%EC%9B%90+%EB%A3%B0%EB%A3%A8%EB%9E%84%EB%9D%BC+%EB%82%98%EC%9D%B4%ED%8A%B8",
  ],
  founded: "2019",
  foundingDate: "2019-11-13",
  geo: {
    latitude: 35.2237,
    longitude: 128.681,
  },
  lastModified: new Date().toISOString(),
  // SEO automation: keyword-guard 워크플로우가 푸시마다 키워드 밀도를 자동 감시함
} as const;

// 공유/검색 썸네일 (네이버·구글·카카오) — 1:1 1200x1200
//
// [주의] 이제 페이지마다 자기 썸네일 파일(/og/{슬러그}.png)을 쓴다. lib/og.ts 참고.
// 여기 OG_IMAGE 는 상대 경로 + 동적 라우트라 네이버가 잡지 못했다.
// 남겨 둔 건 /opengraph-image 라우트 자체를 없애지 않기 위해서이며,
// 페이지 메타에는 더 이상 쓰지 않는다.
export const OG_IMAGE = [
  {
    // ?v= 는 네이버·카카오가 이전 썸네일을 캐시하고 있을 때 갱신을 유도하기 위함
    url: "/opengraph-image?v=20260811",
    width: 1200,
    height: 1200,
    type: "image/png",
    alt: `창원룰루랄라 · ${SITE.lotto} ${SITE.lottoPhoneDash}`,
  },
];

/**
 * 창원 본 사이트 페이지가 공유하는 비표준 메타.
 *
 * [왜 상수로 뺐나] Next 는 page 의 `other` 가 layout 의 `other` 를 통째로 덮어쓴다.
 * 페이지마다 thumbnail 이 달라 page 쪽에 `other` 를 둬야 하는데, 그러면 이 태그들이
 * 통째로 사라진다. 그래서 페이지에서 `{ ...SITE_OTHER, ...thumb.other }` 로 합친다.
 */
export const SITE_OTHER = {
  "geo.region": "KR-48",
  "geo.placename": "창원시 성산구 상남동",
  "geo.position": `${SITE.geo.latitude};${SITE.geo.longitude}`,
  ICBM: `${SITE.geo.latitude}, ${SITE.geo.longitude}`,
  "dc.title": SITE.name,
  "dc.creator": "매니저",
  "dc.subject": "창원 룰루랄라 나이트",
  "dc.language": "ko-KR",
  "og:locality": "창원시",
  "og:region": "경상남도",
  "og:country-name": "대한민국",
  "twitter:label1": "예약 문의",
  "twitter:data1": SITE.phone,
  "twitter:label2": "입장 연령",
  "twitter:data2": "27세 이상",
} as const;

export const PLACEHOLDER = "[입력필요]";

export const PLACEHOLDERS = {
  address: "성산구 상남동 22-4 지하 3층 (모아엔트몰)",
  addressRoad: "성산구 마디미로43번길 10 지하 3층",
  addressDetail: "지하 3층 (모아엔트몰)",
  postalCode: PLACEHOLDER,
  hoursWeekday: "20:00 ~ 익일 05:00 (월~토)",
  hoursWeekend: "20:00 ~ 익일 05:00 (토요일 및 공휴일/공휴일 전날)",
  closedDay: "일요일 (단, 공휴일·공휴일 전날이 일요일이면 영업)",
  latitude: "35.2237",
  longitude: "128.681",
  prices: [
    { name: "기본 테이블", price: PLACEHOLDER, note: "문의 안내" },
    { name: "VIP 룸", price: PLACEHOLDER, note: "운영 시점 안내" },
  ],
  reservePhone: "010-7528-4936",
  businessNumber: PLACEHOLDER,
  instagram: "https://www.instagram.com/rulruralra_nightclub_",
  instagramAlt: "https://www.instagram.com/lulu__lala._.cw",
  naverPlace: PLACEHOLDER,
  // kakaoMap 항목은 제거함 (2026-08-15). 지도 안내는 네이버 플레이스/네이버 지도로 통일.
} as const;

export const NAV = [
  { href: "/", label: "홈" },
  { href: "/about", label: "가게 소개" },
  { href: "/lotto", label: "매니저" },
  { href: "/price", label: "가격" },
  { href: "/location", label: "오시는 길" },
  { href: "/reserve", label: "예약" },
  { href: "/review", label: "후기" },
  { href: "/photo", label: "사진" },
  { href: "/news", label: "소식" },
  { href: "/faq", label: "FAQ" },
  { href: "/around", label: "주변" },
  { href: "/event", label: "이벤트" },
  { href: "/vip", label: "VIP" },
  { href: "/contact", label: "문의" },
] as const;
// NAV 는 창원 사이트 본 메뉴 전용이다.
// /night(전국 나이트) 는 창원 페이지의 헤더 메뉴·본문 링크 구성을 바꾸지 않기 위해
// 여기에 넣지 않고, 푸터 링크 + sitemap/feed 에만 노출한다.

export const PAGE_META: Record<
  string,
  { title: string; description: string; hook: string; capsule: string }
> = {
  "/": {
    title: "창원에서 성공하는 방법 — 상남동 밤에서 본 여섯 가지",
    description:
      "창원에서 성공하는 사람들의 공통점을 상남동에서 본 그대로 적었습니다. 평판·도시의 시간·기억·술자리·돈 쓰는 방식·잔존율 여섯 가지와 오늘 할 수 있는 체크리스트.",
    hook: "창원에서 잘되는 사람은 처음부터 티가 납니다. 다만 이유가 다릅니다.",
    capsule:
      "창원에서 성공하는 방법으로 이 글이 정리한 것은 평판·도시의 시간·기억·술자리·돈 쓰는 방식·오래 남는 힘 여섯 가지이며, 창원 상남동에서 오래 장사한 사람이 현장에서 관찰한 내용입니다. 통계가 아니라 관찰이며 성공을 보장하지 않습니다.",
  },
  "/about": {
    title: "창원룰루랄라나이트 소개 — 매니저가 사람 보고 자리 잡는 곳",
    description:
      "창원룰루랄라나이트 소개. 사업자 등록 보유 합법 나이트 클럽, 27세 이상 출입 가능·신분증 확인 매장. 매니저가 사람 보고 자리를 잡아드립니다.",
    hook: "어떤 가게인지 한 문장으로 — 매니저가 사람 보고 자리 잡는 곳입니다.",
    capsule:
      "창원 룰루랄라 나이트는 2019년 개업한 사업자 등록 보유 합법 나이트 클럽이고, 매니저가 인원과 분위기를 보고 자리와 예약을 직접 배정합니다.",
  },
  "/lotto": {
    title: "창원룰루랄라나이트 매니저 소개 — 직접 응대 010-7528-4936",
    description:
      "창원룰루랄라나이트 매니저가 직접 응대합니다. 가격·자리·시간을 한 번에 안내. 처음 오시는 분 더 환영합니다.",
    hook: "잘 모르는 매장에 처음 연락하기 부담되시죠? 전화로 편하게 물어보세요.",
    capsule:
      "창원 룰루랄라 나이트 매니저는 직접 응대하며 손님에게 맞는 자리와 가격을 안내합니다.",
  },
  "/price": {
    title: "창원룰루랄라나이트 가격 — 도착 후 '몰랐던 추가요금' 0원",
    description:
      "창원룰루랄라나이트 가격은 인원·옵션·시간대에 따라 다릅니다. 전화 한 통에 정확한 금액 안내. 흥정 없이, 도착 후 추가 요금 0원.",
    hook: "가격은 매번 정확히 말씀드립니다. 전화로 물어보는 게 가장 빨라요.",
    capsule:
      "창원 룰루랄라 나이트 가격은 인원·옵션·시간대에 따라 다르며, 전화 010-7528-4936로 정확한 금액을 안내합니다.",
  },
  "/location": {
    title: "창원룰루랄라나이트 오시는 길 — 상남동 22-4 지하 3층",
    description:
      "창원룰루랄라나이트 위치는 창원시 성산구 상남동 22-4 지하 3층(모아엔트몰), 도로명 마디미로43번길 10. 헤매시면 010-7528-4936로 전화 주세요.",
    hook: "처음이라 위치 헷갈리면, 전화로 연락 주세요. 입구 잡아드립니다.",
    capsule:
      "창원 룰루랄라 나이트는 경상남도 창원시 성산구 상남동 22-4 지하 3층, 도로명 마디미로43번길 10에 위치하며 도착 직전 전화로 안내받을 수 있습니다.",
  },
  "/reserve": {
    title: "창원룰루랄라나이트 예약 30초 — 앱·회원가입·결제등록 없음",
    description:
      "창원룰루랄라나이트 예약은 문의 한 번이면 끝납니다. 인원·날짜·시간 → 자리 확정. 처음 오시는 분도 30초면 끝납니다.",
    hook: "예약은 진짜 전화 한 번입니다. 어렵게 생각하지 마세요.",
    capsule:
      "창원 룰루랄라 나이트 예약은 인원·날짜·시간을 알려주면 한 번에 자리가 확정됩니다.",
  },
  "/review": {
    title: "창원룰루랄라나이트 후기 — 가짜 별점·자작 후기 일체 없음",
    description:
      "창원룰루랄라나이트 후기는 받은 그대로 게시합니다. 좋은 말도 불리한 말도 가리지 않고, 평균 별점을 부풀리지 않습니다.",
    hook: "거짓말 안 합니다. 받은 후기만 그대로 올립니다.",
    capsule:
      "창원 룰루랄라 나이트 후기 페이지에는 실제 손님이 매장에 직접 남긴 후기만 게시되며, 가짜 별점이나 조작 평가는 일절 사용하지 않습니다.",
  },
  "/photo": {
    title: "창원룰루랄라나이트 매장 사진 — 합성·외부 이미지 0장",
    description:
      "창원룰루랄라나이트 매장 사진은 전부 실제 우리 가게 컷. 매니저가 직접 찍거나 손님이 허락하고 찍어준 사진만 올립니다.",
    hook: "보여드리는 사진은 전부 우리 가게입니다. 다른 가게 사진 안 씁니다.",
    capsule:
      "창원 룰루랄라 나이트 사진은 모두 실제 매장 내·외부를 직접 촬영한 이미지이며, 외부 가게 사진이나 합성 이미지를 사용하지 않습니다.",
  },
  "/news": {
    title: "창원룰루랄라나이트 소식 — 오늘 영업·임시휴무 공식 공지",
    description:
      "창원룰루랄라나이트 임시 휴무·영업시간 변경·입구/주차 변동을 사이트에 가장 먼저 게시. 출발 전 30초 확인이면 헛걸음 안 합니다.",
    hook: "가실 때 헛걸음하지 마시라고, 여기 먼저 적어둡니다.",
    capsule:
      "창원 룰루랄라 나이트 소식 페이지는 임시 휴무·영업시간 변경·이벤트 공지를 매장 측에서 직접 사전에 안내하는 자리입니다.",
  },
  "/faq": {
    title: "창원룰루랄라나이트 자주 묻는 질문 — 예약·가격·위치·연령",
    description:
      "창원룰루랄라나이트 예약·가격·위치·연령·결제·주차·드레스코드 FAQ. 매니저가 매일 받는 질문 그대로, 광고 문장 빼고 정리했습니다.",
    hook: "전화하기 전에 한 번 보고 오시면 더 빠릅니다.",
    capsule:
      "창원 룰루랄라 나이트 FAQ는 예약·가격·연령·결제·주차 등 매니저가 평소 받는 질문을 그대로 정리한 페이지입니다.",
  },
  "/around": {
    title: "창원룰루랄라나이트 주변 — 식사·해장·숙소·대리 동선 정리",
    description:
      "창원룰루랄라나이트 주변 식사·해장·숙소·대리·24시 카페 정리. 광고비 받고 끼워 넣지 않고 직접 다녀본 곳만 적었습니다.",
    hook: "오기 전에 뭐 먹고, 끝나고 어디 갈지 — 정리해 둡니다.",
    capsule:
      "창원 룰루랄라 나이트 주변 페이지는 매장 인근 식당·숙소·대리 정보를 모아 손님의 방문 전후 동선을 미리 잡을 수 있도록 안내합니다.",
  },
  "/event": {
    title: "창원룰루랄라나이트 이벤트 — 진행 중인 혜택만 게시",
    description:
      "창원룰루랄라나이트 이벤트는 진행 중인 혜택만 게시. 종료된 이벤트는 즉시 내리고, '30% 할인' 같은 거짓 광고는 쓰지 않습니다.",
    hook: "'30% 할인' 같은 거짓말 안 씁니다. 하는 것만 올립니다.",
    capsule:
      "창원 룰루랄라 나이트 이벤트 페이지에는 현재 매장에서 실제로 진행 중인 혜택만 게시되며, 종료된 이벤트는 바로 내려갑니다.",
  },
  "/vip": {
    title: "창원룰루랄라나이트 VIP 룸 — 매니저가 직접 자리 배정",
    description:
      "창원룰루랄라나이트 VIP 룸은 인원·분위기·일행 구성 보고 매니저가 직접 배정. 룸 컨디션과 가용 시간대는 전화 한 번에 안내합니다.",
    hook: "VIP 자리는 사람 봐서 잡아드립니다. 일단 전화 주세요.",
    capsule:
      "창원 룰루랄라 나이트 VIP 룸은 실제 운영 시점에만 안내하며, 자리 배정은 매니저가 인원과 상황을 보고 직접 결정합니다.",
  },
  "/night": {
    title: "전국 나이트 예약 문의 — 지역별 담당자 연락처 모음",
    description:
      "불광동호박나이트·울산챔피언나이트·청담나이트 등 전국 나이트 예약 문의처를 지역별로 정리했습니다. 광고문의 카톡 besta12. 만 19세 이상, 입장 시 신분증 확인.",
    hook: "지역 고르시면 담당자 연락처가 바로 나옵니다.",
    capsule:
      "전국 나이트 예약 문의 페이지는 지역별 업소의 예약 담당자 전화·카카오톡 연락처를 모아둔 안내 페이지입니다.",
  },
  "/contact": {
    title: "창원룰루랄라나이트 문의 — 매니저 직접 응대 010-7528-4936",
    description:
      "창원룰루랄라나이트 문의는 매니저가 직접 응대. 예약·가격·길 안내·VIP 룸까지 한 번에 답 드립니다. 010-7528-4936.",
    hook: "편하게 문의하세요.",
    capsule:
      "창원 룰루랄라 나이트 문의는 매니저가 직접 응대합니다.",
  },
};
