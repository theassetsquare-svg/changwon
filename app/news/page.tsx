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

export default function NewsPage() {
  return (
    <PageShell title="매장 소식" hook={m.hook} pathname="/news">
      <p>
        급한 휴무, 행사 변경, 단축 영업 같은 거 있을 때 여기 먼저 올립니다.
        가셨다가 헛걸음하시면 제 마음이 더 안 좋습니다.
      </p>

      <div className="rounded-2xl border border-line bg-elev p-6">
        <p className="text-sm text-gray-400">현재 공지</p>
        <p className="mt-1 text-gray-200">
          별도 공지 없음. 정기 영업 진행 중.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          마지막 확인: 사이트 빌드 시점 기준. 가장 정확한 상태는 전화 확인이 빠릅니다.
        </p>
      </div>

      <h2 className="pt-2 text-xl font-bold text-white">정말 헷갈리시면</h2>
      <p>
        어디 출발하시기 전에 전화 한 통이면 가장 정확합니다 —{" "}
        <a href={SITE.phoneHref} className="font-bold text-gold underline">{SITE.phone}</a>.
        “지금 영업해요?” 한마디만 물으셔도 됩니다.
      </p>
    </PageShell>
  );
}
