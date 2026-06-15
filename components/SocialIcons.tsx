import { Facebook, Instagram } from "react-feather";
import { CONTACT_SOCIAL_LINKS } from "@/lib/contact-data";

export function YelpIcon({
  size = 18,
  strokeWidth = 1.5,
}: {
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

export const SOCIAL_ICONS = {
  Facebook,
  Instagram,
  Yelp: YelpIcon,
} as const;

export { CONTACT_SOCIAL_LINKS };
