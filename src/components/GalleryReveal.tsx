"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryRevealProps {
  children: React.ReactNode;
  className?: string;
  itemSelector?: string;
}

// Kolumny wjeżdżają na przemian z góry i z dołu (efekt "pływającej" galerii)
// zamiast jednolitego fade-in — bardziej dynamiczne, ale wciąż kontrolowane.
export default function GalleryReveal({ children, className = "", itemSelector = ".gallery-item" }: GalleryRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = el.querySelectorAll(itemSelector);
    if (prefersReducedMotion || items.length === 0) return;

    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: i % 2 === 0 ? 70 : -70 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none reverse" },
            delay: (i % 5) * 0.06,
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, [itemSelector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
