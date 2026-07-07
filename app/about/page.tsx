import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutTeam from "@/components/about/AboutTeam";
import StructuredData from "@/components/StructuredData";
import CtaBanner from "@/components/home/CtaBanner";
import { ABOUT_TEAM_MEMBERS } from "@/lib/about-data";
import { buildPageMetadata } from "@/lib/metadata";
import { buildPersonSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "About | neu events",
  description:
    "Meet Mona, Heidi, Aileen, and Deni — the neu events team bringing heart, experience, and boutique planning to weddings and celebrations across Hawaii and beyond.",
  openGraphTitle: "About neu events | Hawaii Wedding & Event Planners",
  openGraphDescription:
    "Since 2000, neu events has crafted unforgettable weddings and events in Hawaii with a personal, values-driven approach.",
  path: "/about",
});

export default function AboutPage() {
  const teamSchema = buildPersonSchema(
    ABOUT_TEAM_MEMBERS.map((member) => ({
      name: member.name,
      image: member.image,
      email: member.email,
      role: member.consult?.role,
    })),
  );

  return (
    <main className="about-page">
      <StructuredData data={teamSchema} />
      <AboutHero />
      <AboutTeam />
      <CtaBanner />
    </main>
  );
}
