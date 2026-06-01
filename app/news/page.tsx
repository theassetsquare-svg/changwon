import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { PAGE_META, SITE } from "@/lib/site";

const m = PAGE_META["/news"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/news" },
  openGraph: { title: m.title, description: m.description },
};

const NEWS_FAQ = [
  {
    q: "창원 룰루랄라 나이트 오늘 영업하나요?",
    a: "정규 영업 중일 가능성이 큽니다. 다만 가장 정확한 답은 로 전화하는 것입니다. 임시 휴무가 있을 경우 본 페이지에 사전 안내됩니다.",
  },
  {
    q: "휴무 공지는 언제 올라오나요?",
    a: "정해진 휴무가 있으면 최소 1~2일 전, 갑작스러운 휴무라면 즉시 본 페이지에 게시합니다. 손님 헛걸음을 막는 게 우선입니다.",
  },
  {
    q: "공지 알림을 받을 방법이 있나요?",
    a: "본 사이트 RSS 피드(/feed.xml)를 구독하시거나, 로 미리 연락 주시면 영업 변경 시 안내드립니다.",
  },
];

export default function NewsPage() {
  return (
    <PageShell
      title="창원 룰루랄라 나이트 매장 소식"
      hook={m.hook}
      pathname="/news"
    >
      <p>
        급한 휴무, 행사 변경, 단축 영업 같은 거 있을 때 여기 먼저 올립니다.
        가셨다가 헛걸음하시면 매니저 짱구 마음이 더 안 좋습니다.{" "}
        <strong className="text-white">창원 룰루랄라 나이트</strong> 영업 일정 변동
        사항은 본 페이지를 가장 먼저 갱신합니다.
      </p>

      <div className="rounded-2xl border border-line bg-elev p-6">
        <p className="text-sm text-gray-400">현재 공지</p>
        <p className="mt-1 text-gray-200">별도 공지 없음. 정기 영업 진행 중.</p>
        <p className="mt-3 text-xs text-gray-500">
          마지막 확인: 사이트 빌드 시점 기준. 가장 정확한 상태는 전화 확인이 빠릅니다.
        </p>
      </div>

      <h2 className="pt-2 text-xl font-bold text-white">공지에 올리는 종류</h2>
      <ul className="space-y-2 text-gray-300">
        <li>정기 / 임시 휴무</li>
        <li>영업시간 변경 (단축 / 연장)</li>
        <li>외부 행사로 인한 변동</li>
        <li>주차 / 입구 변동</li>
        <li>매장 점검·내부 공사 일정</li>
      </ul>

      <h2 className="pt-2 text-xl font-bold text-white">정말 헷갈리시면</h2>
      <p>
        어디 출발하시기 전에 전화 한 통이면 가장 정확합니다. 짱구가 직접 받으니까
        몇 초 안에 답 나옵니다 —{" "}
        <a href={SITE.phoneHref} className="font-bold text-gold underline">
          {SITE.phone}
        </a>
        . “지금 영업해요?” 한마디만 물으셔도 됩니다. 영업 중이면 그 자리에서 자리
        잡아드리고, 휴무면 다음 영업일까지 알려드립니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">소식 관련 자주 묻는 질문</h2>
      <div className="space-y-2">
        {NEWS_FAQ.map((item) => (
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
            mainEntity: NEWS_FAQ.map((f) => ({
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
