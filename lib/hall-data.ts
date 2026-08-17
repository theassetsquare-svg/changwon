import type { HallVenue } from "./hall";
import { GROUP_1 } from "./hall/group-1";
import { GROUP_2 } from "./hall/group-2";
import { GROUP_3 } from "./hall/group-3";
import { GROUP_4 } from "./hall/group-4";
import { GROUP_5 } from "./hall/group-5";

/** 전국 나이트 홀 도감 40개. 번호 순서 = 허브 목록 순서 */
export const HALL_VENUES: HallVenue[] = [
  ...GROUP_1,
  ...GROUP_2,
  ...GROUP_3,
  ...GROUP_4,
  ...GROUP_5,
].sort((a, b) => a.no - b.no);

export const HALL_BY_SLUG: Record<string, HallVenue> = Object.fromEntries(
  HALL_VENUES.map((v) => [v.slug, v])
);

/** 지역 그룹 — 허브에서 광역 단위로 묶어 보여준다 */
export const HALL_REGIONS: { label: string; slugs: string[] }[] = [
  {
    label: "서울",
    slugs: HALL_VENUES.filter((v) => v.region === "서울특별시").map(
      (v) => v.slug
    ),
  },
  {
    label: "경기 · 인천",
    slugs: HALL_VENUES.filter(
      (v) => v.region === "경기도" || v.region === "인천광역시"
    ).map((v) => v.slug),
  },
  {
    label: "충청",
    slugs: HALL_VENUES.filter(
      (v) =>
        v.region === "대전광역시" ||
        v.region === "충청남도" ||
        v.region === "충청북도"
    ).map((v) => v.slug),
  },
  {
    label: "영남",
    slugs: HALL_VENUES.filter(
      (v) =>
        v.region === "부산광역시" ||
        v.region === "대구광역시" ||
        v.region === "울산광역시" ||
        v.region === "경상남도" ||
        v.region === "경상북도"
    ).map((v) => v.slug),
  },
  {
    label: "호남 · 제주",
    slugs: HALL_VENUES.filter(
      (v) =>
        v.region === "광주광역시" || v.region === "제주특별자치도"
    ).map((v) => v.slug),
  },
];
