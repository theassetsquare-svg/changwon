import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "예약 안내",
  description: `${SITE.name} 예약. 매니저 ${SITE.manager} ${SITE.phone} 전화 예약.`,
  alternates: { canonical: "/reserve" },
};

export default function ReservePage() {
  return (
    <PageShell title="예약 안내" subtitle="전화 한 통이면 예약 완료됩니다.">
      <ol className="list-decimal space-y-2 pl-6">
        <li>
          <a href={SITE.phoneHref} className="text-gold underline font-bold">
            {SITE.phone}
          </a>{" "}
          로 전화 주세요.
        </li>
        <li>“짱구 매니저 부탁드립니다” 라고 말씀해 주세요.</li>
        <li>
          <strong>인원 / 날짜 / 시간 / 요청사항</strong>을 알려주세요.
        </li>
        <li>예약 확정 후 입장 시간 5~10분 전 도착을 권장합니다.</li>
        <li>입장 시 신분증을 확인합니다 (19세 이상).</li>
      </ol>

      <h2 className="text-xl font-bold text-gold">변경 / 취소</h2>
      <p className="text-gray-300">
        변경·취소는 예약하신 번호 그대로{" "}
        <a href={SITE.phoneHref} className="text-gold underline">
          {SITE.phone}
        </a>{" "}
        로 연락 주세요. 빠른 변경이 다른 손님께도 도움이 됩니다.
      </p>

      <h2 className="text-xl font-bold text-gold">단체 예약</h2>
      <p className="text-gray-300">
        4인 이상 단체 예약은 사전 전화 협의를 추천드립니다. 짱구 매니저가 인원에
        맞는 자리를 안내해 드립니다.
      </p>
    </PageShell>
  );
}
