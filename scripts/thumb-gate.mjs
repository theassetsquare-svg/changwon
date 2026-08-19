#!/usr/bin/env node
// 썸네일 노출 조건 게이트 (G9~G16). 하나라도 실패하면 배포 금지.
// 빌드 산출물(out/)을 직접 읽는다. 사용: node scripts/thumb-gate.mjs
//
//  G9  본문에 <img src="/og/{슬러그}.png"> 가 실제로 있다
//  G10 og:image 가 본문 img 와 같은 파일이다
//  G11 메타 9종이 전부 있다
//      og:image / og:image:secure_url / og:image:width / og:image:height
//      og:image:type / og:image:alt / twitter:card / twitter:image / thumbnail
//  G12 og:image 가 절대 URL 이다
//  G13 PNG 실측 1200x1200
//  G14 PNG 300KB 이하
//  G15 alt 에 가게이름(또는 사이트명)이 들어 있다
//  G16 robots.txt 에 Disallow 없음 + noimageindex 0건

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "out");
const SITE_URL = "https://changwonb.pages.dev";
const MAX_BYTES = 300 * 1024;

const registry = JSON.parse(
  fs.readFileSync(path.join(ROOT, "scripts/og/registry.json"), "utf8"),
);

const fails = [];
const rows = [];
const fail = (g, route, msg) => fails.push(`${g} · ${route} — ${msg}`);

/** PNG IHDR 에서 실제 폭/높이를 읽는다 */
function pngSize(buf) {
  if (buf.length < 24) return null;
  if (buf.readUInt32BE(0) !== 0x89504e47) return null;
  if (buf.toString("ascii", 12, 16) !== "IHDR") return null;
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

/** 라우트 → out/ 안의 html 파일 경로 */
function htmlPath(route) {
  const p = route === "/" ? "index" : route.replace(/^\//, "");
  return path.join(OUT, `${p}.html`);
}

/** <meta ...> 한 개를 이름으로 찾는다 (property / name 둘 다) */
function metaContent(html, key) {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*>`,
    "i",
  );
  const tag = html.match(re)?.[0];
  if (!tag) return null;
  return tag.match(/content=["']([^"']*)["']/i)?.[1] ?? null;
}

/** 메타 태그가 몇 번 나오는지 (중복 삽입 검사) */
function metaCount(html, key) {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`,
    "gi",
  );
  return (html.match(re) ?? []).length;
}

const REQUIRED = [
  "og:image",
  "og:image:secure_url",
  "og:image:width",
  "og:image:height",
  "og:image:type",
  "og:image:alt",
  "twitter:card",
  "twitter:image",
  "thumbnail",
];

for (const { route, slug } of registry) {
  const hp = htmlPath(route);
  const row = { route, slug, img: "—", same: "—", meta: "—", size: "—", bytes: "—", verdict: "FAIL" };

  if (!fs.existsSync(hp)) {
    fail("G9", route, `빌드 산출물 없음 (${path.relative(ROOT, hp)})`);
    rows.push(row);
    continue;
  }
  const html = fs.readFileSync(hp, "utf8");
  const expected = `/og/${slug}.png`;

  // G9 — 본문 img
  const imgRe = new RegExp(`<img[^>]+src=["']${expected}["'][^>]*>`, "i");
  const imgTag = html.match(imgRe)?.[0] ?? null;
  if (!imgTag) {
    fail("G9", route, `본문에 <img src="${expected}"> 없음`);
  } else {
    row.img = "O";
  }

  // G11 — 메타 9종 (+ 중복 검사)
  const missing = REQUIRED.filter((k) => !metaContent(html, k));
  const dup = REQUIRED.filter((k) => metaCount(html, k) > 1);
  if (missing.length) fail("G11", route, `메타 누락: ${missing.join(", ")}`);
  if (dup.length) fail("G11", route, `메타 중복: ${dup.join(", ")}`);
  if (!missing.length && !dup.length) row.meta = "9/9";
  else row.meta = `${9 - missing.length}/9${dup.length ? " +중복" : ""}`;

  const ogImage = metaContent(html, "og:image");
  const twCard = metaContent(html, "twitter:card");
  const thumbTag = metaContent(html, "thumbnail");
  const ogAlt = metaContent(html, "og:image:alt");
  const ogW = metaContent(html, "og:image:width");
  const ogH = metaContent(html, "og:image:height");
  const ogType = metaContent(html, "og:image:type");

  // G10 — og:image 와 본문 img 가 같은 파일
  if (ogImage && imgTag) {
    if (ogImage.endsWith(expected)) row.same = "O";
    else fail("G10", route, `og:image(${ogImage}) 와 본문 img(${expected}) 불일치`);
  }
  if (thumbTag && !thumbTag.endsWith(expected)) {
    fail("G10", route, `thumbnail(${thumbTag}) 이 본문 img 와 불일치`);
  }

  // G12 — 절대 URL
  for (const [k, v] of [["og:image", ogImage], ["twitter:image", metaContent(html, "twitter:image")], ["thumbnail", thumbTag]]) {
    if (v && !v.startsWith(`${SITE_URL}/`)) fail("G12", route, `${k} 가 절대 URL 이 아님: ${v}`);
  }

  // 값 검사
  if (ogW !== "1200") fail("G11", route, `og:image:width=${ogW}`);
  if (ogH !== "1200") fail("G11", route, `og:image:height=${ogH}`);
  if (ogType !== "image/png") fail("G11", route, `og:image:type=${ogType}`);
  if (twCard !== "summary") fail("G11", route, `twitter:card=${twCard}`);

  // G13 / G14 — 실제 파일
  const png = path.join(OUT, "og", `${slug}.png`);
  if (!fs.existsSync(png)) {
    fail("G13", route, `썸네일 파일 없음 (out/og/${slug}.png)`);
  } else {
    const buf = fs.readFileSync(png);
    const dim = pngSize(buf);
    if (!dim) fail("G13", route, "PNG 헤더를 읽지 못함");
    else if (dim.w !== 1200 || dim.h !== 1200) fail("G13", route, `실측 ${dim.w}x${dim.h}`);
    else row.size = "1200x1200";

    row.bytes = `${Math.round(buf.length / 1024)}KB`;
    if (buf.length > MAX_BYTES) fail("G14", route, `${Math.round(buf.length / 1024)}KB > 300KB`);
  }

  // G15 — alt 에 업소명/사이트명
  const altText = imgTag?.match(/alt=["']([^"']*)["']/i)?.[1] ?? "";
  const nameOk = (s) => /나이트|룰루랄라/.test(s ?? "");
  if (!nameOk(altText)) fail("G15", route, `본문 img alt 에 가게이름 없음: "${altText}"`);
  if (!nameOk(ogAlt)) fail("G15", route, `og:image:alt 에 가게이름 없음: "${ogAlt}"`);

  row.verdict =
    row.img === "O" && row.same === "O" && row.meta === "9/9" && row.size === "1200x1200"
      ? "PASS"
      : "FAIL";
  rows.push(row);
}

// G16 — robots
const robots = fs.readFileSync(path.join(OUT, "robots.txt"), "utf8");
if (/^\s*Disallow:\s*\S/im.test(robots)) fail("G16", "/robots.txt", "Disallow 규칙이 있음");
const noimage = [];
for (const { route } of registry) {
  const hp = htmlPath(route);
  if (!fs.existsSync(hp)) continue;
  if (/noimageindex|content=["'][^"']*noindex/i.test(fs.readFileSync(hp, "utf8"))) noimage.push(route);
}
if (noimage.length) fail("G16", "전역", `noimageindex/noindex 발견: ${noimage.join(", ")}`);

// ─── 결과 ───
const pass = rows.filter((r) => r.verdict === "PASS").length;
console.log(`[Thumb Gate] 검사 대상 ${rows.length}개 페이지`);
console.log(`  PASS ${pass} / FAIL ${rows.length - pass}`);
console.log(`  robots.txt Disallow: ${/^\s*Disallow:\s*\S/im.test(robots) ? "있음" : "0건"} · noimageindex: ${noimage.length}건`);

if (fails.length) {
  console.error(`\n[FAIL] ${fails.length}건\n` + fails.map((f) => "  - " + f).join("\n"));
  process.exit(1);
}
console.log("\n[OK] G9~G16 전부 통과");

fs.writeFileSync(
  path.join(ROOT, "scripts/og/gate-report.json"),
  JSON.stringify(rows, null, 1),
);
