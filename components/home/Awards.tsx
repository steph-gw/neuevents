import Image from "next/image";
import AwardIcon from "@/components/AwardIcon";
import { ADDITIONAL_RECOGNITION, AWARDS } from "@/lib/data";

const LUXLIFE_AWARD_URL =
  "https://lux-life.digital/winners/overjoyed-weddings-and-events-llc/";

export default function Awards() {
  return (
    <section className="awards" id="awards">
      <div className="awards-inner">
        <header className="awards-header">
          <p className="eyebrow">Recognized Excellence</p>
          <h2 className="section-title">
            Awards & <em>Recognition</em>
          </h2>
        </header>

        <div className="awards-featured">
          <a
            href={LUXLIFE_AWARD_URL}
            className="awards-featured-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View neu events on LUXlife Global Wedding Awards"
          >
            <Image
              src="/images/awards/luxlife-global-wedding-awards-2026.webp"
              alt="LUXlife Global Wedding Awards 2026 — Best Wedding Planner & Designer"
              width={280}
              height={280}
              className="awards-featured-badge"
            />
          </a>
          <p className="awards-featured-text">
            neu events LLC is honored to be recognized by the
            LUXlife Global Wedding Awards, where we were named{" "}
            <strong>Best Wedding Planner &amp; Designer – The Carolinas</strong>{" "}
            and awarded the{" "}
            <strong>Luxury Wedding Planning &amp; Design Excellence Award 2026</strong>.
          </p>
        </div>

        <div className="awards-more">
          <p className="awards-more-label">Additional Recognition</p>
          <ul className="awards-more-list">
            {ADDITIONAL_RECOGNITION.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="awards-row">
          {AWARDS.map((award) => (
            <div key={`${award.title}-${award.year}`} className="award-item">
              <AwardIcon type={award.icon} />
              <p className="award-title">
                {award.title.split("\n").map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < award.title.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </p>
              <p className="award-year">{award.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
