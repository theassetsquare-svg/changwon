export const SITE = {
  name: "창원 룰루랄라 나이트",
  manager: "짱구",
  phone: "010-3854-6887",
  phoneIntl: "+82-10-3854-6887",
  phoneHref: "tel:010-3854-6887",
  url: "https://changwon-lululalala.com",
  domain: "changwon-lululalala.com",
  city: "창원시",
  region: "경상남도",
  description:
    "창원 룰루랄라 나이트 공식 사이트. 매니저 짱구 010-3854-6887. 19세 이상 합법 영업장. 예약·문의 환영.",
  keywords: [
    "창원 룰루랄라",
    "창원 룰루랄라 나이트",
    "창원 나이트",
    "창원 나이트 짱구",
    "창원 룰루랄라 짱구",
    "창원 룰루랄라 예약",
    "창원 나이트 예약",
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
