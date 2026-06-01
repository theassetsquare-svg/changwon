import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { PAGE_META, SITE } from "@/lib/site";

const m = PAGE_META["/review"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/review" },
  openGraph: { title: m.title, description: m.description },
};

const REVIEW_FAQ = [
  {
    q: "창원 룰루랄라 나이트 후기는 어디서 볼 수 있나요?",
    a: "본 사이트 후기 페이지에 실제 매장에서 받은 후기만 게시됩니다. 추가로 매장 동의 후 네이버 플레이스에 등록된 후기도 함께 확인할 수 있습니다.",
  },
  {
    q: "후기가 적어 보이는데 일부러 가린 건가요?",
    a: "아닙니다. 매장에서 손님께 동의를 받은 후기만 올리기 때문에 양이 빠르게 늘지 않습니다. 가짜 후기로 채우기보다 진짜만 천천히 올리는 쪽을 선택했습니다.",
  },
  {
    q: "별점 평균을 부풀리지 않는다는 말이 진짜인가요?",
    a: "네. 실제로 받은 평점만 그대로 집계해 평균을 표시합니다. 부풀린 별점, 자작 별점은 사용하지 않습니다. 매장에 불리한 후기도 그대로 둡니다.",
  },
  {
    q: "후기 남기려면 어떻게 해야 하나요?",
    a: "매장에서 직접 말씀하시거나, 로 짱구 매니저에게 보내주시면 됩니다. 비공개 요청은 그 자리에서 반영됩니다.",
  },
];

export default function ReviewPage() {
  return (
    <PageShell
      title="창원 룰루랄라 나이트 후기"
      hook={m.hook}
      pathname="/review"
    >
      <p>
        솔직하게 말씀드립니다. 이 페이지에 가짜 후기는 절대 안 올립니다. 가짜 별점도
        안 만듭니다. 받은 것만 그대로 올립니다.{" "}
        <strong className="text-white">창원 룰루랄라 나이트</strong> 후기는 실제
        손님이 매장에 남긴 것만 게시합니다. 자작 후기, 외부 알바 후기, 다른 가게
        후기 복사 같은 거 안 합니다.
      </p>

      <div className="rounded-2xl border border-dashed border-line bg-elev p-8 text-center text-gray-400">
        <p className="text-base">아직 게시 가능한 실제 후기가 모이지 않았습니다.</p>
        <p className="mt-2 text-sm">
          매장에서 동의 받은 진짜 후기가 모이는 대로 여기 그대로 올립니다.
        </p>
      </div>

      <h2 className="pt-2 text-xl font-bold text-white">제가 후기를 다루는 방식</h2>
      <ul className="space-y-2 text-gray-300">
        <li>방문하신 손님께 직접 받은 후기만 올립니다.</li>
        <li>출처(카카오톡, 네이버 플레이스 등) 함께 표기합니다.</li>
        <li>평점 평균 부풀리기 안 합니다. 실제 평균만 표시합니다.</li>
        <li>비공개로 해달라 하시면 그 자리에서 내립니다.</li>
        <li>저희 입장에 불리한 후기도 그대로 남깁니다. 그게 정직이니까요.</li>
        <li>“알바생 후기”, “지인 후기” 같은 거 못 끼게 합니다.</li>
      </ul>

      <h2 className="pt-2 text-xl font-bold text-white">왜 이렇게 까다롭게 하느냐면</h2>
      <p>
        손님이 후기를 믿고 왔는데 사실이 아니면, 손님이 손해입니다. 그 한 번이면
        가게는 끝납니다. 그래서 후기는 적게 보일지언정, 진짜만 둡니다. 창원에서
        나이트 검색하시는 분들 점점 후기 보는 눈이 매서워졌습니다. 부풀린 별점은
        오히려 의심을 사고, 진짜 후기는 천천히 가더라도 신뢰가 쌓입니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">후기 남기시려면</h2>
      <p>
        손님이 후기를 직접 보내주시는 게 가장 좋습니다. 카카오톡, 문자, 전화 어떤
        방법이든 좋아요. 짱구한테 한마디 해 주세요 —{" "}
        <a href={SITE.phoneHref} className="font-bold text-gold underline">{SITE.phone}</a>.
        후기를 좋게 써달라 부탁 안 합니다. 그냥 솔직히 적어주시면 됩니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">후기 관련 자주 묻는 질문</h2>
      <div className="space-y-2">
        {REVIEW_FAQ.map((item) => (
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
            mainEntity: REVIEW_FAQ.map((f) => ({
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
