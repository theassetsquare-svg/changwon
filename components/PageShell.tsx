import type { ReactNode } from "react";
import RelatedPages from "./RelatedPages";
import PageJsonLd from "./PageJsonLd";
/* PageShell 은 창원룰루랄라 자기 페이지 13개(about·contact·faq·lotto…)만 쓴다.
   그래서 사이트 신원 JSON-LD 를 여기 두면 남의 가게 페이지로 새지 않는다(2026-08-25). */
import JsonLd from "./JsonLd";
import StickyCallBar from "./StickyCallBar";
import OgThumb from "./OgThumb";
import { PAGE_META, SITE } from "@/lib/site";

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


export default function PageShell({
  title,
  subtitle,
  hook,
  pathname,
  capsule,
  thumbAlt,
  children,
}: {
  title: string;
  subtitle?: string;
  hook?: string;
  pathname?: string;
  capsule?: string;
  /** 본문 썸네일 alt — 가게이름 + 페이지 주제 */
  thumbAlt?: string;
  children: ReactNode;
}) {
  const meta = pathname ? PAGE_META[pathname] : undefined;
  const answerText = capsule ?? meta?.capsule;

  return (
    <>
      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <JsonLd />
      {pathname ? <PageJsonLd pathname={pathname} /> : null}

      <header className="mb-6 fade-up">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
          룰루랄라 나이트 · 창원 성산구 상남동
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
          {title}
        </h1>
        {hook ? (
          <p className="mt-3 text-base text-gray-300 sm:text-lg">{hook}</p>
        ) : null}
        {subtitle ? (
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        ) : null}
      </header>

      {answerText ? (
        <aside
          className="mb-8 rounded-2xl border border-gold/40 bg-gold/5 p-5 text-[15px] leading-7 sm:text-base"
          aria-label="한 줄 요약"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-gold">
            한 줄 요약
          </p>
          <p className="mt-2 text-gray-100">{answerText}</p>
        </aside>
      ) : null}

      {/* 썸네일 — og:image 와 같은 파일을 본문에도 실제로 렌더한다.
          직답 박스가 없는 페이지에서는 h1 바로 아래가 된다. */}
      {pathname ? (
        <figure className="mb-8">
          <OgThumb
            pathname={pathname}
            alt={thumbAlt ?? `${SITE.nameNoSpace} ${title}`}
          />
        </figure>
      ) : null}

      <div className="space-y-6 text-[15px] leading-7 text-gray-200 sm:text-base sm:leading-8">
        {children}
      </div>

        <RelatedPages exclude={pathname ? [pathname] : []} />
            <p className="mt-3 text-[13px] leading-7 text-gray-400">{고지고르기(pathname, true)}</p>
</main>

      <StickyCallBar
        contextLabel={SITE.nameNoSpace}
        name={SITE.lotto}
        phone={SITE.lottoPhoneDash}
        phoneHref={SITE.lottoPhoneHref}
      />
    </>
  );
}
