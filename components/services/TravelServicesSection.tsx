import Image from "next/image";
import { TRAVEL_SERVICE_CARDS } from "@/lib/services-data";

export default function TravelServicesSection() {
  return (
    <section id="travel-services" className="svc-v2-section">
      <div className="hv2-wrap">
        <header className="svc-v2-section-header">
          <p className="hv2-eyebrow">Travel Services</p>
          <h2 className="svc-v2-section-title hv2-serif">
            Resources for Your Guests &amp; Group
          </h2>
          <p className="svc-v2-section-lead">
            From accommodations to activities, explore curated resources to
            help your guests and wedding party make the most of their time in
            Hawai&apos;i.
          </p>
        </header>

        <figure className="svc-v2-travel-hero">
          <div className="svc-v2-travel-hero-image">
            <Image
              src="/images/services/travel-services.jpg"
              alt="A tropical oceanfront lawn at Lanikuhonua in Ko Olina, Oahu, framed by tall swaying palm trees at sunset."
              fill
              sizes="(max-width: 900px) 100vw, 1200px"
              quality={90}
            />
          </div>
          <figcaption className="svc-v2-travel-hero-credit">
            Photo: Jesse Okuda
          </figcaption>
        </figure>

        <div className="svc-v2-travel-grid">
          {TRAVEL_SERVICE_CARDS.map((card) => (
            <article key={card.id} className="svc-v2-travel-card">
              <p className="hv2-eyebrow">{card.eyebrow}</p>
              <h3 className="svc-v2-travel-card-title">{card.title}</h3>
              <p className="svc-v2-travel-card-desc">{card.description}</p>
              <a
                href={card.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="svc-v2-travel-card-cta hv2-btn-primary"
              >
                {card.ctaLabel}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
