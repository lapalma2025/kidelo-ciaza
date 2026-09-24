"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior, block: "start" });
  return true;
}

/** Po zmianie trasy: na górę, albo do kotwicy z hash (#pytania itd.). */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const hash = window.location.hash;
    if (hash) {
      // Soft nav + GSAP layout — spróbuj kilka razy, aż element jest w DOM
      const tryScroll = (behavior: ScrollBehavior) => scrollToHash(hash, behavior);
      if (tryScroll("auto")) return;

      let cancelled = false;
      const timers = [50, 150, 350, 700].map((ms) =>
        window.setTimeout(() => {
          if (!cancelled) tryScroll(ms === 50 ? "auto" : "smooth");
        }, ms),
      );
      return () => {
        cancelled = true;
        timers.forEach(clearTimeout);
      };
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash) scrollToHash(window.location.hash, "smooth");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
