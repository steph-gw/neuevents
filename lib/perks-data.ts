export type PerksSection = {
  id: string;
  eyebrow: string;
  title: string;
  titleEm: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  photoCredit?: string;
  reverse?: boolean;
};

export const PERKS_SECTIONS: PerksSection[] = [
  {
    id: "for-you",
    eyebrow: "For You",
    title: "Preferential",
    titleEm: "Pricing",
    paragraphs: [
      "Preferential pricing from wedding-related retailers and vendors. Certain companies have offered us discounts on their goods and services, and we wish for our clients to enjoy such benefits to the fullest.",
    ],
    image: "/images/perks/kualoa-reception-tables.jpg",
    imageAlt:
      "Outdoor reception tables at Kualoa Ranch, set with green embossed glassware, gold decorative base plates and place settings, neatly folded teal linen napkins, and white floral centerpiece with greenery",
  },
  {
    id: "for-family",
    eyebrow: "For Your Family and Friends",
    title: "Extend the",
    titleEm: "Benefit",
    paragraphs: [
      "We appreciate our clients and love it whenever they give others their vote of confidence in us. If you are a current or past client of neu events and someone you know is in need of a planner, simply contact us to let us know that you'd like to extend your benefit to that person, organization, or company and they will receive a discount on our services for their upcoming event.",
    ],
    image: "/images/perks/indian-wedding-couple.jpg",
    imageAlt:
      "A couple walking hand in hand at an outdoor Indian wedding, smiling as guests shower them with colorful flower petals",
    photoCredit: "Sarah Jual Photography",
    reverse: true,
  },
  {
    id: "share-the-love",
    eyebrow: "Share the Love",
    title: "Pass It",
    titleEm: "On",
    paragraphs: [
      "Our wonderful couples often leave us with wedding and event items and décor that they'd like to share with future clients. Reach out to us to find out about how we can share these items with you, or how you can \"share the love\" and leave your miscellaneous wedding items with us for others to use.",
    ],
    image: "/images/perks/share-the-love.jpg",
    imageAlt: "A couple sharing a joyful moment at their wedding celebration",
  },
];
