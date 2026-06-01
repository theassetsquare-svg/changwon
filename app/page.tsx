import type { Metadata } from "next";
import Link from "next/link";
import CallButton from "@/components/CallButton";
import PageJsonLd from "@/components/PageJsonLd";
import Placeholder from "@/components/Placeholder";
import { NAV, PAGE_META, PLACEHOLDERS, SITE } from "@/lib/site";

const meta = PAGE_META["/"];

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  openGraph: { title: meta.title, description: meta.description },
};

const HOME_FAQ = [
  {
    q: "창원 룰루랄라 나이트 전화번호는?",
    a: ". 매니저 짱구가 직접 받습니다. 직원이 받아 콜백하는 방식이 아닙니다.",
  },
  {
    q: "창원룰루랄라나이트 예약은 어떻게 하나요?",
    a: "로 전화해 ‘짱구 매니저 부탁드립니다’라고 말한 뒤 인원·날짜·시간을 알려주시면 30초 안에 자리가 잡힙니다. 앱·회원가입 없습니다.",
  },
  {
    q: "창원 룰루랄라 나이트 입장 연령은?",
    a: "만 19세 이상만 입장 가능합니다. 입장 시 신분증을 확인하며, 미성년자는 출입할 수 없습니다.",
  },
  {
    q: "창원 룰루랄라 가격은 얼마인가요?",
    a: "옵션·인원·시간대에 따라 다릅니다. 로 전화하면 인원에 맞는 옵션 두세 개의 정확한 금액을 그 자리에서 묶어 안내합니다.",
  },
  {
    q: "창원 룰루랄라 위치는 어디인가요?",
    a: "경상남도 창원시 안에 위치합니다. 상세 번지·주차·대중교통은 ‘오시는 길’ 페이지와 매장 확정 시점에 본 사이트와 네이버 플레이스에 함께 반영합니다.",
  },
];

export default function HomePage() {
  return (
    <main>
      <PageJsonLd pathname="/" />

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(252,211,77,0.35) 0%, rgba(252,211,77,0) 60%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl px-4 py-12 text-center sm:py-20">
          <p className="fade-up inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            창원 공식 사이트
          </p>
          <h1 className="fade-up mt-4 text-4xl font-extrabold leading-tight text-white sm:text-6xl">
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

          <div className="fade-up mt-12 flex justify-center text-gold" aria-hidden>
            <span className="scroll-cue text-2xl">↓</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-6">
        <div
          className="rounded-2xl border border-gold/40 bg-gold/5 p-5 text-[15px] leading-7 sm:text-base"
          aria-label="한 줄 요약"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-gold">
            한 줄 요약
          </p>
          <p className="mt-2 text-gray-100">{meta.capsule}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          창원 룰루랄라 나이트, 처음 오시는 분께
        </h2>
        <div className="mt-4 space-y-4 text-[15px] leading-7 text-gray-300 sm:text-base sm:leading-8">
          <p>
            창원에서 나이트 한 번 가본다는데 어디로 갈지 막막한 분 많죠. 검색창에
            <strong className="text-white"> 창원 룰루랄라 나이트 </strong>라고 쳤다가,
            여기저기 광고만 보고 닫으셨을지도 모르겠습니다. 광고 어지러운 거 저도 압니다.
            그래서 이 페이지는 짧게 정리합니다. 매니저{" "}
            <strong className="text-white">짱구</strong>입니다. 사이트는 공식이고,
            전화번호는 <a href={SITE.phoneHref} className="font-bold text-gold underline">
              {SITE.phone}
            </a>{" "}
            하나입니다.
          </p>
          <p>
            저희는 경상남도 창원시 안에 있는 합법 나이트 클럽입니다. 사업자 등록이
            있고, 만 19세 이상만 받습니다. 입장하실 때 신분증 확인합니다. 이게 룰이라기
            보다, 매장이 오래 잘 굴러가는 방법이에요. 손님도 보호되고, 가게도 보호됩니다.
            창원룰루랄라나이트 이름으로 검색하면 비슷한 페이지가 여럿 뜨실 텐데, 짱구가
            직접 받는 번호는 이 번호 하나입니다. 다른 번호로 전화 받으셨다면 같은 가게
            아닐 수 있어요.
          </p>
          <p>
            전화 거시면 제가 받습니다. 직원이 받고 메모 남기고 콜백하는 방식 아닙니다.
            그래서 빠르고, 그래서 약속한 거 그대로 갑니다. 인원, 날짜, 시간, 이 세 가지만
            말씀해 주시면 그 자리에서 자리 잡아드려요. 처음 오시는 거면 한마디만 더
            보태주세요 — “처음이에요” 한마디면 분위기 맞는 자리로 안내드립니다.
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
          <div className="rounded-2xl border border-line bg-elev p-5">
            <dt className="text-xs text-gray-400">입장 연령</dt>
            <dd className="mt-1 text-base font-bold text-white">만 19세 이상</dd>
            <dd className="mt-1 text-xs text-gray-500">신분증 확인 · 미성년자 불가</dd>
          </div>
          <div className="rounded-2xl border border-line bg-elev p-5">
            <dt className="text-xs text-gray-400">가격대</dt>
            <dd className="mt-1 text-base font-bold text-white">전화 안내</dd>
            <dd className="mt-1 text-xs text-gray-500">인원·옵션 따라 다름</dd>
          </div>
        </dl>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          창원 룰루랄라 나이트 예약 — 30초면 끝납니다
        </h2>
        <div className="mt-4 space-y-4 text-gray-300">
          <p>
            예약을 어렵게 만들 이유가 없습니다. 앱 설치도 회원가입도 결제 사전등록도
            안 합니다. 전화 한 통이면 됩니다. 진짜로 30초입니다. 처음 거는 분들이 가장
            많이 망설이는 게 “뭘 말해야 하지”인데, 정해진 대본 같은 거 없습니다. 그냥
            인원·날짜·시간 세 가지만 알려주시면 됩니다.
          </p>
          <ol className="space-y-3 rounded-2xl border border-line bg-elev p-5 text-gray-200">
            <li>
              <strong className="text-gold">1.</strong>{" "}
              <a href={SITE.phoneHref} className="font-bold text-gold underline">
                {SITE.phone}
              </a>{" "}
              누르세요.
            </li>
            <li>
              <strong className="text-gold">2.</strong> “짱구 매니저 부탁드립니다.”
            </li>
            <li>
              <strong className="text-gold">3.</strong> 인원 / 날짜 / 시간 / 요청사항.
            </li>
            <li>
              <strong className="text-gold">4.</strong> 끝. 신분증 챙겨 오시면 됩니다.
            </li>
          </ol>
          <p>
            저장해 두시면 다음에 편합니다. . 창원 룰루랄라 짱구.
            이 두 줄이면 충분합니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-6">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          왜 짱구가 직접 받는지
        </h2>
        <div className="mt-4 space-y-4 text-gray-300">
          <p>
            나이트 처음 가시는 분들 가장 부담되는 게, 모르는 사람한테 전화해서 “얼마예요”
            물어보는 거더라고요. 그래서 저희는 그 단계를 통째로 없앴습니다. 직원이 받아서
            메모 남기고, 매니저가 다시 콜백하고, 그러는 동안 손님은 다른 가게 찾아 떠납니다.
            그게 손해라고 생각해서, 그냥 제가 받기로 했습니다.
          </p>
          <p>
            그래서 전화 거실 때 누구인지 모르고 망설이지 않으셔도 됩니다. 전화 받는 사람이
            매니저 짱구 본인이고, 가격도 그 자리에서 정확히 말씀드리고, 자리도 그 자리에서
            잡힙니다. 손님 입장에서 한 통화로 끝나는 게 가장 빠릅니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="text-xl font-bold text-white sm:text-2xl">자주 묻는 질문</h2>
        <div className="mt-4 space-y-2">
          {HOME_FAQ.map((item) => (
            <details
              key={item.q}
              className="rounded-2xl border border-line bg-elev p-4 transition open:border-gold"
            >
              <summary className="pr-8 font-semibold text-white">{item.q}</summary>
              <p className="mt-3 text-gray-300">{item.a}</p>
            </details>
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: HOME_FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-6">
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
          <p className="mt-1 text-base font-bold text-white">
            그냥 전화 한 통 하시면 됩니다.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            창원 룰루랄라 나이트 · 매니저 짱구 · 
          </p>
          <div className="mt-5 flex justify-center">
            <CallButton size="xl" pulse />
          </div>
        </div>
      </section>
    </main>
  );
}
