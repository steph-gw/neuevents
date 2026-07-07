"use client";

import Script from "next/script";
import { useRef } from "react";
import { useEmbedFormResize } from "@/hooks/useEmbedFormResize";
import {
  EMBED_FORM_SCRIPT_SRC,
  getEmbedIframeDataAttributes,
} from "@/lib/embed-form";
import { INQUIRY_FORM_SRC } from "@/lib/contact-data";

export default function ContactFormEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const height = useEmbedFormResize(iframeRef);

  return (
    <div
      className="contact-form-embed"
      style={{ height: `${height}px`, overflow: "hidden" }}
    >
      <iframe
        ref={iframeRef}
        src={INQUIRY_FORM_SRC}
        style={{
          width: "100%",
          height: `${height}px`,
          border: "none",
          borderRadius: 0,
        }}
        {...getEmbedIframeDataAttributes(height)}
        title="Website Inquiry Form"
      />
      <Script src={EMBED_FORM_SCRIPT_SRC} strategy="afterInteractive" />
    </div>
  );
}
