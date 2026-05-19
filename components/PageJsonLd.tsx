import { NAV, PAGE_META, SITE } from "@/lib/site";

export default function PageJsonLd({ pathname }: { pathname: string }) {
  const meta = PAGE_META[pathname];
  if (!meta) return null;

  const navItem = NAV.find((n) => n.href === pathname);
  const pageUrl = `${SITE.url}${pathname === "/" ? "" : pathname}`;
  const label = navItem?.label ?? meta.title;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement:
      pathname === "/"
        ? [
            {
              "@type": "ListItem",
              position: 1,
              name: "홈",
              item: SITE.url,
            },
          ]
        : [
            {
              "@type": "ListItem",
              position: 1,
              name: "창원 룰루랄라 나이트",
              item: SITE.url,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: label,
              item: pageUrl,
            },
          ],
  };

  const article = {
    "@context": "https://schema.org",
    "@type": pathname === "/news" ? "NewsArticle" : "Article",
    "@id": `${pageUrl}#article`,
    mainEntityOfPage: pageUrl,
    headline: meta.title,
    description: meta.description,
    inLanguage: "ko-KR",
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#business` },
    author: { "@id": `${SITE.url}/#jjanggu` },
    publisher: { "@id": `${SITE.url}/#organization` },
    datePublished: SITE.founded + "-01-01",
    dateModified: SITE.lastModified,
    keywords: [...SITE.keywords].slice(0, 10).join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
    </>
  );
}
