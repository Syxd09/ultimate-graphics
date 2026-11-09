export default function JsonLd() {
  const companySchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SignShop", "ProfessionalService"],
    "@id": "https://ultimategraphics.com/#business",
    name: "Ultimate Graphics®",
    legalName: "Ultimate Graphics Commercial Fabrication Ltd.",
    alternateName: "Ultimate Graphics London",
    url: "https://ultimategraphics.com",
    logo: "https://ultimategraphics.com/images/AZdKLugP6NzACkX2hBYq9K4wFQ.jpg",
    description:
      "Ultimate Graphics® is a London architectural signage and commercial fabrication studio established in 2014. In-house 12kW fiber laser cutting, 5-axis CNC routing, automated channel letters, and 3M commercial fleet branding with 2-hour quote SLA.",
    telephone: "+44 20 7946 0192",
    email: "hello@ultimategraphics.com",
    foundingDate: "2014-04-01",
    priceRange: "Bespoke / Custom Quote",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      bestRating: "5",
      ratingCount: "280",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "124 Industrial Way",
      addressLocality: "London",
      postalCode: "EC1V 2NX",
      addressRegion: "Greater London",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.5255,
      longitude: -0.0886,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "15:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "20 In-House Commercial Signage Services",
      itemListElement: [
        "Vehicle Branding",
        "Cabinet Signs",
        "Station Signs",
        "Neon Signs",
        "Digital Signage",
        "Directional Signs",
        "Custom Signs",
        "Engraved Signs",
        "Metal Laser",
        "CNC Router",
        "Channel Letter",
        "Metal Letters",
        "Printing",
        "Plotting",
        "Glass Frosting",
        "Vinyl Banners",
        "Stickering",
        "Vehicle Stickering",
        "Sun Board Printing",
        "Business Card Printing"
      ].map((title) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: title,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What machinery does Ultimate Graphics use in-house?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ultimate Graphics operates an in-house 24,000 sq ft facility in London equipped with an industrial 12kW fiber laser cutting bed, dual 5-axis CNC router tables running at 24,000 RPM, automated channel letter flange benders, and SwissQprint 3.2m UV flatbed printers.",
        },
      },
      {
        "@type": "Question",
        name: "How do you calculate pricing for commercial architectural signage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Commercial signage pricing depends on structural engineering wind loads, substrate thickness, and LED illumination density. We deliver tailored CAD elevation breakdowns and transparent bespoke proposals within 2 business hours.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(companySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

