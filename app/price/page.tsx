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

const PRICE_FAQ = [
  {
    q: "창원 룰루랄라 나이트 가격은 평균 얼마예요?",
    a: "옵션·인원·시간대에 따라 다릅니다. 평균치는 의미가 적기 때문에 010-3854-6887로 짱구 매니저가 인원에 맞는 두세 가지 옵션의 정확한 금액을 묶어 안내합니다.",
  },
  {
    q: "사이트에 가격표가 비어 있는 이유는?",
    a: "허위 금액을 적지 않기 위해서입니다. 시즌·자리·인원에 따라 가격이 바뀌는데, 표에 박아 두면 손님이 도착해서 ‘다르네’ 라고 느낍니다. 정확한 금액은 전화 안내가 기준입니다.",
  },
  {
    q: "추가 요금이 붙는 경우가 있나요?",
    a: "옵션 변경, 인원 추가, VIP 룸 이용 등 변동 사유는 전화 시점에 미리 다 말씀드립니다. 도착 후 ‘몰랐던 추가요금’ 부과는 하지 않습니다.",
  },
  {
    q: "결제는 카드 / 현금 다 되나요?",
    a: "결제 수단 세부 정책은 변동될 수 있어 사이트 표기보다 전화로 확인이 정확합니다. 010-3854-6887로 미리 문의 주시면 그 자리에서 안내합니다.",
  },
];

export default function PricePage() {
  return (
    <PageShell title="창원 룰루랄라 나이트 가격" hook={m.hook} pathname="/price">
      <p>
        솔직히 말씀드릴게요. <strong className="text-white">창원 룰루랄라 나이트</strong>의
        가격은 자주 바뀝니다. 시즌, 인원, 자리에 따라 다릅니다. 그래서 여기 표는 큰
        틀만 적어두고, 정확한 금액은 전화로 그때그때 알려드립니다. 그게 가장 빠르고
        정확합니다.
      </p>

      <p>
        가격표를 못 박아두지 않는 이유는 단순합니다. “20만 원이라더니 25만 원이네”
        같은 말이 손님 입에서 나오지 않게 하려고요. 그래서 짱구가 전화 받을 때 그
        자리에서 인원·날짜에 맞는 옵션 두세 개를 묶어서 정확히 알려드립니다.
        손님은 그걸 듣고 비교해서 정하시면 됩니다.
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

      <h2 className="pt-2 text-xl font-bold text-white">
        가격 물어보는 게 부담되시면
      </h2>
      <p>
        그 마음 압니다. “얼마예요” 묻는 거 어색하시면 인원만 말씀해 주세요.
        제가 그 인원에 맞는 옵션 두세 가지 가격 묶어서 알려드립니다. 비교하고
        결정하시면 됩니다. “싸게 해 주세요” 같은 거 안 하셔도 됩니다 — 부풀려서
        받은 적 없으니까요.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">
        창원 룰루랄라 나이트 가격, 솔직 가이드
      </h2>
      <ul className="space-y-2 text-gray-300">
        <li>
          1인 — 인원 적을 때 부담 적은 옵션부터 묶어드립니다. 처음 오시는 분이라면
          이쪽이 편합니다.
        </li>
        <li>
          2~3인 — 가장 많이 오는 인원대입니다. 옵션 폭이 가장 넓어요. 자리 위치까지
          조정해서 잡아드립니다.
        </li>
        <li>
          4인 이상 (단체) — 묶음 옵션이 따로 있습니다. 미리 전화 주시면 같은 자리에
          모이게 잡아드릴게요.
        </li>
        <li>
          VIP 룸 — 별도 안내. 운영 시점에만 가능. 자세한 건 짱구 직접 안내합니다.
        </li>
        <li>
          평일 / 주말 — 시간대와 손님 밀도에 따라 가격 차이가 있습니다. 전화로 확인
          가능.
        </li>
      </ul>

      <p className="rounded-2xl border border-line bg-elev p-5 text-sm text-gray-300">
        ※ 표시된 금액과 실제 결제 금액에 차이가 있으면 그 자리에서 정정합니다.
        부풀려서 받지 않습니다. 추가 요금이 발생할 가능성도 전화 시점에 미리
        말씀드립니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">가격 관련 자주 묻는 질문</h2>
      <div className="space-y-2">
        {PRICE_FAQ.map((item) => (
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
            mainEntity: PRICE_FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <h2 className="pt-2 text-xl font-bold text-white">가장 빠른 가격 확인</h2>
      <p>
        <a href={SITE.phoneHref} className="font-bold text-gold underline">{SITE.phone}</a> →
        “짱구 매니저요” → 인원/날짜 → 가격 안내. 30초입니다.
      </p>
    </PageShell>
  );
}
