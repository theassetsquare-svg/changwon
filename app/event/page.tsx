import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { PAGE_META, SITE } from "@/lib/site";

const m = PAGE_META["/event"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/event" },
  openGraph: { title: m.title, description: m.description },
};

export default function EventPage() {
  return (
    <PageShell title="이벤트" hook={m.hook} pathname="/event">
      <p>
        “30% 할인” 같은 거 사이트에 안 적습니다. 보고 오셨는데 막상 가니까 그런
        할인 없는 가게, 흔하잖아요. 저희는 그게 손님한테 가장 미안한 일이라고
        생각해요.
      </p>

      <div className="rounded-2xl border border-dashed border-line bg-elev p-8 text-center text-gray-400">
        <p className="text-base">지금 게시 가능한 진행 중 이벤트가 없습니다.</p>
        <p className="mt-2 text-sm">
          시작하면 본 페이지와 ‘매장 소식’에 같이 올립니다.
        </p>
      </div>

      <h2 className="pt-2 text-xl font-bold text-white">왜 사이트에 광고를 잘 안 거나면</h2>
      <p>
        사이트로 손님 끌어모으는 가게보다, 단골이 다시 부르는 가게가 더 오래 갑니다.
        그래서 이벤트를 “안 하는” 게 아니라, “하는 것만” 올립니다. 한다고 적었는데
        막상 가니 없는 가게, 저희는 안 하고 싶어요.
      </p>

      <p>
        지금 진행 중인 혜택 여부가 궁금하시면 전화 주세요. 그 자리에서 솔직히
        말씀드립니다 —{" "}
        <a href={SITE.phoneHref} className="font-bold text-gold underline">{SITE.phone}</a>.
      </p>
    </PageShell>
  );
}
