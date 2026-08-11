import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { PAGE_META, PLACEHOLDERS, SITE, OG_IMAGE } from "@/lib/site";

const m = PAGE_META["/contact"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/contact" },
  openGraph: { title: m.title, description: m.description, images: OG_IMAGE },
};

const CONTACT_FAQ = [
  {
    q: "창원 룰루랄라 나이트 연락은 어디로 하나요?",
    a: "010-3854-6887로 전화 주시면 매니저가 답변합니다.",
  },
  {
    q: "전화로 예약도 가능한가요?",
    a: "네, 전화 010-3854-6887로 인원·날짜·시간을 말씀해 주시면 자리 확정까지 한 번에 처리됩니다.",
  },
  {
    q: "영업시간 외에 연락하면 답을 받을 수 있나요?",
    a: "영업시간 외에는 답변이 늦을 수 있습니다. 부재중 남겨 주시면 영업 시작 시 매니저가 확인 후 답변드립니다.",
  },
];

export default function ContactPage() {
  return (
    <PageShell title="창원 룰루랄라 나이트 문의" hook={m.hook} pathname="/contact">
      <p>
        전화로 문의해 주시면 매니저가 직접 답변합니다.{" "}
        <strong className="text-white">창원 룰루랄라 나이트</strong> 모든 문의는
        매니저가 직접 응대합니다.
      </p>

      <a
        href={SITE.phoneHref}
        className="block rounded-2xl border border-gold/50 bg-gold/5 p-6 text-center transition hover:border-gold hover:bg-gold/10"
      >
        <p className="text-xs text-gray-400">예약 문의 전화</p>
        <p className="mt-2 text-3xl font-extrabold text-gold sm:text-4xl">
          📞 {SITE.phone}
        </p>
        <p className="mt-2 text-sm text-gray-300">매니저 직접 응대 · 눌러서 바로 전화</p>
      </a>

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
        <li>방문 전 매장 상태 (사진·영상 안내 가능)</li>
        <li>광고 문의</li>
      </ul>

      <p className="text-xs text-gray-500">
        영업시간 외에는 답변이 늦을 수 있습니다. 부재중 남겨주시면 영업 시작할 때
        확인 후 답변드립니다.
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
