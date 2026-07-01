"use client";

import { useEffect } from "react";

export default function LegacySkin({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add("legacy-home");
    return () => document.body.classList.remove("legacy-home");
  }, []);

  return children;
}
