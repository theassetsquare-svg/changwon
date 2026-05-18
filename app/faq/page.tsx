import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description: `${SITE.name} 자주 묻는 질문 모음. 예약, 입장, 가격 안내.`,
  alternates: { canonical: "/faq" },
};

const FAQ = [
  {
    q: "예약은 어떻게 하나요?",
    a: `${SITE.phone} 로 전화해 “짱구 매니저 부탁드립니다”라고 말씀해 주세요. 인원·날짜·시간을 알려주시면 바로 예약됩니다.`,
  },
  {
    q: "입장 연령은 어떻게 되나요?",
    a: "19세 이상부터 입장 가능합니다. 입장 시 신분증을 확인합니다.",
  },
  {
    q: "주차할 수 있나요?",
    a: "주차 안내는 짱구 매니저에게 직접 문의 주세요. 매장 인근 주차 안내를 드립니다.",
  },
  {
    q: "예약을 변경하거나 취소할 수 있나요?",
    a: "가능합니다. 예약했던 번호 그대로 다시 전화 주시면 됩니다.",
  },
  {
    q: "단체로 가도 되나요?",
    a: "단체 예약 환영합니다. 4인 이상이면 사전 전화 협의를 추천드립니다.",
  },
  {
    q: "가격이 어떻게 되나요?",
    a: "메뉴/룸별 가격은 가격 안내 페이지에 정리되며, 정확한 가격은 매니저에게 전화로 확인하실 수 있습니다.",
  },
];

export default function FaqPage() {
  return (
    <PageShell title="자주 묻는 질문" subtitle="실제로 많이 받는 질문만 모았습니다.">
      <div className="space-y-3">
        {FAQ.map((item) => (
          <details
            key={item.q}
            className="rounded-lg bg-gray-900 p-4 [&_summary]:cursor-pointer"
          >
            <summary className="font-semibold text-gold">{item.q}</summary>
            <p className="mt-2 text-gray-300">{item.a}</p>
          </details>
        ))}
      </div>
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
