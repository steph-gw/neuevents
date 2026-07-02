import Image from "next/image";
import { Mail } from "react-feather";
import { ABOUT_TEAM_MEMBERS } from "@/lib/about-data";

export default function AboutTeam() {
  return (
    <section className="abt-team">
      <div className="hv2-wrap">
        <header className="abt-team-header">
          <p className="hv2-eyebrow">Our Team</p>
          <h2 className="abt-team-title hv2-serif">
            Meet the <em>Planners</em>
          </h2>
        </header>
      </div>

      <div className="abt-member-list">
        {ABOUT_TEAM_MEMBERS.map((member, index) => (
          <article
            key={member.id}
            className={[
              "abt-member",
              index % 2 === 1 ? "abt-member--reverse" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="abt-member-inner hv2-wrap">
              <figure className="abt-member-media">
                <div className="abt-member-image">
                  <Image
                    src={member.image}
                    alt={member.imageAlt}
                    fill
                    sizes="(max-width: 900px) 100vw, 420px"
                    quality={90}
                  />
                </div>
              </figure>

              <div className="abt-member-content">
                <div className="abt-member-heading">
                  <div className="abt-member-name-group">
                    <h3 className="abt-member-name hv2-serif">{member.name}</h3>
                    {member.credentials ? (
                      <span className="abt-member-credentials">
                        {member.credentials}
                      </span>
                    ) : null}
                  </div>

                  <a
                    href={`mailto:${member.email}`}
                    className="abt-member-email contact-info-link"
                  >
                    <Mail size={14} strokeWidth={1.5} aria-hidden />
                    <span>{member.email}</span>
                  </a>

                  {member.consult ? (
                    <a
                      href={member.consult.bookingUrl}
                      className="abt-member-book"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book with {member.consult.displayName}
                    </a>
                  ) : null}
                </div>

                <div className="abt-member-bio">
                  {member.bio.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
