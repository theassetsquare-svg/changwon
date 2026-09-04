import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
/* ★2026-08-25 — JsonLd 를 여기(= 모든 페이지)에서 뺐다.
   JsonLd 는 창원룰루랄라나이트의 신원(이름·전화 010-7528-4936·예약방법)을 담고 있는데
   layout 에 있으면 일산샴푸·부산아시아드 같은 **남의 가게 페이지에도 그대로 찍힌다.**
   실측 53페이지에서 로또 번호가 새고 있었고, 네이버가 그 페이지를 창원룰루랄라 페이지로
   오인할 수 있어 "가게이름 검색 상위노출" 목표에 정면으로 어긋난다.
   → 홈(app/page.tsx)과 창원룰루랄라 자기 페이지 13개(PageShell)에서만 렌더한다. */
import { SITE, SITE_OTHER_NOPHONE } from "@/lib/site";
import { thumb } from "@/lib/og";

/** 루트 기본 썸네일 — 개별 페이지는 각자 자기 파일로 덮어쓴다 */
const ROOT_THUMB = thumb({
  pathname: "/",
  alt: `${SITE.nameNoSpace} 공식 사이트 · ${SITE.lotto} ${SITE.lottoPhoneDash}`,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  /* 2026-09-05 S3 — 파비콘은 정적 파일 + 절대 주소(네이버 「파비콘」 가이드: 절대 경로 · 같은 rel 1개). app/icon.tsx·apple-icon.tsx(상대 /icon?hash) 는 지웠다. */
  icons: {
    icon: [{ url: "https://g.nolcool.com/favicon.png", type: "image/png", sizes: "64x64" }],
    shortcut: ["https://g.nolcool.com/favicon.ico"],
    apple: [{ url: "https://g.nolcool.com/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  title: {
    default: `${SITE.nameNoSpace} 공식 사이트 — 상남동 27세 이상 합법 영업장`,
    template: `%s`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: SITE.name,
  authors: [{ name: "매니저", url: `${SITE.url}/lotto` }],
  creator: "매니저",
  publisher: SITE.name,
  category: "Local Business",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: `${SITE.name} RSS` },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.nameNoSpace} 공식 사이트 — 상남동 27세 이상 합법 영업장`,
    description: SITE.description,
  },
  twitter: {
    card: "summary",
    title: `${SITE.nameNoSpace} 공식 사이트 — 상남동 27세 이상 합법 영업장`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: true },
  verification: {
    google: "HJjm7MRxykCQ7d_9L7glaTeeaWrmJIzAKY0BcNcfm88",
    other: {
      // ★ 배열로 준다 — 값 하나만 두면 인증 태그도 하나만 나온다.
      //   Next.js 는 배열이면 같은 name 의 meta 를 원소 수만큼 만들어 준다.
      "naver-site-verification": [
        "1e8cbbc64b5bb55288b135f25772d1b5005f89fe",
        "bc5c05687d39b1237cd8bfc49f07524141c467aa",
      ],
    },
  },
  /* ★ 홈 순수성(2026-08-31): ROOT_THUMB.other 에는 og:image:alt 로 가게이름·번호가 들어간다. 뺀다. */
  other: { ...SITE_OTHER_NOPHONE },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko-KR">
      <head>
        {/* 2026-09-05 S3 — hreflang 3줄 제거: 모든 쪽이 홈을 가리켜 자기 주소가 아니었다(유사문서 표 U-064). 한국어 단일 사이트라 hreflang 불필요 */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE.name} RSS`}
          href="/feed.xml"
        />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
