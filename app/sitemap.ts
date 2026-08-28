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
      url: `${SITE.url}/business-district/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  /* ★ 2026-08-28 — 색인 실험용 페이지. public/ulsan-champion-night-2.html 로 두었다.
     이 사이트는 끝 슬래시가 없는 형태가 200 이라 그대로 적는다. */
  const indexTest: MetadataRoute.Sitemap = [
    "/ulsan-champion-night-2",
    "/sillim-grandprix-night-2",
  ].map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    ...core,
    ...areaGuide,
    ...nightHub,
    ...adVenues,
    ...hallHub,
    ...hallVenues,
    ...indexTest,
  ];
}
