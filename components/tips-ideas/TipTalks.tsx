import Image from "next/image";
import { TIP_TALKS } from "@/lib/tips-ideas-tip-talks-data";

export default function TipTalks() {
  return (
    <section className="ideas-section ideas-section--tips">
      <div className="hv2-wrap">
        <header className="ideas-tips-header">
          <p className="hv2-eyebrow">Tip Talks</p>
          <h2 className="ideas-section-title hv2-serif">Bite-Sized Planning Tips</h2>
          <p className="ideas-tips-lead">
            Our bite-sized series of wedding &amp; event planning tips to make your
            celebration unforgettable.
          </p>
        </header>

        <div className="ideas-tip-talks">
          {TIP_TALKS.map((tip, index) => (
            <article
              key={tip.id}
              className={[
                "ideas-tip-talk",
                index % 2 === 1 ? "ideas-tip-talk--reverse" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="ideas-tip-talk-inner">
                <figure className="ideas-tip-talk-media">
                  <div className="ideas-tip-talk-image">
                    <Image
                      src={tip.image}
                      alt={tip.imageAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 520px"
                      style={tip.id === "pets" ? { objectPosition: "center 70%" } : undefined}
                    />
                  </div>
                </figure>

                <div className="ideas-tip-talk-content">
                  <span className="ideas-tip-talk-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="ideas-tip-talk-title hv2-serif">{tip.title}</h3>

                  {tip.intro ? <p className="ideas-tip-talk-intro">{tip.intro}</p> : null}

                  {tip.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="ideas-tip-talk-text">
                      {paragraph}
                    </p>
                  ))}

                  {tip.bullets ? (
                    <ul className="ideas-tip-talk-list">
                      {tip.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}

                  {tip.sections?.map((section) => (
                    <div key={section.label} className="ideas-tip-talk-group">
                      <p className="ideas-tip-talk-group-label">{section.label}</p>
                      <ul className="ideas-tip-talk-list">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {tip.closing ? (
                    <p className="ideas-tip-talk-closing">{tip.closing}</p>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
