import { PLACEHOLDERS, SITE } from "@/lib/site";

export default function JsonLd() {
  const business = {
    "@context": "https://schema.org",
    "@type": "NightClub",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    alternateName: ["창원 룰루랄라", "룰루랄라 나이트", "창원 짱구 나이트"],
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phoneIntl,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: "KR",
      streetAddress: PLACEHOLDERS.address,
    },
    areaServed: { "@type": "City", name: SITE.city },
    smokingAllowed: false,
    publicAccess: true,
    isAccessibleForFree: false,
    employee: { "@id": `${SITE.url}/#jjanggu` },
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/#jjanggu`,
    name: SITE.manager,
    jobTitle: "매니저",
    telephone: SITE.phoneIntl,
    worksFor: { "@id": `${SITE.url}/#business` },
    url: `${SITE.url}/jjanggu`,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    inLanguage: "ko-KR",
    publisher: { "@id": `${SITE.url}/#business` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
