import type { Metadata } from "next";
import Link from "next/link";
import PlayStoreCTA from "@/components/PlayStoreCTA";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { PREGNANCY_VACCINES } from "@/data/exams";
import { pageSocialMeta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import examsScreenshot from "@/assets/05-screenshot.jpg";

const title = "Szczepienia w ciąży — Tdap, RSV, grypa (kalendarz)";
const description =
  "Szczepienia zalecane w ciąży w Polsce: Tdap (27–36 t.c.), RSV (24–36 t.c.) i grypa. Terminy, refundacja w POZ i ochrona noworodka — checklista Kidelo.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "szczepienia w ciąży",
    "szczepienie Tdap w ciąży",
    "szczepienie RSV w ciąży",
    "szczepienie na grypę w ciąży",
    "krztusiec ciąża",
    "kalendarz szczepień ciąża",
  ],
  alternates: { canonical: "/badania/szczepienia" },
  ...pageSocialMeta({
    title,
    description,
    path: "/badania/szczepienia",
    image: examsScreenshot,
    type: "article",
  }),
};

const faqs = [
  {
    q: "Jakie szczepienia są zalecane w ciąży?",
    a: "W Polsce standardowo zaleca się Tdap (błonica, tężec, krztusiec) między 27. a 36. t.c., szczepienie przeciw RSV między 24. a 36. t.c. oraz szczepienie przeciw grypie w sezonie zachorowań.",
  },
  {
    q: "Czy szczepienie Tdap w ciąży jest darmowe?",
    a: "Tak — Tdap dla kobiet w ciąży jest bezpłatne w placówkach POZ i nie wymaga recepty. Podaje się jedną dawkę w każdej ciąży, zwykle między 27. a 36. tygodniem.",
  },
  {
    q: "Kiedy szczepić się na RSV w ciąży?",
    a: "Szczepienie przeciw RSV zaleca się między 24. a 36. tygodniem ciąży. Jest bezpłatne w POZ po recepcie. Zachowaj co najmniej 2 tygodnie odstępu od innych szczepień.",
  },
  {
    q: "Czy szczepionki w ciąży są bezpieczne?",
    a: "W ciąży stosuje się szczepionki inaktywowane (zabite). Żywe szczepionki (np. MMR, ospa wietrzna) są przeciwwskazane w ciąży — warto je uzupełnić przed ciążą. Decyzję o konkretnym preparacie zawsze omów z lekarzem.",
  },
];

export default function SzczepieniaPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Szczepienia zalecane w ciąży",
    description,
    url: absoluteUrl("/badania/szczepienia"),
    inLanguage: "pl-PL",
    step: PREGNANCY_VACCINES.map((v, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: v.name,
      text: `${v.when}. ${v.detail} ${v.freeNote}.`,
    })),
  };

  return (
    <div className="overflow-x-clip">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />

      <PageHero
        crumbs={[
          { label: "Start", href: "/" },
          { label: "Badania", href: "/badania" },
          { label: "Szczepienia" },
        ]}
        eyebrow="Tdap · RSV · grypa"
        title="Szczepienia w ciąży"
        description={
          <>
            <p>
              Kalendarz szczepień chroniących mamę i noworodka. Tdap i RSV są refundowane w POZ — sprawdź terminy i
              odhaczenia w aplikacji Kidelo.
            </p>
            <p className="mt-2 text-sm">
              Wróć do{" "}
              <Link href="/badania" className="font-semibold text-[var(--color-forest)] underline">
                badań I–III trymestru
              </Link>
              .
            </p>
          </>
        }
        actions={<PlayStoreCTA source="szczepienia" label="Przypomnienia w aplikacji" />}
        motif="syringe"
      />

      <section className="px-4 sm:px-6">
        <AnimatedSection className="mx-auto max-w-3xl space-y-4">
          {PREGNANCY_VACCINES.map((v) => (
            <article
              key={v.id}
              className="reveal-item rounded-2xl border border-[var(--color-line)] bg-white p-5 sm:p-6"
            >
              <h2 className="font-display text-xl font-semibold text-[var(--color-forest)]">{v.name}</h2>
              <p className="mt-1 text-sm font-semibold text-[var(--color-peach-dark)]">{v.when}</p>
              <p className="mt-3 text-[var(--color-muted)] leading-relaxed">{v.detail}</p>
              <p className="mt-3 inline-block rounded-full bg-[var(--color-sage)]/50 px-3 py-1 text-xs font-semibold text-[var(--color-forest)]">
                {v.freeNote}
              </p>
            </article>
          ))}
        </AnimatedSection>
      </section>

      <section className="mt-14 px-4 pb-10 sm:px-6" aria-labelledby="faq-vax">
        <div className="mx-auto max-w-3xl">
          <h2 id="faq-vax" className="font-display text-2xl font-semibold text-[var(--color-forest)]">
            Pytania o szczepienia w ciąży
          </h2>
          <div className="mt-6 space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="rounded-2xl border border-[var(--color-line)] bg-white px-5 py-4 open:border-[var(--color-forest)]/30"
              >
                <summary className="cursor-pointer list-none font-semibold text-[var(--color-ink)] [&::-webkit-details-marker]:hidden">
                  {f.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-xs text-[var(--color-muted)]">
            Informacje ogólne — decyzję o szczepieniu zawsze omów z lekarzem prowadzącym ciążę.
          </p>
        </div>
      </section>
    </div>
  );
}
