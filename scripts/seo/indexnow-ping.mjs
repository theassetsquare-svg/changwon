#!/usr/bin/env node
// IndexNow API → Bing/Yandex/Naver 호환 검색엔진 일괄 핑
// 사용: node scripts/seo/indexnow-ping.mjs

const SITE = "https://changwon.pages.dev";
const KEY = "5dbbbc240f629ca365331a82de4fdf03";
const KEY_LOCATION = `${SITE}/${KEY}.txt`;

const ROUTES = [
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

const urlList = ROUTES.map((r) => `${SITE}${r === "/" ? "" : r}`);

async function postIndexNow(endpoint) {
  const body = {
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };
  const r = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  return { endpoint, status: r.status, ok: r.ok };
}

async function pingSitemap(endpoint) {
  const r = await fetch(endpoint, { method: "GET" });
  return { endpoint, status: r.status, ok: r.ok };
}

(async () => {
  const results = [];
  // IndexNow는 Bing(MS), Yandex, Naver(예정)가 공통 지원하는 표준.
  // Google의 sitemap ping 엔드포인트는 2023-06 폐지되어 제외함.
  // Google은 Search Console의 sitemap 자동 재크롤에 위임.
  results.push(await postIndexNow("https://api.indexnow.org/indexnow").catch((e) => ({ endpoint: "indexnow", status: "ERR", ok: false, error: String(e) })));
  results.push(await postIndexNow("https://www.bing.com/indexnow").catch((e) => ({ endpoint: "bing", status: "ERR", ok: false, error: String(e) })));
  results.push(await postIndexNow("https://yandex.com/indexnow").catch((e) => ({ endpoint: "yandex", status: "ERR", ok: false, error: String(e) })));
  // 사이트맵 자체에 GET 핑 (일부 검색엔진은 sitemap URL의 접근을 신호로 사용)
  results.push(await pingSitemap(`${SITE}/sitemap.xml`).catch((e) => ({ endpoint: "self-sitemap", status: "ERR", ok: false, error: String(e) })));

  console.log("[IndexNow / Sitemap Ping]");
  for (const r of results) {
    console.log(`  ${r.endpoint.padEnd(40)} ${r.ok ? "OK" : "FAIL"} (${r.status})${r.error ? " — " + r.error : ""}`);
  }
  const failed = results.filter((r) => !r.ok && r.status !== 202);
  if (failed.length > 0) {
    console.log(`\n[WARN] ${failed.length}/${results.length} 핑 실패`);
  } else {
    console.log("\n[OK] 모든 핑 성공");
  }
})();
