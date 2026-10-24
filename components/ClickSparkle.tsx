"use client";

import { useEffect } from "react";
import { PALETTE } from "@/lib/palette";

const PIXELS = 8;
const LIFETIME_MS = 600;

// Bursts a few tiny colored pixels from wherever the page is pressed.
export default function ClickSparkle() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function onPress(e: PointerEvent) {
      const burst = document.createElement("div");
      burst.className = "sparkle-burst";
      burst.style.left = `${e.clientX}px`;
      burst.style.top = `${e.clientY}px`;

      for (let i = 0; i < PIXELS; i++) {
        const angle = (i / PIXELS) * Math.PI * 2 + Math.random() * 0.4;
        const distance = 18 + Math.random() * 14;
        const pixel = document.createElement("span");
        pixel.className = "sparkle-pixel";
        pixel.style.background = PALETTE[i % PALETTE.length];
        pixel.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
        pixel.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
        burst.appendChild(pixel);
      }

      document.body.appendChild(burst);
      window.setTimeout(() => burst.remove(), LIFETIME_MS);
    }

    window.addEventListener("pointerdown", onPress);
    return () => window.removeEventListener("pointerdown", onPress);
  }, []);

  return null;
}
