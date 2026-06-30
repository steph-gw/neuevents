export type ClientPerkVendor = {
  name: string;
  description: string;
  code?: string;
  link?: { label: string; href: string };
  email?: string;
};

export type ClientPerkCategory = {
  name: string;
  vendors: ClientPerkVendor[];
};

export const CLIENT_PERKS_PASSWORD = "neuclient26";
export const CLIENT_PERKS_AUTH_KEY = "neuevents-client-perks-auth";

export const CLIENT_PERK_CATEGORIES: ClientPerkCategory[] = [
  {
    name: "Accents and Accessories",
    vendors: [
      {
        name: "King of Handmade",
        description: "Use code neuevents25 to get 25% off at King of Handmade",
        code: "neuevents25",
      },
    ],
  },
  {
    name: "Activities",
    vendors: [
      {
        name: "Activiter",
        description:
          "Receive a commission on activities booked by adding Activiter to your website",
      },
      {
        name: "Cirque du Soleil 'Auana",
        description:
          "Use 40hammocks' unique link for 10% off!",
      },
      {
        name: "Mauka Warriors Luau",
        description: "Contact your neu events planner for your discount code",
      },
    ],
  },
  {
    name: "Attire",
    vendors: [
      {
        name: "AW Bridal",
        description: "Use code Neuevents to get 15% off at AW Bridal",
        code: "Neuevents",
      },
    ],
  },
  {
    name: "Entertainment",
    vendors: [
      {
        name: "Bliss DJs",
        description:
          "Inquire about discounts, as these depend on the service that is to be provided",
      },
      {
        name: "Spectrum Entertainment",
        description: "Discounts extended to clients of neu events",
      },
    ],
  },
  {
    name: "Favors and Gifts",
    vendors: [
      {
        name: "Kokoro Creative Studio",
        description:
          "Portable vending machine for weddings and events, offering custom stickers or a fun way to dispense your own favors.",
      },
      {
        name: "Rebran Granola",
        description:
          "Bags of locally-produced granola at a special price, just for clients of neu events, and custom label options, too (20 bag minimum)",
      },
    ],
  },
  {
    name: "Flowers",
    vendors: [
      {
        name: "The Orchid Lei Company",
        description: "Enjoy low pricing on lei through our wholesale account",
      },
    ],
  },
  {
    name: "Invitations and Stationery",
    vendors: [
      {
        name: "Minted",
        description:
          "Minted's best wedding discount — 35% off save the dates and 25% off all other wedding stationery — better than what you'll find on their website.",
        code: "WEDPLNEU",
      },
    ],
  },
  {
    name: "Photo Booth",
    vendors: [
      {
        name: "FlashLab",
        description: "$100 off for neu events clients",
      },
    ],
  },
  {
    name: "Photography and Videography",
    vendors: [
      {
        name: "Masha Sakhno Photo",
        description: "Custom collections for clients of neu events.",
      },
      {
        name: "Peter Nosikov Photography",
        description: "10% off photography packages",
      },
      {
        name: "Pono Grace",
        description: "5% discount",
      },
      {
        name: "Studio Aukai Group Photoshoot",
        description:
          'Mention the 40hammocks secret word "Kākou Hui" to get 25% off and a complimentary reel or bundle of prints.',
      },
    ],
  },
  {
    name: "Rentals",
    vendors: [
      {
        name: "Aloha Artisans",
        description: "Preferred vendor discount",
      },
      {
        name: "Kalele Eats",
        description:
          "Courtesy 5% vendor referral discount applied to your entire contract",
      },
      {
        name: "The Nalu Collective",
        description:
          "5% off handcrafted circular bar rentals from The Nalu Collective — delivery and setup included",
      },
      {
        name: "Pacific Party Rentals",
        description:
          "neu events clients — 5% off subtotal (before taxes/fees) when $5k reservation is met — up to $500 off",
      },
      {
        name: "Palm Palm Parties",
        description: "5% discount",
      },
      {
        name: "The Wedding Linen Company",
        description: "10% discount",
      },
    ],
  },
  {
    name: "Transportation",
    vendors: [
      {
        name: "Blue Diamond Vacations",
        description:
          "Add a white-gloved Blue Diamond link to your wedding or event website for your guests to easily book their car rental on O`ahu, and receive a commission on bookings! Contact your neu events planner for details. Rent a car with Blue Diamond Car Rental, Hawaii's top-rated rental company, and receive a 15% discount exclusively for neu events clients.",
      },
      {
        name: "Royal Star",
        description:
          "Enjoy low pricing on transportation through our wholesale account",
      },
    ],
  },
  {
    name: "Miscellaneous",
    vendors: [
      {
        name: "Great News Productions",
        description:
          "Let us tell your love story! Great News Productions will interview the couple, family, and friends ahead of the big day, then add voiceover narration, still photos, video, graphics, and music to create a 5–8 minute video. Clients of neu events receive a $50 discount.",
        email: "suzanne@greatnewsproductions.com",
      },
      {
        name: "Hawaiian Airlines via 40hammocks",
        description:
          "5% discount using 40hammocks' link to book with Hawaiian Airlines",
      },
      {
        name: "Minted",
        description:
          "Receive a unique, one-time-use code to upgrade your Minted wedding website to a custom URL. Instead of a Minted wedding website like thesmiths.minted.us, have a more personalized URL like thesmiths.com (normally a $15 value). Contact your neu events planner for your website upgrade code.",
      },
      {
        name: "Rooster Farms",
        description:
          'Mention 40hammocks\' secret word "freshlybrewed" for a 20% discount on 6 bags of coffee or more',
      },
    ],
  },
];
