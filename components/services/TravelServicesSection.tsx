import Image from "next/image";
import { TRAVEL_SERVICE_CARDS } from "@/lib/services-data";

function ExternalLinkIcon() {
  return (
    <svg
      className="svc-v2-travel-card-cta-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );
}

export default function TravelServicesSection() {
  return (
    <section id="travel-services" className="svc-v2-section">
      <div className="hv2-wrap">
        <header className="svc-v2-section-header">
          <p className="hv2-eyebrow">Travel Services</p>
          <h2 className="svc-v2-section-title hv2-serif">
            Resources for Your Guests
            <br />
            &amp; Group
          </h2>
          <p className="svc-v2-section-lead">
            From accommodations to activities, explore curated resources to
            help your guests and wedding party make the most of their time in
            Hawai&apos;i.
          </p>
        </header>

        <div className="svc-v2-travel-grid">
          {TRAVEL_SERVICE_CARDS.map((card) => (
            <article key={card.id} className="svc-v2-travel-card">
              <p className="hv2-eyebrow">{card.eyebrow}</p>
              <h3 className="svc-v2-travel-card-title">{card.title}</h3>
              <div className="svc-v2-travel-card-media">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 360px"
                  quality={90}
                />
              </div>
              <p className="svc-v2-travel-card-desc">{card.description}</p>
              <a
                href={card.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="svc-v2-travel-card-cta hv2-btn-primary"
              >
                <span>{card.ctaLabel}</span>
                <ExternalLinkIcon />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
