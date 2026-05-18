import type { ReactNode } from "react";
import CallButton from "./CallButton";
import RelatedPages from "./RelatedPages";

export default function PageShell({
  title,
  subtitle,
  hook,
  pathname,
  children,
}: {
  title: string;
  subtitle?: string;
  hook?: string;
  pathname?: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <header className="mb-8 fade-up">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
          창원 룰루랄라 나이트
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
