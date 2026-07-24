import Image from "next/image";
import EventPlanningCard from "@/components/services/EventPlanningCard";
import PhotoCreditOverlay from "@/components/PhotoCreditOverlay";
import {
  EVENT_PAST_CLIENTS,
  EVENT_SERVICES_INTRO,
  EVENT_SERVICE_FEATURES,
  type ServiceFeature,
} from "@/lib/services-data";

function featureTitle(feature: ServiceFeature) {
  return feature.titleEm
    ? `${feature.title} ${feature.titleEm}`
    : feature.title;
}

function EventCompactCard({ feature }: { feature: ServiceFeature }) {
  return (
    <article className="svc-v2-event-compact-card">
      <div className="svc-v2-event-compact-media">
        <Image
          src={feature.image}
          alt={feature.imageAlt}
          fill
          sizes="(max-width: 900px) 100vw, 420px"
          quality={90}
        />
        {feature.photoCredit ? (
          <PhotoCreditOverlay
            name={feature.photoCredit.name}
            href={feature.photoCredit.href}
          />
        ) : null}
      </div>
      <div className="svc-v2-event-compact-body">
        <p className="svc-v2-event-compact-eyebrow">{feature.eyebrow}</p>
        <h3 className="svc-v2-event-compact-title hv2-serif">
          {featureTitle(feature)}
        </h3>
        {feature.paragraphs.map((paragraph) => (
          <p key={paragraph} className="svc-v2-event-compact-text">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}

export default function EventServicesSection() {
  const planningFeature = EVENT_SERVICE_FEATURES.find(
    (feature) => feature.id === "event-planning",
  );
  const compactFeatures = EVENT_SERVICE_FEATURES.filter(
    (feature) => feature.id !== "event-planning",
  );

  if (!planningFeature) return null;

  return (
    <section id="event-services" className="svc-v2-section svc-v2-section--event">
      <div className="svc-v2-event-dark">
        <div className="hv2-wrap">
          <header className="svc-v2-section-header svc-v2-event-dark-header">
            <p className="hv2-eyebrow">Event Services</p>
            <h2 className="svc-v2-section-title hv2-serif">
              {EVENT_SERVICES_INTRO.title}{" "}
              <em>{EVENT_SERVICES_INTRO.titleEm}</em>
            </h2>
            <p className="svc-v2-section-lead">{EVENT_SERVICES_INTRO.lead}</p>
          </header>

          <EventPlanningCard feature={planningFeature} />

          <div className="svc-v2-event-duo">
            {compactFeatures.map((feature) => (
              <EventCompactCard key={feature.id} feature={feature} />
            ))}
          </div>

          <div className="svc-v2-clients svc-v2-clients--dark">
            <p className="svc-v2-clients-label hv2-eyebrow">Past Clients</p>
            <ul className="svc-v2-clients-cloud">
              {EVENT_PAST_CLIENTS.map((client) => (
                <li key={client}>{client}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
