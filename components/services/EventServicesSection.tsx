import Image from "next/image";
import Link from "next/link";
import {
  EVENT_PAST_CLIENTS,
  EVENT_SERVICES_INTRO,
  EVENT_SERVICE_FEATURES,
} from "@/lib/services-data";

export default function EventServicesSection() {
  return (
    <section id="event-services" className="svc-v2-section">
      <div className="hv2-wrap">
        <header className="svc-v2-section-header">
          <p className="hv2-eyebrow">Event Services</p>
          <h2 className="svc-v2-section-title hv2-serif">
            {EVENT_SERVICES_INTRO.title}{" "}
            <em>{EVENT_SERVICES_INTRO.titleEm}</em>
          </h2>
          <p className="svc-v2-section-lead">{EVENT_SERVICES_INTRO.lead}</p>
        </header>

        <div className="svc-v2-event-cards">
          {EVENT_SERVICE_FEATURES.map((feature) => (
            <article key={feature.id} className="svc-v2-event-card">
              <figure className="svc-v2-event-card-media">
                <div className="svc-v2-event-card-image">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    fill
                    sizes="(max-width: 900px) 100vw, 420px"
                    quality={90}
                  />
                </div>
                {feature.photoCredit ? (
                  <figcaption className="svc-v2-event-card-credit">
                    Photo: {feature.photoCredit}
                  </figcaption>
                ) : null}
              </figure>

              <div className="svc-v2-event-card-body">
                <h3 className="svc-v2-event-card-title hv2-serif">
                  {feature.eyebrow}
                </h3>
                <div className="svc-v2-event-card-body-inner">
                  {feature.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {feature.bullets ? (
                    <ul className="svc-v2-event-card-list">
                      {feature.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {feature.id === "event-planning" ? (
                    <p>
                      Let us save you valuable time and energy while delivering
                      a flawless event.{" "}
                      <Link href="/contact">Contact us</Link> today to learn how
                      we can make your next event effortless and exceptional.
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="svc-v2-clients">
          <p className="svc-v2-clients-label hv2-eyebrow">Past Clients</p>
          <ul className="svc-v2-clients-list">
            {EVENT_PAST_CLIENTS.map((client) => (
              <li key={client}>{client}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
