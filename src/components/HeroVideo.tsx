"use client";

import { useEffect, useRef, useState } from "react";

// Wideo w tle hero — wyłącza się (zostaje sama klatka poster) przy
// prefers-reduced-motion, żeby nie zmuszać nikogo do oglądania ruchomego
// obrazu na całym ekranie wbrew ustawieniom systemowym.
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Celowo w efekcie, nie w lazy initializerze: matchMedia nie istnieje przy
    // SSR, a pierwsze renderowanie klienta musi zwrócić DOKŁADNIE ten sam typ
    // elementu (<video>), co serwer, inaczej React dostanie mismatch przy
    // hydratacji (zamiana <video> na <img> na starcie jest gorsza niż jedno
    // dodatkowe przemalowanie po stwierdzeniu prawdziwej preferencji).
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduceMotion(mql.matches);
    if (!mql.matches) {
      videoRef.current?.play().catch(() => {
        // Autoplay może zostać zablokowane przez przeglądarkę — poster zostaje widoczny.
      });
    }
  }, []);

  if (reduceMotion) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- statyczna klatka wideo, next/image niepotrzebny dla tła pełnoekranowego
      <img
        src="/video/hero-poster.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="hero-video-breathe absolute inset-0 h-full w-full object-cover"
      poster="/video/hero-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
    >
      <source src="/video/hero-video.webm" type="video/webm" />
      <source src="/video/hero-video.mp4" type="video/mp4" />
    </video>
  );
}
