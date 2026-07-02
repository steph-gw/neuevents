import { ABOUT_PHILOSOPHY_QUOTE, HOME_ABOUT_TEAM } from "@/lib/about-data";

const QUOTE_FOLLOWUP = [
  HOME_ABOUT_TEAM.paragraphs[1],
  HOME_ABOUT_TEAM.paragraphs[3],
] as const;

function QuoteText({ text }: { text: string }) {
  const parts = text.split(/("it's personal\.")/i);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === `"it's personal."` ? (
          <span key={index} className="abt-quote-accent">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default function AboutQuote() {
  return (
    <section className="abt-quote">
      <div className="abt-quote-inner hv2-wrap">
        <div className="abt-quote-main">
          <span className="abt-quote-mark" aria-hidden="true">
            &ldquo;
          </span>
          <p className="abt-quote-text hv2-serif">
            <QuoteText text={ABOUT_PHILOSOPHY_QUOTE} />
          </p>
        </div>

        <div className="abt-quote-followup">
          {QUOTE_FOLLOWUP.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
