import type { MetadataRoute } from "next";
import { NAV, SITE } from "@/lib/site";
import { VENUES, venuePath } from "@/lib/venues";

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
            n.href === "/jjanggu" ||
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

  const venues: MetadataRoute.Sitemap = VENUES.map((v) => ({
    url: `${SITE.url}${venuePath(v.slug)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...core, ...nightHub, ...venues];
}
