import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { PAGE_META, SITE } from "@/lib/site";

const m = PAGE_META["/vip"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/vip" },
  openGraph: { title: m.title, description: m.description },
};

const VIP_FAQ = [
  {
    q: "창원 룰루랄라 나이트 VIP 룸은 어떻게 예약하나요?",
    a: "일반 예약과 동일합니다. 010-3854-6887로 전화해 ‘VIP 룸으로 잡아주세요’ 한마디 하시면 됩니다. 그 시점 룸 상황을 보고 가능한 시간대를 짱구 매니저가 안내합니다.",
  },
  {
    q: "VIP 룸 가격이 따로 있나요?",
    a: "일반 자리와 가격대가 다릅니다. 인원·옵션에 따라 변동되므로 사이트에 박아 두지 않고, 전화 시점에 정확히 안내합니다.",
  },
  {
    q: "VIP 룸은 별도 입구가 있나요?",
    a: "별도 동선 운영 여부는 시점에 따라 다릅니다. 예약 확정 시 짱구 매니저가 도착 동선을 함께 안내합니다.",
  },
  {
    q: "VIP 룸 최소 인원이 있나요?",
    a: "최소·최대 인원은 룸 크기에 따라 다릅니다. 운영 시점에만 안내되며, 사전 전화로 확인이 가장 정확합니다.",
  },
];

export default function VipPage() {
  return (
    <PageShell
      title="창원 룰루랄라 나이트 VIP 룸"
      hook={m.hook}
      pathname="/vip"
    >
      <p>
        VIP 룸은 운영할 때만 안내합니다. 없는 룸을 있는 척 광고하지 않습니다.
        사람 보고 자리 잡아드리는 거니까, 일단 전화 주세요.{" "}
        <strong className="text-white">창원 룰루랄라 나이트</strong> VIP 룸은 인원과
        상황을 보고 매니저 짱구가 직접 배정합니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">운영 여부</h2>
      <p>
        현재 운영 — <Placeholder>입력필요</Placeholder>. 운영 중인 시점에는 본
        페이지에 인원·구성·이용 시간 정보를 함께 게시합니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">수용 인원 / 구성</h2>
      <ul className="space-y-2 text-gray-300">
        <li>
          수용 인원 — <Placeholder>입력필요</Placeholder>
        </li>
        <li>
          구성 — <Placeholder>입력필요</Placeholder>
        </li>
        <li>
          별도 입장 동선 — <Placeholder>입력필요</Placeholder>
        </li>
        <li>
          이용 시간대 — <Placeholder>입력필요</Placeholder>
        </li>
      </ul>

      <h2 className="pt-2 text-xl font-bold text-white">VIP 룸이 잘 맞는 분</h2>
      <ul className="space-y-2 text-gray-300">
        <li>일행 인원이 많아서 한 자리에 모이고 싶은 분</li>
        <li>주변과 분리된 자리에서 조용히 즐기고 싶은 분</li>
        <li>의전·접대 등 별도 동선이 필요한 분</li>
        <li>특별한 날짜(생일·기념일)를 위해 자리 폭을 넓히고 싶은 분</li>
      </ul>

      <h2 className="pt-2 text-xl font-bold text-white">VIP 예약은</h2>
      <p>
        일반 예약과 같습니다. 그냥 “VIP 룸으로 잡아주세요” 한마디 하시면 됩니다 —{" "}
        <a href={SITE.phoneHref} className="font-bold text-gold underline">{SITE.phone}</a>.
        룸 상황 봐서 가능한 시간 알려드립니다. 인원이 늘어날 가능성도 함께 말씀해
        주시면 자리 폭 넉넉히 잡습니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">VIP 룸 관련 자주 묻는 질문</h2>
      <div className="space-y-2">
        {VIP_FAQ.map((item) => (
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
            mainEntity: VIP_FAQ.map((f) => ({
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
