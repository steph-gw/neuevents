"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { ServiceIncludedBlock } from "@/lib/services-data";

type Props = {
  blocks: readonly ServiceIncludedBlock[];
  label?: string;
  variant?: "light" | "dark";
  collapsible?: boolean;
  panelId?: string;
};

function BlockList({ items }: { items: readonly string[] }) {
  return (
    <ul className="sd-list fp-items">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function IncludedBlock({ block }: { block: ServiceIncludedBlock }) {
  return (
    <div className="fp-block">
      <div className="fp-block-header">
        <div className="fp-block-num" aria-hidden="true">
          {block.number}
        </div>
        <h3 className="fp-section-label fp-block-title">{block.heading}</h3>
      </div>
      <div className="fp-block-body">
        {block.credentials ? (
          <div
            className={`fp-creds-grid${
              block.credentials.length >= 4 ? " fp-creds-grid--quad" : ""
            }`}
          >
            {block.credentials.map((cred) => (
              <div key={`${cred.org}-${cred.title}`} className="fp-cred-card">
                <p className="fp-cred-org">{cred.org}</p>
                <p className="fp-cred-title">{cred.title}</p>
              </div>
            ))}
          </div>
        ) : block.items ? (
          <BlockList items={block.items} />
        ) : null}
      </div>
    </div>
  );
}

function ExpandIndicator({ open }: { open: boolean }) {
  return (
    <span className={`fp-expand-indicator${open ? " fp-expand-indicator--open" : ""}`}>
      {!open ? <span className="fp-expand-pulse" aria-hidden="true" /> : null}
      <svg
        className="fp-expand-icon"
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

export default function PlanningCardIncluded({
  blocks,
  label = "What's Included",
  variant = "light",
  collapsible = false,
  panelId = "fp-included-panel",
}: Props) {
  const searchParams = useSearchParams();
  const shouldStartOpen = collapsible && searchParams.get("open") === panelId;
  const [open, setOpen] = useState(shouldStartOpen);

  useEffect(() => {
    if (collapsible && searchParams.get("open") === panelId) {
      setOpen(true);
    }
  }, [collapsible, panelId, searchParams]);

  const blocksContent = (
    <div className="fp-blocks">
      {blocks.map((block) => (
        <IncludedBlock key={block.number} block={block} />
      ))}
    </div>
  );

  if (!collapsible) {
    return (
      <div className="fp-included">
        <div className="fp-included-header">
          <span className="fp-section-label fp-included-label">{label}</span>
        </div>
        {blocksContent}
      </div>
    );
  }

  return (
    <div
      className={`fp-included fp-included--collapsible${
        open ? " fp-included--open" : " fp-included--closed"
      }${variant === "dark" ? " fp-included--dark" : ""}`}
    >
      <button
        type="button"
        className="fp-included-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="fp-section-label fp-included-label">{label}</span>
        <span className="fp-included-toggle-action">
          <span
            className={`fp-included-toggle-hint${
              open ? " fp-included-toggle-hint--hidden" : ""
            }`}
            aria-hidden={open}
          >
            Tap to expand
          </span>
          <ExpandIndicator open={open} />
        </span>
      </button>

      <div
        id={panelId}
        className="fp-included-panel"
        hidden={!open}
      >
        {blocksContent}
      </div>
    </div>
  );
}
