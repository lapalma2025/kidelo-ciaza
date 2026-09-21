"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SequentialRevealProps {
  children: React.ReactNode;
  className?: string;
  itemSelector?: string;
}

// Elementy pojawiają się po kolei od lewej do prawej (wjeżdżają z lewej,
// każdy z małym opóźnieniem względem poprzedniego) zamiast wspólnego fade-in.
export default function SequentialReveal({
  children,
  className = "",
  itemSelector = ".sequential-item",
}: SequentialRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = el.querySelectorAll(itemSelector);
    if (prefersReducedMotion || items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, x: -48 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [itemSelector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
