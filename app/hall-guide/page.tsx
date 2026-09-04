import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { HALL_CSS } from "@/components/HallPage";
import OgThumb from "@/components/OgThumb";
import { HALL_UPDATED, hallPath } from "@/lib/hall";
import { HALL_BY_SLUG, HALL_REGIONS, HALL_VENUES } from "@/lib/hall-data";
import { hallViewport } from "@/lib/hall-meta";
import { SITE } from "@/lib/site";
import { thumb } from "@/lib/og";
import { ADS } from "@/lib/venues";

const TITLE = "전국 나이트 홀 도감 40 — 자리에 따라 달라지는 밤";
const DESCRIPTION =
  "전국 나이트 40곳을 공간 축으로 정리한 홀 도감입니다. 입구·플로어·테이블 구역·부스 구역을 같은 순서로 읽고, 확인된 사실과 일반적인 홀 기준을 적었습니다.";

const THUMB = thumb({
  pathname: "/hall-guide/",
  alt: `${SITE.nameNoSpace} 전국 나이트 홀 도감 40 — 입구·플로어·테이블·부스`,
});

export const viewport: Viewport = hallViewport;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "전국 나이트",
    "나이트 홀 구조",
    "나이트 자리",
    "나이트 부스",
    "나이트 테이블",
    ...HALL_VENUES.slice(0, 12).map((v) => v.keyword),
  ],
  alternates: { canonical: "/hall-guide" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: `${SITE.url}/hall-guide`,   /* ★ /hall 은 주소교체로 버려져 404 다 */
    siteName: SITE.name,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
  other: {
    "dc.title": "전국 나이트 홀 도감 40",
    "dc.subject": "나이트 홀 구조 · 좌석 도감",
    "dc.language": "ko-KR",
    "twitter:label1": "수록 홀",
    "twitter:data1": "40곳",
    "twitter:label2": "정리 기준",
    "twitter:data2": "입구·플로어·테이블·부스",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE.url}/hall-guide#collection`,
      name: "전국 나이트 홀 도감 40",
      description: DESCRIPTION,
      url: `${SITE.url}/hall-guide`,   /* ★ /hall 은 주소교체로 버려져 404 다 */
      inLanguage: "ko-KR",
      dateModified: HALL_UPDATED,
    },
    {
      "@type": "ItemList",
      "@id": `${SITE.url}/hall-guide#itemlist`,
      name: "전국 나이트 홀 도감 40",
      numberOfItems: HALL_VENUES.length,
      itemListElement: HALL_VENUES.map((v, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: v.keyword,
        url: `${SITE.url}${hallPath(v.slug)}`,
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE.url}/hall-guide#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "창원에서 성공하는 방법", item: SITE.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "전국 나이트 홀 도감 40",
          item: `${SITE.url}/hall-guide`,
        },
      ],
    },
  ],
};

export default function HallHubPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HALL_CSS }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="hall">
        <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
          <nav aria-label="현재 위치" className="mb-5 text-xs text-[#C9AFA8]">
            <Link href="/">홈</Link>
            <span className="px-1.5">›</span>
            <span>전국 나이트 홀 도감 40</span>
          </nav>

          <header className="mb-8">
            <p className="plan-label">HALL INDEX · 40</p>
            <h1 className="mt-2">전국 나이트 홀 도감 40</h1>
            <p className="mt-4 text-[15px] sm:text-base">
              같은 밤이라도 어디에 앉느냐에 따라 완전히 다른 시간이 흐릅니다.
              이 도감은 전국 나이트 40곳을 오직 공간 축으로만 읽습니다. 무대와
              플로어, 테이블 구역과 부스 구역이 어떻게 나뉘고, 그 나뉨이 자리마다
              무엇을 바꾸는지 같은 순서로 정리했습니다.
            </p>
          </header>


          <section className="plan">
            <p className="plan-label">이 도감이 지키는 세 가지</p>
            <ol className="mt-3 space-y-2 text-[15px]">
              <li className="flex gap-3">
                <span className="serif shrink-0 text-[#C9A227]">1.</span>
                <span>
                  주소·역·층·연령처럼 공개 정보로 확인된 것만 사실 표에 단정해
                  적습니다.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="serif shrink-0 text-[#C9A227]">2.</span>
                <span>
                  내부 배치는 확인할 수 없으므로 &ldquo;일반적인 나이트 홀
                  기준&rdquo;이라고 분명히 구분해 서술합니다.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="serif shrink-0 text-[#C9A227]">3.</span>
                <span>
                  확인되지 않은 항목은 지어내지 않고 비워 둡니다. 후기·별점·요금은
                  싣지 않습니다.
                </span>
              </li>
            </ol>
          </section>

          <section className="mt-10">
            <h2>홀을 읽는 순서</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {[
                ["입구", "거리에서 홀까지의 완충 구간. 그날 밀도의 예고편."],
                ["플로어", "무대 정면의 서 있는 공간. 홀의 온도를 정한다."],
                ["테이블", "시야와 대화를 맞바꾸는 구간. 인원이 기준."],
                ["부스", "벽을 등지는 고정석. 안정을 얻고 우연을 내준다."],
              ].map(([zone, desc]) => (
                <div key={zone} className="plan">
                  <span className="zone-tag">{zone}</span>
                  <p className="mt-3 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {HALL_REGIONS.map((group) => (
            <section key={group.label} className="mt-12">
              <h2>
                {group.label}{" "}
                <span className="text-sm text-[#C9AFA8]">
                  {group.slugs.length}곳
                </span>
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {group.slugs.map((slug) => {
                  const v = HALL_BY_SLUG[slug];
                  if (!v) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={hallPath(slug)}
                        className="block border border-[#7A3247] bg-[#3B0F1D] p-4 transition hover:border-[#C9A227]"
                      >
                        <p className="serif font-bold text-[#E8C766]">
                          {v.keyword}
                        </p>
                        <p className="mt-1 text-xs text-[#C9AFA8]">
                          {v.areaLabel} · {v.hallType}
                        </p>
                        <p className="mt-2 text-sm">{v.oneline}</p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}

          <section className="mt-12 border border-[#7A3247] p-5 text-sm text-[#C9AFA8]">
            <h2 className="!mt-0 !text-sm !text-[#C9AFA8]">이용 안내</h2>
            <ul className="mt-2 space-y-1.5">
              <li>
                · 각 페이지는 해당 업소의 홀 구조를 정리한 안내 문서이며 업소
                공식 홈페이지가 아닙니다.
              </li>
              <li>· 성인 대상 홀입니다. 입장 시 신분증 확인이 있을 수 있습니다.</li>
              <li>
                · 요금·후기·별점은 싣지 않습니다. 확인되지 않은 주소와 영업시간도
                적지 않습니다.
              </li>
              <li>· 음주 후에는 운전하지 마시고 대리운전을 이용해 주세요.</li>
            </ul>
            <p className="mt-4 text-xs">
              마지막 정리 <time dateTime={HALL_UPDATED}>2026년 8월 17일</time>
            </p>
          </section>
              {/* ★ 2026-08-31 — 관계·연령 고지 (설계도 4장) */}
      <p className="mt-3 text-[13px] leading-7 text-gray-400">
        성인(만 19세 이상) 대상 홀을 정리한 안내입니다. 업소로부터 대가를 받지 않았습니다.
      </p>
</main>
      </div>

      <div className="hallbar" role="complementary" aria-label="광고 문의">
        <span>
          광고문의 카톡 <b>{ADS.kakao}</b>
        </span>
      </div>
    </>
  );
}
