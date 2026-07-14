import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { PAGE_META, SITE } from "@/lib/site";

const m = PAGE_META["/jjanggu"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/jjanggu" },
  openGraph: { title: m.title, description: m.description },
};

const MANAGER_FAQ = [
  {
    q: "카카오톡 문의하면 정말 매니저가 직접 답해요?",
    a: "네, 매장 문의로 오시는 문의 거의 다 매니저가 직접 답합니다. 응대 중일 때만 잠시 늦을 수 있고, 그 외에는 다른 직원 거치지 않고 바로 응대합니다.",
  },
  {
    q: "매니저는 어떤 사람이에요?",
    a: "창원 룰루랄라 나이트에서 손님 응대와 자리 배정을 담당하는 매니저입니다. 인원·일행·분위기를 보고 자리를 잡는 게 일이에요.",
  },
  {
    q: "답장이 안 오면 어떻게 해요?",
    a: "영업시간 외이거나 다른 손님 응대 중일 가능성이 큽니다. 조금 뒤 다시 메시지 보내주시거나, 부재 메시지 남겨 주시면 매니저가 확인 후 답변드립니다.",
  },
  {
    q: "다른 연락처도 있나요?",
    a: "공식 매장에 직접 문의하세요. 다른 채널을 통해 창원 룰루랄라 나이트라고 안내받으셨다면 확인이 필요합니다.",
  },
];

export default function JjangguPage() {
  return (
    <PageShell
      title="매니저가 직접 받습니다"
      hook={m.hook}
      pathname="/jjanggu"
    >
      <p>
        안녕하세요. <strong className="text-white">{SITE.name}</strong> 매니저입니다.
        카카오톡{" "}
        매장 문의
        , 이 ID로 오시는 문의 거의 다 제가 직접 받습니다.
      </p>

      <p>
        "연락하면 다른 사람이 받고 다시 연락 준다" 같은 거 없습니다. 그래서 빠르고,
        그래서 약속한 거 그대로 갑니다. 인원·날짜·시간 말씀하시면 그 자리에서 자리
        잡아드려요.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">카카오톡으로 이렇게만</h2>
      <ol className="space-y-3 rounded-2xl border border-line bg-elev p-5 text-gray-200">
        <li id="step1">
          <strong className="text-gold">1.</strong>{" "}
          카카오톡에서{" "}
          매장 문의{" "}
          검색하세요.
        </li>
        <li id="step2">
          <strong className="text-gold">2.</strong> 인원 / 날짜 / 시간 알려주세요.
        </li>
        <li id="step3">
          <strong className="text-gold">3.</strong> 매니저가 자리 확정해 드립니다.
        </li>
        <li id="step4">
          <strong className="text-gold">4.</strong> 신분증 챙겨서 도착하시면 됩니다.
        </li>
      </ol>

      <h2 className="pt-2 text-xl font-bold text-white">제 소개</h2>
      <p>
        창원 룰루랄라 나이트에서 매니저 역할 맡고 있고, 손님 자리 배정·예약 응대·문의 처리 같은
        걸 직접 담당합니다. 부풀려서 적는 거 안 좋아합니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">제가 하는 일 (한 줄씩)</h2>
      <ul className="space-y-2 text-gray-300">
        <li>문의 응대 — 매장으로, 거의 다 제가 받음</li>
        <li>자리 배정 — 인원·일행·분위기 보고 매번 다시 봄</li>
        <li>가격 안내 — 인원·옵션 묶어서 그 자리에서 알려드림</li>
        <li>단체 예약 정리 — 4인 이상 한 자리에 모이게 잡음</li>
        <li>입구 안내 — 길 헷갈리시면 도착하실 때 다시 연락 주세요, 입구 잡아드림</li>
      </ul>

      <h2 className="pt-2 text-xl font-bold text-white">자주 듣는 질문 두 개</h2>
      <p>
        <strong className="text-white">"처음인데 어색해요"</strong> — 첫 손님이 어색한 게
        가장 정상이에요. 그래서 카카오톡으로 어떤 자리가 좋을지 같이 정합니다. 처음 오시는
        분들은 보통 외곽 자리부터 시작해서, 편해지시면 자리 옮겨 드려요. 그 흐름이
        익숙해질 때까지 옆에서 챙깁니다.
      </p>
      <p>
        <strong className="text-white">"가격 부담돼요"</strong> — 그 자리에서 정확하게
        말씀드립니다. 부풀려서 말 안 합니다. 보고 결정하시면 됩니다. 인원 적으시면
        부담 적은 옵션부터, 단체시면 묶음 옵션부터 묶어서 알려드립니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">매니저 관련 자주 묻는 질문</h2>
      <div className="space-y-2">
        {MANAGER_FAQ.map((item) => (
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
            mainEntity: MANAGER_FAQ.map((f) => ({
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
