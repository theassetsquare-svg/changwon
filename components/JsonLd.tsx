import { PLACEHOLDERS, SITE } from "@/lib/site";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "NightClub",
    name: SITE.name,
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
    employee: {
      "@type": "Person",
      name: SITE.manager,
      jobTitle: "매니저",
      telephone: SITE.phoneIntl,
    },
    areaServed: SITE.city,
    smokingAllowed: false,
    publicAccess: true,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
