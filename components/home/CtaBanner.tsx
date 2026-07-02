import Image from "next/image";
import Link from "next/link";

type Props = {
  showInquiry?: boolean;
};

export default function CtaBanner({ showInquiry = true }: Props) {
  return (
    <section className="hv2-final-cta">
      <Image
        src="/images/cta/coastal-kiss-bw.webp"
        alt="Bride and groom kissing on a coastal walkway at sunset in Hawaii"
        fill
        sizes="100vw"
        className="hv2-final-cta-bg"
      />
      <div className="hv2-final-cta-inner">
        <span className="hv2-eyebrow">Your Story Begins Here</span>
        <h2 className="hv2-serif">
          Ready to Start
          <br />
          <em>Planning Together?</em>
        </h2>
        <p className="hv2-body-text">
          We take on a select number of projects each year — weddings, events,
          celebrations of life, and destination travel — so every client receives
          our complete attention and care.
        </p>
        {showInquiry ? (
          <Link href="/contact" className="hv2-btn-primary">
            Send an Inquiry
          </Link>
        ) : null}
      </div>
    </section>
  );
}
