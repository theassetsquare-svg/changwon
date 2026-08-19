import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import JsonLd from "@/components/JsonLd";
import { SITE, SITE_OTHER } from "@/lib/site";
import { thumb } from "@/lib/og";

/** 루트 기본 썸네일 — 개별 페이지는 각자 자기 파일로 덮어쓴다 */
const ROOT_THUMB = thumb({
  pathname: "/",
  alt: `${SITE.nameNoSpace} 공식 사이트 · ${SITE.lotto} ${SITE.lottoPhoneDash}`,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.nameNoSpace} 공식 사이트 — 상남동 27세 이상 합법 영업장`,
    template: `%s`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: SITE.name,
  authors: [{ name: "매니저", url: `${SITE.url}/jjanggu` }],
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
    images: ROOT_THUMB.images,
  },
  twitter: {
    card: "summary",
    title: `${SITE.nameNoSpace} 공식 사이트 — 상남동 27세 이상 합법 영업장`,
    description: SITE.description,
    images: [ROOT_THUMB.url],
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
      "naver-site-verification": "1e8cbbc64b5bb55288b135f25772d1b5005f89fe",
    },
  },
  other: { ...SITE_OTHER, ...ROOT_THUMB.other },
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
        <link rel="alternate" hrefLang="ko-KR" href={SITE.url} />
        <link rel="alternate" hrefLang="ko" href={SITE.url} />
        <link rel="alternate" hrefLang="x-default" href={SITE.url} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE.name} RSS`}
          href="/feed.xml"
        />
      </head>
      <body>
        <JsonLd />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
