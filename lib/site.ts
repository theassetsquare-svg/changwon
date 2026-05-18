export const SITE = {
  name: "창원 룰루랄라 나이트",
  shortName: "룰루랄라 나이트",
  manager: "짱구",
  phone: "010-3854-6887",
  phoneIntl: "+82-10-3854-6887",
  phoneHref: "tel:010-3854-6887",
  url: "https://changwon-lululalala.com",
  domain: "changwon-lululalala.com",
  city: "창원시",
  region: "경상남도",
  description:
    "창원 룰루랄라 나이트 공식 사이트. 짱구가 직접 전화 받습니다. 010-3854-6887. 19세 이상 합법 영업장.",
  keywords: [
    "창원 룰루랄라",
    "창원 룰루랄라 나이트",
    "창원 나이트",
    "창원 나이트 짱구",
    "창원 룰루랄라 짱구",
    "창원 룰루랄라 예약",
    "창원 나이트 예약",
    "창원 클럽",
    "창원 클럽 짱구",
  ],
} as const;

export const PLACEHOLDER = "[입력필요]";

export const PLACEHOLDERS = {
  address: PLACEHOLDER,
  addressDetail: PLACEHOLDER,
  hoursWeekday: PLACEHOLDER,
  hoursWeekend: PLACEHOLDER,
  closedDay: PLACEHOLDER,
  prices: [
    { name: "기본 테이블", price: PLACEHOLDER, note: PLACEHOLDER },
    { name: "VIP 룸", price: PLACEHOLDER, note: PLACEHOLDER },
  ],
  jjangguCareer: PLACEHOLDER,
  kakaoChannel: PLACEHOLDER,
  businessNumber: PLACEHOLDER,
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
  { title: string; description: string; hook: string }
> = {
  "/": {
    title: "창원 룰루랄라 나이트 | 짱구 010-3854-6887",
    description:
      "창원에서 나이트 한 번 가본다는 분들, 그냥 짱구한테 전화 주세요. 010-3854-6887. 제가 직접 받습니다.",
    hook: "처음이라 어색해도 괜찮습니다. 전화 한 통이면 끝납니다.",
  },
  "/about": {
    title: "가게 소개 — 창원 룰루랄라가 어떤 곳인지",
    description:
      "창원에 있는 합법 나이트 클럽 룰루랄라. 짱구가 사람 보고 자리 잡아드립니다. 19세 이상.",
    hook: "어떤 가게인지 한 문장으로 말하면 — 짱구가 챙기는 곳입니다.",
  },
  "/jjanggu": {
    title: "매니저 짱구가 직접 받습니다",
    description:
      "010-3854-6887 누르시면 짱구가 받습니다. 다른 사람 거치지 않고 바로 안내드립니다.",
    hook: "잘 모르는 매장에 처음 전화하기 부담되시죠? 그래서 제가 직접 받습니다.",
  },
  "/price": {
    title: "가격 — 부담 없이 물어보세요",
    description:
      "창원 룰루랄라 나이트 가격 안내. 변동될 때마다 바로 업데이트합니다. 정확한 금액은 전화 한 통.",
    hook: "가격은 매번 정확히 말씀드립니다. 전화로 물어보는 게 가장 빨라요.",
  },
  "/location": {
    title: "오시는 길 — 헤매지 마세요",
    description:
      "창원시 안에서 위치, 주차, 대중교통 안내. 길 잃으셨으면 그냥 짱구한테 전화 주세요.",
    hook: "처음이라 위치 헷갈리면, 전화 주세요. 제가 잡아드립니다.",
  },
  "/reserve": {
    title: "예약 — 30초면 됩니다",
    description:
      "전화 한 통에 인원·날짜·시간만 말씀하시면 끝. 짱구가 자리 맞춰드립니다.",
    hook: "예약은 진짜 30초입니다. 어렵게 생각하지 마세요.",
  },
  "/review": {
    title: "손님 후기 — 받은 것만 올립니다",
    description:
      "실제 매장에서 받은 후기만 게시. 가짜 별점, 가짜 후기 절대 안 씁니다.",
    hook: "거짓말 안 합니다. 받은 후기만 그대로 올립니다.",
  },
  "/photo": {
    title: "매장 사진 — 실제 가게 모습",
    description:
      "창원 룰루랄라 나이트 실제 매장 사진. 합성 X, 외부 이미지 X. 짱구가 찍은 진짜 사진.",
    hook: "보여드리는 사진은 전부 우리 가게입니다. 다른 가게 사진 안 씁니다.",
  },
  "/news": {
    title: "매장 소식 — 영업 변경, 휴무 안내",
    description:
      "갑작스러운 휴무, 행사 변경, 단축 영업 등 알릴 거 있으면 여기 먼저 올립니다.",
    hook: "가실 때 헛걸음하지 마시라고, 여기 먼저 적어둡니다.",
  },
  "/faq": {
    title: "자주 묻는 질문 — 다 모았습니다",
    description:
      "예약·입장·가격·주차·연령 등 짱구한테 가장 많이 받는 질문 정리.",
    hook: "전화하기 전에 한 번 보고 오시면 더 빠릅니다.",
  },
  "/around": {
    title: "주변 안내 — 가기 전, 끝나고",
    description:
      "창원 룰루랄라 인근 식당, 숙소, 대리 안내. 동선 짜기 편하게 정리.",
    hook: "오기 전에 뭐 먹고, 끝나고 어디 갈지 — 정리해 둡니다.",
  },
  "/event": {
    title: "이벤트 — 진짜 하는 것만",
    description:
      "현재 진행 중인 실제 이벤트만 게시. 허위 할인 표기 안 합니다.",
    hook: "‘30% 할인’ 같은 거짓말 안 씁니다. 하는 것만 올립니다.",
  },
  "/vip": {
    title: "VIP 룸 안내",
    description:
      "VIP 룸은 실제 운영할 때만 안내합니다. 수용 인원, 별도 동선 확인.",
    hook: "VIP 자리는 사람 봐서 잡아드립니다. 일단 전화 주세요.",
  },
  "/contact": {
    title: "문의 — 짱구한테 바로",
    description:
      "전화 010-3854-6887. 가장 빠른 답은 전화입니다. 짱구가 직접 받습니다.",
    hook: "문자보다 전화가 10배 빠릅니다.",
  },
};
