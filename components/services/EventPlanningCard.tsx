"use client";

import Image from "next/image";
import { useState } from "react";
import PackageContactButton from "@/components/services/PackageContactButton";
import type { ServiceFeature } from "@/lib/services-data";

function ExpandIndicator({ open }: { open: boolean }) {
  return (
    <span
      className={`svc-v2-plan-expand${open ? " svc-v2-plan-expand--open" : ""}`}
    >
      {!open ? <span className="svc-v2-plan-expand-pulse" aria-hidden="true" /> : null}
      <svg
        className="svc-v2-plan-expand-icon"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 5.5L7 9.5L11 5.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function EventPlanningCard({ feature }: { feature: ServiceFeature }) {
  const [includedOpen, setIncludedOpen] = useState(false);
  const panelId = `event-planning-included-${feature.id}`;

  return (
    <article className="svc-v2-plan-card svc-v2-plan-card--dark">
      <div className="svc-v2-plan-hero">
        <div className="svc-v2-plan-hero-text">
          <p className="svc-v2-plan-eyebrow">{feature.eyebrow}</p>
          <h3 className="svc-v2-plan-title hv2-serif">
            {feature.titleEm
              ? `${feature.title} ${feature.titleEm}`
              : feature.title}
          </h3>
          {feature.paragraphs.map((paragraph) => (
            <p key={paragraph} className="svc-v2-plan-lead">
              {paragraph}
            </p>
          ))}
          <PackageContactButton className="svc-v2-plan-contact-btn svc-v2-plan-contact-btn--dark hv2-btn-primary" />
        </div>
        <div className="svc-v2-plan-photo">
          <Image
            src={feature.image}
            alt={feature.imageAlt}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            quality={90}
          />
        </div>
      </div>

      {feature.bullets && feature.bullets.length > 0 ? (
        <div
          className={`svc-v2-plan-included${
            includedOpen ? " svc-v2-plan-included--open" : " svc-v2-plan-included--closed"
          }`}
        >
          <button
            type="button"
            className="svc-v2-plan-included-toggle"
            onClick={() => setIncludedOpen((prev) => !prev)}
            aria-expanded={includedOpen}
            aria-controls={panelId}
          >
            <span className="svc-v2-plan-included-label">What&apos;s Included</span>
            <span className="svc-v2-plan-included-action">
              <span
                className={`svc-v2-plan-included-hint${
                  includedOpen ? " svc-v2-plan-included-hint--hidden" : ""
                }`}
                aria-hidden={includedOpen}
              >
                Tap to expand
              </span>
              <ExpandIndicator open={includedOpen} />
            </span>
          </button>

          <div id={panelId} className="svc-v2-plan-included-panel" hidden={!includedOpen}>
            <div className="svc-v2-plan-included-inner">
              <ul className="svc-v2-pkg-list">
                {feature.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
