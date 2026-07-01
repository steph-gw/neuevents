"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HERO_SLIDES } from "@/lib/data";

const STACK_DEPTH = [
  { rotate:  1, x:   0, y:   0, scale: 1.00, shadow: "0 6px 24px rgba(42,37,32,0.07)" },
  { rotate: -7, x: -26, y:  16, scale: 0.97, shadow: "0 4px 16px rgba(42,37,32,0.05)" },
  { rotate:  5, x:  20, y:  30, scale: 0.94, shadow: "0 3px 10px rgba(42,37,32,0.04)"  },
  { rotate: -4, x: -16, y:  44, scale: 0.91, shadow: "0 2px 6px rgba(42,37,32,0.03)"  },
  { rotate:  3, x:  12, y:  58, scale: 0.88, shadow: "none"                            },
] as const;

const SHOW_COUNT  = 5;
const INTERVAL_MS = 2800;
const DEPART_MS   = 520;
const DEPART_X    = 620;

export default function HeroPolaroidStack() {
  const orderRef = useRef(HERO_SLIDES.map((_, i) => i));
  const pausedRef = useRef(false);
  const departTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [order, setOrder] = useState(orderRef.current);
  const [departSlide, setDepart] = useState<number | null>(null);
  const [departDir, setDepartDir] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (isPaused) return;

    const id = setInterval(() => {
      if (pausedRef.current) return;

      const current = orderRef.current;
      const front = current[0];
      const dir = front % 2 === 0 ? 1 : -1;

      setDepartDir(dir);
      setDepart(front);

      if (departTimerRef.current) clearTimeout(departTimerRef.current);
      departTimerRef.current = setTimeout(() => {
        if (pausedRef.current) {
          setDepart(null);
          return;
        }
        const next = [...orderRef.current];
        next.push(next.shift()!);
        orderRef.current = next;
        setOrder([...next]);
        setDepart(null);
      }, DEPART_MS);
    }, INTERVAL_MS);

    return () => {
      clearInterval(id);
      if (departTimerRef.current) clearTimeout(departTimerRef.current);
    };
  }, [isPaused]);

  return (
    <div
      className={`hv2-pstack-outer${mounted ? " hv2-pstack-outer--in" : ""}${isPaused ? " hv2-pstack-outer--paused" : ""}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hv2-pstack">
        {order.slice(0, SHOW_COUNT).map((slideIdx, depth) => {
          const slide = HERO_SLIDES[slideIdx];
          const look = STACK_DEPTH[depth];
          const leaving = slideIdx === departSlide;

          const transform = leaving
            ? `rotate(${look.rotate + departDir * 28}deg) translate(${departDir * DEPART_X}px, -36px) scale(0.88)`
            : `rotate(${look.rotate}deg) translate(${look.x}px, ${look.y}px) scale(${look.scale})`;

          const transition = leaving
            ? `transform ${DEPART_MS}ms cubic-bezier(0.55,0,0.8,0.2), opacity ${DEPART_MS}ms ease`
            : `transform 0.55s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease`;

          return (
            <div
              key={slideIdx}
              className={`hv2-polaroid${depth === 0 && !leaving ? " hv2-polaroid--front" : ""}`}
              style={{
                zIndex: SHOW_COUNT - depth,
                transform,
                transition,
                opacity: leaving ? 0 : 1,
                boxShadow: look.shadow,
              }}
            >
              <div className="hv2-polaroid-frame">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 900px) 300px, 500px"
                  unoptimized
                  priority={depth === 0}
                  style={{ objectFit: "cover", objectPosition: slide.position }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
