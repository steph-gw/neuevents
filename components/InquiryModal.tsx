"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { InquiryFormProvider, InquiryFormSlot } from "@/components/InquiryForm";

type InquiryModalContextValue = {
  openInquiry: () => void;
  closeInquiry: () => void;
};

const InquiryModalContext = createContext<InquiryModalContextValue | null>(null);

export function useInquiryModal() {
  const ctx = useContext(InquiryModalContext);
  if (!ctx) {
    throw new Error("useInquiryModal must be used within InquiryModalProvider");
  }
  return ctx;
}

export function InquiryModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openInquiry = useCallback(() => setIsOpen(true), []);
  const closeInquiry = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeInquiry();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeInquiry]);

  return (
    <InquiryFormProvider modalOpen={isOpen}>
    <InquiryModalContext.Provider value={{ openInquiry, closeInquiry }}>
      {children}

      <div
        className={`inquiry-modal${isOpen ? "" : " inquiry-modal--hidden"}`}
        role="presentation"
        aria-hidden={!isOpen}
        inert={!isOpen}
        onClick={isOpen ? closeInquiry : undefined}
      >
          <div
            className="inquiry-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Inquiry form"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="inquiry-modal-close"
              onClick={closeInquiry}
              aria-label="Close inquiry form"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="inquiry-modal-body">
              <InquiryFormSlot slot="modal" />
            </div>
          </div>
        </div>
    </InquiryModalContext.Provider>
    </InquiryFormProvider>
  );
}
