"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "./Header";
import { GOOGLE_PLAY_URL } from "@/lib/site";
import { trackPlayStoreClick } from "@/lib/analytics";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Zamknij menu" : "Otwórz menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)]"
      >
        <span className="sr-only">Menu</span>
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full z-50 border-b border-[var(--color-line)] bg-white/95 px-4 py-4 shadow-lg backdrop-blur-xl"
        >
          <nav className="flex flex-col gap-1" aria-label="Menu mobilne">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-[var(--color-sage)]/60"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackPlayStoreClick("mobile-nav")}
              className="mt-2 rounded-xl bg-[var(--color-forest)] px-3 py-2.5 text-center text-sm font-semibold text-white"
            >
              Pobierz w Google Play
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
