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
      title="창원 룰루랄라 나이트, 어떤 가게냐고요?"
      hook={m.hook}
      pathname="/about"
    >
      <p>
        <strong className="text-white">창원 룰루랄라 나이트</strong>는 경상남도 창원시
        안에 있는 합법 나이트 클럽입니다. 사업자 등록 보유하고, 만 19세 이상만
        받습니다. 입장하실 때 신분증 보여 주셔야 합니다. 룰이라기보다, 우리 가게가
        오래 잘 굴러가는 방식이에요. 손님도 보호되고, 매장도 보호됩니다. 검색하다가
        "창원룰루랄라나이트"라는 이름으로 비슷한 사이트 여럿 보셨을 수 있는데,
        공식 카카오톡 문의는{" "}
        <a href={SITE.kakaoHref} className="font-bold text-[#c9a800] underline">
          {SITE.kakao}
        </a>{" "}
        하나입니다.
      </p>

      <p>
        매장 이름은 "룰루랄라 나이트", 도시 이름 붙여서 부르면 그게 저희 가게입니다.
        카카오톡으로 문의하시면 매니저가 직접 답합니다. 직원이 따로 받아서 메모
        남기고 다시 연락하는 시스템 같은 거 안 합니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">한 줄로 말하면</h2>
      <p className="rounded-2xl border border-line bg-elev p-5 text-base text-gold">
        "매니저가 사람 보고 자리 잡아드리는 가게"
      </p>
      <p>
        조금 더 풀면, 처음 오시는 분께는 부담 적은 자리, 단골 분께는 익숙한 자리,
        단체 분께는 한 자리에 모이게 — 그렇게 사람 보고 잡아드립니다. 손님 인원과
        분위기가 다 다른데 자리만 하나로 못 박아두면 어색해지더라고요. 그래서 매번
        다시 봅니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">기본 정보</h2>
      <ul className="space-y-2 text-gray-300">
        <li>
          업소명 — <strong className="text-white">{SITE.name}</strong> (정식 명칭)
        </li>
        <li>
          별칭 — 창원룰루랄라나이트, 창원 룰루랄라, 룰루랄라 나이트
        </li>
        <li>
          위치 — {SITE.region} {SITE.city}{" "}
          <Placeholder>{PLACEHOLDERS.address}</Placeholder>
        </li>
        <li>
          영업시간 — <Placeholder>{PLACEHOLDERS.hoursWeekday}</Placeholder> (휴무 변동은
          '소식' 페이지에 미리 올립니다)
        </li>
        <li>
          문의 —{" "}
          <a href={SITE.kakaoHref} className="text-[#c9a800] underline">
            카카오톡 {SITE.kakao}
          </a>{" "}
          (매니저 직접 응대)
        </li>
        <li>가격대 — 중간대 (정확한 금액은 카카오톡 문의가 기준)</li>
        <li>입장 연령 — 만 19세 이상, 신분증 확인</li>
        <li>결제 — 현금 / 카드 (자세한 정책은 카카오톡 문의)</li>
        <li>사업자 등록 — 보유, 합법 영업장</li>
      </ul>

      <h2 className="pt-2 text-xl font-bold text-white">
        이름을 "룰루랄라"라고 정한 이유
      </h2>
      <p>
        창원 나이트 처음 가시는 분들, 그 자체가 무겁게 느껴진다고 하시더라고요.
        그래서 가게 이름이라도 가볍게 가자고 "룰루랄라"라고 붙였습니다. 들어와서
        어깨에 힘 빠지는 게 목적이에요. 창원에서 룰루랄라 한 곳, 그게 저희 매장입니다.
      </p>

      <h2 className="pt-2 text-xl font-bold text-white">
        방문 전에 알아두시면 좋은 것
      </h2>
      <ul className="space-y-2 text-gray-300">
        <li>
          신분증 확인을 합니다. 미성년자는 출입이 불가합니다. 죄송하지만 룰입니다.
        </li>
        <li>
          예약 안 하셔도 들어올 수는 있는데, 사람 많은 날은 자리가 빠르게 빠집니다.
          헛걸음 안 하시려면 카카오톡 문의 추천드립니다.
        </li>
        <li>
          단체(4인 이상)면 미리 카카오톡 주세요. 한 자리에 모이게 잡아드리려면 시간이
          필요합니다.
        </li>
        <li>
          만취 상태로 도착하시면 입장이 어려울 수 있습니다. 다른 손님 보호 차원이라
          양해 부탁드립니다.
        </li>
        <li>
          드레스 코드는 따로 없습니다. 편하게 오세요. 다만 슬리퍼·운동복은 분위기상
          어색할 수 있어요.
        </li>
      </ul>

      <h2 className="pt-2 text-xl font-bold text-white">저희가 안 하는 것</h2>
      <ul className="space-y-2 text-gray-300">
        <li>가짜 후기 / 가짜 별점 / 단골 수 부풀리기 — 안 합니다.</li>
        <li>"최고", "1위", "역대급" 같은 표현 — 안 씁니다.</li>
        <li>광고 페이지에 끼워 넣는 "30% 할인" 같은 거짓말 — 안 합니다.</li>
        <li>응대 없이 기다리게 하는 방식 — 안 합니다.</li>
        <li>광고비 받고 주변 가게 끼워 넣는 추천 — 안 합니다.</li>
      </ul>

      <p className="text-gray-300">
        저희가 안 하는 것까지 적어두는 이유는, 손님이 와서 "사이트랑 다르네" 라는
        말이 나오지 않게 하려고요. 적은 대로만 합니다. 적지 않은 약속은 안 합니다.
      </p>
    </PageShell>
  );
}
