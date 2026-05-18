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

export default function ContactPage() {
  return (
    <PageShell title="문의" hook={m.hook} pathname="/contact">
      <p>
        가장 빠른 방법은 전화입니다. 문자나 카카오톡도 가능하긴 한데, 손님 응대
        중일 땐 답이 늦어요. 1분이라도 빠른 답 받고 싶으시면 전화가 좋습니다.
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

      <p className="text-xs text-gray-500">
        영업시간 외에는 통화가 안 될 수 있습니다. 그때는 1~2분 뒤 다시 걸어주시거나,
        문자 남겨주시면 영업 시작할 때 콜백드립니다.
      </p>
    </PageShell>
  );
}
