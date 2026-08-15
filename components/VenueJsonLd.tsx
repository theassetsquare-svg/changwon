import { SITE } from "@/lib/site";
import { type Venue, venuePath } from "@/lib/venues";

/**
 * 업소 페이지용 구조화 데이터.
 * - 이 사이트는 각 업소의 공식 사이트가 아니라 예약·문의 안내 페이지이므로
 *   LocalBusiness 를 페이지 주체로 선언하지 않고, WebPage 의 about 으로만 기술한다.
 * - 주소·영업시간·요금은 확인된 값이 없으므로 넣지 않는다 (지어내지 않음).
 */
export default function VenueJsonLd({ venue }: { venue: Venue }) {
  const url = `${SITE.url}${venuePath(venue.slug)}`;

  const contactPoint = {
    "@type": "ContactPoint",
    contactType: "reservations",
    name: venue.contactName,
    availableLanguage: "ko",
    ...(venue.phone
      ? { telephone: `+82-${venue.phone.replace(/^0/, "").replace(/-/g, "-")}` }
      : {}),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: SITE.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "전국 나이트 예약 문의",
            item: `${SITE.url}/night`,
          },
          { "@type": "ListItem", position: 3, name: venue.keyword, item: url },
        ],
      },
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: venue.title,
        description: venue.description,
        inLanguage: "ko-KR",
        isPartOf: { "@id": `${SITE.url}/#website` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        dateModified: SITE.lastModified,
        keywords: [venue.keyword, ...venue.aliases].join(", "),
        about: { "@id": `${url}#venue` },
        mainEntity: { "@id": `${url}#faq` },
        significantLink: `${SITE.url}/night`,
      },
      {
        "@type": "NightClub",
        "@id": `${url}#venue`,
        name: venue.spaced,
        alternateName: [venue.keyword, ...venue.aliases],
        address: {
          "@type": "PostalAddress",
          addressLocality: venue.locality,
          addressRegion: venue.region,
          addressCountry: "KR",
        },
        ...(venue.phone
          ? { telephone: `+82-${venue.phone.replace(/^0/, "")}` }
          : {}),
        contactPoint,
        publicAccess: true,
        smokingAllowed: false,
        isAccessibleForFree: false,
        description: venue.capsule,
        subjectOf: { "@id": url },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: "ko-KR",
        mainEntity: venue.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
