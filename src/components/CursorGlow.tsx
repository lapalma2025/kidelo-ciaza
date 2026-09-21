"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Miękka poświata podążająca za kursorem — tylko desktop / fine pointer.
 * Dodaje warstwę „żywego” światła bez obciążania scrolla.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) {
      el.style.display = "none";
      return;
    }

    const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });

    function onMove(e: MouseEvent) {
      xTo(e.clientX - 140);
      yTo(e.clientY - 140);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[1] hidden h-[280px] w-[280px] rounded-full opacity-40 mix-blend-multiply md:block"
      style={{
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--color-peach) 35%, transparent) 0%, transparent 70%)",
        transform: "translate3d(-200px, -200px, 0)",
      }}
    />
  );
}
