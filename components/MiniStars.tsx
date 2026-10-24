"use client";

import { useState } from "react";
import { wavyPath } from "@/lib/starburst";
import { sequenceFrom } from "@/lib/palette";

// Three small starbursts. Each one cycles through the palette from its own color when clicked,
// the same way the starbursts under the name on the home page do.
const stars = [
  { start: "#262f71", points: 16 },
  { start: "#fcea0c", points: 14 },
  { start: "#e62770", points: 12 },
];

export default function MiniStars() {
  const sequences = stars.map((star) => sequenceFrom(star.start));
  const [steps, setSteps] = useState(stars.map(() => 0));

  // Moves only the star at position i to its next color.
  function cycle(i: number) {
    setSteps((prev) => {
      const next = [...prev];
      next[i] = (prev[i] + 1) % sequences[i].length;
      return next;
    });
  }

  return (
    <div className="mini-stars">
      {stars.map((star, i) => (
        <button
          key={star.start}
          type="button"
          className="mini-star"
          aria-label={`Change star ${i + 1} color`}
          onClick={() => cycle(i)}
        >
          <svg viewBox="-120 -120 240 240" aria-hidden="true" style={{ fill: sequences[i][steps[i]] }}>
            <path d={wavyPath(star.points, 0.12)} />
          </svg>
        </button>
      ))}
    </div>
  );
}
