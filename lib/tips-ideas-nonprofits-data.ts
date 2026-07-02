export type NonprofitCategory =
  | "Cultural Preservation"
  | "Education"
  | "Environmental"
  | "Health"
  | "Social";

export type NonprofitCategoryTag =
  | "culture"
  | "education"
  | "environmental"
  | "health"
  | "social";

export type NonprofitTile = {
  id: string;
  name: string;
  category: NonprofitCategory;
  categoryTag: string;
  categoryTagClass: NonprofitCategoryTag;
  image: string;
  imageAlt: string;
  href?: string;
};

export const NONPROFIT_TILES: NonprofitTile[] = [
  {
    id: "bishop-museum",
    name: "Bishop Museum",
    category: "Cultural Preservation",
    categoryTag: "Culture",
    categoryTagClass: "culture",
    image: "/images/tips-ideas/nonprofits/bishop-museum.png",
    imageAlt: "Bernice Pauahi Bishop Museum in Honolulu, Hawaiʻi",
    href: "https://www.bishopmuseum.org/join-and-give/donate/",
  },
  {
    id: "pshf",
    name: "Public Schools of Hawai'i Foundation",
    category: "Education",
    categoryTag: "Education",
    categoryTagClass: "education",
    image: "/images/tips-ideas/nonprofits/pshf.png",
    imageAlt: "Students performing on stage at a Public Schools of Hawai'i Foundation event",
    href: "https://pshf.org/donations-page/",
  },
  {
    id: "roosevelt-high-school",
    name: "Roosevelt High School",
    category: "Education",
    categoryTag: "Education",
    categoryTagClass: "education",
    image: "/images/tips-ideas/nonprofits/roosevelt-high-school.png",
    imageAlt: "Roosevelt High School seal and mascot",
    href: "https://www.rhsaahawaii.org/",
  },
  {
    id: "808-cleanups",
    name: "808 Cleanups",
    category: "Environmental",
    categoryTag: "Environmental",
    categoryTagClass: "environmental",
    image: "/images/tips-ideas/nonprofits/808-cleanups.png",
    imageAlt: "808 Cleanups volunteer working on a coastal hillside",
    href: "https://808cleanups.org/donate/",
  },
  {
    id: "hookuaaina",
    name: "Ho'okua'aina",
    category: "Environmental",
    categoryTag: "Environmental",
    categoryTagClass: "environmental",
    image: "/images/tips-ideas/nonprofits/hookuaaina.png",
    imageAlt: "Aerial view of loʻi kalo taro patches in a Hawaiian valley",
    href: "https://hookuaaina.org/kalohotline/",
  },
  {
    id: "hooulu-aina",
    name: "Hoʻoulu ʻĀina",
    category: "Environmental",
    categoryTag: "Environmental",
    categoryTagClass: "environmental",
    image: "/images/tips-ideas/nonprofits/hooulu-aina.png",
    imageAlt: "Community members working together in a terraced garden",
    href: "https://hoouluaina.org/donate",
  },
  {
    id: "kakoo-oiwi",
    name: "Kākoʻo ʻŌiwi",
    category: "Environmental",
    categoryTag: "Environmental",
    categoryTagClass: "environmental",
    image: "/images/tips-ideas/nonprofits/kakoo-oiwi.png",
    imageAlt: "Lush green valley with traditional Hawaiian agricultural fields",
    href: "https://kakoooiwi.org/charitable-contributions/",
  },
  {
    id: "hah",
    name: "Healthcare Association of Hawai'i (scholarship fund)",
    category: "Health",
    categoryTag: "Health",
    categoryTagClass: "health",
    image: "/images/tips-ideas/nonprofits/healthcare.png",
    imageAlt: "Healthcare professional speaking with a patient",
    href: "https://www.hah.org/hherf-scholarship-fund",
  },
  {
    id: "cancer-care",
    name: "Susan C. Hirano Cancer C.A.R.E. Community",
    category: "Health",
    categoryTag: "Health",
    categoryTagClass: "health",
    image: "/images/tips-ideas/nonprofits/cancer-care.png",
    imageAlt: "Graduate in cap and gown looking toward the horizon",
    href: "https://give.uhfoundation.org/campaigns/63435/donations/new?utm_medium=redirect&designation_id=21074603&utm_campaign=appeal",
  },
  {
    id: "hscadv",
    name: "Hawai'i State Coalition Against Domestic Violence",
    category: "Social",
    categoryTag: "Social",
    categoryTagClass: "social",
    image: "/images/tips-ideas/nonprofits/hscadv.png",
    imageAlt: "Hawaiʻi State Coalition Against Domestic Violence banner",
    href: "https://hscadv.harnessgiving.org/donate/?selected-method=one-time&amount=50&campaign_id=13018",
  },
];
