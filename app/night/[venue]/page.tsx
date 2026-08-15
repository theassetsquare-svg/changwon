import type { Metadata } from "next";
import Link from "next/link";
import StickyCallBar from "@/components/StickyCallBar";
import VenueJsonLd from "@/components/VenueJsonLd";
import KakaoIdCopy from "@/components/KakaoIdCopy";
import { OG_IMAGE, SITE } from "@/lib/site";
import { ADS, VENUES, VENUE_BY_SLUG, phoneHref, venuePath } from "@/lib/venues";

export function generateStaticParams() {
  return VENUES.map((v) => ({ venue: v.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { venue: string };
}): Metadata {
  const v = VENUE_BY_SLUG[params.venue];
  if (!v) return {};
  return {
    title: v.title,
    description: v.description,
    keywords: [v.keyword, ...v.aliases],
    alternates: { canonical: venuePath(v.slug) },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url: `${SITE.url}${venuePath(v.slug)}`,
      title: v.title,
      description: v.description,
      images: OG_IMAGE,
    },
    twitter: {
      card: "summary_large_image",
      title: v.title,
      description: v.description,
    },
    other: {
      "geo.placename": v.areaLabel,
      "dc.title": v.keyword,
      "dc.subject": v.keyword,
      "twitter:label1": "예약 문의",
      "twitter:data1": v.phone ?? `카톡 ${v.kakao ?? ADS.kakao}`,
      "twitter:label2": "입장 연령",
      "twitter:data2": "만 19세 이상",
    },
  };
}

export default function VenuePage({ params }: { params: { venue: string } }) {
  const v = VENUE_BY_SLUG[params.venue];
  if (!v) return null;

  const kakao = v.kakao ?? ADS.kakao;
  const others = VENUES.filter((o) => o.slug !== v.slug).slice(0, 6);

  return (
    <>
      <VenueJsonLd venue={v} />

      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <nav aria-label="현재 위치" className="mb-5 text-xs text-gray-500">
          <Link href="/" className="hover:text-gold">
            홈
          </Link>
          <span className="px-1.5">›</span>
          <Link href="/night" className="hover:text-gold">
            전국 나이트 예약 문의
          </Link>
          <span className="px-1.5">›</span>
          <span className="text-gray-300">{v.keyword}</span>
        </nav>

        <header className="fade-up mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
            {v.areaLabel}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {v.keyword} 예약 문의
          </h1>
          <p className="mt-3 text-base text-gray-300 sm:text-lg">{v.hook}</p>
        </header>

        {/* AEO/GEO — AI 답변엔진이 그대로 인용할 수 있는 한 문장 */}
        <aside
          className="mb-7 rounded-2xl border border-gold/40 bg-gold/5 p-5 text-[15px] leading-7 sm:text-base"
          aria-label="한 줄 요약"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-gold">
            한 줄 요약
          </p>
          <p className="mt-2 text-gray-100">{v.capsule}</p>
        </aside>

        {/* 주 CTA */}
        <section
          aria-label="예약 연락처"
          className="glow mb-8 rounded-2xl border border-gold/40 bg-elev p-5 sm:p-6"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
            {v.keyword} 예약 담당
          </p>
          {v.phone ? (
            <>
              <p className="mt-1 text-lg font-bold text-white">
                {v.contactName}
              </p>
              <a
                href={phoneHref(v.phone)}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-4 text-2xl font-extrabold text-bg sm:text-3xl"
                aria-label={`${v.contactName} 전화 ${v.phone}`}
              >
                <span aria-hidden>📞</span>
                {v.phone}
              </a>
              <p className="mt-3 text-center text-sm text-gray-400">
                통화가 어려우면 카카오톡{" "}
                <KakaoIdCopy
                  id={kakao}
                  className="rounded-md bg-elev2 px-2 py-0.5 font-bold text-gold"
                />{" "}
                로 남겨주셔도 됩니다.
              </p>
            </>
          ) : (
            <>
              <p className="mt-1 text-lg font-bold text-white">
                카카오톡으로 문의받습니다
              </p>
              <div className="mt-3 flex items-center justify-center rounded-xl bg-gold px-5 py-4 text-2xl font-extrabold text-bg sm:text-3xl">
                <KakaoIdCopy id={kakao} label="카톡" />
              </div>
              <p className="mt-3 text-center text-sm text-gray-400">
                인원 · 날짜 · 도착 예정 시간을 함께 남겨주시면 바로 확인해
                드립니다.
              </p>
            </>
          )}
        </section>

        <div className="space-y-5 text-[15px] leading-7 text-gray-200 sm:text-base sm:leading-8">
          {v.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* 핵심 정보 — AI 추출용 정형 데이터 */}
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-white">
            {v.keyword} 기본 정보
          </h2>
          <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-elev text-[15px]">
            {[
              ["업소명", v.spaced],
              ["지역", v.areaLabel],
              ["예약 담당", v.contactName],
              [
                "예약 문의",
                v.phone ? `전화 ${v.phone}` : `카카오톡 ${kakao}`,
              ],
              ["출입 연령", "만 19세 이상 (입장 시 신분증 확인)"],
              ["예약 방법", "인원 · 날짜 · 도착 예정 시간 전달"],
              ["선결제 / 회원가입", "없음"],
            ].map(([k, val]) => (
              <div key={k} className="flex gap-4 px-4 py-3 sm:px-5">
                <dt className="w-28 shrink-0 text-sm font-bold text-gray-400 sm:w-36">
                  {k}
                </dt>
                <dd className="text-gray-100">{val}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-gray-500">
            정확한 주소 · 영업시간 · 요금표는 확인된 값만 게시한다는 원칙에 따라
            임의로 적지 않습니다. {v.phone ? "전화" : "카카오톡"} 문의 시 그대로
            안내해 드립니다.
          </p>
        </section>

        <section className="mt-10 space-y-7">
          {v.points.map((p) => (
            <div key={p.h}>
              <h2 className="text-xl font-bold text-white">{p.h}</h2>
              <p className="mt-2 text-[15px] leading-7 text-gray-200 sm:text-base sm:leading-8">
                {p.b}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">오시는 길 참고</h2>
          <p className="mt-2 text-[15px] leading-7 text-gray-200 sm:text-base sm:leading-8">
            {v.areaNote}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-white">
            {v.keyword} 자주 묻는 질문
          </h2>
          <div className="space-y-2">
            {v.faq.map((f) => (
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

        <section className="mt-10 rounded-2xl border border-line bg-elev p-5 text-sm text-gray-400">
          <h2 className="mb-2 text-sm font-bold text-gray-300">이용 안내</h2>
          <ul className="space-y-1.5">
            <li>
              · 본 페이지는 {v.spaced} 예약·문의 안내 페이지입니다. 업소의 공식
              홈페이지가 아닙니다.
            </li>
            <li>· 만 19세 미만 청소년은 출입할 수 없습니다.</li>
            <li>· 입장 시 신분증 확인이 이루어집니다.</li>
            <li>· 음주 후에는 운전하지 마시고 대리운전을 이용해 주세요.</li>
            <li>
              · 게시된 정보 중 확인되지 않은 항목(주소·영업시간·요금)은 임의로
              작성하지 않았습니다.
            </li>
          </ul>
        </section>

        <section className="mt-12 border-t border-line pt-8">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
            다른 지역 예약 문의
          </h2>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={venuePath(o.slug)}
                  className="block rounded-xl border border-line bg-elev p-4 transition hover:border-gold hover:bg-elev2"
                >
                  <p className="text-sm font-bold text-gold">{o.keyword}</p>
                  <p className="mt-1 text-xs text-gray-400">{o.areaLabel}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-center text-sm">
            <Link href="/night" className="text-gold underline">
              전국 나이트 예약 문의 전체 보기 →
            </Link>
          </p>
        </section>
      </main>

      <StickyCallBar
        contextLabel={v.keyword}
        name={v.phone ? v.contactName : "문의"}
        phone={v.phone}
        phoneHref={v.phone ? phoneHref(v.phone) : undefined}
        kakao={kakao}
      />
    </>
  );
}
