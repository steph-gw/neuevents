import Image from "next/image";
import AboutQuote from "@/components/about/AboutQuote";
import {
  ABOUT_GROUP_PHOTO,
  ABOUT_PRESS_LOGOS,
  HOME_ABOUT_TEAM,
} from "@/lib/about-data";

export default function AboutHero() {
  const [lead] = HOME_ABOUT_TEAM.paragraphs;

  return (
    <>
      <section className="abt-hero">
        <div className="abt-hero-inner hv2-wrap">
          <div className="abt-hero-content">
            <p className="hv2-eyebrow">Who We Are</p>
            <h1 className="abt-hero-title hv2-serif">It&apos;s Personal</h1>
            <p className="abt-hero-lead">{lead}</p>

            <div className="hv2-hero-press abt-hero-press">
              <div className="hv2-hero-press-logos">
                {ABOUT_PRESS_LOGOS.map((logo) => (
                  <a
                    key={logo.name}
                    href={logo.href}
                    className="hv2-hero-press-logo"
                    style={{ height: logo.displayHeight }}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={logo.name}
                  >
                    <Image
                      src={logo.image}
                      alt=""
                      width={logo.width}
                      height={logo.height}
                      style={{ height: logo.displayHeight, width: "auto" }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <figure className="abt-hero-media">
            <div className="abt-hero-media-image">
              <Image
                src={ABOUT_GROUP_PHOTO.image}
                alt={ABOUT_GROUP_PHOTO.imageAlt}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 560px"
                quality={90}
              />
            </div>
            <figcaption className="abt-hero-media-label">
              <span>{ABOUT_GROUP_PHOTO.caption}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <AboutQuote />
    </>
  );
}
