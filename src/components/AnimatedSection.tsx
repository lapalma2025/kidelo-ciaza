"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Selektor elementów wewnątrz sekcji, które mają się animować osobno (stagger). */
  itemSelector?: string;
  as?: "div" | "section";
}

// Treść jest w HTML od razu (Server Components) — GSAP tylko dokłada ruch
// przy scrollu po stronie klienta i całkowicie wyłącza się przy
// prefers-reduced-motion, zgodnie z wymogiem wydajności/dostępności.
export default function AnimatedSection({
  children,
  className = "",
  itemSelector = ".reveal-item",
  as = "div",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !ref.current) return;

    const ctx = gsap.context(() => {
      const targets = ref.current!.querySelectorAll(itemSelector);
      const els = targets.length > 0 ? targets : [ref.current];
      gsap.fromTo(
        els,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", toggleActions: "play none none reverse" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [itemSelector]);

  const Comp = as;
  return (
    <Comp ref={ref as never} className={className}>
      {children}
    </Comp>
  );
}
