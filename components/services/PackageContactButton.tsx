"use client";

import { useInquiryModal } from "@/components/InquiryModal";

type Props = {
  className?: string;
};

export default function PackageContactButton({
  className = "svc-v2-pkg-contact-btn hv2-btn-primary",
}: Props) {
  const { openInquiry } = useInquiryModal();

  return (
    <button type="button" className={className} onClick={() => openInquiry()}>
      Contact Us
    </button>
  );
}
