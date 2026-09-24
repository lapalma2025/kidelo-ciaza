"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode, MouseEvent } from "react";

/**
 * Link z kotwicą (#…). Na tej samej stronie Next nie zawsze przewija
 * do hash — robimy to ręcznie (ważne na mobile ze sticky headerem).
 */
export default function HashLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const hashIdx = href.indexOf("#");
  const path = hashIdx === -1 ? href : href.slice(0, hashIdx) || "/";
  const hash = hashIdx === -1 ? "" : href.slice(hashIdx + 1);

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (!hash) return;
    if (pathname !== path) return; // pełna nawigacja — ScrollToTop ogarnie hash

    e.preventDefault();
    const el = document.getElementById(hash);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${hash}`);
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}
