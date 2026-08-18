"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

/**
 * 홈(`/`)은 '창원에서 성공하는 방법' 글 하나만 보여주는 페이지다.
 * 카테고리 메뉴(헤더)·푸터·연락처가 글을 가리지 않도록 홈에서만 걷어낸다.
 * 나머지 페이지는 기존과 동일하게 헤더·푸터를 그대로 쓴다.
 */
export function SiteHeader() {
  return usePathname() === "/" ? null : <Header />;
}

export function SiteFooter() {
  return usePathname() === "/" ? null : <Footer />;
}
