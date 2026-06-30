export const HOME_ABOUT_TEAM = {
  image: "/images/about/team-group.jpg",
  imageAlt: "Aileen, Mona, Heidi, and Deni of the neu events team",
  imageLabel: "Aileen, Mona, Heidi & Deni",
  paragraphs: [
    "In 2000, company founder, Mona L. Hirata-Sung, started with real life experience handling weddings and events at a boutique hotel in beautiful Waikiki, Hawaii. With a passion for service, we at neu events have built upon that foundation and have crafted our approach to event planning based on our guiding set of values – working hard for our clients, bearing their best interests in mind, and standing by ethical principles.",
    "Essentially, we look at each wedding and event and think to ourselves, \"if this were our best friend's special occasion or event, and possessing the industry knowledge and skills that we have honed, how can we help, giving as much as we possibly can, so that they can have the very best event imaginable?\"",
    "For us, \"it's personal.\" Your success is our success, and nothing could make us happier than to see you achieve your goals.",
    "Hundreds of weddings and events later and after teaching wedding planning to aspiring planners, neu events continues to service clients based on the same founding principles and values. We hope to have the opportunity to provide you with our very best, too.",
  ],
} as const;

export const ABOUT_PHILOSOPHY_QUOTE =
  "For us, \"it's personal.\" Your success is our success, and nothing could make us happier than to see you achieve your goals.";

export const ABOUT_GROUP_PHOTO = {
  image: "/images/about/team-group.jpg",
  imageAlt: "Aileen, Mona, Heidi, and Deni of the neu events team",
  caption: "Photo Credit: Kris Labang Photography · Hair and Makeup: Christina Webb",
} as const;

export const ABOUT_PRESS_LOGOS = [
  {
    name: "The Knot",
    image: "/images/press/the-knot.png",
    href: "https://www.theknot.com/",
  },
  {
    name: "Oahu Wedding Association",
    image: "/images/press/owa.png",
    href: "https://www.oahuwa.com/",
  },
  {
    name: "Equally Wed",
    image: "/images/press/equally-wed.png",
    href: "https://equallywed.com/",
  },
] as const;

export type AboutTeamMember = {
  id: string;
  name: string;
  credentials?: string;
  email: string;
  image: string;
  imageAlt: string;
  bio: string[];
  consult?: {
    displayName: string;
    role: string;
    image: string;
    bookingUrl: string;
  };
};

export const ABOUT_TEAM_MEMBERS: AboutTeamMember[] = [
  {
    id: "mona",
    name: "Mona L. Hirata-Sung",
    credentials: "MBA",
    email: "mona@neuevents.com",
    image: "/images/about/mona.jpg",
    imageAlt: "Mona L. Hirata-Sung of neu events",
    bio: [
      "After years of traveling and working abroad, Mona returned to Hawai'i where she launched in 2000 what is now neu events, applying her life experience abroad to servicing both local and international clients. Since then, neu events has become one of the leading boutique-style wedding and event planning companies.",
      "In 2006, Mona was named to Pacific Business News' \"Forty Under 40,\" an award established to recognize Hawai'i's emerging young leaders. With numerous accolades and hundreds of weddings and events under her belt, she enjoys sharing her knowledge by lecturing to visiting international students on entrepreneurship and her career field.",
      "As owner and planner, Mona makes it a priority to maintain a \"big picture\" focus on the direction of the company while simultaneously working directly with clients, helping them design and plan a memorable event. Whether on island or planning from afar, it is Mona's desire to transform your dreams and goals into reality.",
    ],
    consult: {
      displayName: "Mona",
      role: "Founder & Lead Planner",
      image: "/images/contact/mona-headshot.png",
      bookingUrl: "https://info.neuevents.com/consult-with-mona",
    },
  },
  {
    id: "heidi",
    name: "Heidi Angel Park Smoot",
    credentials: "MSCP, MFT-I",
    email: "heidi@neuevents.com",
    image: "/images/about/heidi.jpg",
    imageAlt: "Heidi Angel Park Smoot of neu events",
    bio: [
      "Heidi has dedicated her expertise to wedding and event planning with neu events for over a decade. Her portfolio includes personalized services for couples and the coordination of a diverse range of events, spanning from magazine launches and glamorous galas to fundraisers.",
      "Before her association with neu events, Heidi gained years of experience working in various industries, managing logistics and marketing at trade shows nationwide. She also managed events of grand scale with concert promoter of the Pacific, Tom Moffatt, on concerts and VIP parties.",
      "In addition to her event planning role, Heidi serves as a Marriage and Family Therapy intern, providing counseling services to keiki, adults, couples, and kupuna. Heidi's local roots and global experience make her perfectly suited to work with clients from near and far alike. Her own wedding planning journey unveiled her true passion as a wedding and event planner, and she has since become an invaluable member of the neu events team.",
    ],
  },
  {
    id: "aileen",
    name: "Aileen Nguyen",
    email: "aileen@neuevents.com",
    image: "/images/about/aileen.jpg",
    imageAlt: "Aileen Nguyen of neu events",
    bio: [
      "Aileen started as an intern with neu events as a student from the University of Hawai'i, studying in the School of Travel Industry Management. After graduation, Aileen has since continued to work with neu events whenever they needed a helping hand. Since the end of 2021, she is now a part of the team full time.",
      "Aileen has had opportunities to work with different coordinators in the wedding and events industry, learning and gaining experiences and skills at different weddings and events. Getting to work closely alongside Mona and the couples and clients and then getting to see their vision become a reality is so gratifying.",
      "In her free time, she enjoys cooking and baking and spending time with family and friends.",
    ],
  },
  {
    id: "deni",
    name: 'Denichel "Deni" Ruiz',
    email: "deni@neuevents.com",
    image: "/images/about/deni.jpg",
    imageAlt: 'Denichel "Deni" Ruiz of neu events',
    bio: [
      "Like Aileen, Deni also started with neu events as an intern before graduating from the School of Travel Industry Management at the University of Hawai'i at Manoa. After graduation, Deni worked at various event planning companies, broadening her experience and honing her skill set working as a lead event planner.",
      "After a temporary hiatus from events, Deni has since made her way back to the industry and is now working with neu events once again. Deni is also a travel advisor and owns a small handmade pet accessories business with her sister. She enjoys traveling and spending time with family.",
    ],
    consult: {
      displayName: "Deni",
      role: "Senior Event Planner",
      image: "/images/contact/deni-headshot.png",
      bookingUrl: "https://info.neuevents.com/consult-with-deni",
    },
  },
];
