"use client";

import { useEffect, useState, type RefObject } from "react";
import {
  DEFAULT_EMBED_HEIGHT,
  readStoredEmbedHeight,
  storeEmbedHeight,
} from "@/lib/embed-form";

const HEIGHT_EPSILON = 8;

export function useEmbedFormResize(
  iframeRef: RefObject<HTMLIFrameElement | null>,
  enabled = true,
) {
  const [height, setHeight] = useState(DEFAULT_EMBED_HEIGHT);

  useEffect(() => {
    setHeight(readStoredEmbedHeight());
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let frame: number | null = null;
    let lastHeight = 0;

    const onMessage = (e: MessageEvent) => {
      if (!iframeRef.current) return;

      const next = Number(e.data?.height);
      if (e.data?.type !== "embed_resize" || !Number.isFinite(next) || next < 160) {
        return;
      }

      if (Math.abs(next - lastHeight) < HEIGHT_EPSILON) return;

      lastHeight = next;
      if (frame !== null) cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        setHeight(next);
        storeEmbedHeight(next);
        iframeRef.current!.style.height = `${next}px`;
      });
    };

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [enabled, iframeRef]);

  return height;
}
