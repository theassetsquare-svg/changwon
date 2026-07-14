import { NAV, PAGE_META, SITE } from "@/lib/site";

export const dynamic = "force-static";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const now = new Date().toUTCString();
  const items = NAV.map((n) => {
    const url = `${SITE.url}${n.href === "/" ? "" : n.href}`;
    const meta = PAGE_META[n.href];
    const title = meta?.title ?? `${SITE.name} ${n.label}`;
    const description = meta?.description ?? SITE.description;
    return `    <item>
      <title>${esc(title)}</title>
      <link>${esc(url)}</link>
      <guid isPermaLink="true">${esc(url)}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${now}</pubDate>
      <category>창원 룰루랄라 나이트</category>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(SITE.name)}</title>
    <link>${esc(SITE.url)}</link>
    <atom:link href="${esc(SITE.url)}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${esc(SITE.description)}</description>
    <language>ko-KR</language>
    <copyright>© ${new Date().getFullYear()} ${esc(SITE.name)}</copyright>
    <managingEditor>noreply@${SITE.domain} (매니저)</managingEditor>
    <webMaster>noreply@${SITE.domain} (매니저)</webMaster>
    <lastBuildDate>${now}</lastBuildDate>
    <pubDate>${now}</pubDate>
    <ttl>1440</ttl>
    <generator>Next.js</generator>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
