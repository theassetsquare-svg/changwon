import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { PLACEHOLDERS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "문의",
  description: `${SITE.name} 문의 ${SITE.phone} 매니저 ${SITE.manager}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageShell title="문의" subtitle="가장 빠른 답변은 전화입니다.">
      <div className="rounded-lg bg-gray-900 p-6">
        <p className="text-sm text-gray-400">전화 (가장 빠름)</p>
        <p className="mt-1 text-2xl font-extrabold text-gold">
          <a href={SITE.phoneHref}>{SITE.phone}</a>
        </p>
        <p className="mt-1 text-sm text-gray-300">매니저 {SITE.manager}</p>
      </div>

      <div className="rounded-lg bg-gray-900 p-6">
        <p className="text-sm text-gray-400">카카오톡 채널</p>
        <p className="mt-1 text-gray-200">
          <Placeholder>{PLACEHOLDERS.kakaoChannel}</Placeholder>
        </p>
      </div>

      <div className="rounded-lg bg-gray-900 p-6">
        <p className="text-sm text-gray-400">매장 위치</p>
        <p className="mt-1 text-gray-200">
          {SITE.city} <Placeholder>{PLACEHOLDERS.address}</Placeholder>
        </p>
      </div>

      <p className="text-xs text-gray-500">
        문의 시간은 영업시간 내에 가장 빠르게 응답됩니다. 영업시간 외에는 통화가
        어려울 수 있습니다.
      </p>
    </PageShell>
  );
}
