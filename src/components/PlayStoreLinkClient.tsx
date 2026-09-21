"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { GOOGLE_PLAY_URL } from "@/lib/site";
import { trackPlayStoreClick } from "@/lib/analytics";

export default function PlayStoreLinkClient({ source, label }: { source: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReducedMotion || !hasFinePointer) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * 0.18);
      yTo(relY * 0.25);
    }
    function onLeave() {
      xTo(0);
      yTo(0);
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={GOOGLE_PLAY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackPlayStoreClick(source)}
      className="cta-btn inline-flex max-w-full items-center gap-2.5 rounded-2xl bg-[var(--color-forest)] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(21,76,60,0.55)] transition-colors hover:bg-[var(--color-forest-dark)] sm:gap-3"
    >
      <Image
        src="/brand/google-play-icon.svg"
        alt=""
        width={22}
        height={24}
        className="shrink-0"
        aria-hidden="true"
        unoptimized
      />
      <span className="min-w-0 leading-snug">{label}</span>
    </a>
  );
}
