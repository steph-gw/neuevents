"use client";

import Image from "next/image";
import { useState } from "react";
import { useInquiryModal } from "@/components/InquiryModal";
import PackageContactButton from "@/components/services/PackageContactButton";
import PhotoCreditOverlay from "@/components/PhotoCreditOverlay";
import { WEDDING_PACKAGES, type WeddingPackage } from "@/lib/services-data";

const WEDDING_PACKAGES_BY_PRICE = [...WEDDING_PACKAGES].sort((a, b) => {
  const priceA = Number(a.price.replace(/[^\d]/g, ""));
  const priceB = Number(b.price.replace(/[^\d]/g, ""));
  return priceB - priceA;
});

function formatPackagePrice(price: string) {
  const match = price.match(/^(Starting at)\s+(\$.+)/);
  if (!match) return price;

  return (
    <>
      {match[1]}{" "}
      <span className="svc-v2-plan-price-amount">{match[2]}</span>
    </>
  );
}

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

function PackageIncluded({
  pkg,
  open,
  onToggle,
}: {
  pkg: WeddingPackage;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `wedding-pkg-included-${pkg.id}`;
  const { openInquiry } = useInquiryModal();

  return (
    <div
      className={`svc-v2-plan-included${
        open ? " svc-v2-plan-included--open" : " svc-v2-plan-included--closed"
      }`}
    >
      <button
        type="button"
        className="svc-v2-plan-included-toggle"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="svc-v2-plan-included-label">What&apos;s Included</span>
        <span className="svc-v2-plan-included-action">
          <span
            className={`svc-v2-plan-included-hint${
              open ? " svc-v2-plan-included-hint--hidden" : ""
            }`}
            aria-hidden={open}
          >
            Tap to expand
          </span>
          <ExpandIndicator open={open} />
        </span>
      </button>

      <div id={panelId} className="svc-v2-plan-included-panel" hidden={!open}>
        <div className="svc-v2-plan-included-inner">
          <ul className="svc-v2-pkg-list">
            {pkg.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {pkg.footnote ? (
            <p className="svc-v2-pkg-footnote">{pkg.footnote}</p>
          ) : null}
          <button
            type="button"
            className="svc-v2-pkg-pdf"
            onClick={() => openInquiry()}
          >
            Contact us for additional information
          </button>
        </div>
      </div>
    </div>
  );
}

function PlanningCard({
  pkg,
  imageOnLeft,
}: {
  pkg: WeddingPackage;
  imageOnLeft: boolean;
}) {
  const [includedOpen, setIncludedOpen] = useState(false);

  return (
    <article className="svc-v2-plan-card">
      <div
        className={`svc-v2-plan-hero${
          imageOnLeft ? " svc-v2-plan-hero--reverse" : ""
        }`}
      >
        <div className="svc-v2-plan-hero-text">
          <p className="svc-v2-plan-price">{formatPackagePrice(pkg.price)}</p>
          <h3 className="svc-v2-plan-title hv2-serif">{pkg.eyebrow}</h3>
          <p className="svc-v2-plan-lead">{pkg.lead}</p>
          {pkg.intro ? <p className="svc-v2-plan-intro">{pkg.intro}</p> : null}
          <PackageContactButton className="svc-v2-plan-contact-btn hv2-btn-primary" />
        </div>
        {pkg.image ? (
          <div className="svc-v2-plan-photo">
            <Image
              src={pkg.image}
              alt={pkg.imageAlt ?? pkg.eyebrow}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              quality={90}
            />
            {pkg.photoCredit ? (
              <PhotoCreditOverlay
                name={pkg.photoCredit.name}
                href={pkg.photoCredit.href}
              />
            ) : null}
          </div>
        ) : (
          <div
            className="svc-v2-plan-photo svc-v2-plan-photo--placeholder"
            aria-hidden="true"
          />
        )}
      </div>

      <PackageIncluded
        pkg={pkg}
        open={includedOpen}
        onToggle={() => setIncludedOpen((prev) => !prev)}
      />
    </article>
  );
}

export default function WeddingPackagesCollapsible() {
  return (
    <div className="svc-v2-plan-stack">
      {WEDDING_PACKAGES_BY_PRICE.map((pkg, index) => (
        <PlanningCard key={pkg.id} pkg={pkg} imageOnLeft={index % 2 === 1} />
      ))}
    </div>
  );
}
