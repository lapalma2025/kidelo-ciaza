import type { Metadata } from "next";
import Link from "next/link";
import PlayStoreCTA from "@/components/PlayStoreCTA";

export const metadata: Metadata = {
  title: "Strona nie znaleziona",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-20">
      <span className="font-mono-label text-6xl text-[var(--color-peach-dark)] sm:text-7xl">404</span>
      <h1 className="mt-4 font-display text-2xl font-semibold text-[var(--color-forest)] sm:text-3xl">
        Tej strony nie znaleźliśmy
      </h1>
      <p className="mt-3 text-[var(--color-muted)]">
        Może szukasz konkretnego tygodnia ciąży, świadczenia albo checklisty? Sprawdź poniżej.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/ciaza-tydzien-po-tygodniu"
          className="rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3 font-semibold text-[var(--color-forest)]"
        >
          Ciąża tydzień po tygodniu
        </Link>
        <Link
          href="/badania"
          className="rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3 font-semibold text-[var(--color-forest)]"
        >
          Badania w ciąży
        </Link>
        <Link
          href="/finanse"
          className="rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3 font-semibold text-[var(--color-forest)]"
        >
          Finanse
        </Link>
        <Link
          href="/wyprawka"
          className="rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3 font-semibold text-[var(--color-forest)]"
        >
          Wyprawka
        </Link>
      </div>
      <div className="mt-10 flex justify-center">
        <PlayStoreCTA source="404" label="Pobierz Kidelo Ciąża" className="justify-center" />
      </div>
    </div>
  );
}
