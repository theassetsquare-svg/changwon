#!/usr/bin/env node
// IndexNow API → Bing/Yandex/Naver 호환 검색엔진 일괄 핑
// 사용: node scripts/seo/indexnow-ping.mjs
//
// [경로 목록] scripts/og/registry.json 이 있으면 그걸 쓴다.
// 썸네일 생성기가 만드는 파일이라 페이지가 늘면 자동으로 따라온다.
// 아래 하드코딩 목록은 registry.json 을 못 읽을 때만 쓰는 예비용이다.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://changwonb.pages.dev";
const KEY = "5dbbbc240f629ca365331a82de4fdf03";
const KEY_LOCATION = `${SITE}/${KEY}.txt`;

const FALLBACK_ROUTES = [
  "/",
  "/about",
  "/lotto",
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
  "/night-guide/",
  // 전국 나이트 홀 도감 (lib/hall/group-*.ts 의 slug 와 동일해야 함)
  "/hall-guide/",
  "/hall-guide/sillim-grandprix-guide",
  "/hall-guide/sangbong-hangukgwan",
  "/hall-guide/suyu-shampoo",
  "/hall/busan-asiad",
  "/hall-guide/suwon-chance-dome",
  "/hall/ansan-hit-3",
  "/hall/daejeon-seven",
  "/hall/ilsan-shampoo-3",
  "/hall/cheongdam",
  "/hall/daejeon-one",
  "/hall/changwon-lululala",
  "/hall/bulgwang-hobak",
  "/hall/ulsan-champion-3",
  "/hall/doksan-gukbingwan-1",
  "/hall/dapsimni-miracle",
  "/hall/gangseo-hobak-1",
  "/hall/yeongdeungpo-terminal-1",
  "/hall/nowon-hobak-1",
  "/hall/gildong-chance-1",
  "/hall/paju-skydome-1",
  "/hall/guri-hobak-1",
  "/hall/uijeongbu-hangukgwan-1",
  "/hall/uijeongbu-baekakgwan-1",
  "/hall-guide/suwon-korea-guide",
  "/hall/osan-hobak-1",
  "/hall/indeogwon-gukbingwan-1",
  "/hall-guide/seongnam-shampoo-guide",
  "/hall/incheon-arabian-1",
  "/hall/bucheon-gorae",
  "/hall/pyeongtaek-hobak",
  "/hall/cheonan-stardome-1",
  "/hall/cheonan-korea",
  "/hall/cheongju-hobak",
  "/hall/ulsan-newworld-1",
  "/hall-guide/seosan-hobak",
  "/hall/daegu-hobak",
  "/hall/gumi-hobak-1",
  "/hall/gwangju-sangmu",
  "/hall/gwangju-cheomdan",
  "/hall/jeju-1",
];

function loadRoutes() {
  try {
    const here = path.dirname(fileURLToPath(import.meta.url));
    const reg = path.resolve(here, "../og/registry.json");
    const routes = JSON.parse(fs.readFileSync(reg, "utf8")).map((r) => r.route);
    if (routes.length) return routes;
  } catch {
    // registry.json 이 없으면 아래 예비 목록으로 간다
  }
  return FALLBACK_ROUTES;
}

const ROUTES = loadRoutes();
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

  console.log(`[IndexNow / Sitemap Ping] 제출 ${urlList.length}건`);
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
