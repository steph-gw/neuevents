import Image from "next/image";
import Link from "next/link";
import {
  EVENT_PAST_CLIENTS,
  EVENT_SERVICES_INTRO,
  EVENT_SERVICE_FEATURES,
} from "@/lib/services-data";

export default function EventServicesSection() {
  return (
    <section id="event-services" className="services-section">
      <div className="services-section-inner">
        <header className="services-section-header">
          <p className="eyebrow">Event Services</p>
          <h2 className="services-section-title">
            {EVENT_SERVICES_INTRO.title}{" "}
            <em>{EVENT_SERVICES_INTRO.titleEm}</em>
          </h2>
          <p className="services-section-lead">{EVENT_SERVICES_INTRO.lead}</p>
        </header>

        <div className="services-event-features">
          {EVENT_SERVICE_FEATURES.map((feature, index) => (
            <article
              key={feature.id}
              className={[
                "services-feature",
                index % 2 === 1 ? "services-feature--reverse" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="services-feature-inner">
                <div className="services-feature-content">
                  <p className="eyebrow">{feature.eyebrow}</p>
                  <h3 className="services-feature-title">
                    {feature.title}{" "}
                    {feature.titleEm ? <em>{feature.titleEm}</em> : null}
                  </h3>
                  <div className="services-feature-body">
                    {feature.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {feature.bullets ? (
                      <ul className="services-feature-list">
                        {feature.bullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                    {feature.id === "event-planning" ? (
                      <p>
                        Let us save you valuable time and energy while delivering
                        a flawless event.{" "}
                        <Link href="/contact">Contact us</Link> today to learn
                        how we can make your next event effortless and
                        exceptional!
                      </p>
                    ) : null}
                  </div>
                </div>

                <figure className="services-feature-media">
                  <div className="services-feature-image">
                    <Image
                      src={feature.image}
                      alt={feature.imageAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 520px"
                      quality={90}
                    />
                  </div>
                  {feature.photoCredit ? (
                    <figcaption className="services-feature-credit">
                      Photographer: {feature.photoCredit}
                    </figcaption>
                  ) : null}
                </figure>
              </div>
            </article>
          ))}
        </div>

        <div className="services-clients">
          <h3 className="services-clients-title">Past Clients</h3>
          <ul className="services-clients-list">
            {EVENT_PAST_CLIENTS.map((client) => (
              <li key={client}>{client}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
