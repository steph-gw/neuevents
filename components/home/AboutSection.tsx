import Image from "next/image";
import Link from "next/link";
import { HOME_ABOUT_TEAM } from "@/lib/about-data";

function AboutLead({ text }: { text: string }) {
  const parts = text.split(/(neu events)/i);

  return (
    <p className="hv2-about-lead">
      {parts.map((part, i) =>
        part.toLowerCase() === "neu events" ? (
          <span key={i} className="hv2-about-brand">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </p>
  );
}

export default function AboutSection() {
  const [lead, ...body] = HOME_ABOUT_TEAM.paragraphs;

  return (
    <section className="hv2-section hv2-about" id="team">
      <div className="hv2-wrap">
        <div className="hv2-section-head">
          <span className="hv2-eyebrow">About Us</span>
          <h2 className="hv2-serif">
            Meet the <em>Team</em>
          </h2>
        </div>

        <div className="hv2-about-main">
          <div className="hv2-about-top-row">
            <div className="hv2-about-media">
              <Image
                src={HOME_ABOUT_TEAM.image}
                alt={HOME_ABOUT_TEAM.imageAlt}
                fill
                className="hv2-about-media-image"
                sizes="(max-width: 900px) 100vw, (max-width: 1200px) 46vw, 560px"
                quality={90}
              />
              <div className="hv2-about-media-label">
                <span>{HOME_ABOUT_TEAM.imageLabel}</span>
              </div>
            </div>

            <AboutLead text={lead} />
          </div>

          <div className="hv2-about-body-group">
            {body.map((paragraph) => (
              <p key={paragraph} className="hv2-about-body">
                {paragraph}
              </p>
            ))}

            <Link href="/about" className="hv2-btn-outline hv2-about-cta">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
