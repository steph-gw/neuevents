"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { InquiryFormProvider, InquiryFormSlot } from "@/components/InquiryForm";

type InquiryModalOptions = {
  title?: string;
  description?: string;
};

type InquiryModalContextValue = {
  openInquiry: (options?: InquiryModalOptions) => void;
  closeInquiry: () => void;
};

const DEFAULT_INQUIRY_TITLE = "Let's Connect";
const DEFAULT_INQUIRY_DESCRIPTION =
  "We'd love to hear about your celebration. Share a few details below and we'll be in touch to start the conversation.";

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
  const [title, setTitle] = useState(DEFAULT_INQUIRY_TITLE);
  const [description, setDescription] = useState(DEFAULT_INQUIRY_DESCRIPTION);

  const openInquiry = useCallback((options?: InquiryModalOptions) => {
    setTitle(options?.title ?? DEFAULT_INQUIRY_TITLE);
    setDescription(options?.description ?? DEFAULT_INQUIRY_DESCRIPTION);
    setIsOpen(true);
  }, []);
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
            aria-labelledby="inquiry-modal-title"
            aria-describedby="inquiry-modal-description"
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

            <div className="inquiry-modal-scroll">
              <div className="inquiry-modal-header">
                <p className="inquiry-modal-eyebrow hv2-eyebrow">Get in Touch</p>
                <h2 id="inquiry-modal-title" className="inquiry-modal-title hv2-serif">
                  {title}
                </h2>
                <p id="inquiry-modal-description" className="inquiry-modal-lead">
                  {description}
                </p>
              </div>

              <div className="inquiry-modal-body">
                <InquiryFormSlot slot="modal" />
              </div>
            </div>
          </div>
        </div>
    </InquiryModalContext.Provider>
    </InquiryFormProvider>
  );
}
