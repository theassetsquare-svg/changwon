import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { PAGE_META, PLACEHOLDERS, SITE } from "@/lib/site";

const m = PAGE_META["/price"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/price" },
  openGraph: { title: m.title, description: m.description },
};

export default function PricePage() {
  return (
    <PageShell title="가격" hook={m.hook} pathname="/price">
      <p>
        솔직히 말씀드릴게요. 가격은 자주 바뀝니다. 시즌, 인원, 자리에 따라
        다릅니다. 그래서 여기 표는 큰 틀만 적어두고, 정확한 금액은 전화로
        그때그때 알려드립니다. 그게 가장 빠르고 정확합니다.
      </p>

      <div className="overflow-hidden rounded-2xl border border-line bg-elev">
        <table className="w-full text-left text-sm sm:text-base">
          <thead className="bg-elev2 text-gold">
            <tr>
              <th className="px-4 py-3">옵션</th>
              <th className="px-4 py-3">가격</th>
              <th className="px-4 py-3">메모</th>
            </tr>
          </thead>
          <tbody className="text-gray-200">
            {PLACEHOLDERS.prices.map((p) => (
              <tr key={p.name} className="border-t border-line">
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
      </div>

      <h2 className="pt-2 text-xl font-bold text-white">가격 물어보는 게 부담되시면</h2>
      <p>
        그 마음 압니다. “얼마예요” 묻는 거 어색하시면 인원만 말씀해 주세요.
        제가 그 인원에 맞는 옵션 두세 가지 가격 묶어서 알려드립니다. 비교하고
        결정하시면 됩니다.
      </p>

      <p className="rounded-2xl border border-line bg-elev p-5 text-sm text-gray-300">
        ※ 표시된 금액과 실제 결제 금액에 차이가 있으면 그 자리에서 정정합니다.
        부풀려서 받지 않습니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">가장 빠른 가격 확인</h2>
      <p>
        <a href={SITE.phoneHref} className="font-bold text-gold underline">{SITE.phone}</a> →
        “짱구 매니저요” → 인원/날짜 → 가격 안내. 30초입니다.
      </p>
    </PageShell>
  );
}
