import type { ReactNode } from "react";
import CallButton from "./CallButton";

export default function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gold sm:text-4xl">{title}</h1>
        {subtitle ? (
          <p className="mt-2 text-base text-gray-300">{subtitle}</p>
        ) : null}
      </header>
      <div className="space-y-6 text-gray-200">{children}</div>
      <div className="mt-12 rounded-xl bg-gray-900 p-6 text-center">
        <p className="mb-3 text-gray-300">예약·문의는 매니저 짱구에게 직접 전화 주세요.</p>
        <CallButton size="lg" />
      </div>
    </main>
  );
}
