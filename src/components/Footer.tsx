import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS } from "./Header";
import HashLink from "./HashLink";
import appIcon from "@/assets/00-ikona.png";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)]/80 bg-white/40 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-display text-lg font-semibold text-[var(--color-forest)]"
            >
              <Image
                src={appIcon}
                alt="Ikona Kidelo Ciąża"
                width={32}
                height={32}
                className="shrink-0 rounded-lg"
              />
              Kidelo Ciąża
            </Link>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Polska aplikacja ciążowa — kalendarz tydzień po tygodniu, badania i szczepienia, świadczenia (800+,
              becikowe), wyprawka i torba do szpitala.
            </p>
          </div>
          <nav aria-label="Nawigacja w stopce">
            <p className="text-sm font-semibold text-[var(--color-ink)]">Strona</p>
            <ul className="mt-2 space-y-1.5 text-sm text-[var(--color-muted)]">
              {NAV_ITEMS.filter((i) => i.href !== "/" && i.href !== "/o-nas" && i.href !== "/blog").map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[var(--color-forest)]">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <HashLink href="/#pytania" className="hover:text-[var(--color-forest)]">
                  Najczęstsze pytania
                </HashLink>
              </li>
            </ul>
          </nav>
          <div>
            <p className="text-sm font-semibold text-[var(--color-ink)]">Kontakt</p>
            <ul className="mt-2 space-y-1.5 text-sm text-[var(--color-muted)]">
              <li>
                <a href="mailto:biuro@kidelo.pl" className="hover:text-[var(--color-forest)]">
                  biuro@kidelo.pl
                </a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=pl.kidelo.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-forest)]"
                >
                  Google Play
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--color-ink)]">Informacje</p>
            <ul className="mt-2 space-y-1.5 text-sm text-[var(--color-muted)]">
              <li>
                <Link href="/blog" className="hover:text-[var(--color-forest)]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/o-nas" className="hover:text-[var(--color-forest)]">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="/polityka-prywatnosci" className="hover:text-[var(--color-forest)]">
                  Polityka prywatności
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} Kidelo. Treści mają charakter informacyjny i nie zastępują konsultacji
          lekarskiej.
        </p>
      </div>
    </footer>
  );
}
