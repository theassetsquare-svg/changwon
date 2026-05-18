import type { Metadata } from "next";
import Link from "next/link";
import CallButton from "@/components/CallButton";
import Placeholder from "@/components/Placeholder";
import { NAV, PAGE_META, PLACEHOLDERS, SITE } from "@/lib/site";

const meta = PAGE_META["/"];

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  openGraph: { title: meta.title, description: meta.description },
};

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(252,211,77,0.25) 0%, rgba(252,211,77,0) 60%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 py-12 text-center sm:py-20">
          <p className="fade-up text-xs font-bold uppercase tracking-[0.4em] text-gold sm:text-sm">
            창원 · 공식 사이트
          </p>
          <h1 className="fade-up mt-3 text-4xl font-extrabold leading-tight text-white sm:text-6xl">
            <span className="gold-grad">창원 룰루랄라</span>
            <br />
            나이트
          </h1>
          <p className="fade-up mx-auto mt-5 max-w-prose2 text-lg text-gray-200 sm:text-xl">
            처음이라 어색해도 괜찮습니다.
            <br className="sm:hidden" /> 짱구한테 전화 한 통이면 끝납니다.
          </p>

          <div className="fade-up mt-8 flex justify-center">
            <CallButton size="xl" pulse />
          </div>

          <p className="fade-up mt-4 text-xs text-gray-500">
            19세 이상 합법 영업장 · 입장 시 신분증 확인
          </p>

          <div className="fade-up mt-12 flex justify-center text-gold">
            <span className="scroll-cue text-2xl">↓</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          처음 오시는 분께
        </h2>
        <div className="mt-4 space-y-4 text-[15px] leading-7 text-gray-300 sm:text-base sm:leading-8">
            <p>
              나이트 한번 가본다는데 어디로 갈지 막막한 분 많죠. 창원에서 그게 익숙해질 때까지
              제가 도와드립니다. <strong className="text-white">매니저 짱구</strong>입니다.
            </p>
            <p>
              <a href={SITE.phoneHref} className="font-bold text-gold underline">
                {SITE.phone}
              </a>{" "}
              누르시면 제가 직접 받습니다. 다른 직원 거치지 않고요. 인원 몇 명인지,
              언제 오실 건지만 알려주세요. 자리 맞춰서 잡아드립니다.
            </p>
            <p>
              가격은 그때그때 정확히 말씀드립니다. 어색하게 “얼마예요” 물어보는 거,
              저희 가게에선 그게 정상입니다. 전화로 다 알려드려요.
            </p>
          </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-6">
        <h2 className="text-xl font-bold text-white sm:text-2xl">한눈에 보기</h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-elev p-5">
            <dt className="text-xs text-gray-400">매니저</dt>
            <dd className="mt-1 text-xl font-extrabold text-white">{SITE.manager}</dd>
            <dd className="mt-1 text-xs text-gray-500">전화 한 통이면 직접 받습니다</dd>
          </div>
          <div className="rounded-2xl border border-line bg-elev p-5">
            <dt className="text-xs text-gray-400">전화</dt>
            <dd className="mt-1 text-xl font-extrabold text-gold">
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </dd>
            <dd className="mt-1 text-xs text-gray-500">눌러서 바로 통화</dd>
          </div>
          <div className="rounded-2xl border border-line bg-elev p-5">
            <dt className="text-xs text-gray-400">위치</dt>
            <dd className="mt-1 text-base font-bold text-white">
              {SITE.city} <Placeholder>{PLACEHOLDERS.address}</Placeholder>
            </dd>
            <dd className="mt-1 text-xs text-gray-500">자세한 길은 전화로</dd>
          </div>
          <div className="rounded-2xl border border-line bg-elev p-5">
            <dt className="text-xs text-gray-400">영업시간</dt>
            <dd className="mt-1 text-base font-bold text-white">
              <Placeholder>{PLACEHOLDERS.hoursWeekday}</Placeholder>
            </dd>
            <dd className="mt-1 text-xs text-gray-500">휴무일 확정되면 소식 페이지에 올림</dd>
          </div>
        </dl>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="text-xl font-bold text-white sm:text-2xl">전화하기 전에 보면 좋은 페이지</h2>
        <ul className="mt-4 space-y-2">
          {[
            "/reserve",
            "/price",
            "/faq",
            "/location",
            "/jjanggu",
          ].map((href) => {
            const item = NAV.find((n) => n.href === href);
            const m = PAGE_META[href];
            if (!item || !m) return null;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="block rounded-2xl border border-line bg-elev p-4 transition hover:border-gold hover:bg-elev2"
                >
                  <p className="text-sm font-bold text-gold">{item.label}</p>
                  <p className="mt-1 text-sm text-gray-300">{m.hook}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-6">
        <h2 className="text-xl font-bold text-white sm:text-2xl">메뉴 전체</h2>
        <ul className="mt-4 grid grid-cols-3 gap-2 text-sm sm:grid-cols-4">
          {NAV.filter((n) => n.href !== "/").map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                className="block rounded-xl border border-line bg-elev px-3 py-3 text-center font-semibold transition hover:border-gold hover:bg-elev2"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl border border-line bg-elev p-6 text-center">
          <p className="text-sm text-gray-300">읽으시느라 시간 쓰셨으니까,</p>
          <p className="mt-1 text-base font-bold text-white">그냥 전화 한 통 하시면 됩니다.</p>
          <div className="mt-5 flex justify-center">
            <CallButton size="xl" pulse />
          </div>
        </div>
      </section>
    </main>
  );
}
