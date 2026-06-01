import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { PAGE_META, PLACEHOLDERS, SITE } from "@/lib/site";

const m = PAGE_META["/contact"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/contact" },
  openGraph: { title: m.title, description: m.description },
};

const CONTACT_FAQ = [
  {
    q: "창원 룰루랄라 나이트 연락은 어디로 하나요?",
    a: "전화 이 가장 빠릅니다. 매니저 짱구가 직접 받습니다. 카카오톡 채널이 개설되면 본 페이지에 추가로 안내합니다.",
  },
  {
    q: "전화 말고 문자나 카톡으로 예약 가능한가요?",
    a: "가능은 합니다만, 손님 응대 중일 때는 답이 늦습니다. 빠른 자리 확정을 원하시면 로 전화하는 편이 가장 빠릅니다.",
  },
  {
    q: "영업시간 외에 연락하면 답을 받을 수 있나요?",
    a: "영업시간 외에는 통화가 안 될 수 있습니다. 부재중 / 문자 남겨 주시면 영업 시작 시 짱구 매니저가 콜백합니다.",
  },
];

export default function ContactPage() {
  return (
    <PageShell title="창원 룰루랄라 나이트 문의" hook={m.hook} pathname="/contact">
      <p>
        가장 빠른 방법은 전화입니다. 문자나 카카오톡도 가능하긴 한데, 손님 응대
        중일 땐 답이 늦어요. 1분이라도 빠른 답 받고 싶으시면 전화가 좋습니다.{" "}
        <strong className="text-white">창원 룰루랄라 나이트</strong> 모든 문의는
        매니저 짱구가 직접 응대합니다.
      </p>

      <div className="rounded-2xl border border-line bg-elev p-6">
        <p className="text-xs text-gray-400">전화 (가장 빠름)</p>
        <p className="mt-2 text-3xl font-extrabold text-gold sm:text-4xl">
          <a href={SITE.phoneHref}>{SITE.phone}</a>
        </p>
        <p className="mt-2 text-sm text-gray-300">매니저 {SITE.manager} 직접 응대</p>
      </div>

      <div className="rounded-2xl border border-line bg-elev p-6">
        <p className="text-xs text-gray-400">카카오톡 채널</p>
        <p className="mt-2 text-gray-200">
          <Placeholder>{PLACEHOLDERS.kakaoChannel}</Placeholder>
        </p>
        <p className="mt-1 text-xs text-gray-500">채널 개설되면 여기 ID 올립니다.</p>
      </div>

      <div className="rounded-2xl border border-line bg-elev p-6">
        <p className="text-xs text-gray-400">매장 위치</p>
        <p className="mt-2 text-gray-200">
          {SITE.city} <Placeholder>{PLACEHOLDERS.address}</Placeholder>
        </p>
      </div>

      <h2 className="pt-2 text-xl font-bold text-white">어떤 문의도 가능합니다</h2>
      <ul className="space-y-2 text-gray-300">
        <li>예약 / 변경 / 취소</li>
        <li>가격·옵션 안내</li>
        <li>위치·주차·대중교통</li>
        <li>VIP 룸 / 단체 자리</li>
        <li>임시 휴무·영업 변동 확인</li>
        <li>방문 전 매장 상태 (영상통화 안내 가능)</li>
      </ul>

      <p className="text-xs text-gray-500">
        영업시간 외에는 통화가 안 될 수 있습니다. 그때는 1~2분 뒤 다시 걸어주시거나,
        문자 남겨주시면 영업 시작할 때 콜백드립니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">문의 관련 자주 묻는 질문</h2>
      <div className="space-y-2">
        {CONTACT_FAQ.map((item) => (
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
            mainEntity: CONTACT_FAQ.map((f) => ({
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
