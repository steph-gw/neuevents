import Image from "next/image";
import { GOVERNOR_MESSAGE } from "@/lib/data";

export default function Awards() {
  return (
    <section className="hv2-gov" id="awards">
      <div className="hv2-wrap">
        <div className="hv2-gov-inner">
          <div className="hv2-section-head">
            <span className="hv2-eyebrow">Recognized Excellence</span>
            <h2 className="hv2-serif">
              A Special Message from Governor
              <br />
              <em>Josh Green, M.D.</em>
            </h2>
          </div>

          <div className="hv2-gov-featured">
            <div className="hv2-gov-main">
              <div className="hv2-seal">
                <Image
                  src={GOVERNOR_MESSAGE.image}
                  alt={GOVERNOR_MESSAGE.imageAlt}
                  width={180}
                  height={180}
                  className="hv2-seal-img"
                />
              </div>

              <div className="hv2-gov-copy">
                <p className="hv2-gov-meta">
                  Presented to {GOVERNOR_MESSAGE.presentedTo} · {GOVERNOR_MESSAGE.date}
                </p>
                <p className="hv2-body-text">{GOVERNOR_MESSAGE.message}</p>
              </div>
            </div>

            <div className="hv2-gov-sign">
              <Image
                src={GOVERNOR_MESSAGE.signature}
                alt={GOVERNOR_MESSAGE.signatureAlt}
                width={254}
                height={98}
                className="hv2-gov-signature"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
