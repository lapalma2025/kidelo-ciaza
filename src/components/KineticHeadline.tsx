"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

interface KineticHeadlineProps {
  children: React.ReactNode;
  className?: string;
}

// Nagłówek "spływa" słowo po słowie zamiast pojawiać się całym blokiem —
// tekst jest w HTML od razu (SSR), SplitText tylko dzieli go na <span>
// i animuje już po hydratacji. Wyłączone przy prefers-reduced-motion.
export default function KineticHeadline({ children, className = "" }: KineticHeadlineProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      split = new SplitText(el, { type: "words", wordsClass: "kinetic-word" });
      gsap.set(split.words, { opacity: 0, y: "0.6em" });
      gsap.to(split.words, {
        opacity: 1,
        y: "0em",
        duration: 0.9,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.15,
      });
    });

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <h1 ref={ref} className={className}>
      {children}
    </h1>
  );
}
