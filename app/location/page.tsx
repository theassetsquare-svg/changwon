import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { PAGE_META, PLACEHOLDERS, SITE } from "@/lib/site";

const m = PAGE_META["/location"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/location" },
  openGraph: { title: m.title, description: m.description },
};

const LOC_FAQ = [
  {
    q: "정확한 주소가 어디인가요?",
    a: "경상남도 창원시 성산구 상남동 22-4 지하 3층(모아엔트몰)입니다. 도로명은 마디미로43번길 10. 도착 시 010-3854-6887로 전화 주시면 짱구 매니저가 입구를 잡아드립니다.",
  },
  {
    q: "주차 가능한가요?",
    a: "매장 인근 주차 안내는 매장 측에서 직접 안내합니다. 자리 안 보이시면 010-3854-6887로 전화 주세요. 위치를 잡아드립니다.",
  },
  {
    q: "대중교통으로 가려면 어떻게 가야 하나요?",
    a: "가장 가까운 버스/지하철 정거장 안내는 도착 시점이 가장 정확합니다. 택시로 오시면 기사님께 ‘상남동 룰루랄라’ 또는 매장 주소를 말씀하시면 됩니다.",
  },
  {
    q: "끝나고 대리·택시 잡을 수 있나요?",
    a: "가능합니다. 매장에서 대리·택시 잡아드립니다. 음주 후 운전은 안 됩니다. 짱구한테 한마디 해 주시면 됩니다.",
  },
];

export default function LocationPage() {
  return (
    <PageShell
      title="창원 룰루랄라 나이트 오시는 길"
      hook={m.hook}
      pathname="/location"
    >
      <p>
        창원이 처음이시면 길 헷갈리기 쉽습니다. 일단 주소 적어두고, 도착하실 때쯤
        한 번 더 전화 주세요. 제가 입구 잡아드릴게요.{" "}
        <strong className="text-white">창원 룰루랄라 나이트</strong>는{" "}
        {SITE.region} {SITE.city} 안에 위치하고, 창원 나이트 중에서도 찾기 가장
        쉬운 자리입니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">주소</h2>
      <p className="rounded-2xl border border-line bg-elev p-5 text-lg">
        {SITE.city} <Placeholder>{PLACEHOLDERS.address}</Placeholder>{" "}
        <Placeholder>{PLACEHOLDERS.addressDetail}</Placeholder>
      </p>

      <p className="text-gray-300">
        상세 번지는 매장 확정 시점에 본 페이지와 네이버 플레이스, 카카오맵에 동시에
        반영합니다. 그 전까지는 도착 시 전화 한 통이면 입구까지 안내합니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">대중교통</h2>
      <p className="text-gray-300">
        가장 가까운 정류장 / 역 안내 — <Placeholder>입력필요</Placeholder>. 택시
        잡으시면 기사님께 “상남동 룰루랄라” 또는 위 주소 말씀하시면 됩니다.
        창원 시내 어디서든 택시로 단번에 오실 수 있도록, 매장 측에서 흔한 출발지
        기준 동선 정리해 안내합니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">주차</h2>
      <p className="text-gray-300">
        주차 가능 여부 / 인근 주차 — <Placeholder>입력필요</Placeholder>. 자리 안
        보이시면 전화 주세요. 위치 잡아드립니다. 주차 만석일 때 인근 유료 주차장
        대안도 함께 안내합니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">근처에서 출발하실 때</h2>
      <ul className="space-y-2 text-gray-300">
        <li>창원역·중앙역 방향 — 시간대별 택시 동선 안내 가능</li>
        <li>마산·진해 방향 — 대중교통 막차 시간 사전 안내</li>
        <li>경상남도 외 지역 — 미리 전화 주시면 도착 시간 맞춰 자리 잡아둠</li>
      </ul>

      <h2 className="pt-2 text-xl font-bold text-white">끝나고 이동</h2>
      <p>
        대리·택시 필요하시면 가게에서 잡아드립니다. 그냥 제 쪽으로 손짓해 주세요.
        만취 상태로 운전대 잡으시는 거, 저희가 못 본 척 안 합니다. 다른 손님과
        본인 안전을 위한 룰입니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">위치 관련 자주 묻는 질문</h2>
      <div className="space-y-2">
        {LOC_FAQ.map((item) => (
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
            mainEntity: LOC_FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <div className="mt-2 rounded-2xl border border-dashed border-line bg-elev p-8 text-center text-sm text-gray-500">
        지도 영역 — 가게 좌표 확정되면 네이버 지도 / 카카오맵 임베드 자리
      </div>
    </PageShell>
  );
}
