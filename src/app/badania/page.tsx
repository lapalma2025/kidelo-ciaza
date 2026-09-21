import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PlayStoreCTA from "@/components/PlayStoreCTA";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/PageHero";
import ChecklistClient from "@/components/ChecklistClient";
import JsonLd from "@/components/JsonLd";
import {
  EXAMS_UPDATED_AT,
  PREGNANCY_VACCINES,
  TRIMESTER_EXAMS,
  examPath,
  trimesterToChecklist,
} from "@/data/exams";
import { pageSocialMeta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import examsScreenshot from "@/assets/05-screenshot.jpg";

const title = "Badania w ciąży — kalendarz I, II i III trymestru + szczepienia";
const description =
  "Kalendarz badań w ciąży tydzień po tygodniu: I, II i III trymestr (USG, OGTT, GBS, morfologia) oraz szczepienia Tdap, RSV i grypa. Checklista NFZ/PTGiP — idealna na pierwsze dziecko.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "badania w ciąży",
    "kalendarz badań w ciąży",
    "badania I trymestru",
    "badania II trymestru",
    "badania III trymestru",
    "USG połówkowe",
    "OGTT ciąża",
    "GBS ciąża",
    "szczepienia w ciąży",
    "Tdap w ciąży",
    "RSV w ciąży",
    "pierwsze dziecko badania",
  ],
  alternates: { canonical: "/badania" },
  ...pageSocialMeta({ title, description, path: "/badania", image: examsScreenshot }),
};

export default function BadaniaHubPage() {
  const faqs = [
    {
      q: "Jakie badania w ciąży są obowiązkowe w Polsce?",
      a: "Harmonogram badań wynika ze standardu opieki okołoporodowej i zaleceń PTGiP. W I trymestrze m.in. morfologia, grupa krwi, serologia i USG 11–14 t.c.; w II — USG połówkowe i OGTT; w III — USG, GBS i KTG. Konkretny plan ustala lekarz prowadzący.",
    },
    {
      q: "Kiedy robi się badania prenatalne na NFZ?",
      a: "Od 2024 r. badania prenatalne na NFZ przysługują każdej ciężarnej. USG I trymestru (11–14 t.c.) oraz USG połówkowe (18–22+6) realizuje się w Programie Badań Prenatalnych po skierowaniu od lekarza prowadzącego.",
    },
    {
      q: "Jakie szczepienia w ciąży są zalecane?",
      a: "Standardowo zaleca się Tdap (27–36 t.c.), RSV (24–36 t.c.) oraz szczepienie przeciw grypie w sezonie. Tdap i RSV są bezpłatne w POZ (RSV wymaga recepty).",
    },
    {
      q: "Czy kalendarz badań przyda się przy pierwszym dziecku?",
      a: "Tak — to właśnie przy pierwszej ciąży najłatwiej o przeoczenie terminu. Checklista I–III trymestru + szczepienia pomaga ogarnąć wizyty, USG i badania laboratoryjne krok po kroku.",
    },
    ...TRIMESTER_EXAMS.flatMap((t) => t.faqs),
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Kalendarz badań w ciąży — trymestry",
    itemListElement: TRIMESTER_EXAMS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.title,
      url: absoluteUrl(examPath(t)),
    })),
  };

  return (
    <div className="overflow-x-clip">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={itemListJsonLd} />

      <PageHero
        crumbs={[{ label: "Start", href: "/" }, { label: "Badania" }]}
        eyebrow={`Aktualizacja ${EXAMS_UPDATED_AT} · NFZ / PTGiP`}
        title="Badania w ciąży — kalendarz trymestrów"
        description={
          <>
            <p>
              Pełna checklista badań w ciąży na I, II i III trymestr: morfologia, USG, OGTT, GBS, KTG oraz zalecane
              szczepienia (Tdap, RSV, grypa). Lista jak w aplikacji Kidelo — odhaczaj wykonane badania. Idealna też przy{" "}
              <strong className="font-semibold text-[var(--color-ink)]">pierwszym dziecku</strong>.
            </p>
            <p className="mt-2 text-sm">
              Zobacz też{" "}
              <Link href="/ciaza-tydzien-po-tygodniu" className="font-semibold text-[var(--color-forest)] underline">
                ciążę tydzień po tygodniu
              </Link>
              ,{" "}
              <Link href="/wyprawka" className="font-semibold text-[var(--color-forest)] underline">
                wyprawkę dla noworodka
              </Link>{" "}
              i{" "}
              <Link href="/torba-do-szpitala" className="font-semibold text-[var(--color-forest)] underline">
                torbę do szpitala
              </Link>
              .
            </p>
          </>
        }
        actions={<PlayStoreCTA source="badania-hub" label="Odhaczaj w aplikacji" />}
        motif="syringe"
        aside={
          <div className="relative mx-auto w-full max-w-[220px] sm:max-w-xs">
            <Image
              src={examsScreenshot}
              alt="Ekran aplikacji Kidelo Ciąża z listą badań i szczepień w ciąży"
              className="rounded-[24px] shadow-[0_30px_60px_-30px_rgba(21,76,60,0.35)] sm:rounded-[28px]"
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 320px, 70vw"
            />
          </div>
        }
      />

      <section className="px-4 sm:px-6" aria-labelledby="trymestry-heading">
        <AnimatedSection className="mx-auto max-w-6xl">
          <h2 id="trymestry-heading" className="font-display text-2xl font-semibold text-[var(--color-forest)] sm:text-3xl">
            Wybierz trymestr
          </h2>
          <p className="mt-2 max-w-2xl text-[var(--color-muted)]">
            Osobne strony pod SEO i szybkie wejście: badania I trymestru, USG połówkowe i OGTT w II, GBS oraz szczepienia
            przed porodem w III.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {TRIMESTER_EXAMS.map((t) => (
              <Link
                key={t.id}
                href={examPath(t)}
                className="card-lift reveal-item flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-5 hover:border-[var(--color-forest)]/40"
              >
                <span className="font-mono-label text-xs text-[var(--color-peach-dark)]">{t.roman} trymestr</span>
                <p className="mt-1 font-display text-lg font-semibold text-[var(--color-forest)]">{t.title}</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  {t.weeksRange} · {t.items.length} pozycji
                </p>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="mt-12 px-4 sm:px-6" aria-labelledby="szczepienia-heading">
        <AnimatedSection className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-[var(--color-line)] bg-gradient-to-br from-[var(--color-sage)]/40 via-white to-[var(--color-peach)]/20 p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <h2
                  id="szczepienia-heading"
                  className="font-display text-2xl font-semibold text-[var(--color-forest)] sm:text-3xl"
                >
                  Szczepienia w ciąży
                </h2>
                <p className="mt-2 text-[var(--color-muted)]">
                  Tdap, RSV i grypa — chronią mamę i noworodka. Pełny opis i terminy na osobnej stronie.
                </p>
                <Link
                  href="/badania/szczepienia"
                  className="mt-4 inline-flex font-semibold text-[var(--color-forest)] underline underline-offset-4"
                >
                  Kalendarz szczepień w ciąży →
                </Link>
              </div>
              <ul className="grid flex-1 gap-3 sm:grid-cols-2">
                {PREGNANCY_VACCINES.map((v) => (
                  <li
                    key={v.id}
                    className="rounded-2xl border border-[var(--color-line)]/80 bg-white/80 px-4 py-3 backdrop-blur-sm sm:last:col-span-2 sm:last:mx-auto sm:last:w-[calc(50%-0.375rem)]"
                  >
                    <p className="font-semibold text-[var(--color-ink)]">{v.name}</p>
                    <p className="mt-0.5 text-xs font-medium text-[var(--color-peach-dark)]">{v.when}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className="mt-14 px-4 sm:px-6" aria-labelledby="checklisty-heading">
        <div className="mx-auto max-w-3xl">
          <h2 id="checklisty-heading" className="font-display text-2xl font-semibold text-[var(--color-forest)] sm:text-3xl">
            Checklista badań — odhaczaj na stronie
          </h2>
          <p className="mt-2 text-[var(--color-muted)]">
            Postęp zapisuje się lokalnie w przeglądarce. W aplikacji masz to samo plus przypomnienia.
          </p>
          <div className="mt-8 space-y-12">
            {TRIMESTER_EXAMS.map((t) => (
              <div key={t.id} id={t.slug}>
                <h3 className="mb-4 font-display text-xl font-semibold text-[var(--color-forest)]">{t.title}</h3>
                <ChecklistClient data={trimesterToChecklist(t)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 px-4 pb-8 sm:px-6" aria-labelledby="faq-badania">
        <AnimatedSection className="mx-auto max-w-3xl">
          <h2 id="faq-badania" className="font-display text-2xl font-semibold text-[var(--color-forest)] sm:text-3xl">
            Najczęstsze pytania o badania w ciąży
          </h2>
          <div className="mt-6 space-y-3">
            {faqs.slice(0, 8).map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-[var(--color-line)] bg-white px-5 py-4 open:border-[var(--color-forest)]/30"
              >
                <summary className="cursor-pointer list-none font-semibold text-[var(--color-ink)] marker:content-none [&::-webkit-details-marker]:hidden">
                  {f.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-xs text-[var(--color-muted)]">
            Treści mają charakter informacyjny i nie zastępują konsultacji lekarskiej. Terminy badań zawsze potwierdź z
            lekarzem lub położną prowadzącą ciążę.
          </p>
        </AnimatedSection>
      </section>
    </div>
  );
}
