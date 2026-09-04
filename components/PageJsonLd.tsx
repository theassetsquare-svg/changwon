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
              name: "창원에서 성공하는 방법",
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
    author: { "@id": `${SITE.url}/#lotto` },
    publisher: { "@id": `${SITE.url}/#organization` },
    datePublished: SITE.founded + "-01-01",
    dateModified: SITE.lastModified,
    /* ★ 홈 순수성 (2026-08-31 대표님 지시)
       홈은 나이트와 상관없는 내용이어야 한다. SITE.keywords 에는 가게 이름이 들어 있으므로
       홈(pathname === "/")에서는 keywords 를 넣지 않는다. 다른 페이지는 그대로. */
    ...(pathname === "/" ? {} : { keywords: [...SITE.keywords].slice(0, 10).join(", ") }),
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
