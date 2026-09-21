import type { Metadata } from "next";
import Link from "next/link";
import PlayStoreCTA from "@/components/PlayStoreCTA";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/PageHero";
import { ALL_WEEK_NUMBERS, getWeek, weekPath, fruitEmoji, getTrimesterLabel } from "@/data/pregnancyWeeks";
import { pageSocialMeta } from "@/lib/seo";

const title = "Ciąża tydzień po tygodniu — kalendarz ciąży 1–41";
const description =
  "Kalendarz ciąży tydzień po tygodniu online: rozwój dziecka, wielkość (owoce), objawy i badania na każdy tydzień — od 1. do 41. Idealny przy pierwszym dziecku.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "ciąża tydzień po tygodniu",
    "kalendarz ciąży",
    "aplikacja ciążowa",
    "rozwój płodu tydzień po tygodniu",
    "pierwsze dziecko ciąża",
  ],
  alternates: { canonical: "/ciaza-tydzien-po-tygodniu" },
  ...pageSocialMeta({ title, description, path: "/ciaza-tydzien-po-tygodniu" }),
};

const trimesters = [1, 2, 3].map((t) => ({
  label: getTrimesterLabel(t),
  weeks: ALL_WEEK_NUMBERS.filter((n) => getWeek(n)?.trymestr === t),
}));

export default function CalendarHubPage() {
  return (
    <div>
      <PageHero
        crumbs={[{ label: "Start", href: "/" }, { label: "Ciąża tydzień po tygodniu" }]}
        eyebrow="1–41 tydzień"
        title="Ciąża tydzień po tygodniu"
        description="Zobacz, jak rozwija się Twoje dziecko każdego tygodnia — wielkość, zmiany w Twoim ciele i wskazówki dopasowane do etapu ciąży, od 1. do 41. tygodnia. Osobno: kalendarz badań I–III trymestru."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <PlayStoreCTA source="calendar-hub" label="Śledź swój tydzień w Kidelo" />
            <Link
              href="/badania"
              className="text-sm font-semibold text-[var(--color-forest)] underline decoration-[var(--color-peach)] decoration-2 underline-offset-4"
            >
              Badania w ciąży →
            </Link>
          </div>
        }
        motif="cradle"
      />

      {trimesters.map((tri) => (
        <section key={tri.label} className="px-4 py-6 sm:px-6 sm:py-8">
          <AnimatedSection className="mx-auto max-w-6xl">
            <h2 className="reveal-item font-display text-xl font-semibold text-[var(--color-forest)] sm:text-2xl">{tri.label}</h2>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:mt-4 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6">
              {tri.weeks.map((n) => {
                const w = getWeek(n)!;
                return (
                  <Link
                    key={n}
                    href={weekPath(n)}
                    className="week-tile reveal-item"
                  >
                    <span className="week-tile__num">Tydzień {n}</span>
                    <span className="week-tile__emoji" aria-hidden="true">
                      {fruitEmoji(w.rozmiar_dziecka.porownanie, n)}
                    </span>
                    <span className="week-tile__label">{w.etap_nazwa}</span>
                  </Link>
                );
              })}
            </div>
          </AnimatedSection>
        </section>
      ))}
    </div>
  );
}
