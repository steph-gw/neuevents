"use client";

import Script from "next/script";
import { INQUIRY_FORM_SRC, LEAD_CONNECTOR_FORM_ID } from "@/lib/contact-data";

export default function ContactFormEmbed() {
  const iframeId = `inline-${LEAD_CONNECTOR_FORM_ID}`;

  return (
    <div className="contact-form-embed">
      <iframe
        src={INQUIRY_FORM_SRC}
        style={{ width: "100%", height: "1574px", border: "none", borderRadius: 0 }}
        scrolling="no"
        id={iframeId}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Website Inquiry Form"
        data-height="1574"
        data-layout-iframe-id={iframeId}
        data-form-id={LEAD_CONNECTOR_FORM_ID}
        title="Website Inquiry Form"
      />
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
