export const SITE = {
  name: "창원 룰루랄라 나이트",
  nameNoSpace: "창원룰루랄라나이트",
  shortName: "룰루랄라 나이트",
  kakao: "besta12",
  kakaoHref: "kakaotalk://launch",
  url: "https://changwon.pages.dev",
  domain: "changwon.pages.dev",
  city: "창원시",
  district: "성산구",
  region: "경상남도",
  country: "대한민국",
  description:
    "창원 룰루랄라 나이트 공식 사이트. 창원시 성산구 상남동 22-4 지하 3층, 19세 이상 합법 영업장. 예약 문의 가능.",
  shortDescription:
    "창원 룰루랄라 나이트. 상남동 22-4 지하 3층, 19세 이상 합법 영업장.",
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
  kakaoChannel: "besta12",
  businessNumber: PLACEHOLDER,
  instagram: "https://www.instagram.com/rulruralra_nightclub_",
  instagramAlt: "https://www.instagram.com/lulu__lala._.cw",
  naverPlace: PLACEHOLDER,
  kakaoMap: PLACEHOLDER,
} as const;

export const NAV = [
  { href: "/", label: "홈" },
  { href: "/about", label: "가게 소개" },
  { href: "/jjanggu", label: "매니저" },
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
    title: "창원 룰루랄라 나이트 공식 사이트",
    description:
      "창원 룰루랄라 나이트 공식. 창원시 성산구 상남동 22-4 지하 3층, 19세 이상 합법 영업장.",
    hook: "처음이라 어색해도 괜찮습니다. 카카오톡 한 통이면 끝납니다.",
    capsule:
      "창원 룰루랄라 나이트는 창원시 성산구 상남동 22-4 지하 3층의 19세 이상 합법 영업장이며, 매장 문의로 예약을 안내합니다.",
  },
  "/about": {
    title: "어떤 가게냐고요? — 창원 룰루랄라 나이트 소개",
    description:
      "사업자 등록 보유 합법 나이트 클럽, 19세 이상 신분증 확인 매장. 매니저가 사람 보고 자리 잡는 곳. 처음 오시는 분은 부담 적은 자리, 단체는 한 자리에 모이게.",
    hook: "어떤 가게인지 한 문장으로 — 매니저가 사람 보고 자리 잡는 곳입니다.",
    capsule:
      "창원 룰루랄라 나이트는 2019년 개업한 사업자 등록 보유 합법 나이트 클럽이고, 매니저가 인원과 분위기를 보고 자리와 예약을 직접 배정합니다.",
  },
  "/jjanggu": {
    title: "매니저 소개 — 창원 룰루랄라 나이트",
    description:
      "매니저가 직접 응대합니다. 가격·자리·시간을 한 번에 안내합니다. 처음 오시는 분 더 환영합니다.",
    hook: "잘 모르는 매장에 처음 연락하기 부담되시죠? 카카오톡으로 편하게 물어보세요.",
    capsule:
      "창원 룰루랄라 나이트 매니저는 직접 응대하며 손님에게 맞는 자리와 가격을 안내합니다.",
  },
  "/price": {
    title: "가격 솔직 공개 — 도착 후 '몰랐던 추가요금' 0원",
    description:
      "인원·옵션·시간대에 따라 다릅니다. 카카오톡 한 통에 정확한 금액을 묶어 안내. 부풀리지 않고, 흥정 없이, 도착 후 추가 요금 0원.",
    hook: "가격은 매번 정확히 말씀드립니다. 카카오톡으로 물어보는 게 가장 빨라요.",
    capsule:
      "창원 룰루랄라 나이트 가격은 인원·옵션·시간대에 따라 다르며, 매장 문의로 정확한 금액을 안내합니다.",
  },
  "/location": {
    title: "오시는 길 — 상남동 22-4 지하 3층 · 입구까지 잡아드립니다",
    description:
      "창원시 성산구 상남동 22-4 지하 3층(모아엔트몰), 도로명 마디미로43번길 10. 처음이라 헤매시면 매장에 연락 주세요.",
    hook: "처음이라 위치 헷갈리면, 카카오톡으로 연락 주세요. 입구 잡아드립니다.",
    capsule:
      "창원 룰루랄라 나이트는 경상남도 창원시 성산구 상남동 22-4 지하 3층, 도로명 마디미로43번길 10에 위치하며 도착 직전 카카오톡으로 안내받을 수 있습니다.",
  },
  "/reserve": {
    title: "예약 30초 — 앱 없음, 회원가입 없음, 결제등록 없음",
    description:
      "문의 한 번이면 끝납니다. 인원·날짜·시간 → 자리 확정. 처음 오시는 분도 30초면 끝납니다. 진짜로.",
    hook: "예약은 진짜 카카오톡 한 번입니다. 어렵게 생각하지 마세요.",
    capsule:
      "창원 룰루랄라 나이트 예약은 인원·날짜·시간을 알려주면 한 번에 자리가 확정됩니다.",
  },
  "/review": {
    title: "후기 — 가짜 별점·자작 후기·알바 평가 일체 없음",
    description:
      "받은 후기 그대로. 좋은 말도, 불리한 말도 가리지 않습니다. 평균 별점 부풀리지 않고, 단골 수 거짓말 안 합니다. 거짓 평점 없는 사이트가 되겠다는 약속.",
    hook: "거짓말 안 합니다. 받은 후기만 그대로 올립니다.",
    capsule:
      "창원 룰루랄라 나이트 후기 페이지에는 실제 손님이 매장에 직접 남긴 후기만 게시되며, 가짜 별점이나 조작 평가는 일절 사용하지 않습니다.",
  },
  "/photo": {
    title: "매장 사진 — 합성·필터과다·외부 이미지 0장",
    description:
      "전부 우리 가게 진짜 사진. 매니저가 직접 찍거나 손님이 허락하고 찍어준 컷만. 다른 가게 사진 가져다 쓰지 않습니다. '사진이랑 다르네' 소리 안 나는 매장.",
    hook: "보여드리는 사진은 전부 우리 가게입니다. 다른 가게 사진 안 씁니다.",
    capsule:
      "창원 룰루랄라 나이트 사진은 모두 실제 매장 내·외부를 직접 촬영한 이미지이며, 외부 가게 사진이나 합성 이미지를 사용하지 않습니다.",
  },
  "/news": {
    title: "오늘 영업해요? — 헛걸음 막는 매장 공식 공지",
    description:
      "임시 휴무·영업시간 변경·입구/주차 변동을 사이트에 가장 먼저 게시. 출발 전 30초 확인이면 헛걸음 안 합니다.",
    hook: "가실 때 헛걸음하지 마시라고, 여기 먼저 적어둡니다.",
    capsule:
      "창원 룰루랄라 나이트 소식 페이지는 임시 휴무·영업시간 변경·이벤트 공지를 매장 측에서 직접 사전에 안내하는 자리입니다.",
  },
  "/faq": {
    title: "자주 묻는 질문 — 카카오톡 전에 30초면 끝",
    description:
      "예약·가격·위치·연령·결제·주차·드레스코드까지. 매니저가 매일 받는 질문 그대로, 광고 문장 빼고 솔직하게 정리. 카카오톡 하기 전 한 번 훑으면 더 빠릅니다.",
    hook: "카카오톡 하기 전에 한 번 보고 오시면 더 빠릅니다.",
    capsule:
      "창원 룰루랄라 나이트 FAQ는 예약·가격·연령·결제·주차 등 매니저가 평소 받는 질문을 그대로 정리한 페이지입니다.",
  },
  "/around": {
    title: "오기 전 어디서 먹고, 끝나고 어디서 자나 — 동선 정리",
    description:
      "매장 인근 식사·해장·숙소·대리·24시 카페까지. 광고비 받고 끼워 넣지 않고 직접 다녀본 곳만. 창원 처음이신 분 위한 '하루 동선' 가이드.",
    hook: "오기 전에 뭐 먹고, 끝나고 어디 갈지 — 정리해 둡니다.",
    capsule:
      "창원 룰루랄라 나이트 주변 페이지는 매장 인근 식당·숙소·대리 정보를 모아 손님의 방문 전후 동선을 미리 잡을 수 있도록 안내합니다.",
  },
  "/event": {
    title: "이벤트 — '하지 않는 할인'은 광고에 안 적습니다",
    description:
      "진행 중인 혜택만 게시. 종료된 이벤트는 즉시 내림. '30% 할인' 같은 거짓 광고 일체 없음. 사이트 보고 오셨다가 '그런 거 없는데요' 듣는 일 없습니다.",
    hook: "'30% 할인' 같은 거짓말 안 씁니다. 하는 것만 올립니다.",
    capsule:
      "창원 룰루랄라 나이트 이벤트 페이지에는 현재 매장에서 실제로 진행 중인 혜택만 게시되며, 종료된 이벤트는 바로 내려갑니다.",
  },
  "/vip": {
    title: "VIP 룸 — 사람 보고 자리 잡는, 매니저가 직접 배정",
    description:
      "VIP 룸은 인원·분위기·일행 구성 보고 매니저가 직접 배정. 별도 동선 가능 여부, 룸 컨디션, 가용 시간대는 카카오톡 한 번에 정확히. 운영 시점 기준 솔직 안내.",
    hook: "VIP 자리는 사람 봐서 잡아드립니다. 일단 카카오톡 주세요.",
    capsule:
      "창원 룰루랄라 나이트 VIP 룸은 실제 운영 시점에만 안내하며, 자리 배정은 매니저가 인원과 상황을 보고 직접 결정합니다.",
  },
  "/contact": {
    title: "문의 — 창원 룰루랄라 나이트",
    description:
      "매니저가 직접 응대. 예약·가격·길 안내·VIP 룸 — 한 번에 다 답 나옵니다.",
    hook: "편하게 문의하세요.",
    capsule:
      "창원 룰루랄라 나이트 문의는 매니저가 직접 응대합니다.",
  },
};
