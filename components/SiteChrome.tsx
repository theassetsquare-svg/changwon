"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { Salted } from "@/lib/salt";

/**
 * 홈(`/`)은 '창원에서 성공하는 방법' 글 하나만 보여주는 페이지다.
 * 카테고리 메뉴(헤더)·푸터·연락처가 글을 가리지 않도록 홈에서만 걷어낸다.
 * 나머지 페이지는 기존과 동일하게 헤더·푸터를 그대로 쓴다.
 *
 * 2026-09-25 전부10 — 머리글·바닥글도 쪽마다 클래스 이름에 소금을 친다(lib/salt.ts).
 *   모든 쪽에 같은 클래스로 찍혀 ④ 구조 지문의 공통분이 됐다. 글자·링크·모양은 그대로다.
 * 2026-09-25 — 홈에는 바닥글이 없어 「광고문의 카톡 besta12」 줄이 0 이었다(대표님 지시 3절 「모든 단독 쪽 푸터」).
 *   홈 본문은 손대지 않고(0순위 4), 링크 없는 한 줄만 바닥에 둔다.
 */
export function SiteHeader() {
  const p = usePathname() || "/";
  return p === "/" ? null : <Salted seed={p + "#머리"}><Header /></Salted>;
}

export function SiteFooter() {
  const p = usePathname() || "/";
  if (p === "/") {
    return (
      <footer style={{ textAlign: "center", padding: "24px 16px 32px", fontSize: 14, color: "#9ca3af" }}>
        광고문의 카톡 besta12
      </footer>
    );
  }
  return <Salted seed={p + "#바닥"}><Footer /></Salted>;
}
