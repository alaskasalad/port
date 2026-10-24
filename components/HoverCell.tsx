"use client";

import {
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type CSSProperties,
} from "react";

// Each hover moves a box to the next color in this list, wrapping at the end.
const HOVER_COLORS = ["#e31f24", "#0765a7", "#262f71", "#256743", "#e62770", "#fcea0c"];

type HoverState = { hovered: boolean; hovers: number };

// Tracks one box's hovers. The first hover shows the first color, the next hover the second, and so on.
// A selected box keeps the color from its last hover, so it stays that color after the mouse leaves.
// startIndex sets where the sequence begins, so boxes can start on different colors.
function useHoverColor(selected: boolean, startIndex: number) {
  const [state, setState] = useState<HoverState>({ hovered: false, hovers: startIndex });

  // Before any hover, a selected box shows the color it starts on; after hovers, the color of the latest hover.
  const colorIndex = state.hovers > startIndex ? (state.hovers - 1) % HOVER_COLORS.length : startIndex % HOVER_COLORS.length;

  const hoverStyle: CSSProperties | undefined = state.hovered || selected
    ? { backgroundColor: HOVER_COLORS[colorIndex] }
    : undefined;

  return {
    hoverStyle,
    onEnter: () =>
      // Ignore repeat enter events while already hovered, so one hover is one color step.
      setState((prev) => (prev.hovered ? prev : { hovered: true, hovers: prev.hovers + 1 })),
    onLeave: () => setState((prev) => ({ ...prev, hovered: false })),
  };
}

export function HoverLink({
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const hover = useHoverColor(false, 0);
  return (
    <a
      {...props}
      style={{ ...style, ...hover.hoverStyle }}
      onMouseEnter={(e) => {
        hover.onEnter();
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        hover.onLeave();
        onMouseLeave?.(e);
      }}
    />
  );
}

export function HoverButton({
  style,
  onMouseEnter,
  onMouseLeave,
  startIndex = 0,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { startIndex?: number }) {
  const selected = props["aria-selected"] === true || props["aria-selected"] === "true";
  const hover = useHoverColor(selected, startIndex);
  return (
    <button
      {...props}
      style={{ ...style, ...hover.hoverStyle }}
      onMouseEnter={(e) => {
        hover.onEnter();
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        hover.onLeave();
        onMouseLeave?.(e);
      }}
    />
  );
}
