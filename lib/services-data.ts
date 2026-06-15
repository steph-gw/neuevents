import { HOME_SERVICES } from "@/lib/data";

export const SERVICES_OVERVIEW = HOME_SERVICES.map((service, index) => {
  const anchors = [
    "full-planning",
    "full-planning",
    "partial-planning",
    "event-management",
  ] as const;

  return {
    ...service,
    anchor: anchors[index],
  };
});

export type ServiceBlock = {
  heading: string;
  items?: readonly string[];
  paragraphs?: readonly string[];
};

// ─── Legacy type alias kept for any downstream consumers ───
export type ServiceContentBlock = ServiceBlock;

export type ServiceCredentialCard = {
  org: string;
  title: string;
};

export type ServiceIncludedBlock = {
  number: string;
  heading: string;
  items?: readonly string[];
  credentials?: readonly ServiceCredentialCard[];
};

export type ServicePlanningCard = {
  label?: string;
  title: string;
  titleEm?: string;
  lead?: string;
  intro?: string;
  image?: string;
  imageAlt?: string;
  includedLabel?: string;
  includedBlocks?: readonly ServiceIncludedBlock[];
};

export type ServiceDetailContent = {
  id: string;
  layout?: "unified" | "dark" | "default";
  number?: string;
  eyebrow?: string;
  title: string;
  titleEm?: string;
  lead?: string;
  credential?: string;
  intro?: string;
  price?: string;
  image?: string;
  imageAlt?: string;
  includedBlocks?: readonly ServiceIncludedBlock[];
  designCard?: ServicePlanningCard;
  eventCard?: ServicePlanningCard;
  processBlocks?: readonly ServiceBlock[];
  benefitBlocks?: readonly ServiceBlock[];
  closing?: string;
};

export const SERVICE_DETAILS: readonly ServiceDetailContent[] = [
  {
    id: "full-planning",
    layout: "unified",
    eyebrow: "Wedding Services",
    title: "Full",
    titleEm: "Planning",
    lead: "From the first venue tour to the final send-off, we handle every last detail so you can be fully present on your wedding day.",
    intro: "Includes everything in Event Management & Partial Planning",
    price: "Starting at $8,000",
    image: "/images/services/full-planning.webp",
    imageAlt: "Bride and groom smiling as they exit their wedding venue",
    includedBlocks: [
      {
        number: "01",
        heading: "Pre-Wedding Preparation",
        items: [
          "Venue tours to explore potential locations for your wedding day and determine the best fit",
          "Design creation and execution",
          "Contract review with your venue and vendors to ensure clarity and accuracy",
          "Coordination and communication with all vendors and the venue",
          "Confirmation of rental and catering counts",
          "Audio/lighting/tent backup plan building",
          "Review and organization of transportation logistics for guests and the bridal party",
          "Creation and distribution of the event day timeline to vendors and VIPs",
          "Direct rental order building",
          "Rehearsal coordination — hands-on management to ensure everything runs smoothly",
        ],
      },
      {
        number: "02",
        heading: "Day-of Event Management",
        items: [
          "Oversee the setup of the ceremony and reception areas",
          "Management of all vendors and venue staff to execute the timeline flawlessly",
          "Coordination of event logistics and troubleshooting any last-minute issues",
          "Supervise event breakdown and vendor load-out",
        ],
      },
      {
        number: "03",
        heading: "Expert Guidance by Candace Kelly",
        credentials: [
          {
            org: "NEW YORK INSTITUTE OF ART AND DESIGN",
            title: "Certified Wedding Planner",
          },
          {
            org: "NEW YORK INSTITUTE OF ART AND DESIGN",
            title: "Certified Interior Designer",
          },
          { org: "IWED", title: "Certified Event Designer" },
        ],
      },
      {
        number: "04",
        heading: "Professional Standards",
        items: [
          "Fully licensed and insured with a $1,000,000 policy",
        ],
      },
      {
        number: "05",
        heading: "Exclusive Benefits",
        items: [
          "Full access to an all-in-one online planning platform",
          "Tuxedo rental discounts for your wedding party",
          "Checklists, timelines, vendor contacts, guest lists, seating charts, and more",
          "Qualify for a free groom rental after five rentals",
          "Flexible payment plans tailored to your needs",
          "Check-ins throughout the planning process to keep everything on track",
        ],
      },
    ],
    designCard: {
      label: "Starting at $3,000",
      title: "Design",
      titleEm: "Services",
      lead: "Bespoke design direction for every visual element of your celebration — from attire palette planning to reception table layouts.",
      intro: "Optional add-on",
      image: "/images/services/design-services.webp",
      imageAlt: "Elegantly styled wedding reception table with candles, florals, and gold-rimmed place settings",
      includedBlocks: [
        {
          number: "01",
          heading: "Wedding Party Attire Support",
          items: [
            "Bridesmaid palette planning by season (ex: jewel tones for fall, pastels for spring, neutrals for summer, icy tones for winter)",
            "Mix-and-match styling plan for bridesmaids fabric weights and pattern balance",
            "Groom + groomsmen look building (tux vs suit decision, jacket/tie pairing sets, accessory layering plan)",
            "Tie, bow, and pocket-square pairing strategy for wedding party photos",
            "Veil length + trim guidance for ceremony visuals and photo framing",
            "Metal and accent tone coordination (buttons, jewelry, dress hardware, cufflinks)",
            "Bouquet and boutonniere pairing direction for a cohesive wedding party reveal",
            "Weather-ready attire plan suggestions (jackets, shawls, or layered looks included in styling packet)",
          ],
        },
        {
          number: "02",
          heading: "Ceremony Design",
          items: [
            "Arch/altar arrangement plan (shape, focal weight, symmetry or asymmetry direction, and flower or fabric integration)",
            "Aisle décor placement map (order of lining the aisle from back » front)",
            "Ceremony seating flow design (reserved rows placed first, general rows grouped by flow)",
            "Framed program display layout + hand-out station placement",
            "Alphabetized or grouped escort/program table placement for ceremony entry",
            "Weather-plan design notes for ceremony space transition (outdoor » covered or indoor styling suggestions)",
          ],
        },
        {
          number: "03",
          heading: "Cocktail Hour Styling",
          items: [
            "Bar design layout (menu sign, napkin stack, stirrers, glass placement zones)",
            "Cocktail furniture installation order and spacing plan (lounges, high-tops, or accent placement)",
            "Vendor station zones mapped for flow (where musicians, photo booth, and appetizers activate)",
            "Beverage, appetizer, and guest circulation plan by timing",
            "Design accents added to bar or lounges for a styled and balanced cocktail hour reveal",
          ],
        },
        {
          number: "04",
          heading: "Reception Design",
          items: [
            "Table styling concept by layer:",
            "Linen base » Charger » Menu » Napkin fold/style » Glass pairings » Florals/candles (placement order only)",
            "Centerpiece spacing and height map per table type (round vs rectangle guidance)",
            "Entrance/escort card table flow (alphabetized group direction or table-order strategy)",
            "Memory/tribute table focal layout plan",
            "Cake + desserts display layout + accent placement guidance",
            "DJ/entertainment, bar, and catering layout mapped for visual balance",
            "Lighting and ambience placement plan (candle zones, uplight intention, warm vs dramatic direction)",
            "Breakdown flow and vendor load-out leadership notes included in execution plan",
          ],
        },
        {
          number: "05",
          heading: "Expert Guidance by Candace Kelly",
          credentials: [
            {
              org: "NEW YORK INSTITUTE OF ART AND DESIGN",
              title: "Certified Wedding Planner",
            },
            {
              org: "NEW YORK INSTITUTE OF ART AND DESIGN",
              title: "Certified Interior Designer",
            },
            { org: "WEDDING MBA", title: "Certified Wedding Elite Designer" },
            {
              org: "IWED",
              title: "Institute of Wedding Design - Certified Event Designer",
            },
          ],
        },
      ],
    },
  },
  {
    id: "partial-planning",
    layout: "dark",
    title: "Partial",
    titleEm: "Planning",
    lead: "Already started planning and need expert support to bring it all together? We step in where you need us most.",
    price: "Starting at $5,500",
    image: "/images/services/partial-planning.webp",
    imageAlt: "Bride and groom sharing an intimate moment outdoors before their wedding",
    includedBlocks: [
      {
        number: "01",
        heading: "Pre-Wedding Preparation",
        items: [
          "Curated vendor matches based on style, priorities, and investment goals",
          "Personalized planning meetings at key milestones",
          "Contract Review with your venue and vendors to ensure clarity and accuracy",
          "Questions and support for catering, bar, rentals, and staffing strategy",
          "Floor plan and guest flow planning support",
          "Guest experience planning (flow + comfort + emotional moments)",
          "Bridal party role support + task planning (who handles what and when)",
          "Coordination and communication with all vendors and the venue",
          "Confirmation of rental and catering counts",
          "Design Guidance",
          "\"Photo moment mapping\" so your photographer knows key detail shots to capture",
          "Reception styling clarity for linens, chargers, glassware, menus, signage, and displays",
          "Review and organization of transportation logistics for guests and the bridal party",
          "Creation and distribution of the event day timeline to vendors and VIPs",
          "Rehearsal Coordination",
          "Hands-on coordination of your rehearsal to ensure everything runs smoothly",
        ],
      },
      {
        number: "02",
        heading: "Day-Of Event Management",
        items: [
          "Oversee the setup of the ceremony and reception areas",
          "Management of all vendors and venue staff to execute the timeline flawlessly",
          "Coordination of event logistics and troubleshooting any last-minute issues",
          "Supervise event breakdown and vendor load-out",
        ],
      },
      {
        number: "03",
        heading: "Expert Guidance by Candace Kelly",
        credentials: [
          {
            org: "CANDACE KELLY",
            title: "Certified Elite Wedding Planner and Designer",
          },
          {
            org: "NEW YORK INSTITUTE OF ART AND DESIGN",
            title: "Certified Institution",
          },
          { org: "JAMIE WOLFER", title: "Certified" },
          { org: "CHANCEY CHARM", title: "Certified" },
          { org: "WEDDING MBA", title: "Elite Designer Certified" },
          {
            org: "IWED",
            title: "Accredited Event Designed - IWed Global",
          },
        ],
      },
      {
        number: "04",
        heading: "Professional Standards",
        items: [
          "Fully licensed and insured with a $1,000,000 policy",
        ],
      },
      {
        number: "05",
        heading: "Exclusive Benefits",
        items: [
          "Full access to Gatherwise, an all-in-one online planning platform for:",
          "Checklists, timelines, vendor contacts, guest lists, seating charts, and more",
          "Tuxedo rental discounts for your wedding party",
          "Qualify for a free groom rental after five rentals",
          "Flexible payment plans tailored to your needs",
          "Minted, BriteCo, and Photography Discounts",
        ],
      },
    ],
    eventCard: {
      label: "Starting at $3,500",
      title: "Event",
      titleEm: "Management",
      lead: "Your plans are in place — now let us execute them flawlessly. Our event management service ensures your wedding day runs exactly as you envisioned.",
      image: "/images/hero/hero-3.webp",
      imageAlt: "Elegant wedding reception celebration",
      includedBlocks: [
        {
          number: "01",
          heading: "Pre-Wedding Preparation",
          items: [
            "Contract Review with your venue and vendors to ensure clarity and accuracy",
            "Coordination and communication with all vendors and the venue",
            "Confirmation of rental and catering counts",
            "Creation and distribution of the event day timeline to vendors and VIPs",
          ],
        },
        {
          number: "02",
          heading: "Rehearsal Coordination",
          items: [
            "Hands-on coordination of your rehearsal to ensure everything runs smoothly",
          ],
        },
        {
          number: "03",
          heading: "Day-Of Event Management",
          items: [
            "Oversee setup of the ceremony and reception areas",
            "Management of all vendors and venue staff to execute the timeline",
            "Coordination of event logistics and troubleshooting any last-minute issues",
            "Supervise event breakdown and vendor load-out",
          ],
        },
        {
          number: "04",
          heading: "Expert Guidance by Candace Kelly",
          credentials: [
            {
              org: "CANDACE KELLY",
              title: "Certified Elite Wedding Planner and Designer",
            },
            {
              org: "NEW YORK INSTITUTE OF ART AND DESIGN",
              title: "Certified Institution",
            },
            { org: "JAMIE WOLFER", title: "Certified" },
            { org: "CHANCEY CHARM", title: "Certified" },
            { org: "WEDDING MBA", title: "Elite Designer Certified" },
            {
              org: "IWED",
              title: "Accredited Event Designed - IWed Global",
            },
          ],
        },
        {
          number: "05",
          heading: "Professional Standards",
          items: [
            "Fully licensed and insured with a $1,000,000 policy",
          ],
        },
        {
          number: "06",
          heading: "Exclusive Benefits",
          items: [
            "Full access to Gatherwise, an all-in-one online planning platform for",
            "Checklists, timelines, vendor contacts, guest lists, seating charts, and more",
            "Tuxedo rental discounts for your wedding party",
            "Qualify for a free groom rental after five rentals",
            "Flexible monthly payment plans tailored to your needs",
            "Scheduled Google Meets",
          ],
        },
      ],
    },
  },
] as const;

export type PackageCompareColumn = {
  id: string;
  title: string;
  subtitle?: string;
  highlighted?: boolean;
};

export type PackageCompareRow = {
  feature: string;
  values: readonly [string, string, string];
  suppressCheck?: readonly [boolean, boolean, boolean];
};

export const PACKAGE_COMPARE_COLUMNS: readonly PackageCompareColumn[] = [
  {
    id: "full-planning",
    title: "Full Planning",
    highlighted: true,
  },
  {
    id: "partial-planning",
    title: "Partial Planning",
  },
  {
    id: "event-management",
    title: "Event Management",
    subtitle: "Month-of",
  },
] as const;

export const PACKAGE_COMPARE_ROWS: readonly PackageCompareRow[] = [
  {
    feature: "Ideal for",
    values: [
      "You want full support from start to finish",
      "You've started planning—need help filling in gaps",
      "You've planned it all—just need help executing",
    ],
  },
  {
    feature: "Timeline Involvement",
    values: [
      "Begins immediately after booking",
      "Begins mid-way through planning",
      "Final 6–8 weeks before event",
    ],
  },
  {
    feature: "Vendor Recommendations",
    values: [
      "Yes — sourcing, vetting, booking",
      "Yes — final selections & referrals",
      "No (unless needed day-of)",
    ],
    suppressCheck: [true, true, false],
  },
  {
    feature: "Vendor Communication",
    values: [
      "Handle all communication and confirmations",
      "Shared communication with key vendors",
      "Take over communication 6–8 weeks out",
    ],
  },
  {
    feature: "Design Support",
    values: [
      "Full creative direction and design execution",
      "Guidance + light styling input",
      "None",
    ],
  },
  {
    feature: "Budget Guidance",
    values: [
      "Full budgeting & tracking throughout",
      "General guidance",
      "None",
    ],
  },
  {
    feature: "Planning Timeline + Checklists",
    values: [
      "Full checklist & timeline management",
      "Custom planning timeline",
      "Final timeline creation only",
    ],
  },
  {
    feature: "Rehearsal Coordination",
    values: ["Included", "Included", "Included"],
  },
  {
    feature: "Communication Access",
    values: [
      "Unlimited access throughout",
      "Monthly check-ins",
      "Check-ins as needed",
    ],
  },
  {
    feature: "Overall Support Level",
    values: [
      "We plan, manage & design everything",
      "You plan with help",
      "You plan—we execute",
    ],
  },
] as const;
