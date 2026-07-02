export type TipTalkSection = {
  label: string;
  items: string[];
};

export type TipTalk = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  intro?: string;
  bullets?: string[];
  paragraphs?: string[];
  sections?: TipTalkSection[];
  closing?: string;
};

export const TIP_TALKS: TipTalk[] = [
  {
    id: "pets",
    title: "Pets at weddings? Yes, but here's the must-know info",
    image: "/images/tips-ideas/tip-talks/pets.jpg",
    imageAlt: "Bride and groom kissing under a palm tree with their dog in a tuxedo vest",
    intro:
      "We absolutely love when our couples include their four-legged family members — but there are a few key things to keep in mind:",
    bullets: [
      "Not all venues allow pets (and some only during the ceremony!) Make sure your venue allows for your furry guest before booking if their attendance is a must have",
      "Designate someone to be your pet's dedicated handler for the day",
      "If they're only attending the ceremony, make post-ceremony plans for their care",
      "Be sure they're comfortable, well-fed, and feeling the love too!",
    ],
  },
  {
    id: "floral-cake",
    title: "Wedding Cakes & Fresh Flowers",
    image: "/images/tips-ideas/tip-talks/floral-cake.jpg",
    imageAlt: "Two-tier white wedding cake decorated with a cascade of fresh tropical flowers",
    paragraphs: [
      "If you're planning to decorate your cake with fresh florals, here's a pro tip: Make sure to coordinate with your floral designer in advance so they can provide safe, fresh flowers that match the rest of your event design.",
      "Better yet? Have your floral designer and cake decorator connect directly. This ensures seamless styling and proper placement for a picture-perfect (and safe-to-eat!) cake.",
    ],
  },
  {
    id: "little-ones",
    title: "Weddings with little ones? Here are a few tips to keep things smooth + sweet!",
    image: "/images/tips-ideas/tip-talks/little-ones.jpg",
    imageAlt: "Children playing in a white bounce house at an outdoor wedding",
    bullets: [
      "Schedule photos after the ceremony—when kids are rested, fed, and at their best",
      "Hold off on buying their outfits—get them closer to the wedding for the perfect fit",
      "Consider offering a nanny service if you're planning an adults-only event",
      "Set up kid-friendly activities (think coloring books, games, or a mini movie corner!) to keep them entertained during the reception",
    ],
    closing:
      "Because a little planning goes a long way in making sure everyone enjoys the celebration—big and small",
  },
  {
    id: "daytime",
    title: 'Planning a daytime "I do"? Here are a few things to keep in mind',
    image: "/images/tips-ideas/tip-talks/daytime.jpg",
    imageAlt: "Elegant daytime wedding table with yellow orchids and floating candles",
    sections: [
      {
        label: "Afternoon Pros",
        items: [
          "Lunch menus are often more budget-friendly",
          "You and your guests still have the rest of the day to celebrate or relax",
        ],
      },
      {
        label: "Afternoon Cons",
        items: [
          "Hair + makeup starts bright and early",
          "Outdoor venues can get a bit toasty",
          "Setup time might be tighter, especially for outdoor spaces",
        ],
      },
    ],
    closing:
      "Would you go for a sunny afternoon reception or stick with a classic evening affair?",
  },
  {
    id: "dessert",
    title:
      "Sweeten up your celebration! A dessert table isn't just delicious — it's a showstopper!",
    image: "/images/tips-ideas/tip-talks/dessert.jpg",
    imageAlt: "Tiered dessert display with pastries, pies, and layered sweets",
    sections: [
      {
        label: "Tips & Tricks",
        items: [
          "Mix heights & textures for visual impact",
          "Include a variety of flavors so there's something for everyone",
          "Add personal touches like custom signage or themed décor to tie it into your event",
        ],
      },
    ],
    closing:
      "Whether it's a wedding, birthday, or corporate party, a well-styled dessert table will have guests coming back for seconds (and thirds).",
  },
];
