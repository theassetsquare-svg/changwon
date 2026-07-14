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
    q: "창원 룰루랄라 나이트 연락처는?",
    a: "매장에 문의하시면 매니저가 직접 답변합니다.",
  },
  {
    q: "창원룰루랄라나이트 예약은 어떻게 하나요?",
    a: "매장 문의로 인원·날짜·시간을 보내시면 30초 안에 자리가 잡힙니다. 별도 앱·회원가입 없습니다.",
  },
  {
    q: "창원 룰루랄라 나이트 입장 연령은?",
    a: "만 19세 이상만 입장 가능합니다. 입장 시 신분증을 확인하며, 미성년자는 출입할 수 없습니다.",
  },
  {
    q: "창원 룰루랄라 가격은 얼마인가요?",
    a: "옵션·인원·시간대에 따라 다릅니다. 매장에 문의 주시면 인원에 맞는 정확한 금액을 안내합니다.",
  },
  {
    q: "창원 룰루랄라 위치는 어디인가요?",
    a: "경상남도 창원시 성산구 상남동 22-4 지하 3층(모아엔트몰)입니다. 자세한 길은 오시는 길 페이지를 확인해 주세요.",
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
            <br className="sm:hidden" /> 카카오톡 한 통이면 끝납니다.
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
            그래서 이 페이지는 짧게 정리합니다. 공식 사이트이고,
            문의는{" "}
            매장 문의{" "}
            하나입니다.
          </p>
          <p>
            저희는 경상남도 창원시 안에 있는 합법 나이트 클럽입니다. 사업자 등록이
            있고, 만 19세 이상만 받습니다. 입장하실 때 신분증 확인합니다. 이게 룰이라기
            보다, 매장이 오래 잘 굴러가는 방법이에요. 손님도 보호되고, 가게도 보호됩니다.
            창원룰루랄라나이트 이름으로 검색하면 비슷한 페이지가 여럿 뜨실 텐데,
            공식 카카오톡은 이 ID 하나입니다. 다른 번호나 계정으로 연락 받으셨다면
            같은 가게 아닐 수 있어요.
          </p>
          <p>
            카카오톡으로 문의하시면 매니저가 직접 답합니다. 중간에 다른 직원 거치지
            않습니다. 인원, 날짜, 시간, 이 세 가지만 알려주시면 그 자리에서 자리
            잡아드려요. 처음 오시는 거면 한마디만 더 보태주세요 — "처음이에요"
            한마디면 분위기 맞는 자리로 안내드립니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-6">
        <h2 className="text-xl font-bold text-white sm:text-2xl">한눈에 보기</h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-elev p-5">
            <dt className="text-xs text-gray-400">문의</dt>
            <dd className="mt-1 text-xl font-extrabold text-[#c9a800]">
              매장 문의
            </dd>
            <dd className="mt-1 text-xs text-gray-500">매니저가 직접 답합니다</dd>
          </div>
          <div className="rounded-2xl border border-line bg-elev p-5">
            <dt className="text-xs text-gray-400">위치</dt>
            <dd className="mt-1 text-base font-bold text-white">
              {SITE.city} <Placeholder>{PLACEHOLDERS.address}</Placeholder>
            </dd>
            <dd className="mt-1 text-xs text-gray-500">자세한 길은 오시는 길 페이지에</dd>
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
            <dd className="mt-1 text-base font-bold text-white">카카오톡 문의</dd>
            <dd className="mt-1 text-xs text-gray-500">인원·옵션 따라 다름</dd>
          </div>
          <div className="rounded-2xl border border-line bg-elev p-5">
            <dt className="text-xs text-gray-400">예약</dt>
            <dd className="mt-1 text-base font-bold text-white">카카오톡 한 통</dd>
            <dd className="mt-1 text-xs text-gray-500">앱·회원가입 없음</dd>
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
            안 합니다. 카카오톡 한 통이면 됩니다. 진짜로 30초입니다. 처음 연락하는
            분들이 가장 많이 망설이는 게 "뭘 말해야 하지"인데, 정해진 대본 같은 거
            없습니다. 그냥 인원·날짜·시간 세 가지만 알려주시면 됩니다.
          </p>
          <ol className="space-y-3 rounded-2xl border border-line bg-elev p-5 text-gray-200">
            <li>
              <strong className="text-gold">1.</strong>{" "}
              카카오톡에서{" "}
              매장 문의{" "}
              검색하세요.
            </li>
            <li>
              <strong className="text-gold">2.</strong> 인원 / 날짜 / 시간 / 요청사항을 보내세요.
            </li>
            <li>
              <strong className="text-gold">3.</strong> 자리 확정 받으시면 끝.
            </li>
            <li>
              <strong className="text-gold">4.</strong> 신분증 챙겨 도착하시면 됩니다.
            </li>
          </ol>
          <p>
            저장해 두시면 다음에 편합니다. 카카오톡  · 창원 룰루랄라 나이트.
            이 두 줄이면 충분합니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-6">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          왜 카카오톡으로 직접 받는지
        </h2>
        <div className="mt-4 space-y-4 text-gray-300">
          <p>
            나이트 처음 가시는 분들 가장 부담되는 게, 모르는 사람한테 연락해서 "얼마예요"
            물어보는 거더라고요. 그래서 저희는 그 단계를 가능한 한 편하게 만들었습니다.
            카카오톡으로 문자 보내듯 연락하시면, 매니저가 직접 답합니다.
          </p>
          <p>
            연락하실 때 누구인지 모르고 망설이지 않으셔도 됩니다. 매니저가 가격도 그
            자리에서 정확히 말씀드리고, 자리도 그 자리에서 잡힙니다. 손님 입장에서
            한 번 연락으로 끝나는 게 가장 빠릅니다.
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
        <h2 className="text-xl font-bold text-white sm:text-2xl">카카오톡 전에 보면 좋은 페이지</h2>
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
            카카오톡 한 통 하시면 됩니다.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            창원 룰루랄라 나이트 · 카카오톡 
          </p>
          <div className="mt-5 flex justify-center">
            <CallButton size="xl" pulse />
          </div>
        </div>
      </section>
    </main>
  );
}
