import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { PAGE_META, SITE } from "@/lib/site";

const m = PAGE_META["/reserve"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/reserve" },
  openGraph: { title: m.title, description: m.description },
};

const RESERVE_FAQ = [
  {
    q: "창원 룰루랄라 나이트 예약은 꼭 해야 하나요?",
    a: "필수는 아닙니다. 다만 사람 많은 날은 자리가 빠르게 빠지기 때문에, 헛걸음하지 않으시려면 로 짱구 매니저에게 미리 전화해 두는 편이 안전합니다.",
  },
  {
    q: "예약 취소하면 페널티가 있나요?",
    a: "없습니다. 예약했던 번호로 다시 전화 주시면 됩니다. 다만 가능하면 일찍 알려 주시면 다음 손님 자리를 잡기 좋습니다.",
  },
  {
    q: "단체 예약은 몇 명부터 미리 연락해야 하나요?",
    a: "4명 이상이면 미리 전화 주세요. 같은 테이블에 모이게 잡으려면 사전 조정이 필요합니다. 인원이 더 많아질 가능성이 있으면 그 부분도 함께 말씀해 주세요.",
  },
  {
    q: "온라인 예약 페이지는 없나요?",
    a: "없습니다. 별도 앱·회원가입·결제 사전등록도 없습니다.  전화 한 통이 가장 빠른 예약 경로입니다.",
  },
  {
    q: "당일 예약도 되나요?",
    a: "가능합니다. 도착 직전이라도 짱구 매니저에게 전화 주시면 자리가 있을 경우 바로 잡아드립니다.",
  },
];

export default function ReservePage() {
  return (
    <PageShell title="창원 룰루랄라 나이트 예약" hook={m.hook} pathname="/reserve">
      <p>
        앱 다운로드, 회원가입, 결제정보, 그런 거 없습니다. 전화 한 통이면 끝나요.
        진짜로 30초입니다. <strong className="text-white">창원 룰루랄라 나이트</strong>{" "}
        예약은 매니저 짱구가 직접 받는 , 이 번호 하나로 끝납니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">예약 4단계</h2>
      <ol className="space-y-3 rounded-2xl border border-line bg-elev p-5 text-gray-200">
        <li id="step1">
          <strong className="text-gold">1.</strong>{" "}
          <a href={SITE.phoneHref} className="font-bold text-gold underline">{SITE.phone}</a> 누르세요.
        </li>
        <li id="step2">
          <strong className="text-gold">2.</strong> “짱구 매니저요.”
        </li>
        <li id="step3">
          <strong className="text-gold">3.</strong> 인원, 날짜, 시간, 요청사항.
        </li>
        <li id="step4">
          <strong className="text-gold">4.</strong> 끝. 신분증 챙겨서 도착.
        </li>
      </ol>

      <h2 className="pt-2 text-xl font-bold text-white">와서 입장하실 때</h2>
      <ul className="space-y-2 text-gray-300">
        <li>예약 시간 5~10분 전 도착 추천드립니다.</li>
        <li>신분증 챙겨오세요. 19세 이상 합법 영업장입니다.</li>
        <li>도착해서 “짱구 예약입니다” 한마디면 자리 안내됩니다.</li>
        <li>입구가 헷갈리면 도착 직전 다시 전화 주세요. 잡아드립니다.</li>
      </ul>

      <h2 className="pt-2 text-xl font-bold text-white">변경 / 취소</h2>
      <p>
        예약했던 번호 그대로 다시 전화 주시면 됩니다. 변경·취소 페널티 없습니다.
        대신 빠르게 알려주시면 다음 손님 잡기 좋아요. 그게 매너 정도로 생각해
        주세요.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">단체 예약</h2>
      <p>
        4명 넘어가면 미리 한 번 전화 주세요. 한 테이블에 모이게 잡아드릴게요.
        분산되면 분위기 깨집니다. 인원이 늘어날 가능성 있으면 그것도 미리 말씀해
        주세요. 자리 폭 넉넉히 잡아둡니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">
        창원 룰루랄라 나이트 예약, 자주 묻는 질문
      </h2>
      <div className="space-y-2">
        {RESERVE_FAQ.map((item) => (
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
            mainEntity: RESERVE_FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <p className="rounded-2xl border border-line bg-elev p-5 text-sm text-gray-400">
        ※ 만취 또는 다른 손님께 피해가 갈 행동이 예상되는 경우 입장이 거절될 수
        있습니다. 다른 손님 보호를 위해 양해 부탁드립니다.
      </p>
    </PageShell>
  );
}
