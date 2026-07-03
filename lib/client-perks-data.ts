export type ClientPerkVendor = {
  name: string;
  description: string;
  details?: string[];
  code?: string;
  image?: string;
  imageAlt?: string;
  website?: string;
  link?: { label: string; href: string };
  email?: string;
};

export type ClientPerkCategory = {
  name: string;
  vendors: ClientPerkVendor[];
};

export const CLIENT_PERK_CATEGORIES: ClientPerkCategory[] = [
  {
    name: "Accents and Accessories",
    vendors: [
      {
        name: "King of Handmade",
        description: "Use code neuevents25 to get 25% off at King of Handmade",
        code: "neuevents25",
        image: "/images/client-perks/king-of-handmade.jpg",
        imageAlt: "Moroccan rug from King of Handmade",
        website: "https://kingofhandmade.com/",
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
        image: "/images/client-perks/activiter.jpg",
        imageAlt: "Catamaran sailing on the ocean",
        website: "https://neuevents.activiter.com/",
      },
      {
        name: "Cirque du Soleil 'Auana",
        description:
          "Use 40hammocks' unique link for 10% off!",
        image: "/images/client-perks/cirque-auana.jpg",
        imageAlt: "Cirque du Soleil 'Auana performance",
        link: {
          label: "Get offer",
          href: "https://d5wgcl04.na1.hubspotlinks.com/Ctc/RM+113/d5wGCl04/VVz65D2GkSykW1gjKF095NlFTW5_BCzp5wzCHRN1WCR-K3m2ndW69sMD-6lZ3p5W5XlTJl2M6pB6W4Dy6Z585H7BNW4JlNg87Yrv_5W85pmkR99rkzjW5LnXRX8wK-2wW51wsXg8F3kzrW78l4LY98tZ93W4tNvzD1p3gXNW1dkpV629N9VbN16Z4p7qSl1JW2T0lfL3bj1vMW6FH_RN11c0pzW7pFjNN3PJc8_W4gRSg18TTT2gW7_FYK51wbyV7W5t2H0g7wKDGlW8CnMLp1hJvd3W3Wbd-F3p2RDGW1RTgCM6Mq5DQW8mwVld3XyJDRf8pRCxM04",
        },
      },
      {
        name: "Mauka Warriors Luau",
        description: "Contact your neu events planner for your discount code",
        image: "/images/client-perks/mauka-warriors-luau.jpg",
        imageAlt: "Mauka Warriors Luau performers in traditional attire",
        website: "https://maukawarriorsluau.com/",
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
        image: "/images/client-perks/aw-bridal.webp",
        imageAlt: "Bridesmaids in garden party dresses from AW Bridal",
        website: "https://www.awbridal.com/",
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
        image: "/images/client-perks/bliss-djs.png",
        imageAlt: "DJ performing at a Pioneer DJ mixer",
        website: "https://www.blissdjshawaii.com/",
      },
      {
        name: "Spectrum Entertainment",
        description: "Discounts extended to clients of neu events",
        image: "/images/client-perks/spectrum-entertainment.jpg",
        imageAlt: "DJs performing at an event with blue uplighting",
        website: "https://spectrumentertainmenthi.com/",
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
        image: "/images/client-perks/kokoro-creative-studio.png",
        imageAlt: "Kokoro Creative Studio sticker vending machine with custom boba sticker",
        website: "https://www.kokorocreative.studio/",
      },
      {
        name: "Rebran Granola",
        description:
          "Bags of locally-produced granola at a special price, just for clients of neu events, and custom label options, too (20 bag minimum)",
        image: "/images/client-perks/rebran-granola.png",
        imageAlt: "ReBran rice bran granola pouches in four flavors",
        website: "https://rebrangranola.com/",
      },
    ],
  },
  {
    name: "Flowers",
    vendors: [
      {
        name: "The Orchid Lei Company",
        description: "Enjoy low pricing on lei through our wholesale account",
        image: "/images/client-perks/the-orchid-lei-company.png",
        imageAlt: "Colorful Hawaiian orchid leis hanging on display",
        website: "https://www.theorchidlei.com/",
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
        image: "/images/client-perks/minted.jpg",
        imageAlt: "Minted letterpress wedding invitation with blue floral border",
        website: "https://www.minted.com/",
      },
    ],
  },
  {
    name: "Photo Booth",
    vendors: [
      {
        name: "FlashLab",
        description: "$100 off for neu events clients",
        image: "/images/client-perks/flashlab.png",
        imageAlt: "FlashLab oak wood photo booth with dress-up props",
        website: "https://www.theflashlab.com/",
      },
    ],
  },
  {
    name: "Photography and Videography",
    vendors: [
      {
        name: "Masha Sakhno Photo",
        description: "Custom collections for clients of neu events.",
        image: "/images/client-perks/masha-sakhno-photo.jpg",
        imageAlt: "Bride and groom portrait at Sunset Ranch Oahu wedding",
        website: "https://mashasakhno.com/collections-for-neu-events",
      },
      {
        name: "Peter Nosikov Photography",
        description: "10% off photography packages",
        image: "/images/client-perks/peter-nosikov-photography.png",
        imageAlt: "Bride in veil seated on grass with tropical foliage backdrop",
        website: "https://peternosikov.com/",
      },
      {
        name: "Pono Grace",
        description: "5% discount",
        image: "/images/client-perks/pono-grace.jpg",
        imageAlt: "Bride and groom embracing at an outdoor wedding ceremony",
        website: "https://www.ponograce.com/",
      },
      {
        name: "Studio Aukai Group Photoshoot",
        description:
          'Mention the 40hammocks secret word "Kākou Hui" to get 25% off and a complimentary reel or bundle of prints.',
        image: "/images/client-perks/studio-aukai.png",
        imageAlt: "Studio Aukai interior design rendering",
        website: "https://www.studioaukai.com/",
      },
    ],
  },
  {
    name: "Rentals",
    vendors: [
      {
        name: "Aloha Artisans",
        description: "Preferred vendor discount",
        image: "/images/client-perks/aloha-artisans.png",
        imageAlt: "Bride and groom dancing under a tent with string lights",
        website: "https://www.alohaartisans.com/",
      },
      {
        name: "Kalele Eats",
        description:
          "Courtesy 5% vendor referral discount applied to your entire contract",
        image: "/images/client-perks/kalele-eats.jpg",
        imageAlt: "Kalele Eats mobile shave ice cart at an outdoor event",
        website: "https://kaleleeats.com/",
      },
      {
        name: "The Nalu Collective",
        description:
          "5% off handcrafted circular bar rentals from The Nalu Collective — delivery and setup included",
        image: "/images/client-perks/canoe-cooler.jpg",
        imageAlt: "Hawaiian outrigger canoe cooler with champagne at a Nalu Collective bar",
        website: "https://thenalucollective.co/",
      },
      {
        name: "Pacific Party Rentals",
        description:
          "neu events clients — 5% off subtotal (before taxes/fees) when $5k reservation is met — up to $500 off",
        image: "/images/client-perks/pacific-party-rentals.jpg",
        imageAlt: "Outdoor wedding reception under a clear tent with string lights",
        website: "https://www.pacificpartyrentals.net/",
      },
      {
        name: "Palm Palm Parties",
        description: "5% discount",
        image: "/images/client-perks/palm-palm-parties.jpg",
        imageAlt: "Illuminated ALOHA marquee letters on a lawn at sunset",
        website: "http://www.palmpalmparties.com/",
      },
      {
        name: "The Wedding Linen Company",
        description:
          "The Luxe Advantage — tiered savings for 2026–2027 weddings when you book more linens and napkins. The more your couples choose from our premium collection, the greater the rewards. Your preferred neu events vendor discount still applies on top.",
        details: [
          "Essentials (15+ linens & napkins): choose 1 bonus — 10% off chairs, charger plates, pipe & drape (up to 40'), or sweetheart sofa",
          "Premier (20+ linens & napkins): choose 2 bonuses — same 10% options, plus 15% off the sweetheart sofa",
          "Elite (25+ linens & napkins): choose 3 bonuses — same 10% options, plus 20% off the sweetheart sofa and a free textured linen or overlay upgrade",
        ],
        image: "/images/client-perks/the-wedding-linen-company.png",
        imageAlt: "Long reception table with white linens and tropical floral centerpieces",
        website: "https://theweddinglinencompany.com/",
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
        image: "/images/client-perks/porsche.png",
        imageAlt: "White Porsche convertible rental",
        website: "https://cars.bluediamondvacations.com/?PC=NEU",
      },
      {
        name: "Royal Star",
        description:
          "Enjoy low pricing on transportation through our wholesale account",
        image: "/images/client-perks/royal-star.jpg",
        imageAlt: "Bride and groom in front of a Royal Star charter bus",
        website: "https://royalstarhawaii.com/",
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
        image: "/images/client-perks/great-news-productions.jpg",
        imageAlt: "Bride in a white wedding gown",
        website: "https://greatnewsproductions.net/",
      },
      {
        name: "Hawaiian Airlines via 40hammocks",
        description:
          "5% discount using 40hammocks' link to book with Hawaiian Airlines",
        image: "/images/client-perks/hawaiian-airlines.png",
        imageAlt: "Hawaiian Airlines aircraft on the runway with Diamond Head in the background",
        website:
          "https://d5wgcl04.na1.hubspotlinks.com/Ctc/RM+113/d5wGCl04/VW-M3Q8M4d3yN12f0TynWDQsW8Ny6Rt5qQpJcN6tf6XM3m2ndW7Y8-PT6lZ3nfW3L9L8P1_2_hCW4dp5yl7f7p3CW1LbyGq4-_XV6W7hG8R02Ys7KYW6qJXqm83mv3GN8HLHFknScS5W4YP1LB2KW227W5CTTTV4fKq30W4rQpRQ8V96c3W4hCdcn7kxF6BW1YfqhZ4m2rB7W5cwVZm5lJy8bW3FPbZv1bJC3qN1BzWk5gdcSMVgQ5RR4pHhS_W1t3sZC66kr67MDwY1y2dwXZW7dxbJm5MfMF6N2g35_-_7XMjW7M7wDx7CWDW5W3HBJr71_qBzQW5YJyKt6Msv7NN7lgRcyB9yL3W3rRQSh3xxPY6W1Rn2Wk5FfSwNVDgV_43vFsPkf5ygk_T04",
      },
      {
        name: "Minted",
        description:
          "Receive a unique, one-time-use code to upgrade your Minted wedding website to a custom URL. Instead of a Minted wedding website like thesmiths.minted.us, have a more personalized URL like thesmiths.com (normally a $15 value). Contact your neu events planner for your website upgrade code.",
        image: "/images/client-perks/minted-website-upgrade.jpg",
        imageAlt: "Bride and groom hands with wedding rings on a floral bouquet",
        website: "https://www.minted.com/",
      },
      {
        name: "Rooster Farms",
        description:
          'Mention 40hammocks\' secret word "freshlybrewed" for a 20% discount on 6 bags of coffee or more',
        image: "/images/client-perks/rooster-farms.jpg",
        imageAlt: "Hand touching ripe coffee cherries on a Kona coffee branch",
        website: "https://roosterfarms.com/",
      },
    ],
  },
];
