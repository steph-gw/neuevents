"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function isInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );

    const observeAll = () => {
      document.querySelectorAll(".reveal-image, .reveal-text").forEach((el) => {
        if (isInViewport(el)) {
          el.classList.add("visible");
        } else {
          observer.observe(el);
        }
      });
    };

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(observeAll);
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
