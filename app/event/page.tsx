import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { PAGE_META, SITE } from "@/lib/site";

const m = PAGE_META["/event"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/event" },
  openGraph: { title: m.title, description: m.description },
};

const EVENT_FAQ = [
  {
    q: "창원 룰루랄라 나이트 지금 진행 중인 이벤트 있나요?",
    a: "본 페이지에 게시된 내용이 그날 기준 가장 정확합니다. 종료된 이벤트는 즉시 내려가며, 진행 중인 혜택만 게시됩니다.",
  },
  {
    q: "할인 쿠폰 같은 거 있나요?",
    a: "쿠폰 형태로 따로 운영하지 않습니다. 진행 중인 혜택이 있다면 본 페이지와 매장에서 동일하게 안내됩니다.",
  },
  {
    q: "광고만 보고 갔다가 '그런 이벤트 없다' 들어본 적 있어서 의심돼요.",
    a: "매장 정책상 종료된 이벤트나 '하지 않는 이벤트'를 광고에 적지 않습니다. 매장에 문의 주시면 그 자리에서 실제 진행 여부를 솔직히 답해드립니다.",
  },
];

export default function EventPage() {
  return (
    <PageShell
      title="창원 룰루랄라 나이트 이벤트"
      hook={m.hook}
      pathname="/event"
    >
      <p>
        "30% 할인" 같은 거 사이트에 안 적습니다. 보고 오셨는데 막상 가니까 그런
        할인 없는 가게, 흔하잖아요. 저희는 그게 손님한테 가장 미안한 일이라고
        생각해요. <strong className="text-white">창원 룰루랄라 나이트</strong>는
        실제 진행 중인 이벤트만 게시합니다. 끝난 건 즉시 내립니다.
      </p>

      <div className="rounded-2xl border border-dashed border-line bg-elev p-8 text-center text-gray-400">
        <p className="text-base">지금 게시 가능한 진행 중 이벤트가 없습니다.</p>
        <p className="mt-2 text-sm">
          시작하면 본 페이지와 '매장 소식'에 같이 올립니다.
        </p>
      </div>

      <h2 className="pt-2 text-xl font-bold text-white">
        왜 사이트에 광고를 잘 안 거나면
      </h2>
      <p>
        사이트로 손님 끌어모으는 가게보다, 단골이 다시 부르는 가게가 더 오래 갑니다.
        그래서 이벤트를 "안 하는" 게 아니라, "하는 것만" 올립니다. 한다고 적었는데
        막상 가니 없는 가게, 저희는 안 하고 싶어요. 손님이 매장 입구에서 한 번 실망
        하면 그 다음은 없으니까요.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">이벤트 표기 룰</h2>
      <ul className="space-y-2 text-gray-300">
        <li>진행 중인 이벤트만 게시. 종료된 이벤트는 즉시 내림.</li>
        <li>"역대급", "최대", "단 하루" 등 자극적 표현 사용 안 함.</li>
        <li>할인율 / 적용 조건 / 종료 일자 함께 표기.</li>
        <li>매장 내 안내 문구와 사이트 게시 내용이 일치.</li>
        <li>광고비 받고 외부 업체 끼워 넣는 이벤트 게시 안 함.</li>
      </ul>

      <p>
        지금 진행 중인 혜택 여부가 궁금하시면 카카오톡 주세요. 매니저가 그 자리에서
        솔직히 말씀드립니다 —{" "}
        매장 문의
        . 창원 나이트 중에서 "하지 않는 이벤트"를 광고에 적는 가게는 많은데, 저희는
        반대로 갑니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">이벤트 관련 자주 묻는 질문</h2>
      <div className="space-y-2">
        {EVENT_FAQ.map((item) => (
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
            mainEntity: EVENT_FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </PageShell>
  );
}
