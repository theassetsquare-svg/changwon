import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { PAGE_META, SITE } from "@/lib/site";

const m = PAGE_META["/around"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/around" },
  openGraph: { title: m.title, description: m.description },
};

const AROUND_FAQ = [
  {
    q: "창원 룰루랄라 나이트 가기 전에 식사할 만한 곳 있나요?",
    a: "도보권 식당을 메뉴 종류별로 한두 군데씩 정리해 안내합니다. 광고비 받고 끼워 넣는 추천은 하지 않으며, 매니저 짱구가 직접 다녀와 본 곳만 적습니다.",
  },
  {
    q: "끝나고 묵을 만한 숙소도 추천해 주나요?",
    a: "인근 호텔·모텔을 가격대별로 정리해 안내합니다. 예약은 본인이 직접 진행하시고, 위치 헷갈리시면 010-3854-6887로 전화 주시면 알려드립니다.",
  },
  {
    q: "음주 후 운전 대신 대리 부르려면?",
    a: "매장에서 대리를 잡아드립니다. 짱구한테 한마디 하시거나, 도착 전 미리 전화로 ‘대리 필요할 것 같다’고 말씀해 주시면 시간 맞춰 준비합니다.",
  },
];

export default function AroundPage() {
  return (
    <PageShell
      title="창원 룰루랄라 나이트 주변 안내"
      hook={m.hook}
      pathname="/around"
    >
      <p>
        가게 도착 전후로 동선이 자연스럽게 풀리도록 주변 정보 정리해 두겠습니다.
        없는 가게 추천하거나 광고비 받고 끼워넣는 거 안 합니다. 직접 다녀와 본
        곳만 적습니다. <strong className="text-white">창원 룰루랄라 나이트</strong>{" "}
        방문 전후 동선이 편해지도록 매장 인근만 큐레이션합니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">근처 식당</h2>
      <p className="text-gray-300">
        도보권 추천 — <Placeholder>입력필요</Placeholder>. 메뉴 종류별로 한두 군데씩
        적어 둘게요. 한식 / 일식 / 분식 / 야식 — 카테고리별로 보기 좋게 정리합니다.
        가게 도착 전 가볍게 먹고 오시기 좋은 곳 위주입니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">근처 숙소</h2>
      <p className="text-gray-300">
        호텔·모텔 — <Placeholder>입력필요</Placeholder>. 가격대별로 정리합니다.
        도보·택시 5분 이내 위주로 추리고, 늦은 시간 체크인이 가능한 곳을 우선으로
        안내합니다. 특정 숙소와의 제휴 / 광고비는 없습니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">대리 / 택시</h2>
      <p>
        끝나고 운전 안 하실 거면 가게에서 대리 잡아드릴 수 있어요. 그냥 저한테
        한마디 해 주세요. 전화로 미리 말씀해 두셔도 됩니다 —{" "}
        <a href={SITE.phoneHref} className="font-bold text-gold underline">
          {SITE.phone}
        </a>
        . 택시는 매장 앞에서 잡히지 않을 때 호출 안내해 드립니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">근처 주차장</h2>
      <p className="text-gray-300">
        만석일 때 우회 가능한 인근 유료 / 무료 주차장 안내 —{" "}
        <Placeholder>입력필요</Placeholder>. 처음 오시는 분들 헤매기 쉬운 골목이라,
        도착 직전 다시 전화 주시면 입구까지 잡아드립니다.
      </p>

      <p className="rounded-2xl border border-line bg-elev p-5 text-sm text-gray-300">
        ※ 음주 후 운전은 본인뿐 아니라 다른 사람도 다칩니다. 저희가 대리 잡아드리는 거,
        손님께 부담드리려는 게 아니라 사고 막으려는 거예요.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">주변 안내 자주 묻는 질문</h2>
      <div className="space-y-2">
        {AROUND_FAQ.map((item) => (
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
            mainEntity: AROUND_FAQ.map((f) => ({
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
