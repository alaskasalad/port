"use client";

import { useState } from "react";
import { sequenceFrom } from "@/lib/palette";

type Props = {
  // Which corners the diagonal runs between.
  orientation: "tl-br" | "bl-tr";
  // Starting color for each of the two triangles.
  starts: [string, string];
};

// A square split by a diagonal. Each triangle changes color when clicked,
// cycling through the palette from its own starting color.
export default function ColorTile({ orientation, starts }: Props) {
  const sequences = starts.map((start) => sequenceFrom(start));
  const [steps, setSteps] = useState([0, 0]);

  function cycle(i: number) {
    setSteps((prev) => {
      const next = [...prev];
      next[i] = (prev[i] + 1) % sequences[i].length;
      return next;
    });
  }

  const triangles =
    orientation === "tl-br"
      ? ["0,0 100,0 100,100", "0,0 0,100 100,100"]
      : ["0,0 100,0 0,100", "100,0 100,100 0,100"];

  return (
    <svg className="tile" viewBox="0 0 100 100" aria-label="Color tile">
      {triangles.map((points, i) => (
        <polygon
          key={points}
          points={points}
          style={{ fill: sequences[i][steps[i]] }}
          role="button"
          tabIndex={0}
          /* Keeps the click from leaving focus on the triangle, which draws a highlight. */
          onMouseDown={(e) => e.preventDefault()}
          aria-label={`Change triangle ${i + 1} color`}
          onClick={() => cycle(i)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              cycle(i);
            }
          }}
        />
      ))}
    </svg>
  );
}
