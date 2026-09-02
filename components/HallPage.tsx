import Link from "next/link";
import OgThumb from "./OgThumb";
import {
  HALL_UPDATED,
  UNVERIFIED_NOTE,
  allHallsLink,
  factCaption,
  hallPath,
  phoneDigits,
  relLabel,
  unverifiedNote,
} from "@/lib/hall";
import type { HallVenue } from "@/lib/hall";
import { HALL_VENUES, HALL_BY_SLUG } from "@/lib/hall-data";
import { SITE } from "@/lib/site";
import { ADS } from "@/lib/venues";
import GuideExtra from '@/components/GuideExtra';

/* ★ 2026-08-31 — 연령·관계 고지가 없어 신고에 취약했다(설계도 4장 · 점검표 #121·#122).
   광고(담당자 전화)를 싣는 쪽과 아닌 쪽의 문구가 달라야 한다.
   광고를 실어 놓고 "제휴가 없다" 고 적으면 사실과 다른 고지가 된다. */
const 광고고지 = [
  "이 페이지에는 해당 업소 담당자의 광고가 실려 있습니다. 만 19세 이상 성인 대상입니다.",
  "아래 담당자 연락처는 광고로 실린 것입니다. 만 19세 이상만 이용할 수 있습니다.",
  "이 글에는 업소 담당자가 의뢰한 광고가 포함되어 있습니다. 만 19세 이상 대상이며 청소년 출입·고용은 금지입니다.",
  "담당자 연락처 안내는 광고입니다. 만 19세 이상 성인 업소를 다룹니다.",
  "이 쪽의 연락처는 광고로 게재된 것입니다. 만 19세 이상만 출입할 수 있습니다.",
  "업소 담당자의 요청으로 광고를 싣고 있습니다. 성인(만 19세 이상) 대상입니다.",
];
const 비광고고지 = [
  "만 19세 이상 이용 가능한 성인 업소 안내입니다. 업소와 제휴 관계가 없는 정보 페이지입니다.",
  "성인(만 19세 이상)만 이용할 수 있는 곳을 다룹니다. 업소와 광고·제휴 관계가 없습니다.",
  "이 글은 만 19세 이상 성인 대상 업소 안내이며, 업소와 아무런 관계가 없습니다.",
  "만 19세 미만은 출입할 수 없습니다. 공개 자료만 정리한 제3자 안내 페이지입니다.",
  "성인 전용 업소를 다루는 안내입니다. 업소로부터 대가를 받지 않았습니다.",
  "만 19세 이상만 들어갈 수 있는 곳입니다. 업소와 제휴하지 않은 정보 페이지입니다.",
  "성인 대상 업소 안내이며 청소년 출입·고용은 금지입니다. 공개 자료 기준입니다.",
  "만 19세 이상 성인만 이용하는 업소를 안내합니다. 업소의 공식 채널이 아닙니다.",
];
function 고지고르기(씨: unknown, 광고쪽: boolean) {
  const 곳간 = 광고쪽 ? 광고고지 : 비광고고지;
  const s = String(씨 ?? "");
  let n = 0;
  for (let k = 0; k < s.length; k++) n = (n * 131 + s.charCodeAt(k)) % 1000003;
  return 곳간[n % 곳간.length];
}


/**
 * 홀 도감 전용 스킨 — 버건디 + 골드, 세리프 헤딩, 도면 라인 박스.
 *
 * [고정바] position:fixed 는 조상에 transform/filter 가 걸리면 기준이 바뀐다.
 * 그래서 .hallbar 는 <body> 직계 자식이어야 하고, 이 컴포넌트가 프래그먼트를
 * 반환하기 때문에 레이아웃의 {children} 자리에서 body 직계가 된다.
 */
export const HALL_CSS = `
.hall{
  --burgundy:#2A0A12;
  --burgundy-2:#3B0F1D;
  --burgundy-3:#4E1526;
  --gold:#C9A227;
  --gold-2:#E8C766;
  --ink:#F4EAE6;
  --ink-mute:#C9AFA8;
  --rule:#7A3247;
  background:var(--burgundy);
  color:var(--ink);
  margin:0 calc(50% - 50vw);
  padding:0 calc(50vw - 50%);
}
.hall h1,.hall h2,.hall h3,.hall .serif{
  font-family:"Nanum Myeongjo","Noto Serif KR","Apple SD Gothic Neo",
    "Times New Roman",Batang,serif;
  letter-spacing:-0.01em;
}
.hall h1{font-size:2rem;line-height:1.28;color:var(--gold-2);font-weight:800;}
@media(min-width:640px){ .hall h1{font-size:2.6rem;} }
.hall h2{
  font-size:1.35rem;line-height:1.4;color:var(--gold-2);font-weight:700;
  margin-top:2.4rem;
}
.hall p{color:var(--ink);line-height:1.85;}
.hall a{color:var(--gold-2);}

/* 도면 라인 박스 — 이중 괘선 + 모서리 표식 */
.plan{
  position:relative;
  border:1px solid var(--rule);
  background:
    linear-gradient(0deg, rgba(201,162,39,.05), rgba(201,162,39,.05)),
    var(--burgundy-2);
  padding:20px;
}
.plan::before{
  content:"";position:absolute;inset:5px;
  border:1px dashed rgba(201,162,39,.35);
  pointer-events:none;
}
.plan::after{
  content:"";position:absolute;inset:0;pointer-events:none;
  background:
    linear-gradient(var(--gold) 0 0) 0 0/14px 1px no-repeat,
    linear-gradient(var(--gold) 0 0) 0 0/1px 14px no-repeat,
    linear-gradient(var(--gold) 0 0) 전부 0/14px 1px no-repeat,
    linear-gradient(var(--gold) 0 0) 전부 0/1px 14px no-repeat,
    linear-gradient(var(--gold) 0 0) 0 전부/14px 1px no-repeat,
    linear-gradient(var(--gold) 0 0) 0 전부/1px 14px no-repeat,
    linear-gradient(var(--gold) 0 0) 전부 전부/14px 1px no-repeat,
    linear-gradient(var(--gold) 0 0) 전부 전부/1px 14px no-repeat;
}
.plan-label{
  font-size:11px;letter-spacing:.28em;text-transform:uppercase;
  color:var(--gold);font-weight:800;
}
.zone-tag{
  display:inline-block;font-size:11px;letter-spacing:.22em;
  color:var(--burgundy);background:var(--gold);
  padding:2px 9px;font-weight:800;
}
.note-line{
  border-top:1px dashed rgba(201,162,39,.45);
  margin-top:14px;padding-top:10px;
  font-size:13px;color:var(--ink-mute);
}
.fact-table{width:100%;border-collapse:collapse;font-size:15px;}
.fact-table th,.fact-table td{
  border:1px solid var(--rule);padding:11px 14px;text-align:left;vertical-align:top;
}
.fact-table th{
  width:34%;color:var(--gold);font-weight:700;background:rgba(201,162,39,.06);
  font-size:14px;
}

.hallbar{
  position:fixed; left:0; right:0; bottom:0; z-index:99999;
  display:flex; align-items:center; justify-content:center; gap:10px;
  height:64px; box-sizing:content-box;
  padding-bottom:env(safe-area-inset-bottom,0px);
  background:#2A0A12; color:#F4EAE6; font-weight:800; font-size:18px;
  border-top:1px solid #C9A227;
  box-shadow:0 -2px 14px rgba(0,0,0,.45);
  transform:translateZ(0); backface-visibility:hidden;
}
.hallbar a{color:#2A0A12;background:#C9A227;text-decoration:none;
  display:flex;align-items:center;gap:8px;padding:10px 18px;}
.hallbar b{color:#E8C766;}
body{ padding-bottom:calc(84px + env(safe-area-inset-bottom,0px)); }
@media(max-width:480px){
  .hallbar{height:60px; font-size:16px;}
  body{ padding-bottom:calc(80px + env(safe-area-inset-bottom,0px)); }
}
`;

function jsonLd(v: HallVenue) {
  const url = `${SITE.url}${hallPath(v.slug)}`;

  const place: Record<string, unknown> = {
    "@type": "NightClub",
    "@id": `${url}#hall`,
    name: v.spaced,
    alternateName: v.keyword,
    url,
    description: v.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: v.locality,
      addressRegion: v.region,
      addressCountry: "KR",
    },
  };
  // 확인된 값만 올린다. 확인 못 한 항목은 아예 넣지 않는다.
  const streetFact = v.facts.find(([k]) => k === "주소");
  if (streetFact) {
    (place.address as Record<string, unknown>).streetAddress = streetFact[1];
  }
  if (v.phone) place.telephone = v.phone;
  if (v.ageFull) place.typicalAgeRange = v.ageFull;

  return {
    "@context": "https://schema.org",
    "@graph": [
      place,
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: v.title,
        description: v.description,
        inLanguage: "ko-KR",
        datePublished: HALL_UPDATED,
        dateModified: HALL_UPDATED,
        about: { "@id": `${url}#hall` },
        isPartOf: { "@id": `${SITE.url}/hall-guide#collection` },
        author: { "@type": "Organization", name: SITE.name },
        publisher: { "@type": "Organization", name: SITE.name },
        mainEntityOfPage: url,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: "ko-KR",
        mainEntity: v.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: SITE.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "전국 나이트 홀 도감 40",
            item: `${SITE.url}/hall-guide`,
          },
          { "@type": "ListItem", position: 3, name: v.keyword, item: url },
        ],
      },
    ],
  };
}

export default function HallPage({ venue: v }: { venue: HallVenue }) {
  /* ★ 2026-08-26 — 관련 링크가 적으면 색인이 안 된다. 모자라면 6개까지 채운다. */
  const related = (() => {
    const out = v.related.map((s) => HALL_BY_SLUG[s]).filter(Boolean);
    if (out.length < 6) {
      /* ★ 자기 위치 다음부터 순환해 채운다 — 앞에서부터 채우면 뒤쪽 가게가 고립된다 */
      const have = new Set(out.map((x) => x.slug));
      const base = Math.max(0, HALL_VENUES.findIndex((x) => x.slug === v.slug));
      for (let i = 1; out.length < 6 && i <= HALL_VENUES.length; i++) {
        const o = HALL_VENUES[(base + i) % HALL_VENUES.length];
        if (!o || o.slug === v.slug || have.has(o.slug)) continue;
        out.push(o); have.add(o.slug);
      }
    }
    return out.slice(0, 6);
  })();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HALL_CSS }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(v)) }}
      />

      <div className="hall">
        <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
          <nav aria-label="현재 위치" className="mb-5 text-xs text-[#C9AFA8]">
            <Link href="/">홈</Link>
            <span className="px-1.5">›</span>
            <Link href="/hall-guide">전국 나이트 홀 도감 40</Link>
            <span className="px-1.5">›</span>
            <span>{v.keyword}</span>
          </nav>

          <article>
            {/* ① 도입 — 답은 끝에 둔다 */}
            <header className="mb-7">
              {/* ★ 설계도 4장 — 광고주 쪽에는 상단에 「광고」 라벨을 단다.
                  담당자 번호가 실린 쪽이 곧 광고가 실린 쪽이다. */}
              {v.phone ? (
                <p
                  className="ad-label"
                  style={{
                    display: "inline-block", margin: "0 0 10px", padding: "3px 10px",
                    border: "1px solid #c9a227", borderRadius: 4,
                    fontSize: 12, color: "#c9a227", letterSpacing: ".04em",
                  }}
                >
                  광고
                </p>
              ) : null}
              <p className="plan-label">
                {v.areaLabel} · {v.hallType}
              </p>
              <h1 className="mt-2">{v.title}</h1>
              <p className="mt-3 text-sm text-[#C9AFA8]">
                홀 도감 · 마지막 정리{" "}
                <time dateTime={HALL_UPDATED}>2026년 8월 17일</time>
              </p>
            </header>

            <div className="space-y-4 text-[15px] sm:text-base">
              {v.lead.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* ② 핵심 3줄 직답 박스 — AI 답변엔진이 그대로 인용할 수 있는 블록 */}
            <aside className="plan mt-8" aria-label="핵심 3줄">
              <p className="plan-label">핵심 3줄</p>
              <ol className="mt-3 space-y-2 text-[15px]">
                {v.answer3.map((a, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="serif shrink-0 text-[#C9A227]">
                      {i + 1}.
                    </span>
                    <span>{a}</span>
                  </li>
                ))}
              </ol>
            </aside>

            {/* 썸네일 — og:image 와 같은 파일을 본문에도 실제로 렌더한다 */}
            <figure className="mt-8">
              <OgThumb pathname={hallPath(v.slug)} alt={v.ogAlt} v={(v as { ogV?: string }).ogV} />
            </figure>

            {/* ③ 사실 표 — 확인된 항목만 */}
            <section className="mt-10">
              <h2>{v.keyword} 확인된 사실</h2>
              <table className="fact-table mt-4">
                <caption className="sr-only">
                  {`${v.keyword} ${factCaption(v.slug)}`}
                </caption>
                <tbody>
                  {v.facts.map(([k, val]) => (
                    <tr key={k}>
                      <th scope="row">{k}</th>
                      <td>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-xs text-[#C9AFA8]">{unverifiedNote(v.slug)}</p>
            </section>

            {/* ④ 공간 소제목 — 입구 → 플로어 → 테이블 → 부스 */}
            {v.sections.map((s) => (
              <section key={s.h2}>
                <h2>{s.h2}</h2>
                <p className="mt-2">
                  <span className="zone-tag">{s.zone}</span>
                </p>
                <div className="mt-3 space-y-4 text-[15px] sm:text-base">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {s.note ? (
                  <div className="plan mt-5">
                    <p className="plan-label">좌석 메모</p>
                    <p className="mt-2 text-[15px]">{s.note}</p>
                  </div>
                ) : null}
              </section>
            ))}

            {/* ⑤ 맨 끝 — 제목이 던진 질문의 답 */}
            <section className="mt-12">
              <h2>{v.title.split(",")[1]?.trim() ?? "정리"}, 그래서 답은</h2>
              <div className="mt-3 space-y-4 text-[15px] sm:text-base">
                {v.finalAnswer.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            {/* ⑥ FAQ 3 */}
            <section className="mt-12">
              <h2>{v.keyword} 자주 묻는 질문</h2>
              <div className="mt-4 space-y-3">
                {v.faq.map((f) => (
                  <details key={f.q} className="plan">
                    <summary className="serif cursor-pointer pr-6 font-bold text-[#E8C766]">
                      {f.q}
                    </summary>
                    <p className="mt-3 text-[15px]">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <GuideExtra pathname={hallPath(v.slug)} />

            {/* ⑦ 한 줄 정리 */}
            <section className="mt-12">
              <div className="plan">
                <p className="plan-label">한 줄 정리</p>
                <p className="serif mt-3 text-lg leading-8 text-[#E8C766]">
                  {v.oneline}
                </p>
                {v.phone ? (
                  <a
                    href={`tel:${phoneDigits(v.phone)}`}
                    className="mt-5 flex items-center justify-center gap-2 bg-[#C9A227] px-5 py-4 text-2xl font-extrabold text-[#2A0A12] sm:text-3xl"
                    aria-label={`${v.contactName} 전화 ${v.phone}`}
                  >
                    <span aria-hidden>📞</span>
                    {v.contactName} {v.phone}
                  </a>
                ) : null}
              </div>
            </section>

            <section className="mt-10 border border-[#7A3247] p-5 text-sm text-[#C9AFA8]">
              <h2 className="!mt-0 !text-sm !text-[#C9AFA8]">이용 안내</h2>
              <ul className="mt-2 space-y-1.5">
                {v.notice.map((n) => (
                  <li key={n}>· {n}</li>
                ))}
              </ul>
            </section>
          </article>

          {/* ★ 다른 쪽으로 보내는 링크 묶음이라 nav 가 맞는 태그다 (2026-08-30) */}
          <nav
            aria-label="다른 홀 도감"
            className="mt-12 border-t border-[#7A3247] pt-8"
          >
            <p className="plan-label">{relLabel(v.slug)}</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {related.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={hallPath(o.slug)}
                    className="block border border-[#7A3247] bg-[#3B0F1D] p-4 transition hover:border-[#C9A227]"
                  >
                    <p className="serif text-sm font-bold text-[#E8C766]">
                      {o.keyword}
                    </p>
                    <p className="mt-1 text-xs text-[#C9AFA8]">{o.areaLabel}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-center text-sm">
              <Link href="/hall-guide" className="underline">
                {allHallsLink(v.slug)}
              </Link>
            </p>
          </nav>
              <p className="mt-3 text-[13px] leading-7 text-gray-400">{고지고르기(v.slug, !!v.phone)}</p>
</main>
      </div>

      {v.phone ? (
        <div className="hallbar" role="complementary" aria-label="전화 연결">
          <a href={`tel:${phoneDigits(v.phone)}`}>
            📞 {v.contactName} {v.phone}
          </a>
        </div>
      ) : (
        <div className="hallbar" role="complementary" aria-label="광고 문의">
          <span>
            광고문의 카톡 <b>{ADS.kakao}</b>
          </span>
        </div>
      )}
    </>
  );
}
