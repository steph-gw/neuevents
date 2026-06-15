import type { Metadata } from "next";
import Image from "next/image";
import {
  CANDACE_STORY_PARAGRAPHS,
  CANDACE_TOPICS,
  CANDACE_TRAVEL_BIO,
  CANDACE_TRAVEL_STYLE_TAGS,
  FORA_BOOKING_URL,
  TRAVEL_SERVICES,
  VENUE_REGIONS,
} from "@/lib/travel-data";

import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Honeymoon & Destination Wedding Travel | neu events",
  description:
    "Honeymoon planning, hotel block management, and destination wedding travel with Candace Kelly, Certified Elite Wedding Planner and Fora Travel Advisor.",
  openGraphTitle:
    "Honeymoon & Destination Wedding Travel | neu events",
  openGraphDescription:
    "From honeymoon escapes to destination weddings and guest travel coordination, we handle every detail so you can be present for what matters.",
  path: "/travel",
});

const LONG_VENUE_LIST_MIN = 8;

function venueTileSize(region: (typeof VENUE_REGIONS)[number]) {
  if (region.region === "Charlotte, NC & Surrounding Areas") return "extra-wide";
  const count = region.venues.length;
  if (count <= 3) return "narrow";
  if (count < LONG_VENUE_LIST_MIN) return "medium";
  return "wide";
}

export default function TravelPage() {
  return (
    <main className="travel-page">

      {/* ── Hero: Your Travel Advisor ── */}
      <section className="travel-advisor-hero">
        <div className="travel-advisor-hero-intro">
          <p className="eyebrow">Travel &amp; Destinations</p>
          <h1 className="section-title">
            Beyond the <em>Wedding Day</em>
          </h1>
          <p className="travel-hero-lead">
            From honeymoon escapes to destination weddings, we handle every
            aspect of travel so you can be fully present for the moments that matter.
          </p>
        </div>

        <div className="travel-advisor-inner">
          <div className="travel-advisor-media">
            <Image
              src="/images/about/candace.webp"
              alt="Candace Kelly, Certified Elite Wedding Planner and Fora Travel Advisor"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 420px"
              quality={90}
              style={{ objectPosition: "center top" }}
            />
          </div>

          <div className="travel-advisor-content">
            <p className="eyebrow">Your Travel Advisor</p>
            <h2 className="travel-advisor-name">Candace Kelly</h2>

            <div className="travel-advisor-topics">
              <p className="travel-advisor-topics-label">Ask me about</p>
              <div className="travel-advisor-tags">
                {CANDACE_TOPICS.map((topic) => (
                  <span key={topic} className="travel-advisor-tag">{topic}</span>
                ))}
              </div>
            </div>

            <div className="travel-advisor-block">
              <p className="travel-advisor-block-label">My Story</p>
              <div className="travel-advisor-paras">
                {CANDACE_STORY_PARAGRAPHS.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <div className="travel-advisor-topics">
              <p className="travel-advisor-topics-label">Travel Style</p>
              <div className="travel-advisor-tags">
                {CANDACE_TRAVEL_STYLE_TAGS.map((style) => (
                  <span key={style} className="travel-advisor-tag">{style}</span>
                ))}
              </div>
              <p className="travel-advisor-bio">{CANDACE_TRAVEL_BIO}</p>
            </div>

            <a
              href={FORA_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary travel-advisor-btn"
            >
              Book with Candace
            </a>
          </div>
        </div>
      </section>

      {/* ── Travel Services ── */}
      <section className="travel-services">
        <div className="travel-services-inner">
          <header className="travel-section-header">
            <p className="eyebrow">What We Offer</p>
            <h2 className="section-title">
              Our Travel <em>Services</em>
            </h2>
          </header>
          <div className="travel-services-grid">
            {TRAVEL_SERVICES.map((service, index) => (
              <div
                key={service.title}
                className={`travel-service-card reveal-text${
                  index > 0 ? ` reveal-text-delay-${Math.min(index, 2)}` : ""
                }`}
              >
                <span className="travel-service-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="travel-service-title">{service.title}</h3>
                <p className="travel-service-body">{service.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Venues ── */}
      <section className="travel-venues">
        <div className="travel-venues-inner">
          <header className="travel-section-header travel-section-header--light">
            <p className="eyebrow">Where We Work</p>
            <h2 className="section-title">
              Venues We <em>Serve</em>
            </h2>
          </header>
        </div>

        <div className="travel-venues-scroll">
          {VENUE_REGIONS.map((region) => (
            <div
              key={region.region}
              className={`travel-venues-tile travel-venues-tile--${venueTileSize(region)} reveal-text`}
            >
              <p className="travel-venues-region-title">{region.region}</p>
              <ul
                className={`travel-venues-list${
                  region.venues.length >= LONG_VENUE_LIST_MIN
                    ? " travel-venues-list--cols"
                    : ""
                }`}
              >
                {region.venues.map((venue) => (
                  <li key={venue}>{venue}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-banner cta-banner--travel">
        <div className="cta-banner-media">
          <Image
            src="/images/hero/hero-3.webp"
            alt="Wedding guests raising glasses at an elegant reception"
            fill
            sizes="100vw"
            style={{ objectPosition: "center 40%" }}
          />
        </div>
        <div className="cta-banner-overlay" />
        <div className="cta-banner-content">
          <p className="eyebrow">Ready to Plan?</p>
          <h2 className="section-title">
            Let&apos;s Create Something
            <br />
            <em>Unforgettable</em>
          </h2>
          <p className="cta-banner-sub cta-banner-sub--travel">
            Whether you&apos;re planning a honeymoon, a destination wedding, or need help
            coordinating travel for your guests, Candace is here to help.
          </p>
          <a
            href={FORA_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
          >
            Book with Candace
          </a>
        </div>
      </section>

    </main>
  );
}
