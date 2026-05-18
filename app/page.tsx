import type { Metadata } from "next";
import Link from "next/link";
import CallButton from "@/components/CallButton";
import Placeholder from "@/components/Placeholder";
import { NAV, PLACEHOLDERS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE.name} 공식 | 매니저 ${SITE.manager} ${SITE.phone}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main>
      <section className="bg-ink">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            {SITE.city} 공식 사이트
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">
            {SITE.name}
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            매니저 <span className="text-gold font-bold">{SITE.manager}</span>가
            직접 안내해 드립니다.
          </p>
          <div className="mt-8 flex justify-center">
            <CallButton size="lg" />
          </div>
          <p className="mt-4 text-xs text-gray-500">
            19세 이상 합법 영업장 · 입장 시 신분증 확인
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-2xl font-bold text-gold">한눈에 보기</h2>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-gray-900 p-5">
            <dt className="text-sm text-gray-400">매니저</dt>
            <dd className="text-lg font-bold text-white">{SITE.manager}</dd>
          </div>
          <div className="rounded-lg bg-gray-900 p-5">
            <dt className="text-sm text-gray-400">전화</dt>
            <dd className="text-lg font-bold text-gold">
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </dd>
          </div>
          <div className="rounded-lg bg-gray-900 p-5">
            <dt className="text-sm text-gray-400">주소</dt>
            <dd className="text-lg font-bold text-white">
              {SITE.city} <Placeholder>{PLACEHOLDERS.address}</Placeholder>
            </dd>
          </div>
          <div className="rounded-lg bg-gray-900 p-5">
            <dt className="text-sm text-gray-400">영업시간</dt>
            <dd className="text-lg font-bold text-white">
              <Placeholder>{PLACEHOLDERS.hoursWeekday}</Placeholder>
            </dd>
          </div>
        </dl>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8">
        <h2 className="text-2xl font-bold text-gold">바로 가기</h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {NAV.filter((n) => n.href !== "/").map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                className="block rounded-lg bg-gray-900 px-4 py-4 text-center font-semibold hover:bg-gray-800"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
