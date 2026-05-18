import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "매장 소식",
  description: `${SITE.name} 영업 소식, 휴무, 변경사항 안내.`,
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <PageShell title="매장 소식" subtitle="영업 변경, 휴무, 공지를 안내합니다.">
      <div className="rounded-lg bg-gray-900 p-6">
        <p className="text-sm text-gray-400">[게시 예정]</p>
        <p className="mt-1 text-gray-300">
          최근 영업 소식, 임시 휴무, 행사 일정 등이 이곳에 게시됩니다.
        </p>
      </div>
      <p className="text-sm text-gray-500">
        가장 빠른 안내는 짱구 매니저에게 직접 문의 시 받을 수 있습니다 ({SITE.phone}).
      </p>
    </PageShell>
  );
}
