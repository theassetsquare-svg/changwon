import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { PAGE_META, PLACEHOLDERS, SITE } from "@/lib/site";

const m = PAGE_META["/location"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/location" },
  openGraph: { title: m.title, description: m.description },
};

export default function LocationPage() {
  return (
    <PageShell title="오시는 길" hook={m.hook} pathname="/location">
      <p>
        창원이 처음이시면 길 헷갈리기 쉽습니다. 일단 주소 적어두고, 도착하실 때쯤
        한 번 더 전화 주세요. 제가 입구 잡아드릴게요.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">주소</h2>
      <p className="rounded-2xl border border-line bg-elev p-5 text-lg">
        {SITE.city} <Placeholder>{PLACEHOLDERS.address}</Placeholder>{" "}
        <Placeholder>{PLACEHOLDERS.addressDetail}</Placeholder>
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">대중교통</h2>
      <p className="text-gray-300">
        가장 가까운 정류장/역 안내 — <Placeholder>입력필요</Placeholder>. 택시 잡으시면
        기사님께 “룰루랄라 나이트” 또는 위 주소 말씀하시면 됩니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">주차</h2>
      <p className="text-gray-300">
        주차 가능 여부 / 인근 주차 — <Placeholder>입력필요</Placeholder>. 자리 안 보이시면
        전화 주세요. 위치 잡아드립니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">끝나고 이동</h2>
      <p>
        대리·택시 필요하시면 가게에서 잡아드립니다. 그냥 제 쪽으로 손짓해 주세요.
        만취 상태로 운전대 잡으시는 거, 저희가 못 본 척 안 합니다.
      </p>

      <div className="mt-2 rounded-2xl border border-dashed border-line bg-elev p-8 text-center text-sm text-gray-500">
        지도 영역 — 가게 좌표 확정되면 네이버 지도 / 카카오맵 임베드 자리
      </div>
    </PageShell>
  );
}
