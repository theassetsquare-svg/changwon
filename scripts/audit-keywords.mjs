#!/usr/bin/env node
// 키워드 스터핑 진단 스크립트
// 사용: node scripts/audit-keywords.mjs
// 출력: scripts/keyword-report.json + 콘솔 표

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const PAGES = [
  { route: "/", file: "app/page.tsx" },
  { route: "/about", file: "app/about/page.tsx" },
  { route: "/jjanggu", file: "app/jjanggu/page.tsx" },
  { route: "/price", file: "app/price/page.tsx" },
  { route: "/location", file: "app/location/page.tsx" },
  { route: "/reserve", file: "app/reserve/page.tsx" },
  { route: "/review", file: "app/review/page.tsx" },
  { route: "/photo", file: "app/photo/page.tsx" },
  { route: "/news", file: "app/news/page.tsx" },
  { route: "/faq", file: "app/faq/page.tsx" },
  { route: "/around", file: "app/around/page.tsx" },
  { route: "/event", file: "app/event/page.tsx" },
  { route: "/vip", file: "app/vip/page.tsx" },
  { route: "/contact", file: "app/contact/page.tsx" },
];

const KEYWORDS = [
  "창원 룰루랄라 나이트",
  "창원룰루랄라나이트",
  "창원 룰루랄라",
  "룰루랄라 나이트",
  "창원 나이트",
  "창원나이트",
  "짱구",
  "010-3854-6887",
];

// JSX 보이는 텍스트만 추출하기 위해 import/지시자/JSON-LD/JS 식별자 영역 제거
function extractVisibleText(source) {
  let s = source;
  // 1) import lines, comments
  s = s.replace(/^\s*import\s+[^;]+;\s*$/gm, "");
  s = s.replace(/\/\/.*$/gm, "");
  s = s.replace(/\/\*[\s\S]*?\*\//g, "");

  // 2) JSON.stringify 블록(스키마)은 제외 — 키워드 밀도와 무관
  s = s.replace(/JSON\.stringify\([\s\S]*?\)\)\,?/g, "");

  // 3) className 값 제거
  s = s.replace(/className\s*=\s*"[^"]*"/g, "");
  s = s.replace(/className\s*=\s*\{`[^`]*`\}/g, "");
  s = s.replace(/className\s*=\s*\{[^}]*\}/g, "");

  // 4) JSX 속성 중 비가시(href, src, type, role, aria-*, name 등)
  s = s.replace(/\b(href|src|type|role|alt|name|id|key|target|rel|loading|width|height|aria-[a-z-]+|data-[a-z-]+)\s*=\s*"[^"]*"/g, "");
  s = s.replace(/\b(href|src|type|role|alt|name|id|key|target|rel|loading|width|height|aria-[a-z-]+|data-[a-z-]+)\s*=\s*\{[^}]*\}/g, "");

  // 5) export const metadata block에서 title/description은 가시 텍스트로 간주 (인덱싱됨)
  // → 그대로 둠

  return s;
}

function countOccurrences(text, needle) {
  if (!needle) return 0;
  let count = 0;
  let idx = 0;
  while ((idx = text.indexOf(needle, idx)) !== -1) {
    count++;
    idx += needle.length;
  }
  return count;
}

// 한글 + 영숫자 길이로 텍스트 분량 계산 (대략)
function textLength(text) {
  return text.replace(/[\s​ ]+/g, "").length;
}

function evaluatePage(p) {
  const abs = path.join(ROOT, p.file);
  const raw = fs.readFileSync(abs, "utf-8");
  const visible = extractVisibleText(raw);
  const totalLen = textLength(visible);

  const perKw = {};
  for (const kw of KEYWORDS) {
    const c = countOccurrences(visible, kw);
    const density = totalLen > 0 ? (c * kw.length) / totalLen : 0;
    perKw[kw] = { count: c, density: +(density * 100).toFixed(2) };
  }

  // 종합 위험도: "창원 룰루랄라 나이트"가 3% 초과면 위험
  const primary = perKw["창원 룰루랄라 나이트"];
  const primary2 = perKw["창원룰루랄라나이트"];
  const totalPrimaryDensity =
    (primary?.density ?? 0) + (primary2?.density ?? 0);

  let verdict = "OK";
  if (totalPrimaryDensity > 4) verdict = "STUFFING_HIGH";
  else if (totalPrimaryDensity > 3) verdict = "STUFFING_WARN";
  else if (totalPrimaryDensity < 0.3) verdict = "UNDER_OPTIMIZED";

  return {
    route: p.route,
    file: p.file,
    totalLength: totalLen,
    keywords: perKw,
    primaryDensity: +totalPrimaryDensity.toFixed(2),
    verdict,
  };
}

const results = PAGES.map(evaluatePage);

const outDir = path.join(ROOT, "scripts");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "keyword-report.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2)
);

// 콘솔 표
const COL_ROUTE = 12;
const COL_LEN = 8;
const COL_PRI = 10;
const COL_VER = 18;

function pad(s, n) {
  const str = String(s);
  if (str.length >= n) return str.slice(0, n);
  return str + " ".repeat(n - str.length);
}

console.log(
  pad("ROUTE", COL_ROUTE) +
    pad("LEN", COL_LEN) +
    pad("PRI%", COL_PRI) +
    pad("VERDICT", COL_VER)
);
console.log("-".repeat(COL_ROUTE + COL_LEN + COL_PRI + COL_VER));
for (const r of results) {
  console.log(
    pad(r.route, COL_ROUTE) +
      pad(r.totalLength, COL_LEN) +
      pad(r.primaryDensity + "%", COL_PRI) +
      pad(r.verdict, COL_VER)
  );
}

const warns = results.filter((r) => r.verdict !== "OK");
if (warns.length === 0) {
  console.log("\n[OK] 모든 페이지 키워드 밀도 정상 범위.");
} else {
  console.log(`\n[WARN] ${warns.length}개 페이지 조정 필요:`);
  for (const w of warns) {
    console.log(`  - ${w.route}: ${w.verdict} (primary ${w.primaryDensity}%)`);
  }
}

// 종합 키워드 상세 카운트도 출력
console.log("\n[키워드별 빈도]");
for (const r of results) {
  const parts = KEYWORDS.map((k) => `${k}=${r.keywords[k].count}`).join("  ");
  console.log(`${r.route}\n  ${parts}`);
}
