import Image from "next/image";
import PlanningCardIncluded from "@/components/services/PlanningCardIncluded";
import type {
  ServiceDetailContent,
  ServicePlanningCard,
} from "@/lib/services-data";

type Props = {
  service: ServiceDetailContent;
};

type PlanningCardProps = {
  card: ServicePlanningCard;
  variant?: "light" | "dark";
  label?: string;
  priorityImage?: boolean;
  collapsibleIncluded?: boolean;
  includedPanelId?: string;
  cardId?: string;
};

function BlockList({ items, className = "sd-list" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function PlanningCard({
  card,
  variant = "light",
  label,
  priorityImage = false,
  collapsibleIncluded = false,
  includedPanelId,
  cardId,
}: PlanningCardProps) {
  const topLabel = label ?? card.label;

  return (
    <div
      id={cardId}
      className={`fp-card${variant === "dark" ? " fp-card--dark" : ""}`}
    >
      <div className="fp-hero">
        <div className="fp-hero-text">
          {topLabel ? (
            <p className="fp-section-label fp-hero-label">{topLabel}</p>
          ) : null}
          <h2 className="fp-title">
            {card.title}
            {card.titleEm ? (
              <> <em>{card.titleEm}</em></>
            ) : null}
          </h2>
          {card.lead ? <p className="fp-desc">{card.lead}</p> : null}
          {card.intro ? <p className="fp-includes">{card.intro}</p> : null}
        </div>
        {card.image ? (
          <div className="fp-hero-photo">
            <Image
              src={card.image}
              alt={card.imageAlt ?? ""}
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
              quality={90}
              className="fp-hero-image"
              priority={priorityImage}
            />
          </div>
        ) : (
          <div className="fp-hero-photo fp-hero-photo--placeholder" aria-hidden="true" />
        )}
      </div>

      {card.includedBlocks && card.includedBlocks.length > 0 && (
        <PlanningCardIncluded
          blocks={card.includedBlocks}
          label={card.includedLabel}
          variant={variant}
          collapsible={collapsibleIncluded}
          panelId={includedPanelId}
        />
      )}
    </div>
  );
}

function toPlanningCard(service: ServiceDetailContent): ServicePlanningCard {
  return {
    label: service.price,
    title: service.title,
    titleEm: service.titleEm,
    lead: service.lead,
    intro: service.intro,
    image: service.image,
    imageAlt: service.imageAlt,
    includedBlocks: service.includedBlocks,
  };
}

function UnifiedServiceDetail({ service }: { service: ServiceDetailContent }) {
  return (
    <section id={service.id} className="fp-section">
      <div className="fp-page">
        <PlanningCard
          card={toPlanningCard(service)}
          priorityImage
          collapsibleIncluded
          includedPanelId="full-planning-included"
        />

        {service.designCard && (
          <PlanningCard
            card={service.designCard}
            collapsibleIncluded
            includedPanelId="design-services-included"
          />
        )}
      </div>
    </section>
  );
}

function DarkPlanningServiceDetail({ service }: { service: ServiceDetailContent }) {
  return (
    <section id={service.id} className="fp-dark-section">
      <div className="fp-page">
        <PlanningCard
          card={toPlanningCard(service)}
          variant="dark"
          collapsibleIncluded
          includedPanelId={`${service.id}-included`}
        />

        {service.eventCard && (
          <PlanningCard
            card={service.eventCard}
            variant="dark"
            collapsibleIncluded
            includedPanelId="event-management-included"
            cardId="event-management"
          />
        )}
      </div>
    </section>
  );
}

function DefaultServiceDetail({ service }: { service: ServiceDetailContent }) {
  return (
    <section id={service.id} className="sd-section">
      <div className="sd-header">
        <div className="sd-header-text">
          {service.number ? (
            <span className="sd-number" aria-hidden="true">{service.number}</span>
          ) : null}
          <h2 className="sd-title section-title">
            {service.title}
            {service.titleEm ? (
              <> <em>{service.titleEm}</em></>
            ) : null}
          </h2>
          {service.lead ? <p className="sd-lead">{service.lead}</p> : null}
          {service.credential ? (
            <p className="sd-credential">{service.credential}</p>
          ) : null}
        </div>
        <div className="sd-header-image" aria-hidden="true">
          <div className="sd-placeholder" />
        </div>
      </div>

      {service.processBlocks && service.processBlocks.length > 0 && (
        <div className="sd-body">
          <div className="sd-col-label">
            <span>What We Do</span>
          </div>
          <div className="sd-process">
            {service.processBlocks.map((block, i) => (
              <div key={block.heading} className="sd-step">
                <div className="sd-step-number" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="sd-step-content">
                  <h3 className="sd-step-title">{block.heading}</h3>
                  {block.items && <BlockList items={block.items} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {service.benefitBlocks && service.benefitBlocks.length > 0 && (
        <div className="sd-benefits">
          <div className="sd-col-label">
            <span>What You Get</span>
          </div>
          <div className="sd-benefits-grid">
            {service.benefitBlocks.map((block) => (
              <div key={block.heading} className="sd-benefit-card">
                <h3 className="sd-benefit-title">{block.heading}</h3>
                {block.items && <BlockList items={block.items} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {service.closing && (
        <p className="sd-closing">{service.closing}</p>
      )}
    </section>
  );
}

export default function ServiceDetail({ service }: Props) {
  if (service.layout === "unified") {
    return <UnifiedServiceDetail service={service} />;
  }

  if (service.layout === "dark") {
    return <DarkPlanningServiceDetail service={service} />;
  }

  return <DefaultServiceDetail service={service} />;
}
