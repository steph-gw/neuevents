"use client";

import type { ReactNode } from "react";
import { useInquiryModal } from "@/components/InquiryModal";

type Props = {
  className?: string;
  children?: ReactNode;
};

export default function InquiryButton({
  className = "btn btn-gold",
  children = "Send an Inquiry",
}: Props) {
  const { openInquiry } = useInquiryModal();

  return (
    <a
      href="#"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        openInquiry();
      }}
    >
      {children}
    </a>
  );
}
