import {
  CONTACT_EMAIL,
  CONTACT_MAILING_ADDRESS,
  CONTACT_OFFICE_PHONE,
  CONTACT_SOCIAL_LINKS,
  ESTABLISHED_YEAR,
} from "@/lib/contact-data";
import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return new URL(pathOrUrl, getSiteUrl()).toString();
}

export function buildOrganizationSchema() {
  const [streetAddress, localityRegionZip] = CONTACT_MAILING_ADDRESS.split(", ");
  const [addressLocality, addressRegion, postalCode] = (localityRegionZip ?? "")
    .split(" ");

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "EventPlanner"],
    name: SITE_NAME,
    url: getSiteUrl(),
    logo: absoluteUrl("/images/logo.png"),
    description: SITE_DESCRIPTION,
    foundingDate: String(ESTABLISHED_YEAR),
    telephone: "+1-808-524-5331",
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry: "US",
    },
    areaServed: "Hawaii",
    sameAs: CONTACT_SOCIAL_LINKS.map((s) => s.href),
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: getSiteUrl(),
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildServicesSchema(
  services: Array<{ name: string; description: string; price?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: getSiteUrl(),
        },
        ...(service.price
          ? {
              offers: {
                "@type": "Offer",
                priceSpecification: service.price,
                priceCurrency: "USD",
              },
            }
          : {}),
      },
    })),
  };
}

export function buildPersonSchema(
  people: Array<{ name: string; image?: string; email?: string; role?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: people.map((person, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Person",
        name: person.name,
        ...(person.image ? { image: absoluteUrl(person.image) } : {}),
        ...(person.email ? { email: person.email } : {}),
        ...(person.role ? { jobTitle: person.role } : {}),
        worksFor: {
          "@type": "Organization",
          name: SITE_NAME,
          url: getSiteUrl(),
        },
      },
    })),
  };
}

export function buildCollectionPageSchema(
  path: string,
  name: string,
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: absoluteUrl("/"),
  };
}

export function buildGalleryEntrySchema(entry: {
  name: string;
  description: string;
  date?: string;
  image?: string;
  path: string;
  type: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": entry.type === "wedding" ? "Event" : "CreativeWork",
    name: entry.name,
    description: entry.description,
    url: absoluteUrl(entry.path),
    ...(entry.image ? { image: absoluteUrl(entry.image) } : {}),
    ...(entry.type === "wedding" && entry.date
      ? { startDate: entry.date, eventStatus: "https://schema.org/EventCompleted" }
      : {}),
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
  };
}

