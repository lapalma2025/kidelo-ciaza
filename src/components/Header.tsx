import Link from "next/link";
import Image from "next/image";
import PlayStoreLinkClient from "./PlayStoreLinkClient";
import MobileNav from "./MobileNav";
import appIcon from "@/assets/00-ikona.png";

export const NAV_ITEMS = [
  { href: "/", label: "Start" },
  { href: "/ciaza-tydzien-po-tygodniu", label: "Tydzień ciąży" },
  { href: "/badania", label: "Badania" },
  { href: "/finanse", label: "Finanse" },
  { href: "/wyprawka", label: "Wyprawka" },
  { href: "/torba-do-szpitala", label: "Torba" },
  { href: "/blog", label: "Blog" },
  { href: "/o-nas", label: "O nas" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)]/70 bg-white/80 backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 font-display text-lg font-semibold text-[var(--color-forest)] sm:text-xl"
        >
          <Image
            src={appIcon}
            alt="Ikona aplikacji Kidelo Ciąża"
            width={32}
            height={32}
            className="shrink-0 rounded-lg"
            priority
          />
          <span className="truncate">Kidelo Ciąża</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-1" aria-label="Główna nawigacja">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-sage)]/50"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <PlayStoreLinkClient source="header" label="Pobierz w Google Play" />
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
