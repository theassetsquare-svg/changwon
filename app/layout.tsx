import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import MobileCallBar from "@/components/MobileCallBar";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} 공식 사이트`,
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
    title: `${SITE.name} 공식 사이트`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} 공식 사이트`,
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
      "naver-site-verification": "f0a71234d6699a73a4134c4ad4532a0358588111",
    },
  },
  other: {
    "geo.region": "KR-48",
    "geo.placename": "창원시 성산구 상남동",
    "geo.position": `${SITE.geo.latitude};${SITE.geo.longitude}`,
    ICBM: `${SITE.geo.latitude}, ${SITE.geo.longitude}`,
    "naver-site-verification": "f0a71234d6699a73a4134c4ad4532a0358588111",
    "dc.title": SITE.name,
    "dc.creator": "매니저",
    "dc.subject": "창원 룰루랄라 나이트",
    "dc.language": "ko-KR",
    "og:locality": "창원시",
    "og:region": "경상남도",
    "og:country-name": "대한민국",
    "twitter:label1": "카카오톡",
    "twitter:data1": SITE.kakao,
    "twitter:label2": "문의",
    "twitter:data2": "광고문의",
  },
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
        <Header />
        {children}
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
