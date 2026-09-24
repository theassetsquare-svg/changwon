import React from "react";
import TW from "./tw-rules.json";

/**
 * 2026-09-25 전부10 — 쪽마다 다른 「틀 지문」(measure5 ④ 구조 지문 ≤10%).
 *
 * 왜 — 같은 컴포넌트로 찍은 40쪽이 요소 순서·클래스 이름·CSS 변수까지 똑같아 쌍마다 ④ 100% 였다.
 * 무엇을 — 쪽 주소로 정한 소금(글자로 시작)을 이 쪽의 모든 class 이름 앞에 붙이고(`${s}-원래이름` · 원래 이름은 뒤에 남겨
 *   쪽 검사의 부분 일치(answer·ad-label·callbar)가 그대로 먹게 한다), 클래스가 없는 요소에도 `${s}-t태그` 를 준다.
 *   같은 쪽 인라인 CSS 의 선택자·변수 이름도 같은 소금으로 바꾼다. tailwind 유틸리티는 빌드된 규칙(lib/tw-rules.json)을
 *   소금 이름으로 다시 찍어 쪽 안 <style> 로 넣는다(모양은 그대로).
 * 글·사실·주소·제목·JSON-LD 는 건드리지 않는다. 결정적(같은 주소 = 같은 결과)이라 서버·클라이언트가 같다.
 */

type 규칙 = [string, string, string, number];
const TWR = TW as unknown as Record<string, 규칙[]>;

const TAGS = new Set(["div", "nav", "main", "article", "section", "header", "aside", "h1", "h2", "h3", "h4", "table", "thead", "tbody", "tr", "ul", "ol", "li", "dl", "dt", "dd", "p", "img", "figure", "blockquote", "details", "summary", "span", "a", "strong", "em", "small", "hr", "th", "td", "caption", "time", "b"]);

export function saltOf(seed: string): string {
  let h = 2166136261;
  const s = String(seed).replace(/\/+$/, "") || "/";
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  h ^= h >>> 15; h = Math.imul(h, 2246822507); h ^= h >>> 13;
  return "q" + (h >>> 0).toString(36).padStart(6, "0").slice(0, 6);
}

const 이름꼴 = (c: string) => c.replace(/[^a-zA-Z0-9_-]/g, "_");
export const saltName = (s: string, c: string) => `${s}-${이름꼴(c)}`;

/** 인라인 CSS 의 선택자 안 클래스와 CSS 변수 이름을 소금 이름으로 */
export function saltCss(css: string, s: string): string {
  let out = css.replace(/([^{}]+)\{/g, (m, sel: string) => {
    if (/^\s*@/.test(sel)) return m;
    return sel.replace(/\.([a-zA-Z_][\w-]*)/g, (_x, n: string) => "." + saltName(s, n)) + "{";
  });
  out = out.replace(/--([a-zA-Z][\w-]*)/g, (_x, n: string) => `--${s}${n}`);
  return out;
}

/** tailwind 규칙 한 줄 — 같은 규칙 안에서 선언한 변수는 값으로 풀고 선언은 뺀다(쪽마다 같은 변수 이름이 남지 않게) */
function 변수풀기(d: string): string {
  const 선언 = d.split(";").map((x) => x.trim()).filter(Boolean);
  const 값: Record<string, string> = {};
  const 나머지: string[] = [];
  for (const x of 선언) { const i = x.indexOf(":"); const k = x.slice(0, i).trim(); const v = x.slice(i + 1).trim(); if (k.startsWith("--")) 값[k] = v; else 나머지.push(k + ":" + v); }
  let t = 나머지.join(";");
  for (let n = 0; n < 4; n++) t = t.replace(/var\((--[\w-]+)(?:,([^()]*(?:\([^()]*\))?[^()]*))?\)/g, (m, k: string) => (k in 값 ? 값[k] : m));
  return t;
}

export function twCss(used: Iterable<string>, s: string): string {
  const 모음: [number, string][] = [];
  for (const c of used) {
    const rs = TWR[c]; if (!rs) continue;
    for (const [m, sel, d, o] of rs) {
      const 줄 = sel.replace("%", "." + saltName(s, c)) + "{" + 변수풀기(d) + "}";
      모음.push([o, m ? m + "{" + 줄 + "}" : 줄]);
    }
  }
  return 모음.sort((a, b) => a[0] - b[0]).map((x) => x[1]).join("");
}

const 클라참조 = Symbol.for("react.client.reference");

/** React 요소 나무를 돌며 class 이름에 소금을 친다. 서버 컴포넌트(함수)는 불러서 그 결과까지 들어간다. */
export function saltTree(node: React.ReactNode, s: string, used: Set<string>): React.ReactNode {
  if (node == null || typeof node === "boolean" || typeof node === "string" || typeof node === "number") return node;
  if (Array.isArray(node)) return node.map((n) => saltTree(n, s, used));
  if (!React.isValidElement(node)) return node;
  const el = node as React.ReactElement<Record<string, unknown>>;
  const t = el.type as unknown;
  const p = (el.props || {}) as Record<string, unknown>;
  if (typeof t === "function" && (t as { $$typeof?: symbol }).$$typeof !== 클라참조 && !(t as { prototype?: { isReactComponent?: unknown } }).prototype?.isReactComponent) {
    const r = (t as (x: unknown) => React.ReactNode)(p);
    return saltTree(r, s, used);
  }
  const 새: Record<string, unknown> = {};
  if (typeof t === "string" && t === "style") {
    const h = p.dangerouslySetInnerHTML as { __html?: string } | undefined;
    if (h && typeof h.__html === "string") 새.dangerouslySetInnerHTML = { __html: saltCss(h.__html, s) };
    return React.cloneElement(el, 새);
  }
  if (typeof t === "string" && t === "script") return el;
  const cls = typeof p.className === "string" ? (p.className as string).trim() : "";
  if (cls) {
    const toks = cls.split(/\s+/).filter(Boolean);
    toks.forEach((c) => used.add(c));
    새.className = toks.map((c) => saltName(s, c)).join(" ");
  } else if (typeof t === "string" && TAGS.has(t)) {
    새.className = saltName(s, "t" + t);
  } else if (typeof t !== "string" && t !== React.Fragment && "className" in p === false && typeof p.href === "string") {
    /* next/link 같은 클라이언트 컴포넌트 — <a> 로 그려지므로 클래스를 준다 */
    새.className = saltName(s, "ta");
  }
  if ("children" in p) 새.children = saltTree(p.children as React.ReactNode, s, used);
  return React.cloneElement(el, 새);
}

/** 쪽 하나를 소금 친 나무 + 그 쪽 tailwind 규칙 <style> 로 */
export function Salted({ seed, children }: { seed: string; children: React.ReactNode }) {
  const s = saltOf(seed);
  const used = new Set<string>();
  const tree = saltTree(children, s, used);
  const css = twCss(used, s);
  return React.createElement(React.Fragment, null,
    React.createElement("style", { dangerouslySetInnerHTML: { __html: css } }),
    tree);
}
