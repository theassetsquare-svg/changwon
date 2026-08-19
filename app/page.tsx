import type { Metadata } from "next";
import PageJsonLd from "@/components/PageJsonLd";
import OgThumb from "@/components/OgThumb";
import { PAGE_META, SITE, SITE_OTHER } from "@/lib/site";
import { thumb } from "@/lib/og";

const meta = PAGE_META["/"];


/** 이 페이지 전용 썸네일 — og:image 와 본문 <img> 가 같은 파일을 가리킨다 */
const THUMB = thumb({
  pathname: "/",
  alt: `${SITE.nameNoSpace} 홈 · 창원에서 성공하는 방법`,
});
export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: meta.title,
    description: meta.description,
    images: THUMB.images,
  },
  twitter: {
    card: "summary",
    title: meta.title,
    description: meta.description,
    images: [THUMB.url],
  },
  other: { ...SITE_OTHER, ...THUMB.other },
};

const TOC = [
  { id: "law-1", label: "① 창원은 생각보다 좁습니다" },
  { id: "law-2", label: "② 창원의 시계에 맞추세요" },
  { id: "law-3", label: "③ 인맥은 부탁이 아니라 기억입니다" },
  { id: "law-4", label: "④ 술자리는 따는 자리가 아닙니다" },
  { id: "law-5", label: "⑤ 돈은 얼마가 아니라 어떻게" },
  { id: "law-6", label: "⑥ 이 도시는 잔존율의 도시입니다" },
  { id: "checklist", label: "오늘 당장 할 수 있는 것" },
  { id: "last", label: "끝까지 읽으신 분께 — 마지막 한 가지" },
];

const CHECKLIST = [
  "못 할 일은 그 자리에서 못 한다고 말한다. 애매하게 미루지 않는다.",
  "상대의 퇴근 시간과 근무 형태를 먼저 묻는다. 약속은 그 다음에 잡는다.",
  "만난 사람 이야기 중 딱 한 줄을 메모한다. 다음 통화는 그 한 줄로 시작한다.",
  "술자리에서는 본인 주량의 70%에서 멈춘다. 마지막 한 잔을 이긴 사람이 남는다.",
  "누구 앞에서든 종업원에게 하는 말투를 바꾸지 않는다.",
  "그 자리에 없는 사람 험담은 하지 않는다. 창원에서는 반드시 돌아옵니다.",
  "결론을 첫 자리에서 내지 않는다. 세 번째 만남까지 기다린다.",
];

const HOME_FAQ = [
  {
    q: "창원에서 성공하려면 인맥이 제일 중요한가요?",
    a: "인맥 자체보다 평판이 먼저입니다. 창원은 산업단지를 중심으로 업계가 촘촘하게 이어져 있어서 한 사람에 대한 평가가 빠르게 공유됩니다. 평판이 나쁘면 인맥은 늘어나도 도움이 되지 않고, 평판이 좋으면 인맥은 소개로 알아서 늘어납니다.",
  },
  {
    q: "창원에서 사람 만나기 좋은 시간대는 언제인가요?",
    a: "상대의 근무 형태에 따라 다릅니다. 창원은 제조업 비중이 큰 도시라 교대 근무를 하는 분이 많습니다. 주간 근무자는 저녁 7시 전후, 교대 근무자는 근무 주차에 따라 완전히 달라집니다. 시간을 정하기 전에 근무 형태를 먼저 물어보는 것이 가장 빠릅니다.",
  },
  {
    q: "술자리에서 정말 일이 성사되나요?",
    a: "계약이 성사되는 경우는 드뭅니다. 대신 사람이 걸러지는 일은 매번 일어납니다. 술자리는 무언가를 따내는 자리가 아니라 이미 가진 신뢰를 잃지 않는 자리로 보는 편이 현실에 가깝습니다.",
  },
  {
    q: "이 글의 내용은 무엇을 근거로 쓴 건가요?",
    a: "창원 상남동에서 매장을 운영하며 직접 보고 들은 것을 정리한 글입니다. 통계나 조사 결과가 아니라 한 사람의 관찰이며, 성공을 보장하는 방법이 아닙니다. 지어낸 수치나 사례는 넣지 않았습니다.",
  },
  {
    q: "창원에서 오래 버티는 게 정말 전략이 되나요?",
    a: "업계가 좁은 도시에서는 그렇습니다. 같은 분야에 오래 남아 있으면 어느 시점부터는 사람들이 그 분야의 질문을 자연스럽게 그 사람에게 하게 됩니다. 새로 들어온 사람이 아무리 잘해도 그 위치를 단기간에 대체하기는 어렵습니다.",
  },
];

export default function HomePage() {
  return (
    <>
      <main>
        <PageJsonLd pathname="/" />

        {/* 읽은 분량 표시 — 지원 브라우저에서만 동작하고, 아니면 그냥 보이지 않는다 */}
        <div className="read-progress" aria-hidden />

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
          <div className="relative mx-auto max-w-3xl px-4 py-12 sm:py-20">
            <p className="fade-up inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
              창원 상남동 · 읽는 데 7분
            </p>
            <h1 className="fade-up mt-4 text-[2rem] font-extrabold leading-tight text-white sm:text-6xl">
              <span className="gold-grad">창원에서 성공하는 방법</span>
            </h1>
            <p className="fade-up mt-5 max-w-prose2 text-lg text-gray-200 sm:text-xl">
              창원에서 잘되는 사람은 처음부터 티가 납니다.
              <br className="hidden sm:block" /> 다만 사람들이 생각하는 그 이유는
              아닙니다.
            </p>

            {/* 썸네일 — og:image 와 같은 파일을 본문에도 실제로 렌더한다 */}
            <figure className="fade-up mt-7">
              <OgThumb pathname="/" alt={THUMB.alt} />
            </figure>

            <div className="fade-up mt-7 space-y-4 text-[15px] leading-7 text-gray-300 sm:text-base sm:leading-8">
              <p>
                저는 창원시 성산구 상남동 지하 3층에서 매장을 봅니다. 하는 일이
                자리를 잡아 드리는 일이라, 밤마다 같은 자리에 서서 사람들이
                들어오고 나가는 걸 봅니다. 처음 오시는 분, 몇 년째 오시는 분,
                한동안 잘나가다 어느 순간부터 안 보이는 분까지 전부 같은 문으로
                지나갑니다.
              </p>
              <p>
                그러다 보면 이상한 게 보입니다. 이 도시에서 자리를 잡는 사람들은
                업종이 달라도 하는 짓이 비슷하고, 사라지는 사람들도 사라지는
                방식이 비슷합니다. 그게 여섯 가지로 정리가 됐습니다.
              </p>
              <p className="rounded-2xl border border-gold/40 bg-gold/5 p-4 text-gray-100">
                <strong className="text-gold">먼저 밝혀둡니다.</strong> 이건 통계도
                조사 결과도 아니고, 한 사람이 한자리에서 오래 본 것입니다. 성공을
                보장하는 글이 아닙니다. 대신 지어낸 수치나 없는 사례는 한 줄도
                넣지 않았습니다. 마지막 항목 하나는 제가 여기서 본 것 중 가장
                확실한 것이라, 그것만 보셔도 됩니다.
              </p>
            </div>

            <nav
              aria-label="목차"
              className="fade-up mt-8 rounded-2xl border border-line bg-elev p-5"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-gold">
                목차
              </p>
              <ol className="mt-3 space-y-2 text-[15px] text-gray-300">
                {TOC.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="underline decoration-line underline-offset-4 transition hover:text-gold hover:decoration-gold"
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="fade-up mt-10 flex justify-center text-gold" aria-hidden>
              <span className="scroll-cue text-2xl">↓</span>
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4">
          <section id="law-1" className="scroll-mt-24 py-10">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">
              첫째
            </p>
            <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
              창원은 생각보다 좁습니다
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-7 text-gray-300 sm:text-base sm:leading-8">
              <p>
                창원은 국가산업단지를 중심으로 계획해서 만든 도시입니다. 기계,
                방산, 조선기자재, 자동차 부품 — 업종이 서로 붙어 있고, 사람들은
                그 안에서 회사를 옮겨 다닙니다. 그래서 처음 만난 사람과 두 다리만
                건너면 아는 사람이 겹칩니다. 실제로 홀에서 서로 모르고 앉았다가
                같은 협력업체 이름이 나와서 인사하는 장면을 자주 봅니다.
              </p>
              <p>
                이게 무슨 뜻이냐면, 창원에서는 평판에 이자가 붙습니다. 좋은
                쪽으로도 나쁜 쪽으로도요. 큰 도시에서는 한 번 어긋나도 다른 판이
                있지만, 창원에서는 몇 년 뒤에 같은 판으로 돌아옵니다. 심지어
                상대만 바뀌고 자리는 그대로인 경우도 있습니다.
              </p>
              <p>
                그러니 여기서 가장 비싼 실수는 사기도 배신도 아닙니다.{" "}
                <strong className="text-white">
                  &ldquo;일단 해보겠습니다&rdquo; 해놓고 연락을 끊는 것
                </strong>
                입니다. 이 도시에서 가장 빨리 퍼지는 말이 &ldquo;그 사람 연락
                안 돼&rdquo;입니다. 못 하겠으면 그 자리에서 못 한다고 하십시오.
                거절은 기억에 3개월 남지만 잠수는 3년 남습니다.
              </p>
            </div>
          </section>

          <section id="law-2" className="scroll-mt-24 border-t border-line py-10">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">
              둘째
            </p>
            <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
              창원의 시계에 맞추세요
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-7 text-gray-300 sm:text-base sm:leading-8">
              <p>
                창원은 출근하는 도시입니다. 도시의 리듬이 근무 리듬을 그대로
                따라갑니다. 저는 그걸 상남동 상권에서 매일 확인합니다. 평일 저녁
                거리가 차오르는 시간, 다시 비는 시간이 요일마다 거의 일정합니다.
                이 도시는 놀 때조차 출근 시간을 기준으로 놉니다.
              </p>
              <p>
                그래서 다른 도시 감각으로 약속을 잡으면 계속 어긋납니다. 늦은
                저녁으로 잡아 놓고 상대가 피곤해하는 이유, 주말 낮에 잡았는데
                상대는 그 주가 야간 근무 주차라 종일 자야 하는 이유가 여기
                있습니다. 상대가 성의가 없는 게 아니라 시계가 다른 겁니다.
              </p>
              <p>
                방법은 간단합니다.{" "}
                <strong className="text-white">
                  시간을 제안하기 전에 근무 형태부터 물어보십시오.
                </strong>{" "}
                &ldquo;혹시 이번 주 주간이세요, 야간이세요?&rdquo; 이 한 문장이
                창원에서는 인사말입니다. 이걸 묻는 순간 상대는 &ldquo;이 사람이
                내 사정을 안다&rdquo;고 판단합니다. 영업 멘트 열 줄보다 이 한 줄이
                셉니다.
              </p>
            </div>
          </section>

          <section id="law-3" className="scroll-mt-24 border-t border-line py-10">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">
              셋째
            </p>
            <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
              인맥은 부탁이 아니라 기억으로 만들어집니다
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-7 text-gray-300 sm:text-base sm:leading-8">
              <p>
                밤마다 보는 장면이 있습니다. 명함을 제일 많이 돌린 사람이 제일
                빨리 잊힙니다. 반대로 다음에 왔을 때 &ldquo;지난번에 아드님 수술
                한다고 하셨는데 잘 끝났습니까&rdquo; 하고 묻는 사람은, 그날 아무
                것도 팔지 않아도 그 테이블에서 제일 오래 이야기합니다.
              </p>
              <p>
                이게 창원에서 특히 강하게 작동하는 이유는 첫 번째 이야기와
                이어집니다. 이 도시는 좁아서, 나를 기억하는 사람 한 명이 곧 소개
                경로가 됩니다. 인맥을 넓히려고 사람을 더 만나는 것보다, 이미 만난
                사람이 나를 기억하게 만드는 쪽이 훨씬 빠릅니다.
              </p>
              <p>
                실천은 이걸로 충분합니다.{" "}
                <strong className="text-white">
                  헤어지고 나서 그 사람이 한 이야기 중 딱 한 줄만 메모하십시오.
                </strong>{" "}
                일 얘기 말고 사람 얘기로요. 다음 연락을 그 한 줄로 시작하면
                됩니다. 이건 기술이 아니라 그냥 성실함인데, 대부분이 안 합니다.
                안 하니까 하는 사람이 눈에 띕니다.
              </p>
            </div>
          </section>

          <section id="law-4" className="scroll-mt-24 border-t border-line py-10">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">
              넷째
            </p>
            <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
              술자리는 따는 자리가 아니라 안 잃는 자리입니다
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-7 text-gray-300 sm:text-base sm:leading-8">
              <p>
                이 이야기는 제가 하기에 좀 이상하게 들릴 수 있습니다. 술 파는
                자리에서 일하는 사람이 하는 말이니까요. 그래도 본 대로
                말씀드리면, 이런 자리에서 계약이 성사되는 건 거의 못 봤습니다.
                대신 사람이 걸러지는 건 매번 봅니다.
              </p>
              <p>
                사람들이 술자리에서 실제로 보는 건 상대의 사업 계획이 아닙니다.
                취했을 때 말투가 어떻게 변하는지, 종업원한테 어떻게 말하는지,
                계산할 때 어떤 표정인지, 그리고 다음 날 연락이 오는지. 이 네 개로
                &ldquo;이 사람하고 돈 얘기 해도 되나&rdquo;가 정해집니다. 술자리는
                면접이 아니라 신원 조회에 가깝습니다.
              </p>
              <p>
                그래서 목표를 바꾸셔야 합니다. 뭘 따내겠다고 나가면 십중팔구 무리
                하고, 무리하면 위 네 가지 중 하나에서 반드시 걸립니다.{" "}
                <strong className="text-white">
                  이미 가진 신뢰를 하나도 안 깎고 돌아오는 것
                </strong>
                을 목표로 잡으십시오. 안 잃으면 남습니다. 남으면 다음이 있고요.
              </p>
              <p>
                구체적으로는 셋입니다. 본인 주량의 70%에서 멈출 것. 누가 보든 안
                보든 종업원에게 하는 말투를 바꾸지 않을 것. 그 자리에 없는 사람
                험담은 하지 않을 것. 특히 마지막 건 창원에서 위험합니다. 험담은
                거의 반드시 당사자에게 돌아갑니다.
              </p>
            </div>
          </section>

          <section id="law-5" className="scroll-mt-24 border-t border-line py-10">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">
              다섯째
            </p>
            <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
              돈은 얼마를 쓰느냐가 아니라 어떻게 쓰느냐입니다
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-7 text-gray-300 sm:text-base sm:leading-8">
              <p>
                크게 쓰는 분들 많이 봅니다. 그런데 같은 금액을 쓰고도 결과가
                정반대인 경우가 흔합니다. 차이는 금액이 아니라 방식에서
                갈립니다.
              </p>
              <p>
                자리에서 카드를 꺼내 흔드는 것과, 미리 조용히 정리해 두고 아무
                말도 안 하는 것. 지출은 같은데 남는 게 다릅니다. 앞엣것은 그날
                밤에만 효과가 있고 뒤엣것은 그 사람 기억에 남습니다. 과시는
                이 도시에서 특히 빨리 소문이 나는데, 좋은 쪽으로 나는 경우는
                드뭅니다.
              </p>
              <p>
                여기서 솔직하게 하나 말씀드리겠습니다.{" "}
                <strong className="text-white">
                  돈으로 산 관계는 돈이 떨어지면 같이 떨어집니다.
                </strong>{" "}
                제가 이 자리에서 제일 많이 본 게 그겁니다. 한동안 매일 오시다가
                어느 날부터 안 보이는 분들 주변에는 대개 사람이 남아 있지
                않습니다. 돈은 이미 있는 관계를 편하게 만드는 데까지만 쓰십시오.
                없는 관계를 만드는 데 쓰면 그건 그냥 비용입니다.
              </p>
            </div>
          </section>

          <section id="law-6" className="scroll-mt-24 border-t border-line py-10">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">
              여섯째
            </p>
            <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
              창원은 재능의 도시가 아니라 잔존율의 도시입니다
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-7 text-gray-300 sm:text-base sm:leading-8">
              <p>
                상남동에서 가게가 바뀌는 걸 셀 수 없이 봤습니다. 개업할 때 제일
                화려했던 집이 제일 먼저 없어지는 것도 여러 번 봤습니다. 반대로
                크게 눈에 띈 적 없이 계속 문을 여는 집들이 있습니다. 몇 년 지나면
                동네에서 그 집을 모르는 사람이 없어집니다.
              </p>
              <p>
                사람도 똑같습니다. 여기서 자리를 잡은 분들의 공통점은 뛰어남이
                아니라 안 사라짐이었습니다. 같은 업계에서, 같은 번호로, 같은
                태도로 계속 있었던 것. 그게 전부인 경우가 많습니다. 이 도시는
                업계가 좁아서, 오래 남아 있기만 해도 어느 순간 &ldquo;그건 저
                사람한테 물어봐&rdquo; 소리를 듣는 위치가 됩니다.
              </p>
              <p>
                그래서 창원에서 성공하는 방법을 한 문장으로 줄이면 이렇습니다.{" "}
                <strong className="text-white">
                  크게 벌 방법을 찾기 전에, 안 사라질 방법부터 만드십시오.
                </strong>{" "}
                버티는 건 소극적인 게 아닙니다. 좁은 도시에서는 그게 가장 강한
                전략입니다.
              </p>
            </div>
          </section>

          <section id="checklist" className="scroll-mt-24 border-t border-line py-10">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              오늘 당장 할 수 있는 것
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-gray-300 sm:text-base sm:leading-8">
              위의 여섯 가지를 실제로 움직이는 행동으로만 줄이면 일곱 줄입니다.
              오늘부터 되는 것들입니다.
            </p>
            <ol className="mt-5 space-y-3 rounded-2xl border border-line bg-elev p-5 text-[15px] leading-7 text-gray-200 sm:text-base">
              {CHECKLIST.map((item, i) => (
                <li key={item} className="flex gap-3">
                  <span className="shrink-0 font-extrabold text-gold">
                    {i + 1}.
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </section>

          <section id="last" className="scroll-mt-24 border-t border-line py-10">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">
              마지막 한 가지
            </p>
            <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
              끝까지 읽으신 분께
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-7 text-gray-300 sm:text-base sm:leading-8">
              <p>
                여기까지 읽으셨으면 이미 위의 여섯 가지 중 하나는 하고 계신
                겁니다. 끝까지 읽는 것도 잔존율이거든요. 농담처럼 들리겠지만
                제가 본 것 중에 제일 확실한 상관관계입니다. 끝까지 듣는 사람이
                끝까지 남습니다.
              </p>
              <p>
                제 자리에서 본 결론은 이겁니다. 이 도시에서 잘된 사람들은 남들이
                모르는 방법을 알고 있던 게 아니었습니다. 다들 아는 것을 몇 년
                동안 계속했을 뿐입니다. 약속 지키고, 못 할 건 미리 말하고, 사람
                이야기를 기억하고, 취해도 태도를 안 바꾸고, 조용히 계산하고,
                그리고 안 없어졌습니다.
              </p>
              <p>
                재미없는 결론이라 대부분은 여기까지 안 읽고 나갑니다. 그래서
                이게 계속 통합니다.
              </p>
              <p className="rounded-2xl border border-gold/40 bg-gold/5 p-5 text-gray-100">
                다시 한 번 밝혀둡니다. 이 글은 창원 상남동에서 오래 장사한 사람이 현장에서 관찰한 내용이고, 통계나
                조사 결과가 아닙니다. 성공을 보장하지 않습니다. 다만 지어낸
                사례나 없는 수치는 한 줄도 넣지 않았습니다.
              </p>
            </div>
          </section>

          <section className="scroll-mt-24 border-t border-line py-10">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              자주 묻는 질문
            </h2>
            <div className="mt-4 space-y-2">
              {HOME_FAQ.map((item) => (
                <details
                  key={item.q}
                  className="rounded-2xl border border-line bg-elev p-4 transition open:border-gold"
                >
                  <summary className="pr-8 font-semibold text-white">
                    {item.q}
                  </summary>
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
        </article>
      </main>
    </>
  );
}
