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

export default function VipPage() {
  return (
    <PageShell title="VIP 룸" hook={m.hook} pathname="/vip">
      <p>
        VIP 룸은 운영할 때만 안내합니다. 없는 룸을 있는 척 광고하지 않습니다.
        사람 보고 자리 잡아드리는 거니까, 일단 전화 주세요.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">운영 여부</h2>
      <p>
        현재 운영 — <Placeholder>입력필요</Placeholder>.
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
      </ul>

      <h2 className="pt-2 text-xl font-bold text-white">VIP 예약은</h2>
      <p>
        일반 예약과 같습니다. 그냥 “VIP 룸으로 잡아주세요” 한마디 하시면 됩니다 —{" "}
        <a href={SITE.phoneHref} className="font-bold text-gold underline">{SITE.phone}</a>.
        룸 상황 봐서 가능한 시간 알려드립니다.
      </p>
    </PageShell>
  );
}
