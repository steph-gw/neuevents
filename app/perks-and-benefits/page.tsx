import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Gift, MapPin, Star, Tag } from "react-feather";
import { PERKS_SECTIONS } from "@/lib/perks-data";
import { buildPageMetadata } from "@/lib/metadata";

const ACCESS_FEATURES = [
  { Icon: Tag, label: "Vendor Discounts" },
  { Icon: Gift, label: "Promo Codes" },
  { Icon: Star, label: "Exclusive Offers" },
  { Icon: MapPin, label: "Hawai'i Partners" },
] as const;

export const metadata: Metadata = buildPageMetadata({
  title: "Perks & Benefits | neu events",
  description:
    "As a neu events client, enjoy preferential vendor pricing, referral benefits for family and friends, and our Share the Love décor program.",
  openGraphTitle: "Perks & Benefits | neu events",
  openGraphDescription:
    "Value-added benefits for neu events clients — from vendor discounts to referral perks and shared wedding décor.",
  path: "/perks-and-benefits",
});

function linkifyContact(text: string) {
  if (text.includes("contact us")) {
    const [before, after] = text.split("contact us");
    return (
      <>
        {before}
        <Link href="/contact">contact us</Link>
        {after}
      </>
    );
  }

  if (text.includes("Reach out to us")) {
    const [before, after] = text.split("Reach out to us");
    return (
      <>
        {before}
        <Link href="/contact">Reach out to us</Link>
        {after}
      </>
    );
  }

  return text;
}

export default function PerksPage() {
  return (
    <main className="perks-v2-page">

      {/* Hero */}
      <section className="ideas-hero">
        <div className="ideas-hero-inner hv2-wrap">
          <p className="ideas-hero-eyebrow">Perks &amp; Benefits</p>
          <h1 className="ideas-hero-title">
            Client <span className="ideas-hero-title-accent">Perks</span>
          </h1>
          <p className="ideas-hero-lead">
            As a client of neu events, enjoy various perks and &ldquo;value-added&rdquo;
            benefits designed to make your celebration — and those of the people
            you love — even more special.
          </p>
        </div>
      </section>

      {/* 3-card grid */}
      <section className="perks-v2-cards">
        <div className="perks-v2-cards-grid hv2-wrap">
          {PERKS_SECTIONS.map((section) => (
            <article key={section.id} className="perks-v2-card">
              <figure className="perks-v2-card-media">
                <div className="perks-v2-card-image">
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    fill
                    sizes="(max-width: 700px) 100vw, 33vw"
                    quality={90}
                  />
                  {section.photoCredit ? (
                    <figcaption className="perks-v2-card-credit">
                      <a
                        href={section.photoCredit.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>{section.photoCredit.label}</span>
                      </a>
                    </figcaption>
                  ) : null}
                </div>
              </figure>
              <div className="perks-v2-card-content">
                <p className="hv2-eyebrow perks-v2-card-eyebrow">{section.eyebrow}</p>
                <h2 className="perks-v2-card-title hv2-serif">
                  {section.title} <em>{section.titleEm}</em>
                </h2>
                <div className="perks-v2-card-body">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{linkifyContact(paragraph)}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}

          <div className="perks-v2-access-panel">
            <div className="perks-v2-access-text">
              <p className="hv2-eyebrow">Client Access</p>
              <h2 className="perks-v2-access-title hv2-serif">
                Exclusive <em>Perks</em>
              </h2>
              <p className="perks-v2-access-lead">
                Current neu events clients can access our curated list of vendor
                discounts, promo codes, and exclusive offers from our trusted
                partners across Hawai&apos;i.
              </p>
              <Link href="/just-for-clients" className="perks-v2-access-btn">
                Access Client Perks →
              </Link>
            </div>

            <div className="perks-v2-access-features" aria-hidden="true">
              {ACCESS_FEATURES.map(({ Icon, label }) => (
                <div key={label} className="perks-v2-access-feature">
                  <span className="perks-v2-access-feature-icon">
                    <Icon size={22} strokeWidth={1.5} />
                  </span>
                  <span className="perks-v2-access-feature-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
