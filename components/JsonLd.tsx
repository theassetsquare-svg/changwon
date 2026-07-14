import { PLACEHOLDERS, SITE } from "@/lib/site";

export default function JsonLd() {
  const business = {
    "@context": "https://schema.org",
    "@type": ["NightClub", "LocalBusiness"],
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    alternateName: [
      "창원룰루랄라나이트",
      "창원 룰루랄라",
      "창원룰루랄라",
      "룰루랄라 나이트",
      "룰루랄라나이트",
      "상남동 룰루랄라",
      "창원 상남동 룰루랄라 나이트",
    ],
    description: SITE.description,
    url: SITE.url,
    priceRange: SITE.priceRange,
    currenciesAccepted: "KRW",
    paymentAccepted: "Cash, Credit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: PLACEHOLDERS.address,
      addressLocality: `${SITE.city} ${SITE.district}`,
      addressRegion: SITE.region,
      addressCountry: "KR",
      postalCode: PLACEHOLDERS.postalCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      "창원시 성산구 상남동 22-4"
    )}`,
    areaServed: [
      { "@type": "City", name: "창원시" },
      { "@type": "AdministrativeArea", name: "성산구" },
      { "@type": "City", name: "마산" },
      { "@type": "City", name: "진해" },
      { "@type": "AdministrativeArea", name: "경상남도" },
    ],
    openingHoursSpecification: SITE.openingHoursSpec,
    smokingAllowed: false,
    publicAccess: true,
    isAccessibleForFree: false,
    sameAs: SITE.sameAs,
    knowsLanguage: ["ko", "ko-KR"],
    foundingDate: SITE.foundingDate,
    foundingLocation: {
      "@type": "Place",
      name: "경상남도 창원시 성산구 상남동",
    },
    audience: {
      "@type": "Audience",
      audienceType: "만 19세 이상",
      suggestedMinAge: 19,
    },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: ["창원룰루랄라나이트", "룰루랄라 나이트", "상남동 룰루랄라"],
    url: SITE.url,
    description: SITE.description,
    sameAs: SITE.sameAs,
    foundingDate: SITE.foundingDate,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "reservations",
        areaServed: "KR",
        availableLanguage: ["Korean", "ko-KR"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        areaServed: "KR",
        availableLanguage: ["Korean", "ko-KR"],
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    alternateName: "창원룰루랄라나이트 공식",
    inLanguage: "ko-KR",
    publisher: { "@id": `${SITE.url}/#business` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const howToReserve = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${SITE.url}/#how-to-reserve`,
    name: "창원 룰루랄라 나이트 예약 방법",
    description:
      "창원 룰루랄라 나이트 예약은 매장 문의 한 번이면 끝납니다.",
    totalTime: "PT30S",
    tool: [{ "@type": "HowToTool", name: "문의" }],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "매장 문의",
        text: "매장에 인원·날짜·시간을 알려주시면 됩니다.",
        url: `${SITE.url}/reserve#step1`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "예약 정보 전달",
        text: "인원·날짜·시간·요청사항을 전달합니다.",
        url: `${SITE.url}/reserve#step2`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "자리 확정",
        text: "매니저가 확인 후 자리를 확정해 드립니다.",
        url: `${SITE.url}/reserve#step3`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "방문",
        text: "예약 시간 5~10분 전 신분증 챙겨 도착합니다.",
        url: `${SITE.url}/reserve#step4`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToReserve) }}
      />
    </>
  );
}
