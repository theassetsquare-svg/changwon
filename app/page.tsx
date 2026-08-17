import type { Metadata } from "next";
import Link from "next/link";
import PageJsonLd from "@/components/PageJsonLd";
import Placeholder from "@/components/Placeholder";
import StickyCallBar from "@/components/StickyCallBar";
import { NAV, PAGE_META, PLACEHOLDERS, SITE, OG_IMAGE } from "@/lib/site";

const meta = PAGE_META["/"];

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  openGraph: { title: meta.title, description: meta.description, images: OG_IMAGE },
};

const HOME_FAQ = [
  {
    q: "창원 룰루랄라 나이트 연락처는?",
    a: "010-3854-6887로 전화 주시면 매니저가 직접 답변합니다.",
  },
  {
    q: "창원룰루랄라나이트 예약은 어떻게 하나요?",
    a: "전화 010-3854-6887로 인원·날짜·시간을 말씀해 주시면 30초 안에 자리가 잡힙니다. 별도 앱·회원가입 없습니다.",
  },
  {
    q: "창원 룰루랄라 나이트 입장 연령은?",
    a: "만 27세 이상만 입장 가능합니다. 입장 시 신분증을 확인하며, 27세 미만은 출입할 수 없습니다.",
  },
  {
    q: "창원 룰루랄라 가격은 얼마인가요?",
    a: "옵션·인원·시간대에 따라 다릅니다. 010-3854-6887로 전화 주시면 인원에 맞는 정확한 금액을 안내합니다.",
  },
  {
    q: "창원 룰루랄라 위치는 어디인가요?",
    a: "경상남도 창원시 성산구 상남동 22-4 지하 3층(모아엔트몰)입니다. 자세한 길은 오시는 길 페이지를 확인해 주세요.",
  },
];

export default function HomePage() {
  return (
    <>
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
          <h1 className="fade-up mt-4 text-[2rem] font-extrabold leading-tight text-white sm:text-6xl">
            <span className="gold-grad">창원룰루랄라나이트</span>
          </h1>
          <p className="fade-up mx-auto mt-5 max-w-prose2 text-lg text-gray-200 sm:text-xl">
            같은 밤이라도 어디에 앉느냐에 따라 다릅니다.
            <br className="sm:hidden" /> 상남동 지하 3층 홀, 한 바퀴 돌아 보세요.
          </p>

          <a
            href={SITE.lottoPhoneHref}
            className="fade-up mx-auto mt-7 flex max-w-xl items-center justify-center gap-2 rounded-2xl bg-gold px-5 py-4 text-lg font-extrabold text-bg sm:text-2xl"
            aria-label={`${SITE.nameNoSpace} ${SITE.lotto} ${SITE.lottoPhoneDash}`}
          >
            <span aria-hidden>📞</span>
            {SITE.nameNoSpace} {SITE.lotto} {SITE.lottoPhoneDash}
          </a>

          <p className="fade-up mt-8 text-xs text-gray-500">
            27세 이상 출입 가능한 합법 영업장 · 입장 시 신분증 확인
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
          홀 한 바퀴 ① 입구 — 지하 3층까지 내려가는 동안
        </h2>
        <div className="mt-4 space-y-4 text-[15px] leading-7 text-gray-300 sm:text-base sm:leading-8">
          <p>
            <strong className="text-white">창원 룰루랄라 나이트</strong>는 창원시
            성산구 상남동 22-4 지하 3층에 있습니다. 세 개 층을 내려간다는 건
            진입 구간이 길다는 뜻입니다. 반 층 내려가는 홀은 문 하나로 거리와
            홀이 붙어 있지만, 여기는 그 사이에 층계참이 두 번 들어갑니다.
          </p>
          <p>
            그래서 홀에 도착할 때쯤이면 바깥 생각이 이미 정리돼 있습니다. 처음
            오시는 분들이 문 앞에서 긴장하다가도 홀에 들어서면 괜찮아지는 이유가
            이 구간에 있어요. 계단을 내려오면서 소리가 커지는 정도로 그날 홀이
            얼마나 찼는지도 대충 짐작이 됩니다.
          </p>
          <p>
            입구에서 확인하는 건 하나입니다. 만 27세 이상, 신분증. 사업자 등록이
            있는 합법 영업장이고, 이 확인이 홀 안의 나이대와 분위기를 거의 다
            정합니다. 예약 문의는{" "}
            <a href={SITE.phoneHref} className="font-extrabold text-gold underline">
              전화 {SITE.phone}
            </a>{" "}
            하나입니다. 창원룰루랄라나이트 이름으로 비슷한 페이지가 여럿 뜨는데,
            공식 번호는 이 하나예요.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-6">
        <h2 className="text-xl font-bold text-white sm:text-2xl">한눈에 보기</h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-elev p-5">
            <dt className="text-xs text-gray-400">예약 문의</dt>
            <dd className="mt-1 text-xl font-extrabold text-gold">
              <a href={SITE.phoneHref}>전화 {SITE.phone}</a>
            </dd>
            <dd className="mt-1 text-xs text-gray-500">매니저가 직접 받습니다</dd>
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
            <dd className="mt-1 text-base font-bold text-white">만 27세 이상</dd>
            <dd className="mt-1 text-xs text-gray-500">신분증 확인 · 27세 미만 불가</dd>
          </div>
          <div className="rounded-2xl border border-line bg-elev p-5">
            <dt className="text-xs text-gray-400">가격대</dt>
            <dd className="mt-1 text-base font-bold text-white">전화 문의</dd>
            <dd className="mt-1 text-xs text-gray-500">인원·옵션 따라 다름</dd>
          </div>
          <div className="rounded-2xl border border-line bg-elev p-5">
            <dt className="text-xs text-gray-400">예약</dt>
            <dd className="mt-1 text-base font-bold text-white">전화 한 통</dd>
            <dd className="mt-1 text-xs text-gray-500">앱·회원가입 없음</dd>
          </div>
        </dl>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          홀 한 바퀴 ② 플로어와 테이블 — 인원이 자리를 정합니다
        </h2>
        <div className="mt-4 space-y-4 text-[15px] leading-7 text-gray-300 sm:text-base sm:leading-8">
          <p>
            무대는 홀 한쪽 끝에 붙고 플로어는 그 정면에 놓입니다. 테이블은 플로어를
            둘러싸고 겹으로 놓입니다. 앞줄은 무대와 플로어가 다 보이고, 뒷줄은
            목소리가 통합니다. 이 구조는 규모와 상관없이 반복됩니다.
          </p>
          <p>
            그래서 자리는 인원으로 갈립니다. 셋 이하라면 앞줄이 낫습니다. 오가는
            사람이 많다는 게 단점이 아니라 그 자체로 기회이기 때문입니다. 넷
            이상이면 한 줄 물러나야 서로 말이 닿습니다. 여섯이 무대 앞에 앉으면
            양 끝은 서로 존재만 확인하다 끝나요.
          </p>
          <p>
            시간도 자리를 바꿉니다. 문 연 뒤 두어 시간은 홀이 헐거워서 고를 수
            있고, 자정 무렵이 가장 두껍습니다. 상남동은 저녁 식사 상권이 그대로
            이어지는 구조라 금요일과 토요일은 이 시계가 한 시간쯤 앞당겨집니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          홀 한 바퀴 ③ 부스와 룸 — 조용해질수록 홀과 멀어집니다
        </h2>
        <div className="mt-4 space-y-4 text-gray-300">
          <p>
            부스는 벽을 등지고 앉는 자리라 대화가 편하고, 룸은 문을 닫으면 홀
            음악이 배경으로 물러납니다. 조용한 정도로 보면 테이블 · 부스 · 룸
            순서로 한 단계씩 내려갑니다.
          </p>
          <p>
            다만 조용해질수록 홀과 멀어집니다. 분위기를 보러 오셨다면 룸에서
            시간을 다 쓰는 건 손해예요. 룸에 앉으시더라도 홀이 차오르는
            시간대에는 한 번 나와 보시는 편이 낫습니다. 반대로 일행끼리 오래
            이야기할 자리면 처음부터 벽 쪽을 청하시는 게 맞습니다.
          </p>
          <p>
            정리하면 이렇습니다. 셋 이하 + 홀 분위기 = 앞줄, 넷 이상 + 대화 =
            물러난 줄이나 부스, 일행끼리만 = 룸. 인원과 목적 두 가지만 말씀해
            주시면 이 판단은 저희가 대신 합니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          자리 잡는 법 — 전화 한 통, 30초
        </h2>
        <div className="mt-4 space-y-4 text-gray-300">
          <p>
            앱 설치도 회원가입도 결제 사전등록도 없습니다. 전화 한 통이면 됩니다.
            처음 연락하는 분들이 가장 많이 망설이는 게 &ldquo;뭘 말해야 하지&rdquo;인데,
            정해진 대본 같은 거 없습니다. 인원 · 날짜 · 시간 세 가지면 됩니다.
          </p>
          <ol className="space-y-3 rounded-2xl border border-line bg-elev p-5 text-gray-200">
            <li>
              <strong className="text-gold">1.</strong>{" "}
              <a href={SITE.phoneHref} className="font-extrabold text-gold underline">
                {SITE.phone}
              </a>
              로 전화하세요.
            </li>
            <li>
              <strong className="text-gold">2.</strong> 인원 / 날짜 / 시간 / 요청사항을 말씀해 주세요.
            </li>
            <li>
              <strong className="text-gold">3.</strong> 자리 확정 받으시면 끝.
            </li>
            <li>
              <strong className="text-gold">4.</strong> 신분증 챙겨 도착하시면 됩니다.
            </li>
          </ol>
          <p>
            저장해 두시면 다음에 편합니다. {SITE.phone} · 창원 룰루랄라 나이트.
            이 두 줄이면 충분합니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-6">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          다른 지역 홀은 어떻게 생겼나
        </h2>
        <div className="mt-4 space-y-4 text-gray-300">
          <p>
            홀마다 층이 다르고 천장이 다르고 부스가 놓인 벽이 다릅니다. 그 차이가
            자리마다 밤을 바꿉니다. 전국 나이트 40곳을 같은 순서 — 입구 · 플로어 ·
            테이블 · 부스 — 로 읽어 정리해 두었습니다.
          </p>
          <p>
            확인된 주소 · 역 · 층은 그대로 적고, 확인할 수 없는 내부 배치는
            &ldquo;일반적인 나이트 홀 기준&rdquo;이라고 구분해서 적었습니다.
            지어낸 요금표나 후기는 없습니다.
          </p>
          <p>
            <Link href="/hall" className="font-extrabold text-gold underline">
              전국 나이트 홀 도감 40 보기 →
            </Link>
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
        <h2 className="text-xl font-bold text-white sm:text-2xl">전화 문의 전에 보면 좋은 페이지</h2>
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
