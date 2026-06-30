import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutPress from "@/components/about/AboutPress";
import AboutQuote from "@/components/about/AboutQuote";
import AboutTeam from "@/components/about/AboutTeam";
import CtaBanner from "@/components/home/CtaBanner";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About neu events | Hawaii Wedding & Event Planners",
  description:
    "Meet Mona, Heidi, Aileen, and Deni — the neu events team bringing heart, experience, and boutique planning to weddings and celebrations across Hawai'i and beyond.",
  openGraphTitle: "About neu events | Hawaii Wedding & Event Planners",
  openGraphDescription:
    "Since 2000, neu events has crafted unforgettable weddings and events in Hawai'i with a personal, values-driven approach.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="about-page">
      <AboutHero />
      <AboutQuote />
      <AboutTeam />
      <AboutPress />
      <CtaBanner />
    </main>
  );
}
