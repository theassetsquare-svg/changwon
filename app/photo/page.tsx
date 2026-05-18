import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { PAGE_META, SITE } from "@/lib/site";

const m = PAGE_META["/photo"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/photo" },
  openGraph: { title: m.title, description: m.description },
};

export default function PhotoPage() {
  return (
    <PageShell title="매장 사진" hook={m.hook} pathname="/photo">
      <p>
        다른 가게 사진 갖다 쓰는 데 많죠. 저희는 안 합니다. 여기 올리는 사진은
        전부 저희 매장에서 찍은 진짜입니다. 합성도 안 합니다.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-line bg-elev text-xs text-gray-500"
          >
            매장 사진 {i + 1} [업로드 대기]
          </div>
        ))}
      </div>

      <h2 className="pt-2 text-xl font-bold text-white">사진이 비어있는 이유</h2>
      <p>
        다른 가게 사진을 빌려와서 채울 수도 있었지만, 그러면 가셨을 때 “사진이랑
        다르네” 소리 듣습니다. 저희는 그런 거 안 합니다. 매장 사진 제대로 찍어서
        하나씩 올려둘게요.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">미리 보고 싶으시면</h2>
      <p>
        영상통화로 보여드릴 수도 있어요. 어색하지 않으시면 전화 주세요 —{" "}
        <a href={SITE.phoneHref} className="font-bold text-gold underline">{SITE.phone}</a>.
      </p>
    </PageShell>
  );
}
