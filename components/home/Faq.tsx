"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/data";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="faq" id="faq">
      <div className="faq-inner">
        <header className="faq-header">
          <p className="eyebrow">Common Questions</p>
          <h2 className="section-title">
            Frequently <em>Asked</em>
          </h2>
        </header>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className={`faq-item${isOpen ? " faq-item--open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen ? true : false}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <span className="faq-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 5v14M5 12h14" className="faq-icon-plus" />
                      <path d="M5 12h14" className="faq-icon-minus" />
                    </svg>
                  </span>
                </button>

                <div className="faq-answer-wrap" {...(isOpen ? {} : { "aria-hidden": true })}>
                  <div className="faq-answer-inner">
                    <p className="faq-answer">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
