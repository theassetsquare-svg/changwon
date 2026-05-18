import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "주변 안내",
  description: `${SITE.name} 주변 식당·숙소·이동 안내.`,
  alternates: { canonical: "/around" },
};

export default function AroundPage() {
  return (
    <PageShell title="주변 안내" subtitle={`${SITE.city} 매장 인근 정보`}>
      <h2 className="text-xl font-bold text-gold">근처 식당</h2>
      <p className="text-gray-300">
        매장 도보권 식당 추천: <Placeholder>입력필요</Placeholder>
      </p>

      <h2 className="text-xl font-bold text-gold">근처 숙소</h2>
      <p className="text-gray-300">
        호텔 / 모텔 안내: <Placeholder>입력필요</Placeholder>
      </p>

      <h2 className="text-xl font-bold text-gold">이동 / 대리</h2>
      <p className="text-gray-300">
        대리운전·택시 안내가 필요하시면 매니저 짱구에게 말씀해 주세요 (
        <a href={SITE.phoneHref} className="text-gold underline">
          {SITE.phone}
        </a>
        ).
      </p>
    </PageShell>
  );
}
