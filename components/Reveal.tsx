"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Fades and rises each [data-reveal] element as it scrolls into view, and
// resets when it leaves the view, so the animation plays again in either
// scroll direction. Siblings stagger, so a group of rows appears one after another.
export default function Reveal({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    targets.forEach((el) => {
      el.classList.add("reveal");
      const siblings = Array.from(el.parentElement?.children ?? []);
      el.style.setProperty("--delay", `${siblings.indexOf(el) * 120}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.15 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
