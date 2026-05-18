import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "VIP 안내",
  description: `${SITE.name} VIP 룸 안내. 운영 중인 경우에만 게시합니다.`,
  alternates: { canonical: "/vip" },
};

export default function VipPage() {
  return (
    <PageShell title="VIP 안내" subtitle="VIP 룸은 운영 중인 경우에만 게시합니다.">
      <h2 className="text-xl font-bold text-gold">운영 여부</h2>
      <p>
        VIP 룸 운영 여부: <Placeholder>입력필요</Placeholder>
      </p>

      <h2 className="text-xl font-bold text-gold">수용 인원 / 구성</h2>
      <ul className="list-disc space-y-1 pl-6 text-gray-300">
        <li>
          수용 인원: <Placeholder>입력필요</Placeholder>
        </li>
        <li>
          구성: <Placeholder>입력필요</Placeholder>
        </li>
        <li>
          별도 입장 동선: <Placeholder>입력필요</Placeholder>
        </li>
      </ul>

      <p className="text-sm text-gray-400">
        VIP 룸 예약은 일반 예약과 동일하게{" "}
        <a href={SITE.phoneHref} className="text-gold underline">
          {SITE.phone}
        </a>{" "}
        짱구 매니저에게 전화 주시면 됩니다.
      </p>
    </PageShell>
  );
}
