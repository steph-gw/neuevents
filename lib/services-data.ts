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
  title: string;
  titleEm?: string;
  price: string;
  description: string;
  lead: string;
  intro?: string;
  includes: readonly string[];
  footnote?: string;
  pdfHref?: string;
  image?: string;
  imageAlt?: string;
  photoCredit?: {
    name: string;
    href: string;
  };
};

export const WEDDING_PACKAGES: readonly WeddingPackage[] = [
  {
    id: "the-big-day",
    eyebrow: "The Big Day",
    title: "The Big",
    titleEm: "Day",
    price: "Starting at $4,000",
    description:
      "Enjoy start-to-finish coordination on your wedding day for the greatest peace of mind.",
    lead:
      "You've planned every detail — now let us bring it all together on the day itself with calm, expert coordination from first look to final send-off.",
    intro: "Ideal for couples who've handled planning and want flawless day-of execution.",
    includes: [
      "An extensive (3–4 hr) pre-wedding briefing session",
      "Timeline and program review at the briefing session",
      "Attendance and/or conducting of rehearsal",
      "Vendor confirmation prior to the wedding",
      "Coordination of and communication with vendors on the day of the wedding",
      "Up to three coordinators (and sometimes more!) on-site, overseeing every detail",
    ],
    pdfHref: WEDDING_SERVICES_PDF,
    image: "/images/services/the-big-day.png",
    imageAlt:
      "Bride and groom in traditional wedding attire with floral garlands during an outdoor ceremony",
    photoCredit: {
      name: "MD Photography",
      href: "https://mdphotographyhawaii.com/",
    },
  },
  {
    id: "wedding-wrap-up",
    eyebrow: "Wedding Wrap Up",
    title: "Wedding Wrap",
    titleEm: "Up",
    price: "Starting at $6,000",
    description:
      "With just three months to go before your wedding day, feel confident that all of the final details will be carefully considered and addressed.",
    lead:
      "With three months to go, we step in to finalize timelines, confirm vendors, and make sure that all your 'I's' are dotted and all your 't's' are crossed before your wedding day.",
    intro: "Includes everything in The Big Day",
    includes: [
      "Regular meetings (in person, by phone, or virtually) with your consultant",
      "Extensive support via email and phone to keep you on track as the big day approaches",
      "Program planning",
      "Wedding day timeline creation",
      "Floor plan creation",
      "Review of stationery and signage",
      "Includes The Big Day services",
    ],
    pdfHref: WEDDING_SERVICES_PDF,
    image: "/images/services/wedding-wrap-up.png",
    imageAlt:
      "Elegant semi-naked wedding cake with white roses and greenery on a gold stand",
    photoCredit: {
      name: "MD Photography",
      href: "https://mdphotographyhawaii.com/",
    },
  },
  {
    id: "wedding-coordination",
    eyebrow: "Wedding Coordination",
    title: "Wedding",
    titleEm: "Coordination",
    price: "Starting at $9,000",
    description:
      "Six months before your wedding day, your coordinator will come on board to help you coordinate all vendors booked for your wedding, and to advise and guide you through the rest of the wedding planning process.",
    lead:
      "Six months out, your dedicated coordinator manages vendor relationships, keeps planning on schedule, and guides you through every decision still ahead.",
    intro: "Includes everything in Wedding Wrap Up",
    includes: [
      "Coordination of vendors' services",
      "Appointment and meeting scheduling",
      "Regular meetings with your coordinator",
      "Program planning, budget planning, and wedding day timeline management",
      "Attendance of finalization meeting with caterer or hotel catering manager",
      "Includes Wedding Wrap-Up services",
    ],
    pdfHref: WEDDING_SERVICES_PDF,
    image: "/images/services/wedding-coordination.png",
    imageAlt:
      "Outdoor wedding reception under a white tent with tropical floral centerpieces and elegantly set round tables",
    photoCredit: {
      name: "Hawaii Wedding Photography",
      href: "https://hawaiiweddingphotography.com/",
    },
  },
  {
    id: "complete-consultation",
    eyebrow: "Complete Consultation & Coordination",
    title: "Complete Consultation",
    titleEm: "& Coordination",
    price: "Starting at $14,000",
    description:
      "Enjoy a year's worth of start-to-finish planning including vendor booking, logistics, and on-site (\"day of\") coordination.",
    lead:
      "A full year of hands-on planning — from vendor booking and budget tracking to logistics and on-site coordination — so you can enjoy the journey, not just the day.",
    intro: "Includes everything in Wedding Coordination",
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
    image: "/images/services/complete-consultation-coordination.png",
    imageAlt:
      "Elegant indoor wedding reception with white chair covers, cream bows, floral centerpieces, and soft pink lighting",
    photoCredit: {
      name: "The Present Perfect",
      href: "https://the-present-perfect.com/",
    },
  },
  {
    id: "the-full-experience",
    eyebrow: "The Full Experience",
    title: "The Full",
    titleEm: "Experience",
    price: "Starting at $16,000",
    description:
      "Our premium service for the most discriminating couple! neu events will personally help you design and plan the ultimate wedding with as much as a year's worth of planning services at your disposal.",
    lead:
      "Our most comprehensive offering — bespoke design, vendor curation, and white-glove planning for couples who want every detail handled with care and creativity.",
    intro: "Includes everything in Complete Consultation & Coordination",
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
    photoCredit: {
      name: "Jeff Hall Photography",
      href: "https://www.jeffhallphotos.com/",
    },
  },
] as const;

export type ServiceFeature = {
  id: string;
  eyebrow: string;
  title: string;
  titleEm?: string;
  price?: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  image: string;
  imageAlt: string;
  photoCredit?: {
    name: string;
    href: string;
  };
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
      "Planning an event can be overwhelming — we handle the details so you can focus on enjoying the experience.",
      "From concept to execution, our team manages every aspect with precision, keeping your event stress-free and unforgettable.",
    ],
    bullets: [
      "Full-service event coordination (corporate, social, weddings, and more)",
      "Vendor management and negotiation",
      "Seamless logistics and timeline creation",
      "Budget management and cost-saving strategies",
      "Personalized attention to your unique vision",
      "Venue scouting to assist in finding the right locale for your event",
    ],
    image: "/images/hero/hero-02.webp",
    imageAlt:
      "Public Schools of Hawaii Foundation gala dinner with guests seated at round tables in a ballroom",
    photoCredit: {
      name: "Vivir Photography",
      href: "https://vivirphotography.com/",
    },
  },
  {
    id: "event-design",
    eyebrow: "Event Design",
    title: "Designing the",
    titleEm: "Guest Experience",
    paragraphs: [
      "We design the guest's experience from a creative and aesthetic perspective.",
    ],
    image: "/images/services/event-design.png",
    imageAlt:
      "Group at the Public Schools of Hawaii Foundation dinner holding a ceremonial check in front of a branded step-and-repeat backdrop",
    photoCredit: {
      name: "Vivir Photography",
      href: "https://vivirphotography.com/",
    },
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
    image: "/images/services/event-production.png",
    imageAlt:
      "Ballroom dinner setup with round tables, blue star lighting on chairs, white floral centerpieces, and numbered table stands",
  },
] as const;

export const EVENT_PAST_CLIENTS = [
  "Aloha Cones",
  "Anteprima",
  "Assets School",
  "Camp Mokule'ia",
  "Central Union Preschool",
  "Curacao",
  "Curate",
  "ElevAAte",
  "First Insurance Company of Hawai'i",
  "Form Partners",
  "Happily Ever After",
  "Hawai'i Chapter of the American College of Healthcare Executives",
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
  "Society of American Travel Writers",
  "Tech Trans International",
  "The Hawai'i Group",
  "The Knot",
  "Venrock",
  "YIM Investment",
] as const;

export const CELEBRATION_OF_LIFE: ServiceFeature = {
  id: "celebration-of-life",
  eyebrow: "Celebrations of Life",
  title: "Honoring a Life Well Lived",
  price: "Starting at $2,900",
  paragraphs: [
    "Saying goodbye is never easy, but gathering family and friends to share memories is a meaningful way to honor someone you love.",
    "We handle the planning and coordination so you can focus on what matters most — being present with the people who matter and celebrating a life well lived.",
  ],
  image: "/images/services/celebration-of-life.jpg",
  imageAlt:
    "Soft white floral arrangement nestled around a lit ivory taper candle framed in a clear glass vase.",
};

export type TravelServiceCard = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
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
    image: "/images/services/travel-accommodations.jpg",
    imageAlt:
      "White tropical hotel building with glass balconies and palm trees in the courtyard",
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
    image: "/images/services/travel-activities.jpg",
    imageAlt: "Hula dancers performing on stage in traditional green dresses and white leis",
    ctaLabel: "Book Activities",
    ctaHref: "https://neuevents.activiter.com/",
  },
  {
    id: "car-rentals",
    eyebrow: "Car Rentals",
    title: "Blue Diamond Car Rental",
    description:
      "Rent a car with Blue Diamond Car Rental, Hawaii's top-rated rental company.",
    image: "/images/services/travel-car-rental.png",
    imageAlt:
      "White open-top Ford Bronco parked on a scenic coastal road beside turquoise ocean water",
    ctaLabel: "Book a Car",
    ctaHref: "https://cars.bluediamondvacations.com?PC=C-NEU",
  },
] as const;
