import type { Metadata } from "next";
import Link from "next/link";
import StickyCallBar from "@/components/StickyCallBar";
import KakaoIdCopy from "@/components/KakaoIdCopy";
import OgThumb from "@/components/OgThumb";
import { SITE, SITE_OTHER_NOPHONE } from "@/lib/site";
import { thumb } from "@/lib/og";
import { ADS } from "@/lib/venues";
import { AD_VENUES } from "@/lib/adnight-data";
import { nightPath } from "@/lib/adnight";

const TITLE = "전국 나이트 예약 문의 — 지역별 담당자 연락처 모음";
const DESCRIPTION =
  "불광동호박나이트·울산챔피언나이트·청담나이트 등 전국 나이트 예약 문의처를 지역별로 정리했습니다. 담당자 등록 전인 지역은 광고주를 모집합니다. 광고문의 카톡 besta12. 만 19세 이상, 입장 시 신분증 확인.";

const THUMB = thumb({
  pathname: "/night-guide/",
  alt: `${SITE.nameNoSpace} 전국 나이트 예약 문의 — 지역별 담당자 연락처`,
});

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: AD_VENUES.flatMap((v) => [v.keyword, v.spaced]),
  alternates: { canonical: "/night-guide" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: `${SITE.url}/night-guide`,   /* ★ /night 는 주소교체로 버려져 404 다 */
    title: TITLE,
    description: DESCRIPTION,
    images: THUMB.images,
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    images: [THUMB.url],
  },
  other: { ...SITE_OTHER_NOPHONE, ...THUMB.other },
};

const FAQ = [
  {
    q: "전국 나이트 예약 문의는 어떻게 하나요?",
    a: "원하는 지역의 페이지에 들어가면 등록된 예약 담당자 연락처를 확인할 수 있습니다. 담당자에게 인원·날짜·도착 예정 시간을 전달하시면 자리를 안내받을 수 있습니다. 아직 담당자가 등록되지 않은 지역은 그 사실을 페이지에 그대로 표시합니다.",
  },
  {
    q: "광고 문의는 어디로 하나요?",
    a: "카카오톡 아이디 besta12로 문의하시면 됩니다. 업소 등록·페이지 노출 등 광고 상담 전용 채널이며, 손님 예약 문의는 받지 않습니다.",
  },
  {
    q: "나이트 입장 연령 제한은 어떻게 되나요?",
    a: "만 19세 이상만 입장할 수 있습니다. 입장 시 신분증을 확인하며 미성년자는 출입할 수 없습니다.",
  },
  {
    q: "예약할 때 선결제나 회원가입이 필요한가요?",
    a: "필요 없습니다. 담당자에게 인원·날짜·시간만 전달하시면 됩니다.",
  },
];

export default function NightIndexPage() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE.url}/night-guide`,
        url: `${SITE.url}/night-guide`,   /* ★ /night 는 주소교체로 버려져 404 다 */
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "ko-KR",
        isPartOf: { "@id": `${SITE.url}/#website` },
        dateModified: SITE.lastModified,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: SITE.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "전국 나이트 예약 문의",
            item: `${SITE.url}/night-guide`,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: TITLE,
        numberOfItems: AD_VENUES.length,
        itemListElement: AD_VENUES.map((v, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: v.keyword,
          url: `${SITE.url}${nightPath(v.slug)}`,
        })),
      },
      {
        "@type": "FAQPage",
        inLanguage: "ko-KR",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />

      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <nav aria-label="현재 위치" className="mb-5 text-xs text-gray-500">
          <Link href="/" className="hover:text-gold">
            홈
          </Link>
          <span className="px-1.5">›</span>
          <span className="text-gray-300">전국 나이트 예약 문의</span>
        </nav>

        <header className="fade-up mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
            지역별 예약 담당자 연락처
          </p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            전국 나이트 예약 문의
          </h1>
          <p className="mt-3 text-base text-gray-300 sm:text-lg">
            지역을 고르시면 그 업소 예약 담당자 연락처가 바로 나옵니다.
          </p>
        </header>

        <aside
          className="mb-8 rounded-2xl border border-gold/40 bg-gold/5 p-5 text-[15px] leading-7 sm:text-base"
          aria-label="한 줄 요약"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-gold">
            한 줄 요약
          </p>
          <p className="mt-2 text-gray-100">
            전국 {AD_VENUES.length}개 지역 나이트를 지역·업소별로 정리했습니다.
            담당자가 등록된 곳은 연락처가 바로 표시되고, 등록 전인 곳은 그 사실을
            그대로 적어둡니다. 만 19세 이상만 입장 가능합니다.
          </p>
        </aside>

        {/* 썸네일 — og:image 와 같은 파일을 본문에도 실제로 렌더한다 */}
        <figure className="mb-8">
          <OgThumb pathname="/night-guide/" alt={THUMB.alt} />
        </figure>

        {/* 전국 나이트 안내 13곳 — 목록에서 1단계로 바로 도달 */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
            지역별 나이트 안내 13곳
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {AD_VENUES.map((v) => (
              <li key={v.slug}>
                <Link
                  href={nightPath(v.slug)}
                  className="flex h-full flex-col rounded-xl border border-line bg-elev p-4 transition hover:border-gold hover:bg-elev2"
                >
                  <p className="text-base font-extrabold text-gold">
                    {v.keyword}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{v.areaLabel}</p>
                  <p className="mt-2 text-sm text-gray-300">{v.suffix}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">창원 지역</h2>
          <p className="mt-2 text-[15px] leading-7 text-gray-200 sm:text-base sm:leading-8">
            창원은 이 사이트의 본 페이지에서 직접 안내하고 있습니다.
          </p>
          <Link
            href="/"
            className="mt-3 inline-block rounded-xl border border-gold/40 bg-elev px-4 py-3 text-sm font-bold text-gold transition hover:bg-elev2"
          >
            창원룰루랄라나이트 안내 보기 →
          </Link>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-white">자주 묻는 질문</h2>
          <div className="space-y-2">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="rounded-2xl border border-line bg-elev p-4 transition open:border-gold"
              >
                <summary className="pr-8 font-semibold text-white">
                  {f.q}
                </summary>
                <p className="mt-3 text-gray-300">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-gold/40 bg-gold/5 p-5">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gold">
            광고 문의
          </h2>
          <p className="mt-2 text-[15px] text-gray-100">
            업소 등록·페이지 노출 문의는 카카오톡으로 받습니다. 광고 상담 전용
            채널이며 손님 예약 문의는 받지 않습니다.
          </p>
          <KakaoIdCopy
            id={ADS.kakao}
            label="광고문의 카톡"
            className="mt-3 inline-flex items-center rounded-xl bg-gold px-4 py-3 text-lg font-extrabold text-bg"
          />
        </section>

        <section className="mt-10 rounded-2xl border border-line bg-elev p-5 text-sm text-gray-400">
          <h2 className="mb-2 text-sm font-bold text-gray-300">이용 안내</h2>
          <ul className="space-y-1.5">
            <li>· 본 페이지는 각 업소의 예약·문의 안내 페이지입니다.</li>
            <li>· 만 19세 미만 청소년은 출입할 수 없습니다.</li>
            <li>· 입장 시 신분증 확인이 이루어집니다.</li>
            <li>· 음주 후에는 운전하지 마시고 대리운전을 이용해 주세요.</li>
          </ul>
        </section>
      </main>

      <StickyCallBar name="광고문의" kakao={ADS.kakao} contextLabel="전국 나이트 예약 문의" />
      {/* ★ 전체 목록 — 허브가 모든 가게 페이지를 링크해야 네이버가 전부 찾아간다 */}
      <nav className="nl-all" aria-label="전국 나이트 전체 목록" style={{ maxWidth: 900, margin: "48px auto 40px", padding: "22px 18px", borderTop: "1px solid rgba(128,128,128,.28)" }}>
        <h2 style={{ fontSize: "1.05rem", margin: "0 0 14px" }}>전국 나이트 전체 목록 (53곳)</h2>
        <h3 style={{ fontSize: ".95rem", margin: "16px 0 8px", opacity: .75 }}>서울</h3>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: "8px 16px", fontSize: ".92rem" }}>
          <li><a href="/gangseo-hobak-night/">강서호박나이트</a></li>
          <li><a href="/gildong-chance-night/">길동찬스나이트</a></li>
          <li><a href="/nowon-hobak-night/">노원호박나이트</a></li>
          <li><a href="/dapsimni-miracle-night/">답십리미라클나이트</a></li>
          <li><a href="/doksan-gukbingwan-night/">독산동국빈관나이트</a></li>
          <li><a href="/night/sangbong-hangukgwan-night/">상봉동한국관나이트</a></li>
          <li><a href="/sangbong-hangukgwan-night/">상봉동한국관나이트</a></li>
          <li><a href="/seongnam-shampoo-night/">성남샴푸나이트</a></li>
          <li><a href="/suyu-shampoo-night/">수유샴푸나이트</a></li>
          <li><a href="/suyu-shampoo-night-1/">수유샴푸나이트</a></li>
          <li><a href="/night/sillim-grandprix-night/">신림그랑프리나이트</a></li>
          <li><a href="/sillim-grandprix-night/">신림그랑프리나이트</a></li>
          <li><a href="/yeongdeungpo-terminal-night/">영등포터미널나이트</a></li>
          <li><a href="/cheongdam-night/">청담나이트</a></li>
          <li><a href="/cheongdam-night-1/">청담나이트</a></li>
        </ul>
        <h3 style={{ fontSize: ".95rem", margin: "16px 0 8px", opacity: .75 }}>경기·인천</h3>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: "8px 16px", fontSize: ".92rem" }}>
          <li><a href="/guri-hobak-night/">구리호박나이트</a></li>
          <li><a href="/bucheon-gorae-night/">부천고래나이트</a></li>
          <li><a href="/suwon-chancedome-night/">수원찬스돔나이트</a></li>
          <li><a href="/suwon-chancedome-night-1/">수원찬스돔나이트</a></li>
          <li><a href="/suwon-korea-night/">수원코리아나이트</a></li>
          <li><a href="/ansan-hit-night/">안산히트나이트</a></li>
          <li><a href="/ansan-hit-night-1/">안산히트나이트</a></li>
          <li><a href="/osan-hobak-night/">오산호박나이트</a></li>
          <li><a href="/uijeongbu-baekakgwan-night/">의정부백악관나이트</a></li>
          <li><a href="/uijeongbu-hangukgwan-night/">의정부한국관나이트</a></li>
          <li><a href="/indeogwon-gukbingwan-night/">인덕원국빈관나이트</a></li>
          <li><a href="/incheon-arabian-night/">인천아라비안나이트</a></li>
          <li><a href="/ilsan-shampoo-night/">일산샴푸나이트</a></li>
          <li><a href="/ilsan-shampoo-night-1/">일산샴푸나이트</a></li>
          <li><a href="/paju-skydome-night/">파주야당스카이돔나이트</a></li>
          <li><a href="/pyeongtaek-hobak-night/">평택호박나이트</a></li>
        </ul>
        <h3 style={{ fontSize: ".95rem", margin: "16px 0 8px", opacity: .75 }}>충청</h3>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: "8px 16px", fontSize: ".92rem" }}>
          <li><a href="/night/daejeon-seven-night/">대전세븐나이트</a></li>
          <li><a href="/daejeon-seven-night/">대전세븐나이트</a></li>
          <li><a href="/daejeon-one-night/">대전원나이트</a></li>
          <li><a href="/hall/daejeon-one/">대전원나이트</a></li>
          <li><a href="/seosan-hobak-night/">서산호박나이트</a></li>
          <li><a href="/cheonan-stardome-night/">천안스타돔나이트</a></li>
          <li><a href="/cheonan-korea-night/">천안코리아나이트</a></li>
          <li><a href="/cheongju-hobak-night/">청주호박나이트</a></li>
        </ul>
        <h3 style={{ fontSize: ".95rem", margin: "16px 0 8px", opacity: .75 }}>영남</h3>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: "8px 16px", fontSize: ".92rem" }}>
          <li><a href="/gumi-hobak-night/">구미호박나이트</a></li>
          <li><a href="/hall/daegu-hobak/">대구호박나이트</a></li>
          <li><a href="/night/busan-asiad-night/">부산아시아드나이트</a></li>
          <li><a href="/busan-asiad-night/">부산아시아드나이트</a></li>
          <li><a href="/ulsan-newworld-night/">울산뉴월드나이트</a></li>
          <li><a href="/ulsan-champion-night/">울산챔피언나이트</a></li>
          <li><a href="/ulsan-champion-night-1/">울산챔피언나이트</a></li>
          <li><a href="/changwon-lululala-night/">창원룰루랄라나이트</a></li>
          <li><a href="/changwon-lululala-night-1/">창원룰루랄라나이트</a></li>
        </ul>
        <h3 style={{ fontSize: ".95rem", margin: "16px 0 8px", opacity: .75 }}>호남·제주</h3>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: "8px 16px", fontSize: ".92rem" }}>
          <li><a href="/hall/gwangju-sangmu/">광주상무나이트</a></li>
          <li><a href="/gwangju-cheomdan-night/">광주첨단나이트</a></li>
          <li><a href="/jeju-night/">제주도나이트</a></li>
        </ul>
        <h3 style={{ fontSize: ".95rem", margin: "16px 0 8px", opacity: .75 }}>그 밖의 지역</h3>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: "8px 16px", fontSize: ".92rem" }}>
          <li><a href="/bulgwang-hobak-night/">불광동호박나이트</a></li>
          <li><a href="/hall/bulgwang-hobak/">불광동호박나이트</a></li>
        </ul>
      </nav>
    </>
  );
}
