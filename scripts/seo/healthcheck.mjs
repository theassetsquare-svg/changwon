#!/usr/bin/env node
// 라이브 사이트 14페이지 헬스체크
// 검증: HTTP 200, <title> 존재, JSON-LD 1개 이상, canonical 존재, og:title 존재
// 사용: node scripts/seo/healthcheck.mjs

const SITE = process.env.SITE_URL || "https://changwon.pages.dev";

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

const VENUE_ROUTES = VENUE_SLUGS.map((s) => `/night/${s}`);
const ROUTES = [...CORE_ROUTES, "/night", ...VENUE_ROUTES];

// FAQPage 구조화 데이터가 반드시 있어야 하는 경로
const FAQ_REQUIRED = new Set([
  "/",
  "/faq",
  "/location",
  "/news",
  "/event",
  "/night",
  ...VENUE_ROUTES,
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
  const hasCallBar = /fixed inset-x-0 bottom-0 z-50/.test(html);

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
