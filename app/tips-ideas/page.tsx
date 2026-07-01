import type { Metadata } from "next";
import Image from "next/image";
import CtaBanner from "@/components/home/CtaBanner";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Tips & Ideas | neu events",
  description:
    "Wedding and event planning tips, design ideas, and inspiration from the neu events team.",
  openGraphTitle: "Tips & Ideas | neu events",
  openGraphDescription:
    "Wedding and event planning tips, design ideas, and inspiration from the neu events team.",
  path: "/tips-ideas",
});

const TIP_TALKS = [
  {
    id: "pets",
    title: "Pets at weddings? Yes — but here's the must-know info",
    body: [
      "Not all venues allow pets (and some only during the ceremony!) Make sure your venue allows for your furry guest before booking if their attendance is a must-have.",
      "Designate someone to be your pet's dedicated handler for the day.",
      "If they're only attending the ceremony, make post-ceremony plans for their care.",
      "Be sure they're comfortable, well-fed, and feeling the love too!",
    ],
  },
  {
    id: "floral-cake",
    title: "Wedding Cakes & Fresh Flowers",
    body: [
      "If you're planning to decorate your cake with fresh florals, coordinate with your floral designer in advance so they can provide safe, fresh flowers that match the rest of your event design.",
      "Better yet? Have your floral designer and cake decorator connect directly. This ensures seamless styling and proper placement for a picture-perfect (and safe-to-eat!) cake.",
    ],
  },
  {
    id: "little-ones",
    title: "Weddings with little ones? A few tips to keep things smooth",
    body: [
      "Schedule photos after the ceremony — when kids are rested, fed, and at their best.",
      "Hold off on buying their outfits — get them closer to the wedding for the perfect fit.",
      "Consider offering a nanny service if you're planning an adults-only event.",
      "Set up kid-friendly activities (coloring books, games, or a mini movie corner!) to keep them entertained during the reception.",
    ],
  },
  {
    id: "daytime",
    title: "Planning a daytime ceremony? A few things to keep in mind",
    body: [
      "Lunch menus are often more budget-friendly and you and your guests still have the rest of the day to celebrate.",
      "Hair + makeup starts bright and early, and outdoor venues can get a bit toasty.",
      "Setup time may be tighter, especially for outdoor spaces — plan accordingly.",
    ],
  },
  {
    id: "dessert",
    title: "A dessert table isn't just delicious — it's a showstopper",
    body: [
      "Mix heights & textures for visual impact and include a variety of flavors so there's something for everyone.",
      "Add personal touches like custom signage or themed décor to tie it into your event.",
      "Whether it's a wedding, birthday, or corporate party, a well-styled dessert table will have guests coming back for seconds.",
    ],
  },
];

const NONPROFITS = [
  {
    category: "Cultural Preservation",
    orgs: ["Bishop Museum"],
    image: "",
  },
  {
    category: "Education",
    orgs: ["Public Schools of Hawai'i Foundation", "Roosevelt High School"],
    image: "",
  },
  {
    category: "Environmental",
    orgs: ["808 Cleanups", "Ho'okua'aina", "Hoʻoulu ʻĀina", "Kākoʻo ʻŌiwi"],
    image: "",
  },
  {
    category: "Health",
    orgs: [
      "Healthcare Association of Hawai'i (scholarship fund)",
      "Susan C. Hirano Cancer C.A.R.E. Community",
    ],
    image: "",
  },
  {
    category: "Social",
    orgs: ["Hawai'i State Coalition Against Domestic Violence"],
    image: "",
  },
];

export default function IdeasPage() {
  return (
    <main className="ideas-page">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="ideas-hero">
        <div className="ideas-hero-inner hv2-wrap">
          <p className="ideas-hero-eyebrow">Tips &amp; Ideas</p>
          <h1 className="ideas-hero-title">
            Planning <span className="ideas-hero-title-accent">Inspiration</span>
          </h1>
          <p className="ideas-hero-lead">
            Bite-sized tips, design ideas, and thoughtful resources from the
            neu events team — to help make your celebration truly unforgettable.
          </p>
        </div>
      </section>

      {/* ── Love In Action ─────────────────────────────────────── */}
      <section className="ideas-section">
        <div className="ideas-love-inner hv2-wrap">
          <div className="ideas-love-intro">
            <div className="ideas-love-left">
              <p className="hv2-eyebrow">Love in Action</p>
              <h2 className="ideas-section-title hv2-serif">
                A Thoughtful<br />Favor Alternative
              </h2>
              <div className="ideas-prose">
                <p>
                  We love favors — those thoughtful gifts from a host to a guest,
                  often found at each place setting. They add to the tabletop décor
                  and let guests know their attendance is appreciated.
                </p>
                <p>
                  In lieu of a favor, consider a donation to a non-profit
                  organization that aligns with your values and interests. Donations
                  could also be done <em>in addition to</em> giving favors.
                </p>
                <p>
                  Here are some Hawai'i-based non-profits — some of which we have
                  been blessed to work with — that would gratefully accept your
                  support:
                </p>
              </div>
            </div>
            <div className="ideas-love-image">
              <Image
                src="/images/tips-ideas/love-in-action-hibiscus.png"
                alt="A hand holding a vibrant coral-pink flower against a clear blue sky"
                width={1024}
                height={723}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="ideas-nonprofit-tiles">
            {NONPROFITS.map(({ category, orgs, image }) => (
              <div
                key={category}
                className="ideas-nonprofit-tile"
                style={image ? { backgroundImage: `url(${image})` } : undefined}
                data-has-image={image ? "true" : "false"}
              >
                <div className="ideas-nonprofit-tile-body">
                  <p className="ideas-nonprofit-tile-category">{category}</p>
                  <ul className="ideas-nonprofit-tile-orgs">
                    {orgs.map((org) => (
                      <li key={org}>{org}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pantone ────────────────────────────────────────────── */}
      <section className="ideas-section ideas-section--alt">
        <div className="ideas-pantone-inner hv2-wrap">
          <div className="ideas-pantone-swatch-wrap">
            <div
              className="ideas-pantone-chip"
              style={{ background: "#F0EEE9" }}
              aria-hidden="true"
            />
            <div className="ideas-pantone-meta">
              <p className="ideas-pantone-name hv2-serif">Cloud Dancer</p>
              <p className="ideas-pantone-code">PANTONE 11-4201</p>
              <p className="ideas-pantone-hex">#F0EEE9 · RGB 240, 238, 233</p>
            </div>
          </div>
          <div className="ideas-pantone-content">
            <p className="hv2-eyebrow">Design Tip</p>
            <h2 className="ideas-section-title hv2-serif">
              Pantone Color of the Year <em>2026</em>
            </h2>
            <div className="ideas-prose">
              <p>
                Pantone has announced their 2026 Color of the Year:{" "}
                <strong>Cloud Dancer (PANTONE 11-4201)</strong>. This shade of
                white encourages serenity, relaxation, and focus — and it often
                makes its way into wedding design and décor.
              </p>
              <p>
                An airy, off-white hue, the primary digital color codes for this
                shade are <strong>HEX #F0EEE9</strong> and{" "}
                <strong>RGB 240, 238, 233</strong>.
              </p>
              <p>
                <a
                  href="https://www.pantone.com/articles/color-of-the-year"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See all Pantone Colors of the Year →
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tip Talks ──────────────────────────────────────────── */}
      <section className="ideas-section">
        <div className="hv2-wrap">
          <header className="ideas-tips-header">
            <div className="ideas-tips-header-left">
              <p className="hv2-eyebrow">Tip Talks</p>
              <h2 className="ideas-section-title hv2-serif">
                Bite-Sized Planning <em>Tips</em>
              </h2>
            </div>
            <p className="ideas-section-sub">
              Our bite-sized series of wedding &amp; event planning tips to make
              your celebration unforgettable.
            </p>
          </header>
          <div className="ideas-tip-grid">
            {TIP_TALKS.map((tip, index) => (
              <article key={tip.id} className="ideas-tip-card">
                <span className="ideas-tip-number">{String(index + 1).padStart(2, "0")}</span>
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
