"use client";

// The arrow that sits in the About section's corner square, on desktop.
export default function ScrollToTopArrow() {
  return (
    <button
      type="button"
      className="corner-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑
    </button>
  );
}
