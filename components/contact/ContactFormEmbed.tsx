"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import {
  DEFAULT_EMBED_HEIGHT,
  EMBED_FORM_SCRIPT_SRC,
  getEmbedIframeDataAttributes,
  readStoredEmbedHeight,
  storeEmbedHeight,
} from "@/lib/embed-form";
import { INQUIRY_FORM_SRC } from "@/lib/contact-data";

export default function ContactFormEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Seed an initial height so the form doesn't jump from the default 150px
    // iframe height before LeadConnector's form_embed.js takes over.
    const stored = readStoredEmbedHeight();
    if (stored > 160) {
      iframe.style.minHeight = `${stored}px`;
    }

    // form_embed.js (iframe-resizer) sets the iframe's height directly to fit
    // the form. Watch that and remember it for the next visit.
    const observer = new ResizeObserver(() => {
      const next = iframe.offsetHeight;
      if (next > 160) storeEmbedHeight(next);
    });
    observer.observe(iframe);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="contact-form-embed">
      <iframe
        ref={iframeRef}
        src={INQUIRY_FORM_SRC}
        scrolling="no"
        style={{
          width: "100%",
          minHeight: `${DEFAULT_EMBED_HEIGHT}px`,
          border: "none",
          borderRadius: 0,
        }}
        {...getEmbedIframeDataAttributes()}
        title="Website Inquiry Form"
      />
      <Script src={EMBED_FORM_SCRIPT_SRC} strategy="afterInteractive" />
    </div>
  );
}
