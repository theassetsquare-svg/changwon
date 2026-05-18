import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { PLACEHOLDERS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "가게 소개",
  description: `${SITE.name} 소개. ${SITE.city} 합법 나이트 클럽. 매니저 ${SITE.manager} ${SITE.phone}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageShell
      title="가게 소개"
      subtitle={`${SITE.city}에서 운영 중인 합법 영업장입니다.`}
    >
      <p>
        {SITE.name}은(는) {SITE.city}에 위치한 합법 나이트 클럽입니다. 매니저{" "}
        <strong className="text-gold">{SITE.manager}</strong>가 손님 한 분 한 분을
        직접 응대합니다.
      </p>

      <h2 className="text-xl font-bold text-gold">매장 정보</h2>
      <ul className="list-disc space-y-1 pl-6 text-gray-300">
        <li>
          업소명: <strong>{SITE.name}</strong>
        </li>
        <li>
          위치: {SITE.city} <Placeholder>{PLACEHOLDERS.address}</Placeholder>
        </li>
        <li>
          영업시간: <Placeholder>{PLACEHOLDERS.hoursWeekday}</Placeholder>
        </li>
        <li>
          매니저: {SITE.manager} (
          <a href={SITE.phoneHref} className="text-gold underline">
            {SITE.phone}
          </a>
          )
        </li>
        <li>사업자 등록증 보유, 19세 이상 합법 영업장</li>
      </ul>

      <h2 className="text-xl font-bold text-gold">방문 안내</h2>
      <ul className="list-disc space-y-1 pl-6 text-gray-300">
        <li>입장 시 신분증을 확인합니다 (19세 이상).</li>
        <li>예약은 전화 한 통이면 충분합니다.</li>
        <li>주차·동선·메뉴 안내는 짱구 매니저에게 직접 문의하세요.</li>
      </ul>
    </PageShell>
  );
}
