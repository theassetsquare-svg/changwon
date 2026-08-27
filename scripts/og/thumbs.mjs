#!/usr/bin/env node
// 전 페이지 썸네일 생성기 — public/og/{슬러그}.png (1200x1200 PNG)
//
// [내용 규칙 — 이 사이트에 이미 있던 것을 그대로 쓴다. 변경 금지]
//
//   A. 창원 본 사이트 카드 (홈 + 14페이지 + 허브)
//      app/opengraph-image.tsx 와 같은 화면.
//      버건디 단색 배경, 금색 "창원룰루랄라나이트", 금색 박스 "로또",
//      가장 큰 글자 = 전화번호, 아래 주소 한 줄 + 연령 안내 한 줄.
//
//   B. 업소 카드 (홀 도감 40 + 예약 안내 12 + 광고 13)
//      public/og/*-og.png 와 같은 화면.
//      업소 고유색 배경, 가장 큰 글자 = 업소명(붙여쓰기), 그 아래 지역명.
//      담당자 전화가 있으면 하단에 검은 띠 + 담당자명 + 전화번호(두 번째로 큰 글자),
//      없으면 같은 배경에 "나이트클럽 안내" 한 줄만 넣는다.
//      ※ 다른 업소 카드에는 "창원 룰루랄라 나이트" 문구를 절대 넣지 않는다.
//        (창원 카드 A 에만 들어간다)
//      연령 기준이 확인된 곳만 우상단에 흰 알약으로 표시.
//
// 사용: node scripts/og/thumbs.mjs [--only=슬러그,슬러그]

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ImageResponse } from "next/dist/compiled/@vercel/og/index.node.js";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const OUT_DIR = path.join(ROOT, "public/og");
const FONT_DIR = path.join(ROOT, "node_modules/.cache/og-fonts");

const BURGUNDY = "#2A0A12";
const GOLD = "#E8C766";

// ─────────────────────────── 폰트 ───────────────────────────
// @vercel/og 기본 번들에는 라틴 글꼴만 있다. 한글 볼드를 직접 실어야
// 기존 카드와 같은 굵기가 나온다. 받은 파일은 캐시에 두고 재사용한다.
const FONTS = [
  { name: "NotoSansKR", weight: 400, css: "wght@400" },
  { name: "NotoSansKR", weight: 700, css: "wght@700" },
  { name: "NotoSansKR", weight: 900, css: "wght@900" },
];

async function loadFonts() {
  fs.mkdirSync(FONT_DIR, { recursive: true });
  const out = [];
  for (const f of FONTS) {
    const cached = path.join(FONT_DIR, `notosanskr-${f.weight}.ttf`);
    if (!fs.existsSync(cached)) {
      const css = await fetch(
        `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:${f.css}&display=swap`,
        { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } },
      ).then((r) => r.text());
      const url = css.match(/https:\/\/[^)]+\.ttf/)?.[0];
      if (!url) throw new Error(`폰트 URL 을 찾지 못했습니다 (weight ${f.weight})`);
      const buf = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
      fs.writeFileSync(cached, buf);
    }
    out.push({ name: f.name, weight: f.weight, style: "normal", data: fs.readFileSync(cached) });
  }
  return out;
}

// ─────────────────────────── 데이터 로드 ───────────────────────────
async function loadTs(rel) {
  const src = fs
    .readFileSync(path.join(ROOT, rel), "utf8")
    .replace(/^import[^\n]*\n/gm, "");
  const js = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ESNext },
  }).outputText;
  return import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));
}

// ─────────────────────────── 카드 A: 창원 본 사이트 ───────────────────────────
const el = (type, style, children) => ({ type, props: { style, children } });
const row = (style, children) => el("div", { display: "flex", ...style }, children);

function cardChangwon({ lotto, phone }) {
  return row(
    {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: BURGUNDY,
      color: "#FFFFFF",
      padding: 48,
      fontFamily: "NotoSansKR",
    },
    [
      row({ fontSize: 40, color: GOLD, letterSpacing: 6, marginBottom: 16, fontWeight: 400 }, "창원룰루랄라나이트"),
      row(
        {
          paddingLeft: 60,
          paddingRight: 60,
          paddingTop: 12,
          paddingBottom: 20,
          background: GOLD,
          color: BURGUNDY,
          fontSize: 132,
          fontWeight: 900,
          letterSpacing: 6,
        },
        lotto,
      ),
      // 썸네일에서 가장 큰 요소 = 전화번호
      row({ marginTop: 36, fontSize: 148, fontWeight: 900, color: "#FFFFFF", letterSpacing: 2 }, phone),
      row({ marginTop: 40, fontSize: 38, fontWeight: 700, color: GOLD }, "상남동 22-4 지하 3층 · 홀 한 바퀴"),
      row({ marginTop: 26, fontSize: 28, color: "#C9AFA8", fontWeight: 400 }, "27세 이상 출입 가능한 합법 영업장 · 신분증 확인"),
    ],
  );
}

// ─────────────────────────── 카드 B: 업소 ───────────────────────────
/** 업소명이 길면 두 줄로 접는다. "…나이트" 앞에서 끊는 게 기존 카드와 같다 */
function splitVenueName(name) {
  if (name.length <= 7) return [name];
  const i = name.lastIndexOf("나이트");
  if (i > 0) return [name.slice(0, i), name.slice(i)];
  const mid = Math.ceil(name.length / 2);
  return [name.slice(0, mid), name.slice(mid)];
}

function nameFontSize(lines) {
  const longest = Math.max(...lines.map((l) => l.length));
  if (longest <= 5) return 190;
  if (longest <= 6) return 165;
  if (longest <= 7) return 145;
  if (longest <= 8) return 128;
  return 112;
}

function cardVenue({ bg, fg, name, area, contactName, phone, ageFull }) {
  const lines = splitVenueName(name);
  const size = nameFontSize(lines);
  const hasPhone = Boolean(contactName && phone);

  const topZone = row(
    {
      position: "relative",
      width: "100%",
      height: hasPhone ? 717 : 717,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: bg,
      color: fg,
      paddingLeft: 60,
      paddingRight: 60,
    },
    [
      ...(ageFull
        ? [
            row(
              {
                position: "absolute",
                top: 56,
                right: 56,
                background: "#FFFFFF",
                color: bg,
                fontSize: 42,
                fontWeight: 700,
                paddingLeft: 34,
                paddingRight: 34,
                paddingTop: 12,
                paddingBottom: 16,
                borderRadius: 999,
              },
              ageFull,
            ),
          ]
        : []),
      // 가장 큰 글자 = 업소명
      row({ flexDirection: "column", alignItems: "center", marginTop: ageFull ? 40 : 0 },
        lines.map((l, i) =>
          row({ fontSize: size, fontWeight: 900, lineHeight: 1.12, color: fg, key: String(i) }, l),
        ),
      ),
      row({ position: "absolute", bottom: 34, fontSize: 36, fontWeight: 700, color: fg }, area),
    ],
  );

  const bottomZone = hasPhone
    ? row(
        {
          width: "100%",
          height: 483,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          color: "#FFFFFF",
        },
        [
          row({ fontSize: 66, fontWeight: 700 }, contactName),
          row({ marginTop: 18, fontSize: 112, fontWeight: 900, letterSpacing: 2 }, phone),
        ],
      )
    : row(
        {
          width: "100%",
          height: 483,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: bg,
          color: fg,
        },
        [
          row({ fontSize: 72, fontWeight: 900 }, "나이트클럽 안내"),
        ],
      );

  return row(
    { width: "100%", height: "100%", flexDirection: "column", fontFamily: "NotoSansKR" },
    [topZone, bottomZone],
  );
}

// ─────────────────────────── 페이지 목록 ───────────────────────────
async function buildRegistry() {
  const site = await loadTs("lib/site.ts");
  const adMod = await loadTs("lib/adnight-data.ts");
  const hallMods = fs
    .readdirSync(path.join(ROOT, "lib/hall"))
    .filter((f) => f.endsWith(".ts"))
    .sort();

  const SITE = site.SITE;
  const pages = [];

  /* ★ lib/og.ts 의 ogSlug() 와 글자 하나까지 같아야 한다.
     예전에는 여기만 **끝의 "/" 를 떼지 않아** "/night-guide/" 가 "night-guide-" 가 됐다.
     사이트는 "night-guide.png" 를 부르는데 생성기는 "night-guide-.png" 를 만들어
     허브 두 페이지의 썸네일이 계속 404 였다(2026-08-24 확인). */
  const ogSlug = (p) => {
    const s = p.replace(/\/+$/, "");
    if (s === "" || s === "/") return "home";
    return s.replace(/^\//, "").replace(/\//g, "-");
  };

  // A. 창원 본 사이트 — 홈 + 13페이지 + 허브 2개
  const changwonPaths = [
    ...site.NAV.map((n) => n.href),
    "/night-guide/",
    "/hall-guide/",
  ];
  for (const p of changwonPaths) {
    pages.push({
      route: p,
      slug: ogSlug(p),
      kind: "changwon",
      spec: { lotto: SITE.lotto, phone: SITE.lottoPhoneDash },
    });
  }

  // B-2. 광고 페이지 13개
  //   ★ 2026-08-24 수정 — 예전에는 "담당자 전화가 있으면 기존 파일이 이미 맞다"고 보고
  //     복사만 했다. 그러면 **새로 넣은 광고주**의 번호가 카드에 안 들어간다
  //     (부산아시아드에 새우깡 010-3614-1056 을 넣었을 때 실제로 옛 카드가 그대로 나왔다).
  //     카드는 언제나 데이터에서 다시 그린다. 데이터가 유일한 기준이다.
  //   전화가 없는 카드는 옛 파일에 "창원 룰루랄라 나이트" 문구가 박혀 있으므로 반드시 다시 그린다.
  //   {slug}-og.png 원본도 항상 같이 갱신한다.
  for (const v of adMod.AD_VENUES) {
    pages.push({
      route: `/night/${v.slug}`,
      slug: ogSlug(`/night/${v.slug}`),
      kind: "venue",
      from: path.join(OUT_DIR, `${v.slug}-og.png`),
      alsoWrite: path.join(OUT_DIR, `${v.slug}-og.png`),
      ogV: v.ogV,
      spec: {
        bg: v.ogBg,
        fg: v.ogFg,
        name: v.keyword,
        area: v.areaLabel,
        contactName: v.phone ? v.contactName : undefined,
        phone: v.phone,
        ageFull: v.ageFull,
      },
    });
  }

  // B-3. 홀 도감 40개 — 홀 페이지 스킨색(버건디+금색)을 쓴다
  for (const f of hallMods) {
    const mod = await loadTs(`lib/hall/${f}`);
    const arr = Object.values(mod).find(Array.isArray);
    for (const v of arr) {
      pages.push({
        route: `/hall/${v.slug}`,
        slug: ogSlug(`/hall/${v.slug}`),
        kind: "venue",
        ogV: v.ogV,
        spec: {
          bg: BURGUNDY,
          fg: GOLD,
          name: v.keyword,
          area: v.areaLabel,
          contactName: v.phone ? v.contactName : undefined,
          phone: v.phone,
          ageFull: v.ageFull,
        },
      });
    }
  }

  return pages;
}

// ─────────────────────────── 실행 ───────────────────────────
const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const only = onlyArg ? new Set(onlyArg.slice(7).split(",")) : null;

const fonts = await loadFonts();
const pages = await buildRegistry();
fs.mkdirSync(OUT_DIR, { recursive: true });

let made = 0;
let copied = 0;
for (const p of pages) {
  if (only && !only.has(p.slug)) continue;
  const dest = path.join(OUT_DIR, `${p.slug}.png`);

  if (p.kind === "copy" && fs.existsSync(p.from)) {
    fs.copyFileSync(p.from, dest);
    copied++;
    continue;
  }

  const node = p.kind === "changwon" ? cardChangwon(p.spec) : cardVenue(p.spec);
  const res = new ImageResponse(node, { width: 1200, height: 1200, fonts });
  const png = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, png);
  if (p.alsoWrite) fs.writeFileSync(p.alsoWrite, png);
  /* ★ 2026-08-25 — 판 번호(ogV) 파일도 여기서 같이 만든다.
     페이지는 thumb({v: ogV}) 로 /og/<슬러그><판번호>.png 를 부르는데,
     예전에는 생성기가 그 파일을 만들지 않아 **손으로 복사해 둔 옛 그림**이 그대로 나갔다.
     그러면 데이터를 고쳐도 카드가 안 바뀐다(대전세븐 -v2 가 그 상태였다). */
  if (p.ogV) fs.writeFileSync(path.join(OUT_DIR, `${p.slug}${p.ogV}.png`), png);
  made++;
}

console.log(`썸네일 ${made}개 생성 · ${copied}개 기존 파일 복사 · 총 ${pages.length}개 페이지`);
fs.writeFileSync(
  path.join(ROOT, "scripts/og/registry.json"),
  JSON.stringify(pages.map(({ route, slug, kind }) => ({ route, slug, kind })), null, 1),
);
