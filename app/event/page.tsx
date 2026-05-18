import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "이벤트",
  description: `${SITE.name}에서 실제 진행 중인 이벤트만 안내합니다.`,
  alternates: { canonical: "/event" },
};

export default function EventPage() {
  return (
    <PageShell
      title="이벤트"
      subtitle="실제 진행 중인 이벤트만 게시합니다. 허위 할인 표기 X."
    >
      <div className="rounded-lg border border-dashed border-gray-700 bg-gray-900 p-8 text-center text-gray-400">
        <p>현재 게시 가능한 진행 중 이벤트가 없습니다.</p>
        <p className="mt-2 text-sm">
          이벤트가 시작되면 본 페이지와 매장 소식 페이지에 함께 안내됩니다.
        </p>
      </div>
      <p className="text-sm text-gray-500">
        진행 중 혜택 여부는{" "}
        <a href={SITE.phoneHref} className="text-gold underline">
          {SITE.phone}
        </a>{" "}
        짱구 매니저에게 확인하실 수 있습니다.
      </p>
    </PageShell>
  );
}
