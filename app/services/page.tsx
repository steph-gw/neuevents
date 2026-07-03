import type { Metadata } from "next";
import CtaBanner from "@/components/home/CtaBanner";
import CelebrationOfLifeSection from "@/components/services/CelebrationOfLifeSection";
import EventServicesSection from "@/components/services/EventServicesSection";
import ServicesOverview from "@/components/services/ServicesOverview";
import TravelServicesSection from "@/components/services/TravelServicesSection";
import WeddingPackagesSection from "@/components/services/WeddingPackagesSection";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Services | neu events",
  description:
    "Wedding planning packages, event coordination, celebration of life services, and travel resources from neu events in Hawai'i.",
  openGraphTitle: "Services | neu events",
  openGraphDescription:
    "Explore wedding services, event planning, celebration of life coordination, and travel resources from neu events.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main className="services-v2-page">
      <ServicesOverview />
      <WeddingPackagesSection />
      <EventServicesSection />
      <CelebrationOfLifeSection />
      <TravelServicesSection />
      <CtaBanner />
    </main>
  );
}
