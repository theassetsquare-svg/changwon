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

  const nightHub: MetadataRoute.Sitemap = [
    {
      url: `${SITE.url}/night`,
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
  const hallHub: MetadataRoute.Sitemap = [
    {
      url: `${SITE.url}/hall`,
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
