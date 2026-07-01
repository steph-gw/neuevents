export const LEAD_CONNECTOR_FORM_ID = "cz87HPQFlFPd33SioAYJ";

export const INQUIRY_FORM_SRC =
  `https://api.leadconnectorhq.com/widget/form/${LEAD_CONNECTOR_FORM_ID}`;

export const CONTACT_EMAIL = "info@neuevents.com";
export const CONTACT_EMAIL_HREF = "mailto:info@neuevents.com";
export const CONTACT_OFFICE_PHONE = "808-524-5331";
export const CONTACT_OFFICE_PHONE_HREF = "tel:+18085245331";
export const CONTACT_MAILING_ADDRESS = "P.O. Box 2732, Honolulu, HI 96803";
export const ESTABLISHED_YEAR = 2000;

export const TIME_ZONE_CONVERTER_URL = "https://dateful.com/time-zone-converter";
export const WEDDING_SERVICES_PDF = "/documents/neu-events-wedding-services-2026.pdf";

export const CONSULTANTS = [
  {
    name: "Mona",
    role: "Founder & Lead Planner",
    image: "/images/contact/mona-headshot.png",
    bookingUrl: "https://info.neuevents.com/consult-with-mona",
  },
  {
    name: "Deni",
    role: "Senior Event Planner",
    image: "/images/contact/deni-headshot.png",
    bookingUrl: "https://info.neuevents.com/consult-with-deni",
  },
] as const;

export const CONTACT_SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/neuevents/",
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/neuevents/",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/neueventshawaii/",
  },
] as const;
