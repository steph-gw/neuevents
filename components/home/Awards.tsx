import Image from "next/image";
import { GOVERNOR_MESSAGE } from "@/lib/data";

export default function Awards() {
  return (
    <section className="awards" id="awards">
      <div className="awards-inner">
        <header className="awards-header">
          <p className="eyebrow">Recognized Excellence</p>
          <h2 className="section-title">
            A Special Message from
            <br />
            <em>Governor Josh Green, M.D.</em>
          </h2>
        </header>

        <div className="awards-featured">
          <div className="awards-featured-main">
            <div className="awards-featured-badge-wrap">
              <Image
                src={GOVERNOR_MESSAGE.image}
                alt={GOVERNOR_MESSAGE.imageAlt}
                fill
                sizes="(max-width: 768px) 200px, 280px"
                className="awards-featured-badge"
              />
            </div>

            <div className="awards-featured-copy">
              <div className="awards-featured-meta">
                <p className="eyebrow awards-featured-presented">Presented to</p>
                <p className="awards-featured-recipient">
                  {GOVERNOR_MESSAGE.presentedTo}
                </p>
                <p className="eyebrow awards-featured-date">
                  {GOVERNOR_MESSAGE.date}
                </p>
              </div>

              <p className="awards-featured-text">{GOVERNOR_MESSAGE.message}</p>
            </div>
          </div>

          <div className="awards-featured-signature-wrap">
            <Image
              src={GOVERNOR_MESSAGE.signature}
              alt={GOVERNOR_MESSAGE.signatureAlt}
              width={254}
              height={98}
              className="awards-featured-signature"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
