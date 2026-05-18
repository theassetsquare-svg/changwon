import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { PAGE_META, SITE } from "@/lib/site";

const m = PAGE_META["/reserve"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/reserve" },
  openGraph: { title: m.title, description: m.description },
};

export default function ReservePage() {
  return (
    <PageShell title="예약" hook={m.hook} pathname="/reserve">
      <p>
        앱 다운로드, 회원가입, 결제정보, 그런 거 없습니다. 전화 한 통이면 끝나요.
        진짜로 30초입니다.
      </p>

      <ol className="space-y-3 rounded-2xl border border-line bg-elev p-5 text-gray-200">
        <li>
          <strong className="text-gold">1.</strong>{" "}
          <a href={SITE.phoneHref} className="font-bold text-gold underline">{SITE.phone}</a> 누르세요.
        </li>
        <li>
          <strong className="text-gold">2.</strong> “짱구 매니저요.”
        </li>
        <li>
          <strong className="text-gold">3.</strong> 인원, 날짜, 시간, 요청사항.
        </li>
        <li>
          <strong className="text-gold">4.</strong> 끝.
        </li>
      </ol>

      <h2 className="pt-2 text-xl font-bold text-white">와서 입장하실 때</h2>
      <ul className="space-y-2 text-gray-300">
        <li>예약 시간 5~10분 전 도착 추천드립니다.</li>
        <li>신분증 챙겨오세요. 19세 이상 합법 영업장입니다.</li>
        <li>도착해서 “짱구 예약입니다” 한마디면 자리 안내됩니다.</li>
      </ul>

      <h2 className="pt-2 text-xl font-bold text-white">변경 / 취소</h2>
      <p>
        예약했던 번호 그대로 다시 전화 주시면 됩니다. 변경·취소 페널티 없습니다.
        대신 빠르게 알려주시면 다음 손님 잡기 좋아요. 그게 매너 정도로 생각해
        주세요.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">단체 예약</h2>
      <p>
        4명 넘어가면 미리 한 번 전화 주세요. 한 테이블에 모이게 잡아드릴게요.
        분산되면 분위기 깨집니다.
      </p>

      <p className="rounded-2xl border border-line bg-elev p-5 text-sm text-gray-400">
        ※ 만취 또는 다른 손님께 피해가 갈 행동이 예상되는 경우 입장이 거절될 수 있습니다.
        다른 손님 보호를 위해 양해 부탁드립니다.
      </p>
    </PageShell>
  );
}
