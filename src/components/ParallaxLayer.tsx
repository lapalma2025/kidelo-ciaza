"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxLayerProps {
  children?: React.ReactNode;
  /** Piksele przesunięcia na pełną wysokość sekcji. Dodatnia = wolniej niż scroll (tło), ujemna = szybciej (pierwszy plan). */
  distance: number;
  className?: string;
}

// Warstwa "głębi" w hero — tylko animuje transform (nie top/left), więc nie
// powoduje reflow. Wyłączona całkowicie przy prefers-reduced-motion.
export default function ParallaxLayer({ children, distance, className = "" }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const trigger = el.closest("section") ?? el;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: distance,
        ease: "none",
        scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    });

    return () => ctx.revert();
  }, [distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
