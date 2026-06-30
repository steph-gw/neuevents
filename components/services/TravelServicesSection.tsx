import Image from "next/image";
import { TRAVEL_SERVICE_CARDS } from "@/lib/services-data";

export default function TravelServicesSection() {
  return (
    <section id="travel-services" className="services-section">
      <div className="services-section-inner">
        <header className="services-section-header">
          <p className="eyebrow">Travel Services</p>
          <h2 className="services-section-title">
            Resources for Your <em>Guests &amp; Group</em>
          </h2>
          <p className="services-section-lead">
            From travel needs to activities, explore curated resources to help
            your guests and wedding party make the most of their time in
            Hawai&apos;i.
          </p>
        </header>

        <div className="services-travel-hero">
          <div className="services-travel-hero-image">
            <Image
              src="/images/services/travel-services.jpg"
              alt="A tropical oceanfront lawn at Lanikuhonua in Ko Olina, Oahu, framed by tall swaying palm trees at sunset."
              fill
              sizes="(max-width: 900px) 100vw, 1100px"
              quality={90}
            />
          </div>
          <p className="services-travel-hero-credit">
            Photographer: Jesse Okuda
          </p>
        </div>

        <div className="services-travel-grid">
          {TRAVEL_SERVICE_CARDS.map((card) => (
            <article key={card.id} className="services-travel-card">
              <p className="services-travel-card-eyebrow">{card.eyebrow}</p>
              <h3 className="services-travel-card-title">{card.title}</h3>
              <p className="services-travel-card-desc">{card.description}</p>
              <a
                href={card.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary services-travel-card-cta"
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
