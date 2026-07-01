import Image from "next/image";
import Link from "next/link";
import { HOME_ABOUT_TEAM } from "@/lib/about-data";

export default function AboutSection() {
  const [lead, ...body] = HOME_ABOUT_TEAM.paragraphs;

  return (
    <section className="about" id="intro">
      <div className="about-inner">
        <div className="about-header">
          <p className="eyebrow">About Us</p>
          <h2 className="section-title">
            Meet the <em>Team</em>
          </h2>
        </div>

        <div className="about-main">
          <div className="about-top-row">
            <div className="about-media">
              <Image
                src={HOME_ABOUT_TEAM.image}
                alt={HOME_ABOUT_TEAM.imageAlt}
                fill
                className="about-media-image"
                sizes="(max-width: 900px) 100vw, (max-width: 1200px) 46vw, 560px"
                quality={90}
              />
              <div className="about-media-label">
                <span>{HOME_ABOUT_TEAM.imageLabel}</span>
              </div>
            </div>

            <p className="about-lead">{lead}</p>
          </div>

          <div className="about-body-group">
            {body.map((paragraph) => (
              <p key={paragraph} className="about-body">
                {paragraph}
              </p>
            ))}

            <Link href="/about" className="btn service-card-btn about-cta">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
