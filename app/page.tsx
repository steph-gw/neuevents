import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import AboutSection from "@/components/home/AboutSection";
import Featured from "@/components/home/Featured";
import Services from "@/components/home/Services";
import Awards from "@/components/home/Awards";
import Faq from "@/components/home/Faq";
import CtaBanner from "@/components/home/CtaBanner";
import Testimonials from "@/components/Testimonials";
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
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />

      <AboutSection />

      <Featured />
      <Services />
      <Testimonials />
      <Awards />
      <Faq />
      <CtaBanner />
    </>
  );
}
