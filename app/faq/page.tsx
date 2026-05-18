import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { PAGE_META, SITE } from "@/lib/site";

const m = PAGE_META["/faq"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/faq" },
  openGraph: { title: m.title, description: m.description },
};

const FAQ = [
  {
    q: "예약 어떻게 해요?",
    a: `010-3854-6887 누르고 "짱구 매니저요" 한마디 하시면 됩니다. 인원/날짜/시간 알려주시면 그 자리에서 잡힙니다.`,
  },
  {
    q: "처음인데 어색해요. 안 가는 게 나을까요?",
    a: "오히려 처음이라 와보시는 게 좋아요. 어색한 게 정상이니까 제가 어떤 자리에 앉히면 좋을지 같이 봅니다. 전화 주실 때 '처음이에요' 한마디만 해 주세요.",
  },
  {
    q: "혼자 가도 돼요?",
    a: "가능합니다. 다만 분위기는 인원이 있을 때 더 맞을 수 있어요. 그래서 미리 전화 주시면 어울리는 자리 잡아드립니다.",
  },
  {
    q: "몇 살부터 입장 가능해요?",
    a: "만 19세 이상이면 가능합니다. 입장 시 신분증을 확인합니다. 예외 없습니다.",
  },
  {
    q: "가격은 얼마예요?",
    a: "옵션·인원·시간대에 따라 다릅니다. 그래서 표보다 전화가 정확해요. 전화하시면 그 자리에서 인원에 맞는 가격 두세 개 묶어서 알려드립니다.",
  },
  {
    q: "신용카드 / 현금 어떻게 결제해요?",
    a: "결제 수단 자세한 안내는 전화로 직접 말씀드립니다. 매장 정책상 변동이 있어서요.",
  },
  {
    q: "주차할 수 있나요?",
    a: "위치 따라 다릅니다. 인근 주차 안내 필요하시면 전화 주세요. 도착 직전에도 괜찮습니다.",
  },
  {
    q: "예약 취소하면 페널티 있어요?",
    a: "없습니다. 다만 빠르게 알려주시면 다음 손님 잡기 좋습니다. 매너 정도로 생각해 주세요.",
  },
  {
    q: "단체로 가도 돼요?",
    a: "환영합니다. 4명 넘으면 미리 한 번 전화 주세요. 같은 자리에 모이게 잡아드립니다.",
  },
  {
    q: "남자만/여자만 와도 돼요?",
    a: "둘 다 가능합니다. 자세한 분위기는 전화로 그 시간대 상황을 알려드릴게요.",
  },
  {
    q: "취해서 도착하면 어떻게 해요?",
    a: "만취 상태면 입장이 거절될 수 있습니다. 다른 손님 보호 차원이에요. 양해 부탁드립니다.",
  },
  {
    q: "전화 안 받으시면요?",
    a: "영업시간 외 또는 손님 응대 중일 수 있어요. 1~2분 뒤 다시 걸어주시거나, 메시지 남기시면 제가 콜백드립니다.",
  },
];

export default function FaqPage() {
  return (
    <PageShell title="자주 묻는 질문" hook={m.hook} pathname="/faq">
      <p>
        진짜 많이 받는 질문만 골라서 정리했습니다. 답도 제가 평소에 전화로 하는
        말 그대로 적었어요. 보시고 그래도 안 풀리면 그냥 전화 주세요.
      </p>

      <div className="space-y-2">
        {FAQ.map((item) => (
          <details
            key={item.q}
            className="rounded-2xl border border-line bg-elev p-4 transition open:border-gold"
          >
            <summary className="pr-8 font-semibold text-white">{item.q}</summary>
            <p className="mt-3 text-gray-300">{item.a}</p>
          </details>
        ))}
      </div>

      <p className="rounded-2xl border border-line bg-elev p-5 text-sm text-gray-300">
        여기 없는 질문이면 그냥 전화로 물어봐 주세요 —{" "}
        <a href={SITE.phoneHref} className="font-bold text-gold underline">{SITE.phone}</a>.
        제가 받는 거니까 어떤 질문이든 괜찮습니다.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
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
