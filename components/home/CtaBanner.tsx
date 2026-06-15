"use client";

import Image from "next/image";
import InquiryButton from "@/components/InquiryButton";

export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="cta-banner-media reveal-image">
        <Image
          src="https://static.showit.com/file/q6d0OahI6jrlHPp7GUnElw/314908/mt-134-2.jpg"
          alt="Bride and groom walking in a mountain meadow"
          fill
          sizes="100vw"
        />
      </div>
      <div className="cta-banner-overlay" />
      <div className="cta-banner-content">
        <p className="eyebrow">Your Story Begins Here</p>
        <h2 className="section-title">
          Ready to Start
          <br />
          <em>Planning Together?</em>
        </h2>
        <p className="cta-banner-sub">
          We take on a select number of weddings each year to ensure every
          couple receives our complete attention and care.
        </p>
        <InquiryButton />
      </div>
    </section>
  );
}
