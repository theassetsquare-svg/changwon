import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "매장 사진",
  description: `${SITE.name} 실제 매장 사진. 매니저 ${SITE.manager}.`,
  alternates: { canonical: "/photo" },
};

export default function PhotoPage() {
  return (
    <PageShell
      title="매장 사진"
      subtitle="실제 매장과 매니저 짱구의 사진만 게시합니다."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-gray-700 bg-gray-900 text-sm text-gray-500"
          >
            매장 사진 {i + 1} [업로드 필요]
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500">
        매장 및 짱구 매니저의 실제 사진이 준비되는 대로 게시됩니다. 외부에서
        가져온 이미지나 합성 이미지를 사용하지 않습니다.
      </p>
    </PageShell>
  );
}
