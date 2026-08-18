#!/usr/bin/env node
// 라이브 사이트 14페이지 헬스체크
// 검증: HTTP 200, <title> 존재, JSON-LD 1개 이상, canonical 존재, og:title 존재
// 사용: node scripts/seo/healthcheck.mjs

const SITE = process.env.SITE_URL || "https://changwonb.pages.dev";

const CORE_ROUTES = [
  "/",
  "/about",
  "/jjanggu",
  "/price",
  "/location",
  "/reserve",
  "/review",
  "/photo",
  "/news",
  "/faq",
  "/around",
  "/event",
  "/vip",
  "/contact",
];

// 전국 나이트 예약 문의 (lib/venues.ts 의 slug 와 동일해야 함)
const VENUE_SLUGS = [
  "bulgwang-hobak",
  "ulsan-champion",
  "daejeon-one",
  "sillim-grandprix",
  "sangbong-hangukgwan",
  "suyu-shampoo",
  "busan-asiad",
  "suwon-chancedome",
  "ansan-hit",
  "daejeon-seven",
  "ilsan-shampoo",
  "cheongdam",
];

// 전국 나이트 홀 도감 40 (lib/hall/group-*.ts 의 slug 와 동일해야 함)
const HALL_SLUGS = [
  "sillim-grandprix",
  "sangbong-hangukgwan",
  "suyu-shampoo",
  "busan-asiad",
  "suwon-chance-dome",
  "ansan-hit",
  "daejeon-seven",
  "ilsan-shampoo",
  "cheongdam",
  "daejeon-one",
  "changwon-lululala",
  "bulgwang-hobak",
  "ulsan-champion",
  "doksan-gukbingwan",
  "dapsimni-miracle",
  "gangseo-hobak",
  "yeongdeungpo-terminal",
  "nowon-hobak",
  "gildong-chance",
  "paju-yadang-skydome",
  "guri-hobak",
  "uijeongbu-hangukgwan",
  "uijeongbu-baekakgwan",
  "suwon-korea",
  "osan-hobak",
  "indeogwon-gukbingwan",
  "seongnam-shampoo",
  "incheon-arabian",
  "bucheon-gorae",
  "pyeongtaek-hobak",
  "cheonan-stardome",
  "cheonan-korea",
  "cheongju-hobak",
  "ulsan-newworld",
  "seosan-hobak",
  "daegu-hobak",
  "gumi-hobak",
  "gwangju-sangmu",
  "gwangju-cheomdan",
  "jeju-do",
];

const VENUE_ROUTES = VENUE_SLUGS.map((s) => `/night/${s}`);
const HALL_ROUTES = HALL_SLUGS.map((s) => `/hall/${s}`);
const ROUTES = [
  ...CORE_ROUTES,
  "/night",
  ...VENUE_ROUTES,
  "/hall",
  ...HALL_ROUTES,
];

// /hall 은 홀 도감 전용 고정바(.hallbar)를 쓴다. 창원 페이지의 고정바 클래스와
// 다르므로 고정바 검사에서 사용할 패턴을 경로별로 나눈다.
const isHall = (route) => route === "/hall" || route.startsWith("/hall/");

// FAQPage 구조화 데이터가 반드시 있어야 하는 경로
const FAQ_REQUIRED = new Set([
  "/",
  "/faq",
  "/location",
  "/news",
  "/event",
  "/night",
  ...VENUE_ROUTES,
  ...HALL_ROUTES,
]);

async function check(route) {
  const url = `${SITE}${route === "/" ? "" : route}`;
  const res = await fetch(url, { redirect: "manual", headers: { "User-Agent": "changwon-healthcheck/1.0" } });
  const status = res.status;
  if (status !== 200) {
    return { route, url, status, ok: false, reason: `HTTP ${status}` };
  }
  const html = await res.text();
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const hasTitle = !!titleMatch && titleMatch[1].trim().length > 10;
  const jsonLdMatches = html.match(/<script[^>]*type="application\/ld\+json"/gi) || [];
  const hasJsonLd = jsonLdMatches.length >= 1;
  const hasCanonical = /<link[^>]*rel="canonical"[^>]*>/i.test(html);
  const hasOg = /<meta[^>]*property="og:title"/i.test(html);
  const hasFaq = FAQ_REQUIRED.has(route) ? /"FAQPage"/.test(html) : true;
  // 하단 고정 전화/카톡 바가 정적 HTML에 실제로 렌더됐는지
  // 홈(/)은 '창원에서 성공하는 방법' 글 하나만 두는 페이지라 헤더·푸터·고정바를
  // 모두 걷어냈다(2026-08-18). 따라서 홈은 고정바 검사에서 제외한다.
  const hasCallBar =
    route === "/"
      ? true
      : isHall(route)
        ? /class="hallbar"/.test(html)
        : /fixed inset-x-0 bottom-0 z-50/.test(html);

  const issues = [];
  if (!hasTitle) issues.push("title-missing");
  if (!hasJsonLd) issues.push("jsonld-missing");
  if (!hasCanonical) issues.push("canonical-missing");
  if (!hasOg) issues.push("og-missing");
  if (!hasFaq) issues.push("faqpage-missing");
  if (!hasCallBar) issues.push("callbar-missing");

  return {
    route,
    url,
    status,
    title: titleMatch?.[1]?.trim(),
    jsonLdCount: jsonLdMatches.length,
    ok: issues.length === 0,
    issues,
  };
}

(async () => {
  const results = [];
  for (const r of ROUTES) {
    try {
      results.push(await check(r));
    } catch (e) {
      results.push({ route: r, url: SITE + r, status: "ERR", ok: false, issues: ["fetch-error"], error: String(e) });
    }
  }

  console.log(`[Healthcheck] ${SITE}\n`);
  const COL_R = 26;
  const COL_S = 6;
  const COL_J = 6;
  const COL_T = 50;
  console.log("ROUTE".padEnd(COL_R) + "HTTP".padEnd(COL_S) + "JSON-LD".padEnd(COL_J) + "TITLE");
  console.log("-".repeat(COL_R + COL_S + COL_J + COL_T));
  for (const r of results) {
    const t = (r.title || "—").slice(0, COL_T);
    console.log(
      r.route.padEnd(COL_R) +
        String(r.status).padEnd(COL_S) +
        String(r.jsonLdCount ?? "—").padEnd(COL_J) +
        t +
        (r.ok ? "" : "   ❌ " + (r.issues || []).join(","))
    );
  }

  const failed = results.filter((r) => !r.ok);
  if (failed.length > 0) {
    console.log(`\n[FAIL] ${failed.length}/${results.length} 페이지 문제 발견`);
    process.exit(1);
  } else {
    console.log(`\n[OK] ${results.length}페이지 전부 정상 (200 + title + JSON-LD + canonical + og + 고정바)`);
  }
})();
