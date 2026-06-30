import { ABOUT_PHILOSOPHY_QUOTE } from "@/lib/about-data";

export default function AboutQuote() {
  return (
    <section className="about-v2-quote">
      <div className="about-v2-quote-inner">
        <p className="about-v2-quote-text">{ABOUT_PHILOSOPHY_QUOTE}</p>
      </div>
    </section>
  );
}
