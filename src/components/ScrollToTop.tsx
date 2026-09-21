"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Po każdej zmianie trasy wraca na samą górę strony. */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
