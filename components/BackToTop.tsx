"use client";

import { useEffect, useState } from "react";

// Shows a button once the reader is close to the bottom of the page.
const NEAR_END_PX = 120;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function check() {
      const distanceToEnd = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      setVisible(distanceToEnd <= NEAR_END_PX);
    }

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="back-to-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑
    </button>
  );
}
