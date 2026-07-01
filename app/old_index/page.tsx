import type { Metadata } from "next";
import Hero from "@/components/home-legacy/Hero";
import AboutSection from "@/components/home-legacy/AboutSection";
import Featured from "@/components/home-legacy/Featured";
import Services from "@/components/home-legacy/Services";
import Awards from "@/components/home-legacy/Awards";
import CtaBanner from "@/components/home-legacy/CtaBanner";
import HomeTestimonials from "@/components/home-legacy/HomeTestimonials";
import { buildPageMetadata } from "@/lib/metadata";
import {
  SITE_BROWSER_TITLE,
  SITE_DESCRIPTION,
  SITE_OG_DESCRIPTION,
  SITE_OG_TITLE,
} from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: SITE_BROWSER_TITLE,
  description: SITE_DESCRIPTION,
  openGraphTitle: SITE_OG_TITLE,
  openGraphDescription: SITE_OG_DESCRIPTION,
  path: "/old_index",
});

export default function OldIndexPage() {
  return (
    <>
      <Hero />

      <Services />

      <Featured />

      <HomeTestimonials />

      <AboutSection />

      <Awards />
      <CtaBanner />
    </>
  );
}
