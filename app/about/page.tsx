import type { Metadata } from "next";
import AboutCompany from "@/components/about/AboutCompany";
import AboutOwners from "@/components/about/AboutOwners";
import AboutPhilosophy from "@/components/about/AboutPhilosophy";
import AboutPlanning from "@/components/about/AboutPlanning";
import CtaBanner from "@/components/home/CtaBanner";

import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Meet Our Wedding Planning Team | neu events",
  description:
    "Meet Candace and Matt Kelly, the award-winning husband-and-wife team behind neu events.",
  openGraphTitle:
    "Meet the Team Behind neu events | neu events",
  openGraphDescription:
    "The award-winning husband-and-wife team bringing artistry, experience, and heart to every wedding across North & South Carolina and beyond.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="about-page">
      <AboutCompany />
      <AboutOwners />
      <AboutPhilosophy />
      <AboutPlanning />
      <CtaBanner />
    </main>
  );
}
