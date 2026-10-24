"use client";

import { useState } from "react";
import { sequenceFrom } from "@/lib/palette";

// A solid block that cycles through the palette when clicked, starting at its own color.
export default function SwatchTile({ start, className }: { start: string; className?: string }) {
  const sequence = sequenceFrom(start);
  const [step, setStep] = useState(0);

  return (
    <button
      type="button"
      className={`swatch ${className ?? ""}`}
      style={{ backgroundColor: sequence[step] }}
      aria-label="Change block color"
      /* Keeps the click from leaving focus on the block, which draws a highlight. */
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => setStep((s) => (s + 1) % sequence.length)}
    />
  );
}
