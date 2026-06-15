import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="about" id="intro">

      <div className="about-inner">

        {/* Left — photo */}
        <div className="about-media">
          <Image
            src="/images/about/couple.webp"
            alt="Matthew and Candace Kelly, owners of neu events"
            fill
            className="about-media-image"
            sizes="(max-width: 900px) 100vw, (max-width: 1200px) 46vw, 560px"
            quality={90}
          />
          <div className="about-media-label">
            <span>Matthew &amp; Candace Kelly</span>
          </div>
        </div>

        {/* Right — text */}
        <div className="about-content">
          <p className="about-tag">About Us</p>

          <p className="about-lead">
            At neu events, we strive to make your wedding
            day as incredible as your love story — whether you&apos;re dreaming of
            an intimate ceremony or an extravagant celebration.
          </p>

          <div className="about-rule" />

          <p className="about-tag">Meet the Owners</p>

          <p className="about-body">
            Matthew and Candace turned their shared passion for weddings into
            neu events — bringing creativity, design expertise, and heartfelt
            service to every celebration they touch.
          </p>

          <div className="about-credentials">
            <div className="about-credential">
              <span className="about-credential-name">Candace Kelly</span>
              <span className="about-credential-detail">
                Elite Certified Wedding Planner · NYIAD · Chancey Charm Planner ·
                Certified Jamie Wolfer Planner · Interior Design Degree · 16+ years
              </span>
            </div>
            <div className="about-credential">
              <span className="about-credential-name">Matthew Kelly</span>
              <span className="about-credential-detail">
                Wedding MBA Certified Elite Planner · Leadership &amp; Management ·
                Audio/Visual Production
              </span>
            </div>
          </div>

          <Link href="/about" className="btn service-card-btn about-cta">
            Learn More
          </Link>
        </div>

      </div>

    </section>
  );
}
