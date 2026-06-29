import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBanner from "@/components/home/CtaBanner";
import { PERKS_SECTIONS } from "@/lib/perks-data";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Perks & Benefits | neu events",
  description:
    "As a neu events client, enjoy preferential vendor pricing, referral benefits for family and friends, and our Share the Love décor program.",
  openGraphTitle: "Perks & Benefits | neu events",
  openGraphDescription:
    "Value-added benefits for neu events clients — from vendor discounts to referral perks and shared wedding décor.",
  path: "/perks",
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
    <main className="perks-page">
      <section className="perks-hero">
        <div className="perks-hero-intro">
          <p className="eyebrow">Perks &amp; Benefits</p>
          <h1 className="section-title">
            Client <em>Perks</em>
          </h1>
          <p className="perks-hero-lead">
            As a client of neu events, enjoy various perks and
            &ldquo;value-added&rdquo; benefits designed to make your celebration
            — and those of the people you love — even more special.
          </p>
        </div>
      </section>

      <div className="perks-features">
        {PERKS_SECTIONS.map((section, index) => (
          <section
            key={section.id}
            className={[
              "perks-feature",
              index % 2 === 1 ? "perks-feature--alt" : "",
              section.reverse ? "perks-feature--reverse" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="perks-feature-inner">
              <div className="perks-feature-content">
                <p className="eyebrow">{section.eyebrow}</p>
                <h2 className="perks-feature-title">
                  {section.title} <em>{section.titleEm}</em>
                </h2>
                <div className="perks-feature-body">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{linkifyContact(paragraph)}</p>
                  ))}
                </div>
              </div>

              <figure className="perks-feature-media">
                <div className="perks-feature-image">
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    fill
                    sizes="(max-width: 900px) 100vw, 520px"
                    quality={90}
                  />
                </div>
                {section.photoCredit ? (
                  <figcaption className="perks-feature-credit">
                    Photographer: {section.photoCredit}
                  </figcaption>
                ) : null}
              </figure>
            </div>
          </section>
        ))}
      </div>

      <section className="perks-client-access">
        <div className="perks-client-access-inner">
          <p className="eyebrow">Client Access</p>
          <h2 className="perks-client-access-title">
            Vendor Perks <em>Directory</em>
          </h2>
          <p className="perks-client-access-lead">
            Current neu events clients can access our full list of vendor
            discounts, promo codes, and exclusive offers from our trusted
            partners across Hawai&apos;i.
          </p>
          <Link href="/just-for-clients" className="btn btn-primary">
            Client Perks Access
          </Link>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
