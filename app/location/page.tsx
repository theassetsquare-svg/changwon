import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { PLACEHOLDERS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "오시는 길",
  description: `${SITE.name} 위치 안내. ${SITE.city}. 자세한 길 안내는 ${SITE.phone}.`,
  alternates: { canonical: "/location" },
};

export default function LocationPage() {
  return (
    <PageShell title="오시는 길" subtitle={`${SITE.city} ${SITE.region}`}>
      <h2 className="text-xl font-bold text-gold">주소</h2>
      <p>
        {SITE.city} <Placeholder>{PLACEHOLDERS.address}</Placeholder>{" "}
        <Placeholder>{PLACEHOLDERS.addressDetail}</Placeholder>
      </p>

      <h2 className="text-xl font-bold text-gold">대중교통 / 주차</h2>
      <ul className="list-disc space-y-1 pl-6 text-gray-300">
        <li>
          대중교통: <Placeholder>입력필요</Placeholder>
        </li>
        <li>
          주차: <Placeholder>입력필요</Placeholder>
        </li>
        <li>
          픽업 가능 여부: 짱구 매니저(
          <a href={SITE.phoneHref} className="text-gold underline">
            {SITE.phone}
          </a>
          )에게 문의
        </li>
      </ul>

      <div className="rounded-lg border border-dashed border-gray-700 p-6 text-center text-gray-500">
        지도 임베드 영역 — 네이버 지도 / 카카오맵 좌표 입력 후 추가
      </div>
    </PageShell>
  );
}
