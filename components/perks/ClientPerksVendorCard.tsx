"use client";

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import type { ClientPerkVendor } from "@/lib/client-perks-data";

type Props = {
  vendor: ClientPerkVendor;
  categoryName: string;
};

function PromoCodeCopy({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="client-perks-v2-code-block"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <span className="client-perks-v2-code-label">Promo code</span>
      <div className="client-perks-v2-code-row">
        <code className="client-perks-v2-code-value">{code}</code>
        <button
          type="button"
          className={`client-perks-v2-code-copy${copied ? " is-copied" : ""}`}
          onClick={handleCopy}
          aria-label={copied ? "Copied to clipboard" : `Copy promo code ${code}`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export default function ClientPerksVendorCard({ vendor, categoryName }: Props) {
  const outboundHref = vendor.website ?? vendor.link?.href ?? (vendor.email ? `mailto:${vendor.email}` : undefined);
  const isClickable = Boolean(outboundHref);
  const placeholderLetter = vendor.name.trim().charAt(0).toUpperCase() || "V";

  return (
    <li
      className={`client-perks-v2-vendor-card${
        isClickable ? " client-perks-v2-vendor-card--clickable" : ""
      }`}
    >
      <div className="client-perks-v2-vendor-inner">
        {vendor.image ? (
          <div className="client-perks-v2-vendor-media">
            <Image
              src={vendor.image}
              alt={vendor.imageAlt ?? vendor.name}
              fill
              sizes="(max-width: 640px) 100vw, 168px"
              quality={90}
            />
          </div>
        ) : (
          <div className="client-perks-v2-vendor-media client-perks-v2-vendor-media--placeholder">
            <span className="client-perks-v2-vendor-placeholder-letter" aria-hidden="true">
              {placeholderLetter}
            </span>
          </div>
        )}

        <div className="client-perks-v2-vendor-body">
          <div className="client-perks-v2-vendor-head">
            <h3 className="client-perks-v2-vendor-name hv2-serif">{vendor.name}</h3>
            <p className="client-perks-v2-vendor-category">{categoryName}</p>
          </div>

          <p className="client-perks-v2-vendor-desc">{vendor.description}</p>

          {vendor.details?.length ? (
            <ul className="client-perks-v2-vendor-details">
              {vendor.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          ) : null}

          {vendor.code ? <PromoCodeCopy code={vendor.code} /> : null}
        </div>

        {isClickable ? (
          <span className="client-perks-v2-vendor-chevron" aria-hidden="true">
            ›
          </span>
        ) : null}
      </div>

      {isClickable && outboundHref ? (
        <a
          href={outboundHref}
          className="client-perks-v2-vendor-hit"
          target={outboundHref.startsWith("mailto:") ? undefined : "_blank"}
          rel={outboundHref.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          aria-label={`Open ${vendor.name}`}
        />
      ) : null}
    </li>
  );
}
