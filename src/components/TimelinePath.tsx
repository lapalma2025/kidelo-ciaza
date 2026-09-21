"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
}

// Linia "rysująca się" pod kartami etapów podróży — wizualizuje upływ czasu
// (ciąża = 3 etapy w czasie), a nie tylko dekoruje. Widoczna tylko na
// desktopie (na mobile karty się układają w kolumnę, geometria by nie pasowała).
export default function TimelinePath() {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!path || !svg) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(path, { drawSVG: "100%" });
      return;
    }

    gsap.set(path, { drawSVG: "0%" });
    const ctx = gsap.context(() => {
      gsap.to(path, {
        drawSVG: "100%",
        ease: "none",
        scrollTrigger: { trigger: svg, start: "top 75%", end: "bottom 60%", scrub: 1 },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1000 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-1/2 hidden w-full -translate-y-1/2 lg:block"
    >
      <path
        ref={pathRef}
        d="M 90 90 C 260 10, 350 10, 500 60 C 650 110, 740 110, 910 40"
        fill="none"
        stroke="var(--color-peach)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
