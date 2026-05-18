import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { PAGE_META, PLACEHOLDERS, SITE } from "@/lib/site";

const m = PAGE_META["/jjanggu"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/jjanggu" },
  openGraph: { title: m.title, description: m.description },
};

export default function JjangguPage() {
  return (
    <PageShell
      title="짱구가 직접 받습니다"
      hook={m.hook}
      pathname="/jjanggu"
    >
      <p>
        안녕하세요. <strong className="text-white">{SITE.name}</strong> 매니저{" "}
        <strong className="text-white">짱구</strong>입니다. 010-3854-6887,
        이 번호로 오시는 전화 거의 다 제가 직접 받습니다.
      </p>

      <p>
        “전화하면 다른 사람이 받고 다시 연락 준다” 같은 거 없습니다. 그래서 빠르고,
        그래서 약속한 거 그대로 갑니다. 인원·날짜·시간 말씀하시면 그 자리에서 자리
        잡아드려요.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">전화 거실 때 이렇게만</h2>
      <ol className="space-y-3 rounded-2xl border border-line bg-elev p-5 text-gray-200">
        <li>
          <strong className="text-gold">1.</strong>{" "}
          <a href={SITE.phoneHref} className="font-bold text-gold underline">{SITE.phone}</a> 누르세요.
        </li>
        <li>
          <strong className="text-gold">2.</strong> “짱구 매니저요” 한마디면 됩니다.
        </li>
        <li>
          <strong className="text-gold">3.</strong> 인원 / 날짜 / 시간 알려주세요.
        </li>
        <li>
          <strong className="text-gold">4.</strong> 신분증 챙겨서 도착하시면 됩니다.
        </li>
      </ol>

      <h2 className="pt-2 text-xl font-bold text-white">제 소개</h2>
      <p>
        경력은 <Placeholder>{PLACEHOLDERS.jjangguCareer}</Placeholder>입니다. 매장에서
        확인된 경력만 여기 적습니다. 부풀려서 적는 거 안 좋아합니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">자주 듣는 질문 두 개</h2>
      <p>
        <strong className="text-white">“처음인데 어색해요”</strong> — 첫 손님이 어색한 게
        가장 정상이에요. 그래서 전화로 어떤 자리가 좋을지 같이 정합니다.
      </p>
      <p>
        <strong className="text-white">“가격 부담돼요”</strong> — 그 자리에서 정확하게
        말씀드립니다. 부풀려서 말 안 합니다. 보고 결정하시면 됩니다.
      </p>
    </PageShell>
  );
}
