import type { Metadata } from "next";
import { Suspense } from "react";
import CtaBanner from "@/components/home/CtaBanner";
import ServiceDetail from "@/components/services/ServiceDetail";
import ServicesGallery from "@/components/services/ServicesGallery";
import ServicesOverview from "@/components/services/ServicesOverview";
import ServicesPackageCompare from "@/components/services/ServicesPackageCompare";
import { SERVICE_DETAILS } from "@/lib/services-data";

import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Wedding Planning Packages & Pricing | neu events",
  description:
    "Compare our Full Planning, Partial Planning, and Event Management packages, plus a curated gallery of weddings we've planned.",
  openGraphTitle:
    "Wedding Planning Packages & Portfolio | neu events",
  openGraphDescription:
    "From full planning and bespoke design to day-of coordination — explore what's included in each tier and browse featured celebrations",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main className="services-page">
      <ServicesOverview />

      <Suspense fallback={null}>
        {SERVICE_DETAILS.map((service) => (
          <ServiceDetail key={service.id} service={service} />
        ))}
      </Suspense>

      <ServicesPackageCompare />
      <ServicesGallery />
      <CtaBanner />
    </main>
  );
}
