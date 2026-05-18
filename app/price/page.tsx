import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { PLACEHOLDERS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "가격 안내",
  description: `${SITE.name} 실제 가격 안내. 자세한 비용은 ${SITE.phone}.`,
  alternates: { canonical: "/price" },
};

export default function PricePage() {
  return (
    <PageShell
      title="가격 안내"
      subtitle="실제 매장 가격만 안내드립니다. 변동 시 즉시 반영합니다."
    >
      <table className="w-full overflow-hidden rounded-lg bg-gray-900 text-left text-gray-200">
        <thead className="bg-gray-800 text-gold">
          <tr>
            <th className="px-4 py-3">메뉴/옵션</th>
            <th className="px-4 py-3">가격</th>
            <th className="px-4 py-3">비고</th>
          </tr>
        </thead>
        <tbody>
          {PLACEHOLDERS.prices.map((p) => (
            <tr key={p.name} className="border-t border-gray-800">
              <td className="px-4 py-3 font-semibold">{p.name}</td>
              <td className="px-4 py-3">
                <Placeholder>{p.price}</Placeholder>
              </td>
              <td className="px-4 py-3 text-gray-400">
                <Placeholder>{p.note}</Placeholder>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-sm text-gray-400">
        ※ 가격은 매장 정책에 따라 변동될 수 있습니다. 정확한 가격은 짱구 매니저
        (
        <a href={SITE.phoneHref} className="text-gold underline">
          {SITE.phone}
        </a>
        ) 에게 확인 부탁드립니다.
      </p>
    </PageShell>
  );
}
