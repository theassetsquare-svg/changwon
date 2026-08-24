#!/usr/bin/env node
// 라이브 실측 — 배포된 사이트에서 썸네일 조건을 직접 확인한다.
// 사용: node scripts/thumb-live.mjs
//
//  1. /og/{슬러그}.png 가 HTTP 200 + Content-Type: image/png 인가
//  2. 응답 본문이 실제 PNG 이고 1200x1200 인가
//  3. 페이지 HTML 에 본문 <img> 와 메타 9종이 실제로 반영됐는가

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SITE = "https://g.nolcool.com";

const registry = JSON.parse(
  fs.readFileSync(path.join(ROOT, "scripts/og/registry.json"), "utf8"),
);

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

function metaContent(html, key) {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*>`,
    "i",
  );
  const tag = html.match(re)?.[0];
  return tag ? (tag.match(/content=["']([^"']*)["']/i)?.[1] ?? null) : null;
}

function pngSize(buf) {
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return null;
  if (buf.toString("ascii", 12, 16) !== "IHDR") return null;
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

const rows = [];
const fails = [];

for (const { route, slug } of registry) {
  const row = { route, slug };

  // 1~2) 썸네일 파일
  const imgUrl = `${SITE}/og/${slug}.png`;
  try {
    const r = await fetch(imgUrl);
    const buf = Buffer.from(await r.arrayBuffer());
    const dim = pngSize(buf);
    row.http = r.status;
    row.ctype = r.headers.get("content-type") ?? "";
    row.kb = Math.round(buf.length / 1024);
    row.dim = dim ? `${dim.w}x${dim.h}` : "PNG아님";
    if (r.status !== 200) fails.push(`${route} — 썸네일 HTTP ${r.status}`);
    if (!row.ctype.startsWith("image/png")) fails.push(`${route} — Content-Type ${row.ctype}`);
    if (!dim || dim.w !== 1200 || dim.h !== 1200) fails.push(`${route} — 실측 ${row.dim}`);
    if (buf.length > 300 * 1024) fails.push(`${route} — ${row.kb}KB > 300KB`);
  } catch (e) {
    row.http = "ERR";
    fails.push(`${route} — 썸네일 요청 실패: ${e}`);
  }

  // 3) 페이지 HTML
  try {
    const r = await fetch(`${SITE}${route}`);
    const html = await r.text();
    row.pageHttp = r.status;
    const expected = `/og/${slug}.png`;
    row.bodyImg = new RegExp(`<img[^>]+src=["']${expected}["']`, "i").test(html) ? "O" : "X";
    const missing = REQUIRED.filter((k) => !metaContent(html, k));
    row.meta = `${9 - missing.length}/9`;
    const ogImage = metaContent(html, "og:image");
    row.same = ogImage && ogImage.endsWith(expected) ? "O" : "X";
    if (r.status !== 200) fails.push(`${route} — 페이지 HTTP ${r.status}`);
    if (row.bodyImg !== "O") fails.push(`${route} — 본문 img 없음`);
    if (missing.length) fails.push(`${route} — 메타 누락 ${missing.join(",")}`);
    if (row.same !== "O") fails.push(`${route} — og:image 가 본문 img 와 불일치`);
  } catch (e) {
    row.pageHttp = "ERR";
    fails.push(`${route} — 페이지 요청 실패: ${e}`);
  }

  rows.push(row);
}

console.log(
  "ROUTE".padEnd(34) + "IMG".padStart(5) + " CTYPE".padEnd(12) + "DIM".padStart(10) +
    "KB".padStart(6) + "PAGE".padStart(6) + "BODY".padStart(6) + "META".padStart(6) + "SAME".padStart(6),
);
for (const r of rows) {
  console.log(
    r.route.padEnd(34) +
      String(r.http).padStart(5) + " " +
      String(r.ctype ?? "").replace("image/", "").padEnd(11) +
      String(r.dim ?? "").padStart(10) +
      String(r.kb ?? "").padStart(6) +
      String(r.pageHttp).padStart(6) +
      String(r.bodyImg ?? "").padStart(6) +
      String(r.meta ?? "").padStart(6) +
      String(r.same ?? "").padStart(6),
  );
}

fs.writeFileSync(path.join(ROOT, "scripts/og/live-report.json"), JSON.stringify(rows, null, 1));

console.log(`\n검사 ${rows.length}개 페이지 · 실패 ${fails.length}건`);
if (fails.length) {
  console.error(fails.map((f) => "  - " + f).join("\n"));
  process.exit(1);
}
console.log("[OK] 라이브 실측 전부 통과");
