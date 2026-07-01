import type { Metadata } from "next";
import ContactFormEmbed from "@/components/contact/ContactFormEmbed";
import ContactInfo from "@/components/contact/ContactInfo";

import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Let's Work Together | neu events",
  description:
    "Get in touch with neu events. Call, email, or send an inquiry — we'd love to help you plan your special day!",
  openGraphTitle: "Let's Plan Your Celebration | neu events",
  openGraphDescription:
    "We'd love to hear about your celebration. Share a few details and we'll be in touch to start the conversation — serving the Carolinas and beyond.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-intro">
          <p className="hv2-eyebrow">Get in Touch</p>
          <h1 className="contact-hero-title hv2-serif">
            Let&apos;s <em>Connect</em>
          </h1>
          <p className="contact-hero-lead">
            We&apos;d love to hear about your celebration. Share a few details below
            and we&apos;ll be in touch to start the conversation.
          </p>
        </div>
      </section>

      <section className="contact-main">
        <div className="contact-main-inner">
          <div className="contact-form-card">
            <div className="contact-form-body">
              <ContactFormEmbed />
            </div>
          </div>

          <div className="contact-sidebar">
            <ContactInfo />
          </div>
        </div>
      </section>
    </main>
  );
}
