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
      n.href === "/" || n.href === "/news" || n.href === "/event-1/"
        ? "daily"
        : n.href === "/faq" || n.href === "/price" || n.href === "/reserve-1/"
          ? "weekly"
          : "monthly",
    priority:
      n.href === "/"
        ? 1
        : n.href === "/reserve-1/" ||
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

  return [
    ...core,
    ...nightHub,
    ...adVenues,
    ...hallHub,
    ...hallVenues,
  ];
}
