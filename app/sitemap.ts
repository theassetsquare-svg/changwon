import type { MetadataRoute } from "next";
import { NAV, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return NAV.map((n) => ({
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
}
