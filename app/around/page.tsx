import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { PAGE_META, SITE } from "@/lib/site";

const m = PAGE_META["/around"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/around" },
  openGraph: { title: m.title, description: m.description },
};

export default function AroundPage() {
  return (
    <PageShell title="주변 안내" hook={m.hook} pathname="/around">
      <p>
        가게 도착 전후로 동선이 자연스럽게 풀리도록 주변 정보 정리해 두겠습니다.
        없는 가게 추천하거나 광고비 받고 끼워넣는 거 안 합니다. 직접 다녀와 본
        곳만 적습니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">근처 식당</h2>
      <p className="text-gray-300">
        도보권 추천 — <Placeholder>입력필요</Placeholder>. 메뉴 종류별로 한두 군데씩
        적어 둘게요.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">근처 숙소</h2>
      <p className="text-gray-300">
        호텔·모텔 — <Placeholder>입력필요</Placeholder>. 가격대별로 정리합니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">대리 / 택시</h2>
      <p>
        끝나고 운전 안 하실 거면 가게에서 대리 잡아드릴 수 있어요. 그냥 저한테
        한마디 해 주세요. 전화로 미리 말씀해 두셔도 됩니다 —{" "}
        <a href={SITE.phoneHref} className="font-bold text-gold underline">{SITE.phone}</a>.
      </p>

      <p className="rounded-2xl border border-line bg-elev p-5 text-sm text-gray-300">
        ※ 음주 후 운전은 본인뿐 아니라 다른 사람도 다칩니다. 저희가 대리 잡아드리는 거,
        손님께 부담드리려는 게 아니라 사고 막으려는 거예요.
      </p>
    </PageShell>
  );
}
