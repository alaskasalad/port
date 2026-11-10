"use client";

import { useEffect, useState, type PointerEvent } from "react";

// The shapes are drawn with "-" characters on a 3 x 2 grid of tiles, like the Bauhaus poster.
const COLS = 66;
const ROWS = 26;
const TILE_COLS = COLS / 3;
const TILE_ROWS = ROWS / 2;

const TILES = [
  ["hBottom", "qTL", "full"],
  ["qBR", "hTop", "rect"],
];

const CENTERS: Record<string, [number, number]> = {
  qTL: [0, 0],
  qBR: [1, 1],
  hTop: [0.5, 1],
  hBottom: [0.5, 0],
  full: [0.5, 0.5],
  rect: [0.5, 0.5],
};

const RING = 2.4; // distance between the rings of a shape, in characters
const LINE = "-";
const GLYPHS = ["o", "+", "x"];
const STEP_MS = 45; // time for the spread to move one step along the lines
const HOLD_MS = 260; // how long each character stays lit once the spread reaches it

// Each cell gets a number: how many steps the spread needs to reach it from the click.
type Spread = { start: number; depth: Int32Array; end: number };

// The shape itself never moves: a character is a line if it sits on one of the rings.
function baseChar(col: number, row: number): string {
  const tx = Math.floor(col / TILE_COLS);
  const ty = Math.floor(row / TILE_ROWS);
  const kind = TILES[ty][tx];
  const u = ((col % TILE_COLS) + 0.5) / TILE_COLS;
  const v = ((row % TILE_ROWS) + 0.5) / TILE_ROWS;
  let d: number;
  if (kind === "rect") {
    d = Math.abs(u - 0.5) * TILE_COLS * 2;
  } else {
    const [cx, cy] = CENTERS[kind];
    const px = (u - cx) * TILE_COLS;
    const py = (v - cy) * TILE_ROWS * 2;
    d = Math.sqrt(px * px + py * py);
  }
  return d % RING < 0.9 ? LINE : " ";
}

const LINE_CELLS: boolean[] = [];
for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    LINE_CELLS[row * COLS + col] = baseChar(col, row) === LINE;
  }
}

// Breadth-first search over the lines, so the spread follows the shapes outward from the click.
function spreadFrom(col: number, row: number): Spread {
  const depth = new Int32Array(COLS * ROWS).fill(-1);

  let start = row * COLS + col;
  if (!LINE_CELLS[start]) {
    // A click off the lines starts from the nearest line.
    let best = -1;
    let bestDist = Infinity;
    for (let i = 0; i < COLS * ROWS; i++) {
      if (!LINE_CELLS[i]) continue;
      const dx = (i % COLS) - col;
      const dy = Math.floor(i / COLS) - row;
      const dist = dx * dx + dy * dy;
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    if (best < 0) return { start: 0, depth, end: 0 };
    start = best;
  }

  const queue: number[] = [start];
  depth[start] = 0;
  let maxDepth = 0;
  for (let head = 0; head < queue.length; head++) {
    const cur = queue[head];
    const cc = cur % COLS;
    const cr = Math.floor(cur / COLS);
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nc = cc + dc;
        const nr = cr + dr;
        if (nc < 0 || nc >= COLS || nr < 0 || nr >= ROWS) continue;
        const next = nr * COLS + nc;
        if (!LINE_CELLS[next] || depth[next] >= 0) continue;
        depth[next] = depth[cur] + 1;
        maxDepth = Math.max(maxDepth, depth[next]);
        queue.push(next);
      }
    }
  }

  return { start: performance.now(), depth, end: maxDepth * STEP_MS + HOLD_MS };
}

// A line character is lit while the spread is passing over it, then returns to "-".
function charAt(col: number, row: number, now: number, spreads: Spread[]): string {
  const index = row * COLS + col;
  if (!LINE_CELLS[index]) return " ";

  for (const spread of spreads) {
    const d = spread.depth[index];
    if (d < 0) continue;
    const age = now - spread.start - d * STEP_MS;
    if (age >= 0 && age < HOLD_MS) return GLYPHS[d % GLYPHS.length];
  }
  return LINE;
}

// Pressing the shapes starts a spread that moves along the lines from that point.
export default function BauhausShapes() {
  const [spreads, setSpreads] = useState<Spread[]>([]);
  const [now, setNow] = useState(0);
  const active = spreads.length > 0;

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const tick = () => {
      const t = performance.now();
      setNow(t);
      setSpreads((ss) => ss.filter((s) => t - s.start < s.end));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  function onPress(e: PointerEvent<HTMLDivElement>) {
    const cell = (e.target as HTMLElement).closest<HTMLElement>("[data-col]");
    if (!cell) return;
    const col = Number(cell.dataset.col);
    const row = Number(cell.dataset.row);
    const spread = spreadFrom(col, row);
    setNow(spread.start);
    setSpreads((ss) => [...ss, spread]);
  }

  const rows: string[][] = [];
  for (let row = 0; row < ROWS; row++) {
    const line: string[] = [];
    for (let col = 0; col < COLS; col++) {
      line.push(charAt(col, row, now, spreads));
    }
    rows.push(line);
  }

  return (
    <div className="bauhaus" onPointerDown={onPress} aria-hidden="true">
      {rows.map((line, row) => (
        <div className="bauhaus-row" key={row}>
          {line.map((ch, col) => (
            <span key={col} data-col={col} data-row={row}>
              {ch}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
