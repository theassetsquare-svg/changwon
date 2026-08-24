import Link from "next/link";
import OgThumb from "./OgThumb";
import { deriveFaqAnswer, nightPath, phoneDigits } from "@/lib/adnight";
import type { AdVenue } from "@/lib/adnight";
import { AD_BY_SLUG } from "@/lib/adnight-data";
import { SITE } from "@/lib/site";
import { ogAbsolute, ogSlug } from "@/lib/og";
import { ADS } from "@/lib/venues";

/** 이 페이지 마지막 정리 시각 (sitemap lastmod 와 함께 관리) */
export const AD_UPDATED = "2026-08-15";

/**
 * [12] 고정 전화바 — position:fixed. 조상에 transform/filter/backdrop-filter 가
 * 걸리면 fixed 기준이 바뀌므로 .callbar 는 반드시 <body> 직계 자식으로 둔다.
 * 이 컴포넌트가 프래그먼트를 반환하고 레이아웃이 {children} 을 body 바로 아래
 * 놓기 때문에 래퍼 div 없이 body 직계가 된다.
 */
const CALLBAR_CSS = `
.callbar{
  position:fixed; left:0; right:0; bottom:0; z-index:99999;
  display:flex; align-items:center; justify-content:center; gap:12px;
  height:64px; box-sizing:content-box;
  padding-bottom:env(safe-area-inset-bottom,0px);
  background:#111; color:#fff; font-weight:800; font-size:18px;
  box-shadow:0 -2px 14px rgba(0,0,0,.35);
  transform:translateZ(0); backface-visibility:hidden;
}
.callbar a{color:#fff; text-decoration:none; display:flex; align-items:center; height:100%;}
.callbar b{color:#F5C451;}
body{ padding-bottom:calc(84px + env(safe-area-inset-bottom,0px)); }
@media(max-width:480px){
  .callbar{height:60px; font-size:16px;}
  body{ padding-bottom:calc(80px + env(safe-area-inset-bottom,0px)); }
}
.answer-box{
  margin:0 0 28px; padding:20px;
  border:1px solid rgba(245,196,81,.45); border-radius:16px;
  background:rgba(245,196,81,.06); color:#F3F4F6; line-height:1.75;
}
`;

function jsonLd(v: AdVenue) {
  const url = `${SITE.url}${nightPath(v.slug)}`;

  const nightClub: Record<string, unknown> = {
    "@type": "NightClub",
    "@id": `${url}#nightclub`,
    name: v.spaced,
    alternateName: v.keyword,
    url,
    /* ★ 썸네일 경로는 lib/og.ts 하나만 쓴다(그 파일의 [원칙 1]).
       예전에는 여기서만 `${v.slug}-og.png` 라는 다른 이름을 만들어 냈다.
       그 이름의 파일은 만들어지지 않아 JSON-LD 의 그림이 404 가 됐다
       (2026-08-24 실측: 창원b 에서 5건). 이제 og:image 와 같은 파일을 가리킨다. */
    image: ogAbsolute(ogSlug(nightPath(v.slug))),
    description: v.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: v.locality,
      addressRegion: v.region,
      addressCountry: "KR",
    },
  };
  if (v.phone) nightClub.telephone = v.phone;
  if (v.openingHours) nightClub.openingHours = v.openingHours;
  if (v.ageFull) nightClub.typicalAgeRange = v.ageFull;

  const faq = v.sections
    .filter((s) => s.faqQ)
    .map((s) => ({
      "@type": "Question",
      name: s.faqQ,
      acceptedAnswer: {
        "@type": "Answer",
        // 화면에 그대로 보이는 문장만 답변으로 쓴다
        text: deriveFaqAnswer(s.body.join(" ")),
      },
    }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      nightClub,
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: "ko-KR",
        mainEntity: faq,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: SITE.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "전국 나이트 예약 문의",
            item: `${SITE.url}/night`,
          },
          { "@type": "ListItem", position: 3, name: v.keyword, item: url },
        ],
      },
    ],
  };
}

export default function AdNightPage({ venue: v }: { venue: AdVenue }) {
  const related = v.related
    .map((s) => AD_BY_SLUG[s])
    .filter(Boolean)
    .slice(0, 4);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CALLBAR_CSS }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(v)) }}
      />

      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <nav aria-label="현재 위치" className="mb-5 text-xs text-gray-500">
          <Link href="/" className="hover:text-gold">
            홈
          </Link>
          <span className="px-1.5">›</span>
          <Link href="/night-guide/" className="hover:text-gold">
            전국 나이트 예약 문의
          </Link>
          <span className="px-1.5">›</span>
          <span className="text-gray-300">{v.keyword}</span>
        </nav>

        <article>
          <header className="fade-up mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
              {v.areaLabel}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              {v.keyword}
            </h1>
            <p className="mt-3 text-sm text-gray-500">
              마지막 정리{" "}
              <time dateTime={AD_UPDATED}>2026년 8월 15일</time>
            </p>
          </header>

          {/* [14] AEO/GEO — AI 답변엔진이 그대로 인용할 수 있는 블록 */}
          <div className="answer-box">
            <p>
              <strong>{v.keyword}</strong>은 {v.areaLabel}에 있는
              나이트클럽입니다. {v.answer2}
            </p>
          </div>

          {/* 썸네일 — og:image 와 같은 파일을 본문에도 실제로 렌더한다 */}
          <figure className="mt-6">
            <OgThumb pathname={nightPath(v.slug)} alt={v.ogAlt} />
          </figure>

          <div className="space-y-5 text-[15px] leading-7 text-gray-200 sm:text-base sm:leading-8">
            {v.lead.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {v.sections.map((s) => (
            <section key={s.h2} className="mt-10">
              <h2 className="text-xl font-bold text-white">{s.h2}</h2>
              <div className="mt-3 space-y-4 text-[15px] leading-7 text-gray-200 sm:text-base sm:leading-8">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {s.list ? (
                  <ul className="space-y-1.5 rounded-2xl border border-line bg-elev p-4 text-[15px]">
                    {s.list.map((li) => (
                      <li key={li}>· {li}</li>
                    ))}
                  </ul>
                ) : null}
                <p className="text-gray-400">{s.bridge}</p>
              </div>
            </section>
          ))}

          <section className="mt-10">
            <h2 className="mb-4 text-xl font-bold text-white">
              {v.keyword} 확인된 기본 정보
            </h2>
            <table className="w-full overflow-hidden rounded-2xl border border-line bg-elev text-left text-[15px]">
              <caption className="sr-only">
                {v.keyword} 기본 정보 — 웹 실사로 확인된 항목만
              </caption>
              <tbody>
                {v.facts.map(([k, val]) => (
                  <tr key={k} className="border-b border-line last:border-0">
                    <th
                      scope="row"
                      className="w-28 px-4 py-3 align-top text-sm font-bold text-gray-400 sm:w-40"
                    >
                      {k}
                    </th>
                    <td className="px-4 py-3 text-gray-100">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-gray-500">
              {v.keyword} 표에는 확인된 항목만 넣었습니다. 여기에 없는 값은
              아직 확인되지 않았다는 뜻입니다.
            </p>
          </section>

          <footer className="mt-10 rounded-2xl border border-gold/40 bg-gold/5 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">
              {v.keyword} 세 줄 요약
            </p>
            <ul className="mt-2 space-y-1.5 text-[15px] text-gray-100">
              {v.summary.map((s) => (
                <li key={s}>· {s}</li>
              ))}
            </ul>
            <p className="mt-4 text-[15px] leading-7 text-gray-200">{v.outro}</p>
            {v.phone ? (
              <a
                href={`tel:${phoneDigits(v.phone)}`}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-4 text-2xl font-extrabold text-bg sm:text-3xl"
                aria-label={`${v.contactName} 전화 ${v.phone}`}
              >
                <span aria-hidden>📞</span>
                {v.contactName} {v.phone}
              </a>
            ) : null}
          </footer>

          <section className="mt-10 rounded-2xl border border-line bg-elev p-5 text-sm text-gray-400">
            <h2 className="mb-2 text-sm font-bold text-gray-300">이용 안내</h2>
            <ul className="space-y-1.5">
              {v.notice.map((n) => (
                <li key={n}>· {n}</li>
              ))}
            </ul>
          </section>
        </article>

        <aside
          aria-label="다른 지역 나이트"
          className="mt-12 border-t border-line pt-8"
        >
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
            다른 지역도 보기
          </h2>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {related.map((o) => (
              <li key={o.slug}>
                <Link
                  href={nightPath(o.slug)}
                  className="block rounded-xl border border-line bg-elev p-4 transition hover:border-gold hover:bg-elev2"
                >
                  <p className="text-sm font-bold text-gold">{o.keyword}</p>
                  <p className="mt-1 text-xs text-gray-400">{o.areaLabel}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-center text-sm">
            <Link href="/night-guide/" className="text-gold underline">
              전국 나이트 전체 보기 →
            </Link>
          </p>
        </aside>
      </main>

      {v.phone ? (
        <div className="callbar" role="complementary" aria-label="전화 연결">
          <a href={`tel:${phoneDigits(v.phone)}`}>
            📞 {v.contactName} {v.phone}
          </a>
        </div>
      ) : (
        <div
          className="callbar"
          role="complementary"
          aria-label="광고 제휴 문의"
        >
          <span>
            광고·제휴 입점 문의 카톡 <b>{ADS.kakao}</b>
          </span>
        </div>
      )}
    </>
  );
}
