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
  "/night",
  // 전국 나이트 홀 도감 (lib/hall/group-*.ts 의 slug 와 동일해야 함)
  "/hall",
  "/hall/sillim-grandprix-guide",
  "/hall/sangbong-hangukgwan",
  "/hall/suyu-shampoo",
  "/hall/busan-asiad",
  "/hall/suwon-chance-dome",
  "/hall/ansan-hit",
  "/hall/daejeon-seven",
  "/hall/ilsan-shampoo-guide",
  "/hall/cheongdam",
  "/hall/daejeon-one",
  "/hall/changwon-lululala",
  "/hall/bulgwang-hobak",
  "/hall/ulsan-champion-guide",
  "/hall/doksan-gukbingwan-guide",
  "/hall/dapsimni-miracle",
  "/hall/gangseo-hobak-guide",
  "/hall/yeongdeungpo-terminal-guide",
  "/hall/nowon-hobak-guide",
  "/hall/gildong-chance-guide",
  "/hall/paju-yadang-skydome-guide",
  "/hall/guri-hobak-guide",
  "/hall/uijeongbu-hangukgwan-guide",
  "/hall/uijeongbu-baekakgwan-guide",
  "/hall/suwon-korea-guide",
  "/hall/osan-hobak-guide",
  "/hall/indeogwon-gukbingwan-guide",
  "/hall/seongnam-shampoo-guide",
  "/hall/incheon-arabian-guide",
  "/hall/bucheon-gorae",
  "/hall/pyeongtaek-hobak",
  "/hall/cheonan-stardome-guide",
  "/hall/cheonan-korea",
  "/hall/cheongju-hobak",
  "/hall/ulsan-newworld-guide",
  "/hall/seosan-hobak",
  "/hall/daegu-hobak",
  "/hall/gumi-hobak-guide",
  "/hall/gwangju-sangmu",
  "/hall/gwangju-cheomdan",
  "/hall/jeju-do-guide",
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
