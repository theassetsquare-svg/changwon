import type { MetadataRoute } from "next";
import { NAV, SITE } from "@/lib/site";
import { AD_VENUES } from "@/lib/adnight-data";
import { nightPath } from "@/lib/adnight";
import { HALL_VENUES } from "@/lib/hall-data";
import { hallPath } from "@/lib/hall";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = NAV.map((n) => ({
    url: `${SITE.url}${n.href === "/" ? "" : n.href}`,
    lastModified: now,
    changeFrequency:
      n.href === "/" || n.href === "/news" || n.href === "/event"
        ? "daily"
        : n.href === "/faq" || n.href === "/price" || n.href === "/reserve"
          ? "weekly"
          : "monthly",
    priority:
      n.href === "/"
        ? 1
        : n.href === "/reserve" ||
            n.href === "/lotto" ||
            n.href === "/price" ||
            n.href === "/location"
          ? 0.9
          : 0.7,
  }));

  /* ★ 목록 페이지 주소는 2026-08-22 주소교체 때 /night → /night-guide 로 옮겼는데
     이 sitemap 만 옛 주소를 계속 내보내고 있었다. 네이버가 그 주소를 저장했다가
     눌러 보면 404 가 나온다. 실제로 있는 주소(app/night-guide/page.tsx)로 맞춘다. */
  const nightHub: MetadataRoute.Sitemap = [
    {
      url: `${SITE.url}/night-guide`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // 전국 나이트 광고 페이지 13개 (append)
  const adVenues: MetadataRoute.Sitemap = AD_VENUES.map((v) => ({
    url: `${SITE.url}${nightPath(v.slug)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 전국 나이트 홀 도감 — 허브 1 + 업소 40
  /* ★ 같은 이유 — /hall 은 app/hall-guide/page.tsx 로 옮겨졌다(2026-08-22). */
  const hallHub: MetadataRoute.Sitemap = [
    {
      url: `${SITE.url}/hall-guide`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const hallVenues: MetadataRoute.Sitemap = HALL_VENUES.map((v) => ({
    url: `${SITE.url}${hallPath(v.slug)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  /* ★ 2026-08-27 — 홈 푸터에서 이어지는 건전한 지역 안내 페이지.
     public/business-district/index.html 로 만들어 두었고 사이트맵에도 실어야 색인 대상이 된다. */
  const areaGuide: MetadataRoute.Sitemap = [
    {
      /* ★ 2026-08-31 — 실제 파일은 public/area/business-district/index.html 이다.
         사이트맵이 /business-district/ 를 가리켜 같은 글이 주소 2개로 잡히고 있었다(중복 문서).
         홈 푸터 링크와 같은 /area/business-district/ 하나로 맞춘다. */
      url: `${SITE.url}/area/business-district/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  /* ★ 2026-08-28 — 색인 실험용 페이지. public/ulsan-champion-night-2.html 로 두었다.
     이 사이트는 끝 슬래시가 없는 형태가 200 이라 그대로 적는다. */
  const indexTest: MetadataRoute.Sitemap = [
    "/night-guide/ulsan-champion-night-1",
    "/night-guide/changwon-lululala-night-1",
    "/night-guide/bulgwang-hobak-night-1",
    "/night-guide/cheongdam-night-1",
    "/night-guide/daejeon-seven-night-1",
    "/night-guide/dapsimni-miracle-night-1",
    "/night-guide/busan-asiad-night-1",
    "/night-guide/ulsan-champion-night-2/",
    "/night-guide/sillim-grandprix-night-2/",
  ].map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  /* ★ 2026-08-31 — 이 사이트를 슬래시 정본으로 바꿨다(next.config.mjs trailingSlash: true).
     네이버가 색인한 주소가 /faq/ /vip/ /news/ /price/ /event/ 처럼 슬래시형인데
     사이트가 308 로 슬래시를 떼어내고 있었다(색인 주소가 리디렉션 = 0순위 규칙 위반).
     사이트맵도 슬래시형으로 통일한다 — 사이트맵과 실제 200 주소가 어긋나면
     수집 예산만 버리고 색인이 되지 않는다. */
  const 슬래시로 = (목록: MetadataRoute.Sitemap): MetadataRoute.Sitemap =>
    목록.map((x) => {
      const u = new URL(x.url);
      if (u.pathname.endsWith("/")) return x;
      /* 파일 이름처럼 확장자가 붙은 주소(예: /llms.txt)는 그대로 둔다.
         정규식을 쓰지 않는다 — 점을 이스케이프하다 아무 주소나 걸리는 사고가 났었다. */
      const 끝조각 = u.pathname.split("/").pop() || "";
      if (끝조각.includes(".")) return x;
      u.pathname = u.pathname + "/";
      return { ...x, url: u.toString() };
    });

  return 슬래시로([
    ...core,
    ...areaGuide,
    ...nightHub,
    ...adVenues,
    ...hallHub,
    ...hallVenues,
    ...indexTest,
  ]);
}
