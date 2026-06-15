"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { INQUIRY_FORM_SRC } from "@/lib/contact-data";

type SlotName = "preload" | "contact" | "modal";

const MIN_LOADER_MS = 800;

type InquiryFormContextValue = {
  registerSlot: (name: SlotName, el: HTMLElement | null) => void;
  loaderVisible: boolean;
};

const InquiryFormContext = createContext<InquiryFormContextValue | null>(null);

function useInquiryForm() {
  const ctx = useContext(InquiryFormContext);
  if (!ctx) {
    throw new Error("InquiryFormSlot must be used within InquiryFormProvider");
  }
  return ctx;
}

export function InquiryFormProvider({
  children,
  modalOpen,
}: {
  children: React.ReactNode;
  modalOpen: boolean;
}) {
  const pathname = usePathname();
  const [slots, setSlots] = useState<Partial<Record<SlotName, HTMLElement>>>({});
  const [isReady, setIsReady] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const preloadRef = useRef<HTMLDivElement>(null);
  const readyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loaderTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activatedAtRef = useRef(Date.now());

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

  useEffect(() => {
    const markReady = () => {
      if (readyTimerRef.current) clearTimeout(readyTimerRef.current);
      readyTimerRef.current = setTimeout(() => {
        setIsReady(true);
      }, 350);
    };

    const onMessage = (e: MessageEvent) => {
      if (e.data?.type !== "embed_resize" || !iframeRef.current) return;

      const height = Number(e.data.height);
      if (!Number.isFinite(height) || height < 160) return;

      iframeRef.current.style.height = `${height}px`;
      markReady();
    };

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      if (readyTimerRef.current) clearTimeout(readyTimerRef.current);
    };
  }, []);

  const activeSlot: SlotName = modalOpen
    ? "modal"
    : pathname === "/contact"
      ? "contact"
      : "preload";

  const isUserFacing = activeSlot !== "preload";

  useEffect(() => {
    if (!isUserFacing) return;

    activatedAtRef.current = Date.now();
    setLoaderVisible(true);

    if (loaderTimerRef.current) clearTimeout(loaderTimerRef.current);
  }, [isUserFacing, modalOpen, pathname]);

  useEffect(() => {
    if (!isUserFacing || !isReady) return;

    const elapsed = Date.now() - activatedAtRef.current;
    const remaining = Math.max(0, MIN_LOADER_MS - elapsed);

    if (loaderTimerRef.current) clearTimeout(loaderTimerRef.current);
    loaderTimerRef.current = setTimeout(() => {
      setLoaderVisible(false);
    }, remaining);

    return () => {
      if (loaderTimerRef.current) clearTimeout(loaderTimerRef.current);
    };
  }, [isUserFacing, isReady, modalOpen, pathname]);

  const target = slots[activeSlot] ?? slots.preload;
  const showForm = isReady && !loaderVisible;

  const iframe = (
    <iframe
      ref={iframeRef}
      id="inquiry-embed-frame"
      src={INQUIRY_FORM_SRC}
      title="Inquiry form"
      style={{ width: "100%", border: "none" }}
      scrolling="no"
    />
  );

  return (
    <InquiryFormContext.Provider value={{ registerSlot, loaderVisible }}>
      {children}
      <div ref={preloadRef} className="inquiry-form-preload" aria-hidden="true" />
      {target &&
        createPortal(
          <div
            className={`inquiry-embed${showForm ? " inquiry-embed--ready" : " inquiry-embed--loading"}`}
          >
            {iframe}
          </div>,
          target,
        )}
    </InquiryFormContext.Provider>
  );
}

type InquiryFormSlotProps = {
  slot: Exclude<SlotName, "preload">;
  className?: string;
};

export function InquiryFormSlot({ slot, className }: InquiryFormSlotProps) {
  const { registerSlot, loaderVisible } = useInquiryForm();

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
      <div
        className={`inquiry-embed-loader${loaderVisible ? "" : " inquiry-embed-loader--done"}`}
        aria-live="polite"
        aria-busy={loaderVisible}
      >
        <span className="inquiry-embed-spinner" aria-hidden />
        <p className="inquiry-embed-loader-text">Loading form…</p>
      </div>
      <div ref={setContainerRef} className="inquiry-form-slot" />
    </div>
  );
}
