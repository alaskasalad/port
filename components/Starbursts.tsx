"use client";

import { useState } from "react";
import { wavyPath } from "@/lib/starburst";

const PALETTE = ["#262f71", "#256743", "#e62770", "#fcea0c", "#0765a7", "#e31f24"];

const shapes = [
  { size: 350, points: 16, start: "#262f71" },
  { size: 300, points: 18, start: "#fcea0c" },
  { size: 250, points: 14, start: "#e62770" },
  { size: 180, points: 12, start: "#e31f24" },
];

// Each starburst cycles through the palette, beginning at its own start color.
// A start color that is not in the palette is placed first, then the full palette follows.
const sequences = shapes.map((shape) => {
  const index = PALETTE.indexOf(shape.start);
  if (index < 0) return [shape.start, ...PALETTE];
  return [...PALETTE.slice(index), ...PALETTE.slice(0, index)];
});

export default function Starbursts() {
  // Each entry is how many clicks that starburst has taken through its sequence.
  const [steps, setSteps] = useState(shapes.map(() => 0));

  // Moves only the starburst at position i to its next color.
  function cycle(i: number) {
    setSteps((prev) => {
      const next = [...prev];
      next[i] = (prev[i] + 1) % sequences[i].length;
      return next;
    });
  }

  return (
    <div className="shapes">
      {shapes.map((shape, i) => (
        <button
          key={i}
          type="button"
          className="shape-button"
          data-reveal
          aria-label={`Change starburst ${i + 1} color`}
          onClick={() => cycle(i)}
        >
          <svg
            viewBox="-120 -120 240 240"
            width={shape.size}
            height={shape.size}
            style={{ fill: sequences[i][steps[i]] }}
            aria-hidden="true"
          >
            <path d={wavyPath(shape.points, 0.12)} />
          </svg>
        </button>
      ))}
    </div>
  );
}
