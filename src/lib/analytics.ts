"use client";

// Cienka warstwa nad GA4 gtag — mierzy dokładnie to, o co prosiłaś: kliknięcia
// w Google Play (z jakiej strony, po jakiej frazie/temacie), żeby dało się
// policzyć konwersję ruch → instalacja per artykuł. Wymaga ustawienia
// NEXT_PUBLIC_GA4_ID (patrz src/lib/site.ts) — bez tego funkcje są no-opami.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackPlayStoreClick(source: string, extra?: Record<string, string>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "play_store_click", {
    source_page: source,
    ...extra,
  });
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
