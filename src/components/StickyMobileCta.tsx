"use client";

import Image from "next/image";
import { GOOGLE_PLAY_URL } from "@/lib/site";
import { trackPlayStoreClick } from "@/lib/analytics";

export default function StickyMobileCta() {
  return (
    <a
      href={GOOGLE_PLAY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackPlayStoreClick("sticky-mobile-cta")}
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 z-40 flex items-center gap-1.5 rounded-full bg-[var(--color-forest)] px-3.5 py-2.5 text-xs font-semibold text-white shadow-lg md:hidden"
    >
      <Image
        src="/brand/google-play-icon.svg"
        alt=""
        width={14}
        height={15}
        className="shrink-0"
        aria-hidden="true"
        unoptimized
      />
      Google Play
    </a>
  );
}
