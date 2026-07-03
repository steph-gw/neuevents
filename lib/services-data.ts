import { HOME_SERVICES } from "@/lib/data";
import { WEDDING_SERVICES_PDF } from "@/lib/contact-data";

export const SERVICE_CATEGORY_ANCHORS = [
  "wedding-services",
  "event-services",
  "celebration-of-life",
  "travel-services",
] as const;

export const SERVICES_CATEGORIES = HOME_SERVICES.map((service, index) => ({
  ...service,
  anchor: SERVICE_CATEGORY_ANCHORS[index],
}));

export type WeddingPackage = {
  id: string;
  eyebrow: string;
  price: string;
  description: string;
  includes: readonly string[];
  footnote?: string;
  pdfHref?: string;
  image?: string;
  imageAlt?: string;
};

export const WEDDING_PACKAGES: readonly WeddingPackage[] = [
  {
    id: "the-big-day",
    eyebrow: "The Big Day",
    price: "Starting at $3,500",
    description:
      "Enjoy start-to-finish coordination on your wedding day for the greatest peace of mind.",
    includes: [
      "An extensive (3–4 hr) pre-wedding briefing session",
      "Timeline and program review at the briefing session",
      "Attendance and/or conducting of rehearsal",
      "Vendor confirmation prior to the wedding",
      "Coordination of and communication with vendors on the day of the wedding",
      "Up to three coordinators (and sometimes more!) on-site, overseeing every detail",
    ],
    pdfHref: WEDDING_SERVICES_PDF,
  },
  {
    id: "wedding-wrap-up",
    eyebrow: "Wedding Wrap Up",
    price: "Starting at $6,000",
    description:
      "With just three months to go before your wedding day, feel confident that all of the final details will be carefully considered and addressed.",
    includes: [
      "Regular meetings (in person, by phone, or by Skype) with your consultant",
      "Extensive support via email and phone to keep you on track as the big day approaches",
      "Program planning",
      "Wedding day timeline creation",
      "Includes The Big Day services",
    ],
    pdfHref: WEDDING_SERVICES_PDF,
  },
  {
    id: "wedding-coordination",
    eyebrow: "Wedding Coordination",
    price: "Starting at $9,000",
    description:
      "Six months before your wedding day, your coordinator will come on board to help you coordinate all vendors booked for your wedding, and to advise and guide you through the rest of the wedding planning process.",
    includes: [
      "Coordination of vendors' services",
      "Appointment and meeting scheduling",
      "Regular meetings with your coordinator",
      "Program planning, budget planning, and wedding day timeline management",
      "Attendance of finalization meeting with caterer or hotel catering manager",
      "Includes Wedding Wrap-Up services",
    ],
    pdfHref: WEDDING_SERVICES_PDF,
  },
  {
    id: "complete-consultation",
    eyebrow: "Complete Consultation & Coordination",
    price: "Starting at $14,000",
    description:
      "Enjoy a year's worth of start-to-finish planning including vendor booking, logistics, and on-site (\"day of\") coordination.",
    includes: [
      "Regular meetings to keep plans moving forward",
      "Unlimited emails and phone calls within the year leading up to your wedding",
      "Tailored vendor recommendations based on style & preferences",
      "Scheduling of consultations, meetings, appointments, fittings, hair and make-up sessions, etc.",
      "Timeline and budget worksheet creation and updates",
      "Payment distribution option through the neu events' client trust account (additional fees apply)",
      "Includes Wedding Coordination services",
    ],
    pdfHref: WEDDING_SERVICES_PDF,
  },
  {
    id: "the-full-experience",
    eyebrow: "The Full Experience",
    price: "Starting at $16,000",
    description:
      "Our premium service for the most discriminating couple! neu events will personally help you design and plan the ultimate wedding with as much as a year's worth of planning services at your disposal.",
    includes: [
      "Vendor booking assistance (research of venue and vendors; presentation of options; and scheduling and attendance of site visits and consultations) to best enable you to pick key elements and services for your wedding",
      "Consultation and coordination of various wedding-related services, including pre-wedding activities for wedding party and out-of-town guests, and post-wedding events",
      "Event design and conception of unique themes",
      "Scheduling and attendance of appointments",
      "Includes Complete Consultation and Coordination services",
    ],
    footnote:
      "Early booking is strongly recommended to reserve your wedding date. Inquire about rates if services are desired more than one year in advance.",
    pdfHref: WEDDING_SERVICES_PDF,
    image: "/images/services/the-full-experience.jpg",
    imageAlt:
      "Bride and groom cutting their wedding cake with a ceremonial sword at an evening reception in Hawai'i",
  },
] as const;

export type ServiceFeature = {
  id: string;
  eyebrow: string;
  title: string;
  titleEm?: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  image: string;
  imageAlt: string;
  photoCredit?: string;
  reverse?: boolean;
};

export const EVENT_SERVICES_INTRO = {
  title: "Event Services",
  titleEm: "Tailored to You",
  lead:
    "Pricing for special events are tailored to the unique needs of each client and event. Contact us to schedule a complimentary consultation and from there, we would be happy to prepare a custom proposal for you.",
} as const;

export const EVENT_SERVICE_FEATURES: readonly ServiceFeature[] = [
  {
    id: "event-planning",
    eyebrow: "Event Planning and Coordination",
    title: "Effortless Event",
    titleEm: "Planning",
    paragraphs: [
      "Planning an event can be overwhelming. With so many moving parts, it is easy to feel stressed and lost in the details. That is where we come in! Our expert event planning services are designed to save you time and eliminate the hassle, so you can focus on what matters most – enjoying the experience.",
      "From concept to execution, our team of professionals will handle every aspect of your event, ensuring everything runs smoothly and on schedule. With decades of experience and a keen eye for detail, we take the guesswork out of the process, making your event not only stress-free but unforgettable.",
    ],
    bullets: [
      "Full-service event coordination (corporate, social, weddings, and more)",
      "Vendor management and negotiation",
      "Seamless logistics and timeline creation",
      "Budget management and cost-saving strategies",
      "Personalized attention to your unique vision",
    ],
    image: "/images/services/event-services.jpg",
    imageAlt:
      "A wide view of a fully staged ballroom featuring coordinated round-table seating, refined place settings, and warm uplighting that transforms the space for a large-scale gala.",
    photoCredit: "Vivir Photography",
  },
  {
    id: "event-design",
    eyebrow: "Event Design",
    title: "Designing the",
    titleEm: "Guest Experience",
    paragraphs: [
      "We design the guest's experience from a creative and aesthetic perspective.",
    ],
    image: "/images/hero/hero-02.webp",
    imageAlt:
      "Public Schools of Hawaiʻi Foundation gala dinner with guests seated at round tables in a ballroom",
    photoCredit: "Love Story Weddings",
    reverse: true,
  },
  {
    id: "event-production",
    eyebrow: "Event Production",
    title: "Start-to-Finish",
    titleEm: "Production",
    paragraphs: [
      "Don't know where to begin? With our event production services we'll take you through the planning process from start-to-finish. We will research and bring in the vendors, coordinate logistics, prepare your timeline, and meet with you regularly to help you every step of the way.",
    ],
    image: "/images/hero/hero-10.jpg",
    imageAlt:
      "Elegantly set wedding reception tables with floral centerpieces and candles",
    photoCredit: "Eric Arii",
  },
] as const;

export const EVENT_PAST_CLIENTS = [
  "Aloha Cones",
  "Anteprima",
  "Assets School",
  "Central Union Preschool",
  "Curacao",
  "Curate",
  "Form Partners",
  "Happily Ever After",
  "Hawai'i Farm Bureau",
  "Hawai'i State Coalition Against Domestic Violence",
  "Hawai'i State Department of Health",
  "Healthcare Association of Hawai'i",
  "Isle Media",
  "John A. Burns School of Medicine",
  "Kaka'ako Wine Loft",
  "MVNP",
  "Nordic PCL",
  "Pacific Edge Magazine and Green Magazine",
  "Public Schools of Hawai'i Foundation",
  "Royal Hawaiian Center",
  "Tech Trans International",
  "The Hawai'i Group",
  "The Knot",
  "YIM Investment",
] as const;

export const CELEBRATION_OF_LIFE: ServiceFeature = {
  id: "celebration-of-life",
  eyebrow: "Celebration of Life",
  title: "Honoring a",
  titleEm: "Life Well Lived",
  paragraphs: [
    "It is always hard to say goodbye to loved ones, but what better way to honor them than with a gathering of family and friends to cherish memories with them (if they are still with us), or of them (if they have passed).",
    "We make the difficult task of preparing a celebration of life event manageable by handling the details for you so that you can focus on the \"big picture,\" which is spending time with those who are dear and honoring the life of someone special.",
    "Contact us for information on our planning services for Celebrations of Life.",
  ],
  image: "/images/services/celebration-of-life.jpg",
  imageAlt:
    "Soft white floral arrangement nestled around a lit ivory taper candle framed in a clear glass vase.",
  photoCredit: "The Present Perfect",
};

export type TravelServiceCard = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export const TRAVEL_SERVICE_CARDS: readonly TravelServiceCard[] = [
  {
    id: "accommodations",
    eyebrow: "Accommodations",
    title: "Hotel & Room Blocks",
    description:
      "Find the perfect hotel for your group and save up to 22%. This is an excellent way to reserve your room block and receive competitive quotes.",
    ctaLabel: "Book Accommodations",
    ctaHref:
      "https://neuevents.partners.engine.com/new-trip?utm_source=neuevents&utm_medium=channel&utm_campaign=2025-q2-neuevents-channel-groups-a01Hs00001zyi7bIAA&referral=MKT%20-%20Partner",
  },
  {
    id: "activities",
    eyebrow: "Activities",
    title: "Hawai'i Experiences",
    description:
      "Interested in lu`au, water sports, cruises, and more? Book your Hawai'i activities here!",
    ctaLabel: "Book Activities",
    ctaHref: "https://neuevents.activiter.com/",
  },
  {
    id: "car-rentals",
    eyebrow: "Car Rentals",
    title: "Blue Diamond Car Rental",
    description:
      "Rent a car with Blue Diamond Car Rental, Hawaii's top-rated rental company.",
    ctaLabel: "Book a Car",
    ctaHref: "https://cars.bluediamondvacations.com?PC=C-NEU",
  },
] as const;
