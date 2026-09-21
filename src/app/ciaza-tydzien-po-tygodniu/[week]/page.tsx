import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import PlayStoreCTA from "@/components/PlayStoreCTA";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import {
  ALARM_SYMPTOMS,
  ALL_WEEK_NUMBERS,
  FIRST_WEEK,
  LAST_WEEK,
  fruitEmoji,
  getTrimesterLabel,
  getWeek,
  weekPath,
} from "@/data/pregnancyWeeks";
import { absoluteUrl } from "@/lib/site";
import weekOgImage from "@/assets/02-screenshot.jpg";

interface PageProps {
  params: Promise<{ week: string }>;
}

export function generateStaticParams() {
  return ALL_WEEK_NUMBERS.map((n) => ({ week: String(n) }));
}

function weekTitle(tydzien: number, etap: string) {
  return `Ciąża, ${tydzien}. tydzień — ${etap}`;
}

function weekDescription(w: NonNullable<ReturnType<typeof getWeek>>) {
  const size = `${w.rozmiar_dziecka.dlugosc}, ${w.rozmiar_dziecka.waga} (wielkości: ${w.rozmiar_dziecka.porownanie})`;
  return `${w.tydzien}. tydzień ciąży: ${w.podsumowanie} Dziecko ma ${size}. Rozwój dziecka, objawy, badania i wskazówki na ten tydzień.`;
}

function weekFaqs(w: NonNullable<ReturnType<typeof getWeek>>) {
  const faqs = [
    {
      q: `Jak duże jest dziecko w ${w.tydzien}. tygodniu ciąży?`,
      a: `W ${w.tydzien}. tygodniu dziecko mierzy ${w.rozmiar_dziecka.dlugosc} i waży ${w.rozmiar_dziecka.waga} — czyli mniej więcej tyle, co ${w.rozmiar_dziecka.porownanie}.`,
    },
    {
      q: `Jakie badania warto zrobić w ${w.tydzien}. tygodniu ciąży?`,
      a:
        w.badania_i_wizyty.length > 0
          ? w.badania_i_wizyty.join(" ")
          : "W tym tygodniu nie ma dodatkowych badań poza standardowym harmonogramem — zapytaj lekarza lub położną o aktualny plan wizyt.",
    },
  ];
  if (w.na_co_zwrocic_uwage.length > 0) {
    faqs.push({ q: `Na co zwrócić uwagę w ${w.tydzien}. tygodniu ciąży?`, a: w.na_co_zwrocic_uwage.join(" ") });
  }
  return faqs;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { week } = await params;
  const w = getWeek(Number(week));
  if (!w) return { title: "Nie znaleziono tygodnia ciąży" };

  const title = weekTitle(w.tydzien, w.etap_nazwa);
  const description = weekDescription(w);
  const path = weekPath(w.tydzien);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      type: "article",
      locale: "pl_PL",
      siteName: "Kidelo Ciąża",
      images: [{ url: weekOgImage.src, width: weekOgImage.width, height: weekOgImage.height, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [weekOgImage.src],
    },
  };
}

export default async function WeekPage({ params }: PageProps) {
  const { week } = await params;
  const weekNum = Number(week);
  const w = getWeek(weekNum);
  if (!w) notFound();

  const prevWeek = weekNum > FIRST_WEEK ? weekNum - 1 : null;
  const nextWeek = weekNum < LAST_WEEK ? weekNum + 1 : null;
  const faqs = weekFaqs(w);

  const path = weekPath(w.tydzien);
  const title = weekTitle(w.tydzien, w.etap_nazwa);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: weekDescription(w),
    url: absoluteUrl(path),
    inLanguage: "pl-PL",
    image: absoluteUrl(weekOgImage.src),
    author: { "@type": "Organization", name: "Kidelo", url: "https://kidelo.pl" },
    publisher: {
      "@type": "Organization",
      name: "Kidelo",
      url: "https://kidelo.pl",
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon.png") },
    },
    mainEntityOfPage: absoluteUrl(path),
  };

  return (
    <div className="relative overflow-x-clip">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={articleJsonLd} />

      <PageHero
        crumbs={[
          { label: "Start", href: "/" },
          { label: "Ciąża tydzień po tygodniu", href: "/ciaza-tydzien-po-tygodniu" },
          { label: `Tydzień ${w.tydzien}` },
        ]}
        title={
          <>
            Ciąża, {w.tydzien}. tydzień
            <span className="mt-2 block font-display text-xl font-medium text-[var(--color-peach-dark)] sm:text-2xl">
              {w.etap_nazwa}
            </span>
          </>
        }
        description={
          <>
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-[var(--color-sage)] px-3 py-1 font-bold text-[var(--color-forest)]">
                {getTrimesterLabel(w.trymestr)}
              </span>
              <span className="rounded-full bg-[var(--color-peach)]/25 px-3 py-1 font-bold text-[var(--color-peach-dark)]">
                Miesiąc {w.miesiac_ciazy}
              </span>
            </div>
            <p>{w.podsumowanie}</p>
          </>
        }
        actions={<PlayStoreCTA source={`week-${w.tydzien}`} label="Śledź swój tydzień w Kidelo" />}
        motif="cradle"
      />

      <section className="px-4 sm:px-6">
        <AnimatedSection className="mx-auto grid max-w-4xl gap-6">
          <div className="reveal-item rounded-3xl border border-[var(--color-line)] bg-white p-6 text-center sm:p-8">
            <span className="text-6xl" aria-hidden="true">
              {fruitEmoji(w.rozmiar_dziecka.porownanie, w.tydzien)}
            </span>
            <p className="mt-3 font-display text-2xl font-semibold text-[var(--color-forest)]">
              Wielkości: {w.rozmiar_dziecka.porownanie}
            </p>
            <p className="mt-1 text-[var(--color-muted)]">
              {w.rozmiar_dziecka.dlugosc} · {w.rozmiar_dziecka.waga}
            </p>
          </div>

          <InfoBlock title="Rozwój dziecka" text={w.rozwoj_dziecka} />
          <InfoBlock title="Zmiany w Twoim ciele" text={w.cialo_kobiety} />

          {w.typowe_objawy.length > 0 && <ListBlock title="Typowe objawy w tym tygodniu" items={w.typowe_objawy} />}
          {w.co_zrobic.length > 0 && <ListBlock title="Co warto zrobić" items={w.co_zrobic} />}
          {w.badania_i_wizyty.length > 0 && <ListBlock title="Badania i wizyty" items={w.badania_i_wizyty} />}
          {w.na_co_zwrocic_uwage.length > 0 && <ListBlock title="Na co zwrócić uwagę" items={w.na_co_zwrocic_uwage} />}
          {w.wskazowki.length > 0 && <ListBlock title="Wskazówki na ten tydzień" items={w.wskazowki} />}

          <div className="reveal-item rounded-3xl border border-red-200 bg-red-50/90 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700">
                <AlertTriangle size={16} strokeWidth={2.5} />
              </span>
              <p className="font-display text-lg font-semibold text-red-900">Kiedy zawsze skontaktować się z lekarzem</p>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-red-900/80">
              {ALARM_SYMPTOMS.map((s) => (
                <li key={s} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </section>

      <section className="mt-10 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-semibold text-[var(--color-forest)]">Przejdź do innego tygodnia</p>
          <div className="flex flex-wrap gap-1.5">
            {ALL_WEEK_NUMBERS.map((n) => (
              <Link
                key={n}
                href={weekPath(n)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                  n === weekNum
                    ? "bg-[var(--color-forest)] text-white"
                    : "text-[var(--color-muted)] hover:bg-[var(--color-sage)]/60 hover:text-[var(--color-forest)]"
                }`}
              >
                {n}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 px-4 sm:px-6">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3">
          {prevWeek ? (
            <Link
              href={weekPath(prevWeek)}
              className="card-lift flex items-center gap-2 rounded-2xl border border-[var(--color-line)] bg-white px-5 py-4 hover:border-[var(--color-forest)]/40"
            >
              <ChevronLeft size={18} className="shrink-0 text-[var(--color-forest)]" aria-hidden="true" />
              <div>
                <p className="font-mono-label text-[10px] text-[var(--color-muted)]">Poprzedni</p>
                <p className="font-display font-semibold text-[var(--color-forest)]">Tydzień {prevWeek}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextWeek ? (
            <Link
              href={weekPath(nextWeek)}
              className="card-lift flex items-center justify-end gap-2 rounded-2xl border border-[var(--color-line)] bg-white px-5 py-4 text-right hover:border-[var(--color-forest)]/40"
            >
              <div>
                <p className="font-mono-label text-[10px] text-[var(--color-muted)]">Następny</p>
                <p className="font-display font-semibold text-[var(--color-forest)]">Tydzień {nextWeek}</p>
              </div>
              <ChevronRight size={18} className="shrink-0 text-[var(--color-forest)]" aria-hidden="true" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </div>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="reveal-item rounded-3xl border border-[var(--color-line)] bg-white p-6 sm:p-7">
      <h2 className="font-display text-xl font-semibold text-[var(--color-forest)]">{title}</h2>
      <p className="mt-3 leading-relaxed text-[var(--color-muted)]">{text}</p>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="reveal-item rounded-3xl border border-[var(--color-line)] bg-white p-6 sm:p-7">
      <h2 className="font-display text-xl font-semibold text-[var(--color-forest)]">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-[var(--color-muted)]">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-peach)]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
