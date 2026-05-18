import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { PAGE_META, PLACEHOLDERS, SITE } from "@/lib/site";

const m = PAGE_META["/about"];
export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: "/about" },
  openGraph: { title: m.title, description: m.description },
};

export default function AboutPage() {
  return (
    <PageShell
      title="어떤 가게냐고요?"
      hook={m.hook}
      pathname="/about"
    >
      <p>
        창원시 안에 있는 합법 나이트 클럽입니다. 사업자 등록증 있고, 19세 이상만
        받습니다. 입장 시 신분증 보여 주셔야 합니다. 그게 룰이라기 보다, 우리 가게
        오래 잘 굴러가는 방법이에요.
      </p>

      <p>
        가게 이름은 “룰루랄라 나이트”. 매니저는 저, <strong className="text-white">짱구</strong>입니다.
        직원이 따로 받아서 메모 남기고 다시 콜백하는 시스템 같은 거 안 합니다.
        제 번호 <a href={SITE.phoneHref} className="font-bold text-gold underline">{SITE.phone}</a>로
        오시는 전화 거의 다 제가 직접 받습니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">한 줄로 말하면</h2>
      <p className="rounded-2xl border border-line bg-elev p-5 text-base text-gold">
        “짱구가 사람 보고 자리 잡아드리는 가게”
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">기본 정보</h2>
      <ul className="space-y-2 text-gray-300">
        <li>
          업소명 — <strong className="text-white">{SITE.name}</strong>
        </li>
        <li>
          위치 — {SITE.city} <Placeholder>{PLACEHOLDERS.address}</Placeholder>
        </li>
        <li>
          영업시간 — <Placeholder>{PLACEHOLDERS.hoursWeekday}</Placeholder>{" "}
          (휴무일 변동 있으면 ‘소식’ 페이지에 미리 올립니다)
        </li>
        <li>
          매니저 — {SITE.manager} (직접 받습니다, <a href={SITE.phoneHref} className="text-gold underline">{SITE.phone}</a>)
        </li>
        <li>사업자 등록 — 보유, 19세 이상 합법 영업장</li>
      </ul>

      <h2 className="pt-2 text-xl font-bold text-white">방문 전에 알아두시면 좋은 것</h2>
      <ul className="space-y-2 text-gray-300">
        <li>
          신분증 확인을 합니다. 미성년자는 출입이 불가합니다. 죄송하지만 룰입니다.
        </li>
        <li>
          예약 안 하셔도 들어올 수는 있는데, 사람 많은 날은 자리가 빠르게 빠집니다.
          헛걸음 안 하시려면 전화 한 통 추천드립니다.
        </li>
        <li>
          단체(4인 이상)면 미리 전화 주세요. 한 자리에 모이게 잡아드리려면 시간이
          필요합니다.
        </li>
      </ul>
    </PageShell>
  );
}
