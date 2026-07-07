import type { Metadata } from "next";
import CtaBanner from "@/components/home/CtaBanner";
import NonprofitTiles from "@/components/tips-ideas/NonprofitTiles";
import TipTalks from "@/components/tips-ideas/TipTalks";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Tips & Ideas | neu events",
  description:
    "Wedding and event planning tips, design ideas, and inspiration from the neu events team in Hawaii.",
  openGraphTitle: "Tips & Ideas | neu events",
  openGraphDescription:
    "Planning inspiration, vendor insights, and thoughtful ideas for weddings and events — from the neu events team.",
  path: "/tips-ideas",
});

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
      <section className="ideas-section ideas-section--love">
        <div className="ideas-love-inner hv2-wrap">
          <header className="ideas-love-header">
            <p className="hv2-eyebrow">Love in Action</p>
            <h2 className="ideas-section-title hv2-serif">
              A Thoughtful Favor Alternative
            </h2>
            <div className="ideas-prose ideas-love-prose">
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
          </header>
          <NonprofitTiles />
        </div>
      </section>

      {/* ── Pantone ────────────────────────────────────────────── */}
      <section className="ideas-pantone-section">
        <div className="ideas-pantone-inner hv2-wrap">
          <div className="ideas-pantone-card">
            <div
              className="ideas-pantone-swatch"
              aria-hidden="true"
            />
            <div className="ideas-pantone-card-body">
              <p className="ideas-pantone-card-name hv2-serif">Cloud Dancer</p>
              <p className="ideas-pantone-card-code">PANTONE 11-4201</p>
              <div className="ideas-pantone-card-codes">
                <span className="ideas-pantone-card-chip">HEX #F0EEE9</span>
                <span className="ideas-pantone-card-chip">RGB 240, 238, 233</span>
              </div>
            </div>
          </div>
          <div className="ideas-pantone-content">
            <p className="ideas-pantone-eyebrow">Design Tip</p>
            <h2 className="ideas-section-title ideas-pantone-title hv2-serif">
              Pantone Color of the Year 2026
            </h2>
            <div className="ideas-pantone-body">
              <p>
                Pantone, the universal language of color design, has announced
                their 2026 Color of the Year:{" "}
                <strong>Cloud Dancer (PANTONE 11-4201)</strong> — a shade of
                airy off-white that encourages serenity, relaxation, and focus.
              </p>
              <p>
                The Pantone Color of the Year often makes its way into wedding
                design and décor. For articles on this year and previous years,{" "}
                <a
                  href="https://www.pantone.com/articles/color-of-the-year"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  visit pantone.com →
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <TipTalks />

      <CtaBanner />
    </main>
  );
}
