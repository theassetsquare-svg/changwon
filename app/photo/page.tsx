import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { PAGE_META, SITE } from "@/lib/site";

const m = PAGE_META["/photo"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/photo" },
  openGraph: { title: m.title, description: m.description },
};

const PHOTO_FAQ = [
  {
    q: "사진이 적은데 일부러 가린 건가요?",
    a: "아닙니다. 매장에서 직접 찍은 진짜 사진만 올리기 때문에 양이 천천히 늘어납니다. 외부 가게 사진을 가져와 채우는 일은 하지 않습니다.",
  },
  {
    q: "사진을 미리 더 보고 싶으면 어떻게 하나요?",
    a: "010-3854-6887로 전화 주시면 영상통화로 매장 내부를 보여드릴 수 있습니다. 짱구 매니저가 직접 안내합니다.",
  },
  {
    q: "사진이랑 실제 매장이 다른 경우 있나요?",
    a: "없도록 합니다. 합성·필터 과다 보정·다른 가게 이미지 사용을 하지 않기 때문에 사이트 사진과 실제 매장 모습이 동일합니다.",
  },
];

export default function PhotoPage() {
  return (
    <PageShell
      title="창원 룰루랄라 나이트 매장 사진"
      hook={m.hook}
      pathname="/photo"
    >
      <p>
        다른 가게 사진 갖다 쓰는 데 많죠. 저희는 안 합니다. 여기 올리는 사진은
        전부 저희 매장에서 찍은 진짜입니다. 합성도 안 합니다.{" "}
        <strong className="text-white">창원 룰루랄라 나이트</strong> 매장 모습 그대로,
        매니저 짱구가 직접 촬영한 사진만 게시합니다.
      </p>

      <div
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
        aria-label="창원 룰루랄라 나이트 매장 사진"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-line bg-elev text-xs text-gray-500"
          >
            매장 내부 사진 {i + 1} · 준비 중
          </div>
        ))}
      </div>

      <h2 className="pt-2 text-xl font-bold text-white">사진이 비어있는 이유</h2>
      <p>
        다른 가게 사진을 빌려와서 채울 수도 있었지만, 그러면 가셨을 때 “사진이랑
        다르네” 소리 듣습니다. 저희는 그런 거 안 합니다. 매장 사진 제대로 찍어서
        하나씩 올려둘게요. 입구·룸·테이블·바·VIP 자리 등 손님 동선 순으로 정리할
        예정입니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">미리 보고 싶으시면</h2>
      <p>
        영상통화로 보여드릴 수도 있어요. 어색하지 않으시면 전화 주세요 —{" "}
        <a href={SITE.phoneHref} className="font-bold text-gold underline">
          {SITE.phone}
        </a>
        . 가실 자리 미리 보고 결정하시면 도착했을 때 어색함이 훨씬 줄어듭니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">사진 정책</h2>
      <ul className="space-y-2 text-gray-300">
        <li>외부 가게 사진 사용 금지</li>
        <li>합성·AI 생성 이미지 사용 금지</li>
        <li>필터 과다 보정 금지 (자연 보정만)</li>
        <li>손님 얼굴이 그대로 나오는 사진 금지 (사전 동의 시에만 게시)</li>
        <li>사진 촬영일 / 매장 위치 기준 표기</li>
      </ul>

      <h2 className="pt-2 text-xl font-bold text-white">사진 관련 자주 묻는 질문</h2>
      <div className="space-y-2">
        {PHOTO_FAQ.map((item) => (
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
            mainEntity: PHOTO_FAQ.map((f) => ({
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
