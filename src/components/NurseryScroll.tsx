"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Motif =
  | "cradle"
  | "sleepsuit"
  | "bottle"
  | "mobile"
  | "rattle"
  | "hospitalBag"
  | "bodysuit"
  | "wallet"
  | "syringe"
  | "family"
  | "book";

interface NurseryScrollProps {
  motif: Motif;
  className?: string;
  /** Intensywność parallaxu w px (domyślnie 80). */
  travel?: number;
  /** Dodatkowy obrót przy scrollu (deg). */
  spin?: number;
}

/**
 * Interaktywne ilustracje nursery — kołyszą się / unoszą w rytm scrolla.
 * Czyste SVG (bez zewnętrznych assetów), wyłączone przy reduced-motion.
 */
export default function NurseryScroll({
  motif,
  className = "",
  travel = 80,
  spin = 8,
}: NurseryScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const graphic = el.querySelector(".nursery-graphic");
      const rocker = el.querySelector(".nursery-rock");
      if (!graphic) return;

      gsap.fromTo(
        graphic,
        { y: travel * 0.35, rotate: -Math.min(Math.abs(spin), 6) * 0.4 },
        {
          y: -travel,
          rotate: Math.min(Math.abs(spin), 6) * Math.sign(spin || 1),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        }
      );

      if (rocker) {
        gsap.to(rocker, {
          rotate: 6,
          transformOrigin: "50% 85%",
          ease: "sine.inOut",
          duration: 2.4,
          yoyo: true,
          repeat: -1,
        });
      }

      const plunger = el.querySelector(".syringe-plunger");
      const drop = el.querySelector(".syringe-drop");
      if (plunger) {
        gsap.to(plunger, {
          y: 10,
          ease: "sine.inOut",
          duration: 1.6,
          yoyo: true,
          repeat: -1,
        });
      }
      if (drop) {
        gsap.fromTo(
          drop,
          { opacity: 0, y: 0, scale: 0.6 },
          {
            opacity: 0.9,
            y: 14,
            scale: 1,
            ease: "sine.inOut",
            duration: 1.6,
            yoyo: true,
            repeat: -1,
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, [travel, spin]);

  return (
    <div ref={ref} className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <div className="nursery-graphic will-change-transform">{renderMotif(motif)}</div>
    </div>
  );
}

function renderMotif(motif: Motif) {
  switch (motif) {
    case "cradle":
      return <CradleSvg />;
    case "sleepsuit":
      return <SleepsuitSvg />;
    case "bottle":
      return <BottleSvg />;
    case "mobile":
      return <MobileSvg />;
    case "rattle":
      return <RattleSvg />;
    case "hospitalBag":
      return <HospitalBagSvg />;
    case "bodysuit":
      return <BodysuitSvg />;
    case "wallet":
      return <WalletSvg />;
    case "syringe":
      return <SyringeSvg />;
    case "family":
      return <FamilySvg />;
    case "book":
      return <BookSvg />;
  }
}

function CradleSvg() {
  return (
    <svg className="nursery-rock h-full w-full" viewBox="0 0 200 160" fill="none">
      <ellipse cx="100" cy="148" rx="54" ry="6" fill="var(--color-forest)" opacity="0.08" />
      <path
        d="M28 118c8 18 36 28 72 28s64-10 72-28"
        stroke="var(--color-forest)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M40 118 V72c0-10 8-18 18-18h84c10 0 18 8 18 18v46"
        stroke="var(--color-forest)"
        strokeWidth="3"
        fill="color-mix(in srgb, var(--color-sage) 55%, white)"
      />
      <path
        d="M52 72h96c2 0 4 2 4 4v10H48V76c0-2 2-4 4-4Z"
        fill="color-mix(in srgb, var(--color-peach) 45%, white)"
      />
      <circle cx="78" cy="54" r="7" fill="var(--color-peach)" opacity="0.85" />
      <path d="M72 48c4-8 14-8 18 0" stroke="var(--color-forest)" strokeWidth="2" strokeLinecap="round" />
      <path d="M58 118h84" stroke="var(--color-forest)" strokeWidth="2" opacity="0.35" />
    </svg>
  );
}

function SleepsuitSvg() {
  return (
    <svg className="h-full w-full" viewBox="0 0 120 160" fill="none">
      <path
        d="M42 28c0-10 8-18 18-18s18 8 18 18v8H42v-8Z"
        fill="color-mix(in srgb, var(--color-sage) 70%, white)"
        stroke="var(--color-forest)"
        strokeWidth="2.5"
      />
      <path
        d="M28 44c-8 4-14 14-12 24l8 48c2 10 10 16 20 16h32c10 0 18-6 20-16l8-48c2-10-4-20-12-24L78 36H42L28 44Z"
        fill="color-mix(in srgb, var(--color-sage) 55%, white)"
        stroke="var(--color-forest)"
        strokeWidth="2.5"
      />
      <circle cx="52" cy="72" r="3.5" fill="var(--color-peach)" />
      <circle cx="68" cy="72" r="3.5" fill="var(--color-peach)" />
      <circle cx="60" cy="88" r="3.5" fill="var(--color-peach)" />
      <path d="M38 118h44" stroke="var(--color-forest)" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
      <path
        d="M34 44c-10-2-18 6-16 16"
        stroke="var(--color-forest)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M86 44c10-2 18 6 16 16"
        stroke="var(--color-forest)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function BottleSvg() {
  return (
    <svg className="h-full w-full" viewBox="0 0 80 160" fill="none">
      <rect x="28" y="8" width="24" height="14" rx="3" fill="var(--color-peach)" />
      <rect
        x="24"
        y="22"
        width="32"
        height="16"
        rx="4"
        fill="color-mix(in srgb, var(--color-sage) 40%, white)"
        stroke="var(--color-forest)"
        strokeWidth="2"
      />
      <path
        d="M22 40h36l4 90c0 8-6 14-14 14H32c-8 0-14-6-14-14l4-90Z"
        fill="color-mix(in srgb, var(--color-cream) 80%, white)"
        stroke="var(--color-forest)"
        strokeWidth="2.5"
      />
      <path d="M26 78h28" stroke="var(--color-peach)" strokeWidth="10" opacity="0.45" strokeLinecap="round" />
      <path d="M28 55h24M28 100h24" stroke="var(--color-forest)" strokeWidth="1.5" opacity="0.2" />
    </svg>
  );
}

function MobileSvg() {
  return (
    <svg className="nursery-rock h-full w-full" viewBox="0 0 180 160" fill="none">
      <line x1="90" y1="4" x2="90" y2="28" stroke="var(--color-forest)" strokeWidth="2" />
      <circle cx="90" cy="32" r="4" fill="var(--color-forest)" />
      <path d="M30 48h120" stroke="var(--color-forest)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="48" x2="40" y2="78" stroke="var(--color-forest)" strokeWidth="1.5" />
      <line x1="90" y1="48" x2="90" y2="88" stroke="var(--color-forest)" strokeWidth="1.5" />
      <line x1="140" y1="48" x2="140" y2="72" stroke="var(--color-forest)" strokeWidth="1.5" />
      <circle cx="40" cy="92" r="14" fill="var(--color-peach)" opacity="0.85" />
      <path
        d="M78 100c0-10 8-18 18-18s18 8 18 18-18 28-18 28-18-18-18-28Z"
        fill="color-mix(in srgb, var(--color-sage) 70%, white)"
        stroke="var(--color-forest)"
        strokeWidth="2"
      />
      <rect x="128" y="78" width="24" height="24" rx="6" fill="var(--color-sage)" stroke="var(--color-forest)" strokeWidth="2" />
    </svg>
  );
}

function RattleSvg() {
  return (
    <svg className="h-full w-full" viewBox="0 0 100 140" fill="none">
      <circle
        cx="50"
        cy="42"
        r="28"
        fill="color-mix(in srgb, var(--color-peach) 55%, white)"
        stroke="var(--color-forest)"
        strokeWidth="2.5"
      />
      <circle cx="42" cy="36" r="5" fill="var(--color-forest)" opacity="0.25" />
      <circle cx="58" cy="48" r="4" fill="var(--color-forest)" opacity="0.2" />
      <rect x="46" y="68" width="8" height="52" rx="4" fill="var(--color-forest)" />
      <ellipse cx="50" cy="124" rx="12" ry="6" fill="var(--color-sage)" stroke="var(--color-forest)" strokeWidth="2" />
    </svg>
  );
}

/** Torba do szpitala — duffel z uchwytem, delikatnie się kołysze. */
function HospitalBagSvg() {
  return (
    <svg className="nursery-rock h-full w-full" viewBox="0 0 200 160" fill="none">
      <ellipse cx="100" cy="148" rx="58" ry="6" fill="var(--color-forest)" opacity="0.08" />
      {/* uchwyt */}
      <path
        d="M62 58c0-18 16-30 38-30s38 12 38 30"
        stroke="var(--color-forest)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* korpus */}
      <path
        d="M36 70c0-8 6-14 14-14h100c8 0 14 6 14 14v58c0 10-8 18-18 18H54c-10 0-18-8-18-18V70Z"
        fill="color-mix(in srgb, var(--color-forest) 82%, white)"
        stroke="var(--color-forest-dark)"
        strokeWidth="2.5"
      />
      {/* zamek */}
      <path d="M50 78h100" stroke="var(--color-peach)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="100" cy="78" r="5" fill="var(--color-peach)" stroke="var(--color-forest)" strokeWidth="1.5" />
      {/* etykieta */}
      <rect
        x="70"
        y="96"
        width="60"
        height="28"
        rx="6"
        fill="color-mix(in srgb, var(--color-cream) 90%, white)"
      />
      <path d="M82 108h36M88 118h24" stroke="var(--color-forest)" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
      {/* skarpetka wystająca */}
      <path
        d="M148 88c8-2 14 4 12 12l-6 14c-1 3-4 4-7 3l-4-2c-2-1-2-4-1-6l6-21Z"
        fill="color-mix(in srgb, var(--color-peach) 55%, white)"
        stroke="var(--color-forest)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Body niemowlęce — klasyczne body na napy. */
function BodysuitSvg() {
  return (
    <svg className="nursery-rock h-full w-full" viewBox="0 0 140 170" fill="none">
      <ellipse cx="70" cy="162" rx="40" ry="5" fill="var(--color-forest)" opacity="0.08" />
      {/* rękawy */}
      <path
        d="M28 48c-14 2-22 14-18 26l8 10c3 4 9 4 12 1l10-12"
        fill="color-mix(in srgb, var(--color-peach) 40%, white)"
        stroke="var(--color-forest)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M112 48c14 2 22 14 18 26l-8 10c-3 4-9 4-12 1l-10-12"
        fill="color-mix(in srgb, var(--color-peach) 40%, white)"
        stroke="var(--color-forest)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* tułów */}
      <path
        d="M48 36c0-12 10-22 22-22s22 10 22 22v8l18 12v52c0 12-8 22-20 26l-12 4c-4 1-8 1-12 0l-12-4c-12-4-20-14-20-26V56l18-12V36Z"
        fill="color-mix(in srgb, var(--color-sage) 65%, white)"
        stroke="var(--color-forest)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* dekolt */}
      <path
        d="M54 44c4-10 12-14 16-14s12 4 16 14"
        stroke="var(--color-forest)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* napy */}
      <circle cx="58" cy="128" r="4" fill="var(--color-peach)" stroke="var(--color-forest)" strokeWidth="1.5" />
      <circle cx="70" cy="132" r="4" fill="var(--color-peach)" stroke="var(--color-forest)" strokeWidth="1.5" />
      <circle cx="82" cy="128" r="4" fill="var(--color-peach)" stroke="var(--color-forest)" strokeWidth="1.5" />
      {/* detale */}
      <path d="M62 72h16" stroke="var(--color-forest)" strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
      <circle cx="70" cy="88" r="3" fill="var(--color-peach)" opacity="0.7" />
    </svg>
  );
}

/** Portfel — na stronę Finanse. */
function WalletSvg() {
  return (
    <svg className="nursery-rock h-full w-full" viewBox="0 0 180 140" fill="none">
      <ellipse cx="90" cy="128" rx="52" ry="6" fill="var(--color-forest)" opacity="0.08" />
      <path
        d="M28 42c0-8 6-14 14-14h96c8 0 14 6 14 14v64c0 8-6 14-14 14H42c-8 0-14-6-14-14V42Z"
        fill="color-mix(in srgb, var(--color-forest) 78%, white)"
        stroke="var(--color-forest-dark)"
        strokeWidth="2.5"
      />
      <path
        d="M28 58h124"
        stroke="var(--color-peach)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M118 78h28c6 0 10 4 10 10v12c0 6-4 10-10 10h-28c-4 0-8-4-8-8V86c0-4 4-8 8-8Z"
        fill="color-mix(in srgb, var(--color-sage) 50%, white)"
        stroke="var(--color-forest)"
        strokeWidth="2"
      />
      <circle cx="138" cy="94" r="4" fill="var(--color-peach)" stroke="var(--color-forest)" strokeWidth="1.5" />
      <rect
        x="44"
        y="72"
        width="52"
        height="28"
        rx="4"
        fill="color-mix(in srgb, var(--color-cream) 85%, white)"
        opacity="0.9"
      />
      <path d="M52 82h36M52 90h24" stroke="var(--color-forest)" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

/** Szczepionka — strzykawka z ruchem tłoka (badania / szczepienia w ciąży). */
function SyringeSvg() {
  return (
    <svg className="nursery-rock h-full w-full" viewBox="0 0 160 200" fill="none">
      <ellipse cx="80" cy="188" rx="42" ry="5" fill="var(--color-forest)" opacity="0.08" />
      {/* tłok */}
      <g className="syringe-plunger">
        <rect
          x="68"
          y="8"
          width="24"
          height="10"
          rx="3"
          fill="var(--color-peach)"
          stroke="var(--color-forest)"
          strokeWidth="2"
        />
        <rect x="76" y="18" width="8" height="28" rx="2" fill="var(--color-forest)" />
      </g>
      {/* korpus */}
      <path
        d="M58 46h44c6 0 10 4 10 10v72c0 6-4 10-10 10H58c-6 0-10-4-10-10V56c0-6 4-10 10-10Z"
        fill="color-mix(in srgb, var(--color-sage) 45%, white)"
        stroke="var(--color-forest)"
        strokeWidth="2.5"
      />
      <path d="M54 70h52M54 90h52M54 110h52" stroke="var(--color-forest)" strokeWidth="1.5" opacity="0.22" />
      <rect
        x="62"
        y="58"
        width="36"
        height="48"
        rx="4"
        fill="color-mix(in srgb, var(--color-peach) 35%, white)"
        opacity="0.85"
      />
      {/* stożek + igła */}
      <path
        d="M70 138h20l6 18H64l6-18Z"
        fill="color-mix(in srgb, var(--color-forest) 70%, white)"
        stroke="var(--color-forest)"
        strokeWidth="2"
      />
      <line x1="80" y1="156" x2="80" y2="178" stroke="var(--color-forest)" strokeWidth="2.5" strokeLinecap="round" />
      <circle className="syringe-drop" cx="80" cy="182" r="4" fill="var(--color-peach)" />
    </svg>
  );
}

/** Rodzina — rodzice z dzieckiem (strona O nas). */
function FamilySvg() {
  return (
    <svg className="nursery-rock h-full w-full" viewBox="0 0 200 180" fill="none">
      <ellipse cx="100" cy="168" rx="58" ry="6" fill="var(--color-forest)" opacity="0.08" />
      {/* rodzic lewy */}
      <circle
        cx="58"
        cy="48"
        r="18"
        fill="color-mix(in srgb, var(--color-peach) 45%, white)"
        stroke="var(--color-forest)"
        strokeWidth="2.5"
      />
      <path
        d="M34 118c2-28 12-42 24-42s22 14 24 42"
        fill="color-mix(in srgb, var(--color-sage) 55%, white)"
        stroke="var(--color-forest)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* rodzic prawy */}
      <circle
        cx="142"
        cy="44"
        r="20"
        fill="color-mix(in srgb, var(--color-sage) 50%, white)"
        stroke="var(--color-forest)"
        strokeWidth="2.5"
      />
      <path
        d="M116 118c2-30 14-46 26-46s24 16 26 46"
        fill="color-mix(in srgb, var(--color-forest) 72%, white)"
        stroke="var(--color-forest-dark)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* dziecko na środku */}
      <circle
        cx="100"
        cy="78"
        r="14"
        fill="color-mix(in srgb, var(--color-peach) 55%, white)"
        stroke="var(--color-forest)"
        strokeWidth="2.5"
      />
      <path
        d="M82 128c2-22 10-32 18-32s16 10 18 32"
        fill="color-mix(in srgb, var(--color-cream) 70%, white)"
        stroke="var(--color-forest)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* serce */}
      <path
        d="M100 108c-4-4-10-2-10 4 0 6 10 12 10 12s10-6 10-12c0-6-6-8-10-4Z"
        fill="var(--color-peach)"
        stroke="var(--color-forest)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Otwarta książka — motyw bloga. */
function BookSvg() {
  return (
    <svg className="nursery-rock h-full w-full" viewBox="0 0 200 160" fill="none">
      <ellipse cx="100" cy="148" rx="54" ry="6" fill="var(--color-forest)" opacity="0.08" />
      {/* lewa strona */}
      <path
        d="M28 44c0-6 4-10 10-10h54v92H38c-6 0-10-4-10-10V44Z"
        fill="color-mix(in srgb, var(--color-cream) 85%, white)"
        stroke="var(--color-forest)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* prawa strona */}
      <path
        d="M108 34h54c6 0 10 4 10 10v72c0 6-4 10-10 10h-54V34Z"
        fill="color-mix(in srgb, var(--color-sage) 45%, white)"
        stroke="var(--color-forest)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* grzbiet */}
      <path d="M98 34v92" stroke="var(--color-forest)" strokeWidth="3" strokeLinecap="round" />
      {/* linie tekstu */}
      <path
        d="M42 58h36M42 72h32M42 86h36M42 100h28"
        stroke="var(--color-forest)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M120 58h36M120 72h32M120 86h36M120 100h28"
        stroke="var(--color-forest)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />
      {/* zakładka */}
      <path
        d="M148 34v38l8-6 8 6V34"
        fill="var(--color-peach)"
        stroke="var(--color-forest)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

