"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BASE_PATH } from "@/lib/base-path";

const movies = [
  { title: "Amadeus", year: 1984, src: "/posters/amadeus.jpg" },
  { title: "Cabaret", year: 1972, src: "/posters/cabaret.jpg" },
  { title: "Paths of Glory", year: 1957, src: "/posters/paths-of-glory.jpg" },
  { title: "The Night Is Short, Walk On Girl", year: 2017, src: "/posters/night-is-short.jpg" },
  { title: "Chungking Express", year: 1994, src: "/posters/chungking-express.jpg" },
  { title: "The Godfather", year: 1972, src: "/posters/the-godfather.jpg" },
];

const COOLDOWN_MS = 450;
// How far the mouse must travel while dragging before the row moves one poster.
const DRAG_STEP_PX = 140;

// A row of posters with the current one centered and its neighbors smaller
// and faded on either side. Clicking a poster, dragging the row with the mouse,
// the arrow, the arrow keys, or the mouse wheel moves it, and it loops at both ends.
export default function PosterCarousel() {
  const [index, setIndex] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const lastMove = useRef(0);
  const drag = useRef<{ x: number } | null>(null);
  // Set once a drag has moved the row, so the click that ends the drag is ignored.
  const dragged = useRef(false);
  const count = movies.length;

  const next = () => setIndex((i) => (i + 1) % count);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % count);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    // Non-passive so the wheel can move the row instead of scrolling the page.
    function onWheel(e: WheelEvent) {
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 4) return;
      e.preventDefault();

      const now = Date.now();
      if (now - lastMove.current < COOLDOWN_MS) return;
      lastMove.current = now;

      if (delta > 0) setIndex((i) => (i + 1) % count);
      else setIndex((i) => (i - 1 + count) % count);
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [count]);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    // The arrow is a button, so leave its press alone; capturing the pointer would stop its click.
    if (e.button !== 0 || (e.target as HTMLElement).closest(".strip-arrow")) return;
    drag.current = { x: e.clientX };
    dragged.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  // Dragging left brings up the next poster, dragging right the previous one.
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) < DRAG_STEP_PX) return;
    if (dx < 0) next();
    else prev();
    drag.current = { x: e.clientX };
    dragged.current = true;
  }

  function onPointerUp() {
    drag.current = null;
  }

  // Position of each poster relative to the centered one: 0 is center,
  // -1 is the left neighbor, +1 is the right neighbor, and so on, wrapping around.
  function offsetFor(i: number) {
    let d = (i - index + count) % count;
    if (d > count / 2) d -= count;
    return d;
  }

  function onSlotClick(d: number) {
    if (dragged.current) return;
    if (d < 0) prev();
    else next();
  }

  return (
    <div className="carousel" ref={frameRef}>
      <div
        className="strip"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {movies.map((movie, i) => {
          const d = offsetFor(i);
          const near = Math.abs(d) <= 1;
          return (
            <figure
              key={movie.title}
              className="slot"
              onClick={() => onSlotClick(d)}
              style={{
                transform: `translateX(calc(-50% + ${d} * (var(--w) + 28px))) scale(${d === 0 ? 1 : 0.82})`,
                opacity: d === 0 ? 1 : near ? 0.5 : 0,
                visibility: near ? "visible" : "hidden",
                zIndex: d === 0 ? 2 : 1,
              }}
            >
              <Image
                src={`${BASE_PATH}${movie.src}`}
                alt={`${movie.title} (${movie.year}) poster`}
                fill
                sizes="150px"
                draggable={false}
                unoptimized
                className="slot-img"
              />
              <figcaption className="slot-caption">
                {movie.title} ({movie.year})
              </figcaption>
            </figure>
          );
        })}

        <button type="button" className="strip-arrow" onClick={next} aria-label="Next movie">
          →
        </button>
      </div>
    </div>
  );
}
