import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "손님 후기",
  description: `${SITE.name} 실제 후기 모음. 가짜 후기 X.`,
  alternates: { canonical: "/review" },
};

export default function ReviewPage() {
  return (
    <PageShell
      title="손님 후기"
      subtitle="실제 손님에게 받은 후기만 게시합니다. 가짜 후기 / 가짜 별점 사용하지 않습니다."
    >
      <div className="rounded-lg border border-dashed border-gray-700 bg-gray-900 p-8 text-center text-gray-400">
        <p className="text-base">아직 게시 가능한 실제 후기가 등록되지 않았습니다.</p>
        <p className="mt-2 text-sm">
          매장에서 동의를 받은 실제 후기가 모이는 대로 이곳에 게시됩니다.
        </p>
      </div>

      <h2 className="text-xl font-bold text-gold">후기 수집 원칙</h2>
      <ul className="list-disc space-y-1 pl-6 text-gray-300">
        <li>방문 손님께 직접 받은 후기만 게시합니다.</li>
        <li>가짜 별점 / 평균 부풀리기는 하지 않습니다.</li>
        <li>출처(매장 카카오톡, 네이버 플레이스 등)를 함께 표기합니다.</li>
        <li>비공개 요청 시 즉시 내림 처리합니다.</li>
      </ul>

      <p className="text-sm text-gray-500">
        후기를 남기고 싶으시면{" "}
        <a href={SITE.phoneHref} className="text-gold underline">
          {SITE.phone}
        </a>{" "}
        짱구 매니저에게 알려주세요.
      </p>
    </PageShell>
  );
}
