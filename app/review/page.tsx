import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { PAGE_META, SITE } from "@/lib/site";

const m = PAGE_META["/review"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/review" },
  openGraph: { title: m.title, description: m.description },
};

export default function ReviewPage() {
  return (
    <PageShell title="후기" hook={m.hook} pathname="/review">
      <p>
        솔직하게 말씀드립니다. 이 페이지에 가짜 후기는 절대 안 올립니다.
        가짜 별점도 안 만듭니다. 받은 것만 그대로 올립니다.
      </p>

      <div className="rounded-2xl border border-dashed border-line bg-elev p-8 text-center text-gray-400">
        <p className="text-base">아직 게시 가능한 실제 후기가 모이지 않았습니다.</p>
        <p className="mt-2 text-sm">
          매장에서 동의 받은 진짜 후기가 모이는 대로 여기 그대로 올립니다.
        </p>
      </div>

      <h2 className="pt-2 text-xl font-bold text-white">제가 후기를 다루는 방식</h2>
      <ul className="space-y-2 text-gray-300">
        <li>방문하신 손님께 직접 받은 후기만 올립니다.</li>
        <li>출처(카카오톡, 네이버 플레이스 등) 함께 표기합니다.</li>
        <li>평점 평균 부풀리기 안 합니다. 실제 평균만 표시합니다.</li>
        <li>비공개로 해달라 하시면 그 자리에서 내립니다.</li>
        <li>저희 입장에 불리한 후기도 그대로 남깁니다. 그게 정직이니까요.</li>
      </ul>

      <h2 className="pt-2 text-xl font-bold text-white">후기 남기시려면</h2>
      <p>
        손님이 후기를 직접 보내주시는 게 가장 좋습니다. 카카오톡, 문자, 전화 어떤
        방법이든 좋아요. 짱구한테 한마디 해 주세요 —{" "}
        <a href={SITE.phoneHref} className="font-bold text-gold underline">{SITE.phone}</a>.
        후기를 좋게 써달라 부탁 안 합니다. 그냥 솔직히 적어주시면 됩니다.
      </p>
    </PageShell>
  );
}
