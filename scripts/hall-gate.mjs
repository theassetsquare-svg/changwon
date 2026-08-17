#!/usr/bin/env node
// 홀 도감 40 + 허브 게이트 (G1~G11)
// 빌드 산출물(out/)을 직접 읽어 검사한다. 사용: node scripts/hall-gate.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "out");

// 전화번호 허용표 — 이 외의 010 번호가 홀 페이지에 있으면 실패
const PHONE_TABLE = {
  "changwon-lululala": "010-7528-4936",
  "ulsan-champion": "010-5653-0069",
  "bulgwang-hobak": "010-2221-1937",
};
const KAKAO = "besta12";

const files = fs
  .readdirSync(path.join(OUT, "hall"))
  .filter((f) => f.endsWith(".html"));
const slugs = files.map((f) => f.replace(/\.html$/, ""));

const fails = [];
const warn = (g, slug, msg) => fails.push(`${g} · ${slug} — ${msg}`);

const readPage = (p) => fs.readFileSync(p, "utf8");
const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ");

/**
 * 검사 대상은 홀 도감 본문(.hall 래퍼)과 고정바까지다.
 * 공통 헤더(창원 14페이지 메뉴)·푸터·사이트 공통 JSON-LD 는 이 섹션 소유가
 * 아니므로 본문 게이트에서 제외한다. 전화번호 게이트도 같은 기준을 쓴다.
 */
const hallBody = (html) => {
  const start = html.indexOf('<div class="hall">');
  const end = html.lastIndexOf("</main>");
  const body = start >= 0 && end > start ? html.slice(start, end) : "";
  const bar = html.match(/<div class="hallbar"[\s\S]*?<\/div>/)?.[0] ?? "";
  return body + bar;
};

/** 페이지 안의 모든 JSON-LD 를 파싱해 배열로 준다 */
const allJsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((m) => {
      try {
        return JSON.parse(m[1]);
      } catch {
        return null;
      }
    });

/** og:image:alt · twitter 계열 등 메타 태그 값 */
const metaValues = (html) =>
  [...html.matchAll(/<meta[^>]+content="([^"]*)"/g)].map((m) => m[1]).join(" ");

// ── G1 : 페이지 수 ─────────────────────────────────────────
if (slugs.length !== 40) {
  fails.push(`G1 · hall — 페이지 40개가 아니라 ${slugs.length}개`);
}
if (!fs.existsSync(path.join(OUT, "hall.html"))) {
  fails.push("G1 · hub — /hall 허브 산출물 없음");
}

const titles = new Map();
const jsonLdBySlug = new Map();

for (const slug of slugs) {
  const html = readPage(path.join(OUT, "hall", `${slug}.html`));
  const body = hallBody(html);
  const text = strip(body);
  if (!body) warn("G1", slug, ".hall 본문 래퍼를 찾지 못함");

  // ── G2 : title 20~30자 · 전부 다름 · 가게이름 맨 앞 ──────
  const t = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const titleLen = [...t].length;
  if (titleLen < 20 || titleLen > 30) {
    warn("G2", slug, `title ${titleLen}자 (20~30 밖): "${t}"`);
  }
  if (titles.has(t)) warn("G2", slug, `title 중복: ${titles.get(t)} 와 동일`);
  titles.set(t, slug);
  const kw = t.split(",")[0].trim();
  if (!t.startsWith(kw) || kw.length < 4) {
    warn("G2", slug, `제목 맨 앞이 가게이름이 아님: "${t}"`);
  }

  // ── G3 : description 존재 · 키워드 맨 앞 · 60~160자 ──────
  const d =
    html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  const dLen = [...d].length;
  if (dLen < 60 || dLen > 200) warn("G3", slug, `description ${dLen}자`);
  if (!d.startsWith(kw)) warn("G3", slug, "description 맨 앞이 키워드가 아님");

  // ── G4 : canonical ─────────────────────────────────────
  const canon = html.match(
    /<link rel="canonical" href="([^"]*)"/
  )?.[1];
  if (canon !== `https://changwon.pages.dev/hall/${slug}`) {
    warn("G4", slug, `canonical 불일치: ${canon}`);
  }

  // ── G5 : JSON-LD 유효 + FAQPage 3문항 ───────────────────
  const blocks = allJsonLd(html);
  if (blocks.some((b) => b === null)) warn("G5", slug, "JSON-LD 파싱 실패");
  const nodes = blocks.filter(Boolean).flatMap((b) => b["@graph"] ?? [b]);
  jsonLdBySlug.set(slug, nodes);

  const faq = nodes.find(
    (n) => n["@type"] === "FAQPage" && String(n["@id"]).includes(`/hall/${slug}`)
  );
  if (!faq) warn("G5", slug, "FAQPage 없음");
  else if (faq.mainEntity.length !== 3)
    warn("G5", slug, `FAQ ${faq.mainEntity.length}개 (3개여야 함)`);
  else {
    // 답변이 실제 화면에도 보이는지
    for (const q of faq.mainEntity) {
      const a = q.acceptedAnswer.text;
      if (!text.includes(a.slice(0, 25))) {
        warn("G5", slug, `FAQ 답변이 본문에 없음: ${q.name}`);
      }
    }
  }
  if (!nodes.some((n) => String(n["@id"]).includes(`/hall/${slug}#breadcrumb`)))
    warn("G5", slug, "BreadcrumbList 없음");
  if (!nodes.some((n) => String(n["@id"]).includes(`/hall/${slug}#hall`)))
    warn("G5", slug, "NightClub 없음");
  if (!nodes.some((n) => String(n["@id"]).includes(`/hall/${slug}#article`)))
    warn("G5", slug, "Article 없음");

  // ── G6 : 공간 소제목 4~6 · 질문형 2 이상 ────────────────
  const h2s = [...body.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) =>
    strip(m[1]).trim()
  );
  // 사실 표 / 마무리 / FAQ / 이용안내 헤딩을 뺀 공간 소제목만 센다
  const zoneH2 = h2s.filter(
    (h) =>
      !h.includes("확인된 사실") &&
      !h.includes("자주 묻는 질문") &&
      !h.includes("이용 안내") &&
      !h.includes("그래서 답은")
  );
  if (zoneH2.length < 4 || zoneH2.length > 6) {
    warn("G6", slug, `공간 소제목 ${zoneH2.length}개 (4~6 밖)`);
  }
  const questionH2 = zoneH2.filter((h) => h.trim().endsWith("?"));
  if (questionH2.length < 2) {
    warn("G6", slug, `질문형 H2 ${questionH2.length}개 (2개 이상 필요)`);
  }

  // ── G7 : 구조 필수 블록 ────────────────────────────────
  if (!text.includes("핵심 3줄")) warn("G7", slug, "핵심 3줄 직답 박스 없음");
  if (!text.includes("확인된 사실")) warn("G7", slug, "사실 표 없음");
  if (!text.includes("한 줄 정리")) warn("G7", slug, "한 줄 정리 없음");
  if (!text.includes("그래서 답은")) warn("G7", slug, "제목의 답 섹션 없음");

  // ── G8 : 지어낸 데이터 금지 ────────────────────────────
  for (const bad of ["별점", "평점", "후기 ", "할인율", "만원", "원부터"]) {
    if (text.includes(bad)) warn("G8", slug, `금지 표현 노출: ${bad}`);
  }

  // ── G9 : 내부 링크 (허브 + 홈 + 관련 3개 이상) ──────────
  if (!body.includes('href="/hall"')) warn("G9", slug, "허브 링크 없음");
  if (!body.includes('href="/"')) warn("G9", slug, "홈 링크 없음");
  const rel = [...body.matchAll(/href="\/hall\/([a-z0-9-]+)"/g)].map(
    (m) => m[1]
  );
  const uniqRel = new Set(rel.filter((r) => r !== slug));
  if (uniqRel.size < 3) warn("G9", slug, `관련 홀 링크 ${uniqRel.size}개`);

  // ── G10 : 전화번호 허용표 ──────────────────────────────
  // 본문 + 고정바 + 이 페이지 소유 JSON-LD + 메타 태그를 함께 본다.
  const ownLd = JSON.stringify(
    nodes.filter((n) => String(n["@id"]).includes(`/hall/${slug}`))
  );
  const phoneScope = body + " " + ownLd + " " + metaValues(html);
  const phones = new Set(
    [...phoneScope.matchAll(/010[-\s]?\d{4}[-\s]?\d{4}/g)].map((m) =>
      m[0].replace(/[\s-]/g, "")
    )
  );
  const allowed = PHONE_TABLE[slug];
  for (const p of phones) {
    if (!allowed || p !== allowed.replace(/-/g, "")) {
      warn("G10", slug, `허용되지 않은 전화번호: ${p}`);
    }
  }
  if (allowed && !phones.has(allowed.replace(/-/g, ""))) {
    warn("G10", slug, `있어야 할 전화번호 없음: ${allowed}`);
  }
  if (!allowed && !body.includes(KAKAO)) {
    warn("G10", slug, `광고문의 카톡 ${KAKAO} 없음`);
  }

  // ── G11 : 성인 이용 안내 ───────────────────────────────
  if (!text.includes("신분증")) warn("G11", slug, "신분증 확인 안내 없음");
  if (!text.includes("이용 안내")) warn("G11", slug, "이용 안내 블록 없음");
}

// ── 허브 검사 ────────────────────────────────────────────
{
  const html = readPage(path.join(OUT, "hall.html"));
  const body = hallBody(html);
  const text = strip(body);
  if (!body.includes(KAKAO)) fails.push(`G10 · hub — 광고문의 카톡 없음`);
  const hubScope = body + " " + metaValues(html);
  if (/010[-\s]?\d{4}[-\s]?\d{4}/.test(hubScope))
    fails.push("G10 · hub — 허브에 전화번호가 노출됨");
  for (const slug of slugs) {
    if (!body.includes(`/hall/${slug}`))
      fails.push(`G9 · hub — ${slug} 링크 누락`);
  }
  if (!text.includes("전국 나이트 홀 도감 40"))
    fails.push("G7 · hub — 허브 제목 없음");
}

// ── 홈 검사 (규칙 8·9) ───────────────────────────────────
{
  const html = readPage(path.join(OUT, "index.html"));
  if (!html.includes("010-7528-4936"))
    fails.push("G10 · home — 로또 010-7528-4936 표기 없음");
  if (!html.includes("tel:01075284936"))
    fails.push("G10 · home — 로또 tel: 링크 없음");
  if (!html.includes('href="/hall"'))
    fails.push("G9 · home — 홀 도감 링크 없음");
  if (!strip(html).includes("홀 한 바퀴"))
    fails.push("G7 · home — '홀 한 바퀴' 랜딩 구성 아님");
}

// ── 사이트맵 검사 ────────────────────────────────────────
{
  const sm = readPage(path.join(OUT, "sitemap.xml"));
  if (!sm.includes("https://changwon.pages.dev/hall<"))
    fails.push("G1 · sitemap — /hall 허브 누락");
  for (const slug of slugs) {
    if (!sm.includes(`https://changwon.pages.dev/hall/${slug}<`))
      fails.push(`G1 · sitemap — /hall/${slug} 누락`);
  }
}

console.log(`[Hall Gate] 검사 대상 ${slugs.length}개 + 허브 + 홈\n`);
if (fails.length === 0) {
  console.log("[OK] G1~G11 전부 통과");
} else {
  console.log(`[FAIL] ${fails.length}건\n`);
  for (const f of fails) console.log("  " + f);
  process.exit(1);
}
