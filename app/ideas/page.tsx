import type { Metadata } from "next";
import CtaBanner from "@/components/home/CtaBanner";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Tips & Ideas | neu events",
  description:
    "Wedding and event planning tips, design ideas, and inspiration from the neu events team.",
  openGraphTitle: "Tips & Ideas | neu events",
  openGraphDescription:
    "Wedding and event planning tips, design ideas, and inspiration from the neu events team.",
  path: "/ideas",
});

const TIP_TALKS = [
  {
    id: "pets",
    title: "Pets at weddings? Yes — but here's the must-know info 🐾",
    body: [
      "We absolutely love when our couples include their four-legged family members — but there are a few key things to keep in mind:",
      "🐾 Not all venues allow pets (and some only during the ceremony!) Make sure your venue allows for your furry guest before booking if their attendance is a must-have.",
      "🐾 Designate someone to be your pet's dedicated handler for the day.",
      "🐾 If they're only attending the ceremony, make post-ceremony plans for their care.",
      "🐾 Be sure they're comfortable, well-fed, and feeling the love too!",
    ],
  },
  {
    id: "floral-cake",
    title: "Wedding Cakes & Fresh Flowers",
    body: [
      "If you're planning to decorate your cake with fresh florals, here's a pro tip: make sure to coordinate with your floral designer in advance so they can provide safe, fresh flowers that match the rest of your event design.",
      "Better yet? Have your floral designer and cake decorator connect directly. This ensures seamless styling and proper placement for a picture-perfect (and safe-to-eat!) cake.",
    ],
  },
  {
    id: "little-ones",
    title: "Weddings with little ones? Here are a few tips to keep things smooth + sweet!",
    body: [
      "✔️ Schedule photos after the ceremony — when kids are rested, fed, and at their best.",
      "✔️ Hold off on buying their outfits — get them closer to the wedding for the perfect fit.",
      "✔️ Consider offering a nanny service if you're planning an adults-only event.",
      "✔️ Set up kid-friendly activities (think coloring books, games, or a mini movie corner!) to keep them entertained during the reception.",
      "Because a little planning goes a long way in making sure everyone enjoys the celebration — big and small 💛",
    ],
  },
  {
    id: "daytime",
    title: "Planning a daytime \"I do\"? Here are a few things to keep in mind 👇",
    body: [
      "Afternoon Pros:",
      "✔️ Lunch menus are often more budget-friendly.",
      "✔️ You and your guests still have the rest of the day to celebrate or relax.",
      "Afternoon Cons:",
      "⏰ Hair + makeup starts bright and early.",
      "☀️ Outdoor venues can get a bit toasty.",
      "⏳ Setup time might be tighter, especially for outdoor spaces.",
    ],
  },
  {
    id: "dessert",
    title: "🍰 Sweeten up your celebration! A dessert table isn't just delicious — it's a showstopper!",
    body: [
      "1️⃣ Mix heights & textures for visual impact.",
      "2️⃣ Include a variety of flavors so there's something for everyone.",
      "3️⃣ Add personal touches like custom signage or themed décor to tie it into your event.",
      "Whether it's a wedding, birthday, or corporate party, a well-styled dessert table will have guests coming back for seconds (and thirds 😉).",
    ],
  },
];

const NONPROFITS = [
  { category: "Cultural Preservation", orgs: ["Bishop Museum"] },
  {
    category: "Education",
    orgs: [
      "Public Schools of Hawai'i Foundation",
      "Roosevelt High School",
    ],
  },
  {
    category: "Environmental",
    orgs: ["808 Cleanups", "Ho'okua'aina", "Hoʻoulu ʻĀina", "Kākoʻo ʻŌiwi"],
  },
  {
    category: "Health",
    orgs: [
      "Healthcare Association of Hawai'i (scholarship fund)",
      "Susan C. Hirano Cancer C.A.R.E. Community",
    ],
  },
  {
    category: "Social",
    orgs: ["Hawai'i State Coalition Against Domestic Violence"],
  },
];

export default function IdeasPage() {
  return (
    <main className="ideas-page">
      {/* Hero */}
      <section className="ideas-hero">
        <div className="ideas-hero-intro">
          <p className="eyebrow">Tips &amp; Ideas</p>
          <h1 className="section-title">
            Planning <em>Inspiration</em>
          </h1>
          <p className="ideas-hero-lead">
            Bite-sized tips, design ideas, and thoughtful resources from the neu
            events team — to help make your celebration truly unforgettable.
          </p>
        </div>
      </section>

      {/* Love In Action — favor alternative */}
      <section className="ideas-section ideas-section--alt">
        <div className="ideas-inner">
          <header className="ideas-section-header">
            <p className="eyebrow">Love in Action</p>
            <h2 className="ideas-section-title">
              A Thoughtful <em>Favor Alternative</em>
            </h2>
          </header>
          <div className="ideas-prose">
            <p>
              We love favors — those thoughtful gifts from a host to a guest,
              often found at each place setting. They can add to the tabletop
              décor and let guests know that their attendance is appreciated.
            </p>
            <p>
              In lieu of a favor, you could consider a donation to a non-profit
              organization that aligns with your values and interests. (Note:
              donations could also be done <em>in addition to</em> giving
              favors.)
            </p>
            <p>
              Here are some non-profits based in Hawai'i — some of which we
              have been blessed to work with — that would gratefully accept
              your support:
            </p>
          </div>
          <div className="ideas-nonprofits">
            {NONPROFITS.map(({ category, orgs }) => (
              <div key={category} className="ideas-nonprofit-group">
                <p className="ideas-nonprofit-category">{category}</p>
                <ul className="ideas-nonprofit-list">
                  {orgs.map((org) => (
                    <li key={org}>{org}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pantone design tip */}
      <section className="ideas-section">
        <div className="ideas-inner">
          <header className="ideas-section-header">
            <p className="eyebrow">Design Tip</p>
            <h2 className="ideas-section-title">
              Pantone Color of the <em>Year 2026</em>
            </h2>
          </header>
          <div className="ideas-prose">
            <p>
              Pantone, the universal language of color design, has announced
              their 2026 Color of the Year:{" "}
              <strong>Cloud Dancer (PANTONE 11-4201)</strong>. This shade of
              white encourages serenity, relaxation, and focus. The Pantone
              color of the year often makes its way into wedding design and
              décor.
            </p>
            <p>
              An airy, off-white hue, the primary digital color codes for this
              shade are <strong>HEX #F0EEE9</strong> and{" "}
              <strong>RGB 240, 238, 233</strong>.
            </p>
            <p>
              For more on colors of the year including previous years,{" "}
              <a
                href="https://www.pantone.com/articles/color-of-the-year"
                target="_blank"
                rel="noopener noreferrer"
              >
                visit Pantone's Color of the Year articles
              </a>
              .
            </p>
          </div>
          <div className="ideas-pantone-swatch">
            <div
              className="ideas-pantone-chip"
              style={{ background: "#F0EEE9" }}
              aria-hidden="true"
            />
            <div className="ideas-pantone-meta">
              <p className="ideas-pantone-name">Cloud Dancer</p>
              <p className="ideas-pantone-code">PANTONE 11-4201</p>
              <p className="ideas-pantone-hex">#F0EEE9 · RGB 240, 238, 233</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tip Talks */}
      <section className="ideas-section ideas-section--alt">
        <div className="ideas-inner">
          <header className="ideas-section-header">
            <p className="eyebrow">Tip Talks</p>
            <h2 className="ideas-section-title">
              Bite-Sized <em>Planning Tips</em>
            </h2>
            <p className="ideas-section-sub">
              Our bite-sized series of wedding &amp; event planning tips to make
              your celebration unforgettable.
            </p>
          </header>
          <div className="ideas-tip-grid">
            {TIP_TALKS.map((tip) => (
              <article key={tip.id} className="ideas-tip-card">
                <h3 className="ideas-tip-title">{tip.title}</h3>
                <div className="ideas-tip-body">
                  {tip.body.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
