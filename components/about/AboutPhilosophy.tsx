import { ABOUT_PHILOSOPHY } from "@/lib/about-data";

export default function AboutPhilosophy() {
  return (
    <section className="about-page-philosophy">
      <div className="about-page-philosophy-inner reveal-text">
        <div className="about-page-philosophy-rule" aria-hidden />
        <p className="about-page-philosophy-body">{ABOUT_PHILOSOPHY.body}</p>
        <p className="about-page-philosophy-signature">
          <em>{ABOUT_PHILOSOPHY.signature}</em>
        </p>
      </div>
    </section>
  );
}
