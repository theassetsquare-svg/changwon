import type { ReactNode } from "react";
import CallButton from "./CallButton";
import RelatedPages from "./RelatedPages";
import PageJsonLd from "./PageJsonLd";
import { PAGE_META } from "@/lib/site";

export default function PageShell({
  title,
  subtitle,
  hook,
  pathname,
  capsule,
  children,
}: {
  title: string;
  subtitle?: string;
  hook?: string;
  pathname?: string;
  capsule?: string;
  children: ReactNode;
}) {
  const meta = pathname ? PAGE_META[pathname] : undefined;
  const answerText = capsule ?? meta?.capsule;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
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

      <div className="space-y-6 text-[15px] leading-7 text-gray-200 sm:text-base sm:leading-8">
        {children}
      </div>

      <div className="mt-12 rounded-2xl border border-line bg-elev p-6 text-center">
        <p className="text-sm text-gray-400">읽으셨으면 전화 한 통이면 됩니다.</p>
        <p className="mt-1 text-base font-bold text-white">짱구가 직접 받습니다.</p>
        <div className="mt-4 flex justify-center">
          <CallButton size="lg" pulse />
        </div>
      </div>

      <RelatedPages exclude={pathname ? [pathname] : []} />
    </main>
  );
}
