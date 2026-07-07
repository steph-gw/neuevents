"use client";

import Script from "next/script";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { useEmbedFormResize } from "@/hooks/useEmbedFormResize";
import {
  EMBED_FORM_SCRIPT_SRC,
  getEmbedIframeDataAttributes,
} from "@/lib/embed-form";
import { INQUIRY_FORM_SRC } from "@/lib/contact-data";

type SlotName = "preload" | "modal";

type InquiryFormContextValue = {
  registerSlot: (name: SlotName, el: HTMLElement | null) => void;
};

const InquiryFormContext = createContext<InquiryFormContextValue | null>(null);

function useInquiryForm() {
  const ctx = useContext(InquiryFormContext);
  if (!ctx) {
    throw new Error("InquiryFormSlot must be used within InquiryFormProvider");
  }
  return ctx;
}

function InquiryEmbedIframe({
  iframeRef,
  height,
}: {
  iframeRef: RefObject<HTMLIFrameElement | null>;
  height: number;
}) {
  return (
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
  );
}

export function InquiryFormProvider({
  children,
  modalOpen,
}: {
  children: React.ReactNode;
  modalOpen: boolean;
}) {
  const [slots, setSlots] = useState<Partial<Record<SlotName, HTMLElement>>>({});
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const preloadRef = useRef<HTMLDivElement>(null);
  const height = useEmbedFormResize(iframeRef);

  const registerSlot = useCallback((name: SlotName, el: HTMLElement | null) => {
    setSlots((prev) => {
      const next = { ...prev };
      if (el) next[name] = el;
      else delete next[name];
      return next;
    });
  }, []);

  useEffect(() => {
    registerSlot("preload", preloadRef.current);
    return () => registerSlot("preload", null);
  }, [registerSlot]);

  const target = modalOpen ? (slots.modal ?? slots.preload) : slots.preload;

  return (
    <InquiryFormContext.Provider value={{ registerSlot }}>
      <Script src={EMBED_FORM_SCRIPT_SRC} strategy="lazyOnload" />
      {children}
      <div ref={preloadRef} className="inquiry-form-preload" aria-hidden="true" />
      {target &&
        createPortal(
          <div
            className="inquiry-embed"
            style={{ height: `${height}px`, overflow: "hidden" }}
          >
            <InquiryEmbedIframe iframeRef={iframeRef} height={height} />
          </div>,
          target,
        )}
    </InquiryFormContext.Provider>
  );
}

type InquiryFormSlotProps = {
  slot: "modal";
  className?: string;
};

export function InquiryFormSlot({ slot, className }: InquiryFormSlotProps) {
  const { registerSlot } = useInquiryForm();

  const setContainerRef = useCallback(
    (el: HTMLDivElement | null) => {
      registerSlot(slot, el);
    },
    [slot, registerSlot],
  );

  const wrapClass = className
    ? `inquiry-form-slot-wrap ${className}`
    : "inquiry-form-slot-wrap";

  return (
    <div className={wrapClass}>
      <div ref={setContainerRef} className="inquiry-form-slot" />
    </div>
  );
}
