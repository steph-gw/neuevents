import Image from "next/image";
import ConsultCard from "@/components/ConsultCard";
import { ABOUT_TEAM_MEMBERS } from "@/lib/about-data";

export default function AboutTeam() {
  return (
    <section className="about-v2-team">
      <div className="about-v2-team-header">
        <p className="eyebrow">Our Team</p>
        <h2 className="section-title">
          Meet the <em>Planners</em>
        </h2>
      </div>

      <div className="about-v2-team-list">
        {ABOUT_TEAM_MEMBERS.map((member, index) => (
          <article
            key={member.id}
            className={`about-v2-member${index % 2 === 1 ? " about-v2-member--reverse" : ""}`}
          >
            <div className="about-v2-member-inner">
              <figure className="about-v2-member-media">
                <div className="about-v2-member-image">
                  <Image
                    src={member.image}
                    alt={member.imageAlt}
                    fill
                    sizes="(max-width: 900px) 100vw, 420px"
                    quality={90}
                  />
                </div>
              </figure>

              <div className="about-v2-member-content">
                <div className="about-v2-member-heading">
                  <h3 className="about-v2-member-name">{member.name}</h3>
                  {member.credentials ? (
                    <p className="about-v2-member-credentials">{member.credentials}</p>
                  ) : null}
                  <a href={`mailto:${member.email}`} className="about-v2-member-email">
                    {member.email}
                  </a>
                </div>

                <div className="about-v2-member-bio">
                  {member.bio.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {member.consult ? (
                  <ConsultCard
                    name={member.consult.displayName}
                    role={member.consult.role}
                    image={member.consult.image}
                    bookingUrl={member.consult.bookingUrl}
                  />
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
