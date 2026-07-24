import type { Metadata } from "next";
import CelebrationOfLifeSection from "@/components/services/CelebrationOfLifeSection";
import StructuredData from "@/components/StructuredData";
import EventServicesSection from "@/components/services/EventServicesSection";
import ServicesOverview from "@/components/services/ServicesOverview";
import TravelServicesSection from "@/components/services/TravelServicesSection";
import WeddingPackagesSection from "@/components/services/WeddingPackagesSection";
import { buildPageMetadata } from "@/lib/metadata";
import {
  CELEBRATION_OF_LIFE,
  EVENT_SERVICE_FEATURES,
  WEDDING_PACKAGES,
} from "@/lib/services-data";
import { buildServicesSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Wedding & Event Services | neu events",
  description:
    "Full-service wedding planning, event coordination, celebrations of life services, and guest travel resources — thoughtfully planned by neu events in Hawaii.",
  openGraphTitle: "Wedding & Event Services | neu events",
  openGraphDescription:
    "From intimate weddings to corporate galas and celebrations of life, neu events offers boutique planning packages and coordination across Hawaii.",
  path: "/services",
});

export default function ServicesPage() {
  const servicesSchema = buildServicesSchema([
    ...WEDDING_PACKAGES.map((pkg) => ({
      name: `${pkg.title}${pkg.titleEm ? ` ${pkg.titleEm}` : ""}`.trim(),
      description: pkg.description,
      price: pkg.price,
    })),
    ...EVENT_SERVICE_FEATURES.map((feature) => ({
      name: `${feature.title}${feature.titleEm ? ` ${feature.titleEm}` : ""}`.trim(),
      description: feature.paragraphs.join(" "),
    })),
    {
      name: CELEBRATION_OF_LIFE.eyebrow,
      description: CELEBRATION_OF_LIFE.paragraphs.join(" "),
      price: CELEBRATION_OF_LIFE.price,
    },
  ]);

  return (
    <main className="services-v2-page">
      <StructuredData data={servicesSchema} />
      <ServicesOverview />
      <WeddingPackagesSection />
      <EventServicesSection />
      <CelebrationOfLifeSection />
      <TravelServicesSection />
    </main>
  );
}
