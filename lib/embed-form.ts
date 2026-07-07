import { LEAD_CONNECTOR_FORM_ID } from "@/lib/contact-data";

export const DEFAULT_EMBED_HEIGHT = 1180;
export const EMBED_HEIGHT_STORAGE_KEY = "neu-inquiry-embed-height";
export const EMBED_FORM_SCRIPT_SRC = "https://link.msgsndr.com/js/form_embed.js";

export function readStoredEmbedHeight(): number {
  if (typeof window === "undefined") return DEFAULT_EMBED_HEIGHT;

  const stored = sessionStorage.getItem(EMBED_HEIGHT_STORAGE_KEY);
  const height = Number(stored);
  return Number.isFinite(height) && height >= 160 ? height : DEFAULT_EMBED_HEIGHT;
}

export function storeEmbedHeight(height: number) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(EMBED_HEIGHT_STORAGE_KEY, String(Math.round(height)));
}

export function getEmbedIframeId() {
  return `inline-${LEAD_CONNECTOR_FORM_ID}`;
}

export function getEmbedIframeDataAttributes(height = DEFAULT_EMBED_HEIGHT) {
  const iframeId = getEmbedIframeId();

  return {
    id: iframeId,
    "data-layout": "{'id':'INLINE'}",
    "data-trigger-type": "alwaysShow",
    "data-trigger-value": "",
    "data-activation-type": "alwaysActivated",
    "data-activation-value": "",
    "data-deactivation-type": "neverDeactivate",
    "data-deactivation-value": "",
    "data-form-name": "Website Inquiry Form",
    "data-height": String(height),
    "data-layout-iframe-id": iframeId,
    "data-form-id": LEAD_CONNECTOR_FORM_ID,
  } as const;
}
