import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { PLACEHOLDERS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `매니저 ${SITE.manager}`,
  description: `${SITE.name} 매니저 ${SITE.manager} 소개. 예약은 ${SITE.phone}.`,
  alternates: { canonical: "/jjanggu" },
};

export default function JjangguPage() {
  return (
    <PageShell title={`매니저 ${SITE.manager}`} subtitle="실제 매니저 한 분이 직접 운영합니다.">
      <p>
        <strong className="text-gold">{SITE.manager}</strong>는 {SITE.name}의
        실제 운영 매니저입니다. 모든 예약과 안내를 직접 받습니다.
      </p>

      <h2 className="text-xl font-bold text-gold">짱구 매니저 경력</h2>
      <p className="text-gray-300">
        <Placeholder>{PLACEHOLDERS.jjangguCareer}</Placeholder>
      </p>

      <h2 className="text-xl font-bold text-gold">전화 예약 안내</h2>
      <ol className="list-decimal space-y-2 pl-6 text-gray-300">
        <li>
          <a href={SITE.phoneHref} className="text-gold underline">
            {SITE.phone}
          </a>{" "}
          로 전화 주세요.
        </li>
        <li>“짱구 매니저 부탁드립니다” 라고 말씀하시면 됩니다.</li>
        <li>인원·날짜·시간·요청 사항을 알려주세요.</li>
        <li>입장 시 신분증을 준비해 주세요 (19세 이상).</li>
      </ol>

      <p className="text-sm text-gray-500">
        ※ 짱구 매니저의 실제 사진과 경력은 매장에서 검토 후 추가됩니다.
      </p>
    </PageShell>
  );
}
