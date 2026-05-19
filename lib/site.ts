export const SITE = {
  name: "창원 룰루랄라 나이트",
  nameNoSpace: "창원룰루랄라나이트",
  shortName: "룰루랄라 나이트",
  manager: "짱구",
  phone: "010-3854-6887",
  phoneIntl: "+82-10-3854-6887",
  phoneHref: "tel:010-3854-6887",
  url: "https://changwon.pages.dev",
  domain: "changwon.pages.dev",
  city: "창원시",
  district: "성산구",
  region: "경상남도",
  country: "대한민국",
  description:
    "창원 룰루랄라 나이트 공식 사이트. 매니저 짱구가 직접 전화 받습니다. 010-3854-6887. 창원시 성산구 상남동 22-4 지하 3층, 19세 이상 합법 영업장. 통화 한 번이면 자리 잡힙니다.",
  shortDescription:
    "창원 룰루랄라 나이트 짱구 010-3854-6887. 상남동 22-4 지하 3층, 직통 예약, 19세 이상 합법 영업장.",
  keywords: [
    "창원 룰루랄라 나이트",
    "창원룰루랄라나이트",
    "창원 룰루랄라",
    "창원룰루랄라",
    "룰루랄라 나이트",
    "룰루랄라나이트",
    "창원 나이트",
    "창원나이트",
    "창원 나이트 짱구",
    "창원 룰루랄라 짱구",
    "창원 룰루랄라 예약",
    "창원 룰루랄라 나이트 예약",
    "창원 나이트 예약",
    "창원 클럽",
    "창원 클럽 짱구",
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
    { name: "기본 테이블", price: PLACEHOLDER, note: "전화 안내" },
    { name: "VIP 룸", price: PLACEHOLDER, note: "운영 시점 안내" },
  ],
  jjangguCareer: PLACEHOLDER,
  kakaoChannel: PLACEHOLDER,
  businessNumber: PLACEHOLDER,
  instagram: "https://www.instagram.com/rulruralra_nightclub_",
  instagramAlt: "https://www.instagram.com/lulu__lala._.cw",
  naverPlace: PLACEHOLDER,
  kakaoMap: PLACEHOLDER,
} as const;

export const NAV = [
  { href: "/", label: "홈" },
  { href: "/about", label: "가게 소개" },
  { href: "/jjanggu", label: "매니저 짱구" },
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

export const PAGE_META: Record<
  string,
  { title: string; description: string; hook: string; capsule: string }
> = {
  "/": {
    title: "창원 룰루랄라 나이트, 짱구가 직접 받는 공식 자리",
    description:
      "창원 룰루랄라 나이트 공식. 매니저 짱구가 010-3854-6887로 직접 받습니다. 직원 콜백 없이, 통화 한 번에 자리 확정. 상남동 22-4 지하 3층, 19세 이상 합법 영업장.",
    hook: "처음이라 어색해도 괜찮습니다. 전화 한 통이면 끝납니다.",
    capsule:
      "창원 룰루랄라 나이트는 창원시 성산구 상남동 22-4 지하 3층의 19세 이상 합법 영업장이며, 매니저 짱구가 010-3854-6887로 직접 전화를 받아 예약을 안내합니다.",
  },
  "/about": {
    title: "창원 룰루랄라 나이트, 사람 보고 자리 잡는 짱구의 가게",
    description:
      "창원 룰루랄라 나이트는 상남동 22-4 지하 3층의 합법 나이트 클럽. 짱구가 사람 보고 자리 잡는 곳. 처음 오시는 분은 부담 적은 자리, 단체는 한 자리에 모이게.",
    hook: "어떤 가게인지 한 문장으로 — 짱구가 사람 보고 자리 잡는 곳입니다.",
    capsule:
      "창원 룰루랄라 나이트는 2019년 개업한 사업자 등록 보유 합법 나이트 클럽이고, 매니저 짱구가 인원과 분위기를 보고 자리와 예약을 직접 배정합니다.",
  },
  "/jjanggu": {
    title: "창원 룰루랄라 나이트 매니저 짱구, 직접 받습니다",
    description:
      "창원 룰루랄라 나이트 매니저 짱구가 010-3854-6887로 직접 받습니다. 직원 콜백 없음, 메모 남기고 기다림 없음. 가격·자리·시간 한 통화에 정해드립니다.",
    hook: "잘 모르는 매장에 처음 전화하기 부담되시죠? 그래서 제가 직접 받습니다.",
    capsule:
      "짱구는 창원 룰루랄라 나이트 매니저로, 010-3854-6887 번호를 직접 받으며 손님에게 맞는 자리와 가격을 그 자리에서 안내합니다.",
  },
  "/price": {
    title: "창원 룰루랄라 나이트 가격, 부풀리지 않는 솔직 안내",
    description:
      "창원 룰루랄라 나이트 가격은 인원·옵션·시간대에 따라 다릅니다. 부풀리지 않고 정확한 금액을 짱구가 전화 한 번에 안내. 도착 후 ‘몰랐던 추가요금’ 없습니다.",
    hook: "가격은 매번 정확히 말씀드립니다. 전화로 물어보는 게 가장 빨라요.",
    capsule:
      "창원 룰루랄라 나이트 가격은 인원·옵션·시간대에 따라 다르며, 매니저 짱구가 010-3854-6887로 그 자리에서 정확한 금액을 묶어 안내합니다.",
  },
  "/location": {
    title: "창원 룰루랄라 나이트 오시는 길, 입구까지 잡아드립니다",
    description:
      "창원 룰루랄라 나이트는 창원시 성산구 상남동 22-4 지하 3층(마디미로43번길 10). 헤매면 도착 직전 짱구에게 전화 한 통이면 입구까지 잡아드립니다.",
    hook: "처음이라 위치 헷갈리면, 전화 주세요. 제가 입구 잡아드립니다.",
    capsule:
      "창원 룰루랄라 나이트는 경상남도 창원시 성산구 상남동 22-4 지하 3층, 도로명 마디미로43번길 10에 위치하며 도착 직전 전화하면 입구까지 안내합니다.",
  },
  "/reserve": {
    title: "창원 룰루랄라 나이트 예약, 통화 한 번이면 끝",
    description:
      "창원 룰루랄라 나이트 예약은 전화 한 번이면 끝. 앱·회원가입·결제등록 없음. ‘짱구 매니저요’ 한마디면 인원·날짜·시간으로 자리 즉시 확정.",
    hook: "예약은 진짜 통화 한 번입니다. 어렵게 생각하지 마세요.",
    capsule:
      "창원 룰루랄라 나이트 예약은 010-3854-6887로 전화해 짱구 매니저에게 인원·날짜·시간을 말하면 통화 한 번에 자리가 확정됩니다.",
  },
  "/review": {
    title: "창원 룰루랄라 나이트 후기, 가짜 별점 없는 진짜만",
    description:
      "창원 룰루랄라 나이트 후기. 가짜 별점·자작 후기·알바 평가 없이 손님이 직접 남긴 말만 그대로. 불리한 후기도 가리지 않습니다. 부풀린 평점 안 만듭니다.",
    hook: "거짓말 안 합니다. 받은 후기만 그대로 올립니다.",
    capsule:
      "창원 룰루랄라 나이트 후기 페이지에는 실제 손님이 매장에 직접 남긴 후기만 게시되며, 가짜 별점이나 조작 평가는 일절 사용하지 않습니다.",
  },
  "/photo": {
    title: "창원 룰루랄라 나이트 매장 사진, 합성 없는 진짜만",
    description:
      "창원 룰루랄라 나이트 매장 사진은 짱구가 직접 찍은 진짜만. 합성·필터 과다·외부 이미지 없음. ‘사진이랑 다르네’ 소리 안 나는 매장.",
    hook: "보여드리는 사진은 전부 우리 가게입니다. 다른 가게 사진 안 씁니다.",
    capsule:
      "창원 룰루랄라 나이트 사진은 모두 실제 매장 내·외부를 직접 촬영한 이미지이며, 외부 가게 사진이나 합성 이미지를 사용하지 않습니다.",
  },
  "/news": {
    title: "창원 룰루랄라 나이트 소식, 헛걸음 전 먼저 확인",
    description:
      "창원 룰루랄라 나이트 임시 휴무, 영업시간 변경, 입구·주차 변동을 사이트에 가장 먼저 올립니다. 출발 전 한 번 확인이면 헛걸음 안 합니다.",
    hook: "가실 때 헛걸음하지 마시라고, 여기 먼저 적어둡니다.",
    capsule:
      "창원 룰루랄라 나이트 소식 페이지는 임시 휴무·영업시간 변경·이벤트 공지를 매장 측에서 직접 사전에 안내하는 자리입니다.",
  },
  "/faq": {
    title: "창원 룰루랄라 나이트 자주 묻는 질문 한눈에",
    description:
      "창원 룰루랄라 나이트 예약·가격·위치·연령·결제 질문을 한 페이지에. 짱구가 평소 전화로 받는 질문 그대로, 광고 문장 없이 솔직하게 정리.",
    hook: "전화하기 전에 한 번 보고 오시면 더 빠릅니다.",
    capsule:
      "창원 룰루랄라 나이트 FAQ는 예약·가격·연령·결제·주차 등 매니저 짱구가 평소 전화로 답하는 질문을 그대로 정리한 페이지입니다.",
  },
  "/around": {
    title: "창원 룰루랄라 나이트 주변, 식사부터 대리까지",
    description:
      "창원 룰루랄라 나이트 가기 전 식사할 곳, 끝나고 잘 곳, 운전 못 할 때 대리까지. 광고비 받고 끼워 넣지 않고, 직접 다녀본 곳만.",
    hook: "오기 전에 뭐 먹고, 끝나고 어디 갈지 — 정리해 둡니다.",
    capsule:
      "창원 룰루랄라 나이트 주변 페이지는 매장 인근 식당·숙소·대리 정보를 모아 손님의 방문 전후 동선을 미리 잡을 수 있도록 안내합니다.",
  },
  "/event": {
    title: "창원 룰루랄라 나이트 이벤트, 안 하는 거 안 적습니다",
    description:
      "창원 룰루랄라 나이트는 진행 중인 이벤트만 게시. ‘30% 할인’ 같은 거짓 할인 사이트에 안 적습니다. 보고 오셨다가 ‘그런 거 없는데요’ 들을 일 없음.",
    hook: "‘30% 할인’ 같은 거짓말 안 씁니다. 하는 것만 올립니다.",
    capsule:
      "창원 룰루랄라 나이트 이벤트 페이지에는 현재 매장에서 실제로 진행 중인 혜택만 게시되며, 종료된 이벤트는 바로 내려갑니다.",
  },
  "/vip": {
    title: "창원 룰루랄라 나이트 VIP 룸, 짱구가 직접 잡는 자리",
    description:
      "창원 룰루랄라 나이트 VIP 룸은 짱구가 인원과 분위기 보고 직접 자리를 잡습니다. 별도 동선 가능 여부, 룸 상황은 운영 시점에 정확히 안내.",
    hook: "VIP 자리는 사람 봐서 잡아드립니다. 일단 전화 주세요.",
    capsule:
      "창원 룰루랄라 나이트 VIP 룸은 실제 운영 시점에만 안내하며, 자리 배정은 매니저 짱구가 인원과 상황을 보고 직접 결정합니다.",
  },
  "/contact": {
    title: "창원 룰루랄라 나이트 문의, 전화가 가장 빠릅니다",
    description:
      "창원 룰루랄라 나이트 문의는 전화가 가장 빠릅니다. 매니저 짱구 010-3854-6887 직접 응대. 문자·카톡보다 한 통화가 열 배 빠르고 정확합니다.",
    hook: "문자보다 전화가 열 배 빠릅니다.",
    capsule:
      "창원 룰루랄라 나이트 문의는 010-3854-6887로 전화하면 매니저 짱구가 직접 받으며, 문자나 SNS보다 전화가 가장 빠른 답을 받는 방법입니다.",
  },
};
