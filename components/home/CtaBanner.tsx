"use client";

import Image from "next/image";
import InquiryButton from "@/components/InquiryButton";
import PlaceholderButton from "@/components/PlaceholderButton";

type Props = {
  showInquiry?: boolean;
  placeholderActions?: boolean;
};

export default function CtaBanner({
  showInquiry = true,
  placeholderActions = false,
}: Props) {
  return (
    <section className="cta-banner">
      <div className="cta-banner-media reveal-image">
        <Image
          src="/images/cta/coastal-kiss-bw.webp"
          alt="Bride and groom kissing on a coastal walkway at sunset in Hawaii"
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
          From weddings and events to celebrations of life and destination
          travel, we take on a select number of projects each year to ensure
          every client receives our complete attention and care.
        </p>
        {showInquiry ? (
          placeholderActions ? (
            <PlaceholderButton className="btn btn-gold">
              Send an Inquiry
            </PlaceholderButton>
          ) : (
            <InquiryButton />
          )
        ) : null}
      </div>
    </section>
  );
}
