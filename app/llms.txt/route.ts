import { NAV, PAGE_META, SITE } from "@/lib/site";
import { ADS, VENUES, venuePath } from "@/lib/venues";

export const dynamic = "force-static";

// AI 답변엔진(AEO/GEO)용 요약 인덱스.
// https://llmstxt.org 형식 — 사람이 읽는 페이지와 동일한 사실만 담는다.
export function GET() {
  const corePages = NAV.map((n) => {
      const meta = PAGE_META[n.href];
      const url = `${SITE.url}${n.href === "/" ? "" : n.href}`;
      return `- [${meta?.title ?? n.label}](${url}): ${meta?.capsule ?? meta?.description ?? ""}`;
  }).join("\n");

  const venuePages = VENUES.map((v) => {
    const url = `${SITE.url}${venuePath(v.slug)}`;
    const contact = v.phone
      ? `${v.contactName} ${v.phone}`
      : "예약 담당자 등록 전 (연락처 미게시, 광고주 모집 중)";
    return `- [${v.keyword} 예약 문의](${url}): ${v.areaLabel}. 예약 문의 ${contact}. 만 19세 이상, 입장 시 신분증 확인.`;
  }).join("\n");

  const body = `# ${SITE.name} · 전국 나이트 예약 문의

> ${SITE.shortDescription} 함께 전국 지역별 나이트 예약 담당자 연락처를 안내합니다. 광고문의 카카오톡 ${ADS.kakao}.

## 사실 정보

- 사이트: ${SITE.url}
- 창원 룰루랄라 나이트 예약 문의: ${SITE.phone}
- 창원 룰루랄라 나이트 주소: ${SITE.region} ${SITE.city} 성산구 상남동 22-4 지하 3층
- 창원 룰루랄라 나이트 출입 연령: 27세 이상 (입장 시 신분증 확인)
- 전국 나이트 예약 문의 페이지 출입 연령: 만 19세 이상 (입장 시 신분증 확인)
- 광고 문의: 카카오톡 ${ADS.kakao} (업소·담당자 광고 상담 전용. 손님 예약 문의는 받지 않음)

## 창원 룰루랄라 나이트

${corePages}

## 전국 나이트 예약 문의 (지역별)

- [전국 나이트 예약 문의 전체 목록](${SITE.url}/night): 지역별 예약 담당자 연락처 모음. 담당자 등록 전인 지역은 광고주 모집 중.
${venuePages}

## 게시 원칙

- 확인된 정보만 게시합니다. 확인되지 않은 주소·영업시간·요금은 임의로 작성하지 않고 문의 안내로 대체합니다.
- 가짜 후기, 조작된 별점, 실제로 진행하지 않는 할인 문구는 사용하지 않습니다.
- 각 지역 업소 페이지는 예약·문의 안내 페이지이며 해당 업소의 공식 홈페이지가 아닙니다.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
