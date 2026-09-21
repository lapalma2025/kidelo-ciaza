import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PlayStoreCTA from "@/components/PlayStoreCTA";
import PageHero from "@/components/PageHero";
import ChecklistClient from "@/components/ChecklistClient";
import JsonLd from "@/components/JsonLd";
import {
  TRIMESTER_EXAMS,
  examPath,
  getTrimesterBySlug,
  trimesterToChecklist,
} from "@/data/exams";
import { absoluteUrl } from "@/lib/site";
import examsScreenshot from "@/assets/05-screenshot.jpg";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return TRIMESTER_EXAMS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const t = getTrimesterBySlug(slug);
  if (!t) return { title: "Nie znaleziono badań" };

  const path = examPath(t);
  return {
    title: t.seoTitle,
    description: t.seoDescription,
    keywords: [
      t.title,
      `badania ${t.roman} trymestru`,
      "badania w ciąży",
      "kalendarz badań w ciąży",
      "pierwsze dziecko",
      "ciąza badania NFZ",
    ],
    alternates: { canonical: path },
    openGraph: {
      title: t.seoTitle,
      description: t.seoDescription,
      url: absoluteUrl(path),
      type: "article",
      locale: "pl_PL",
      siteName: "Kidelo Ciąża",
      images: [
        {
          url: examsScreenshot.src,
          width: examsScreenshot.width,
          height: examsScreenshot.height,
          alt: t.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.seoTitle,
      description: t.seoDescription,
      images: [examsScreenshot.src],
    },
  };
}

export default async function TrimesterExamsPage({ params }: PageProps) {
  const { slug } = await params;
  const t = getTrimesterBySlug(slug);
  if (!t) notFound();

  const data = trimesterToChecklist(t);
  const path = examPath(t);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t.title,
    description: t.seoDescription,
    url: absoluteUrl(path),
    inLanguage: "pl-PL",
    step: t.items.map((item, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: item.label,
      text: item.label,
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.seoTitle,
    description: t.seoDescription,
    url: absoluteUrl(path),
    inLanguage: "pl-PL",
    image: absoluteUrl(examsScreenshot.src),
    author: { "@type": "Organization", name: "Kidelo", url: "https://kidelo.pl" },
    publisher: {
      "@type": "Organization",
      name: "Kidelo",
      url: "https://kidelo.pl",
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon.png") },
    },
    mainEntityOfPage: absoluteUrl(path),
  };

  const others = TRIMESTER_EXAMS.filter((x) => x.id !== t.id);

  return (
    <div>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={articleJsonLd} />

      <PageHero
        crumbs={[
          { label: "Start", href: "/" },
          { label: "Badania", href: "/badania" },
          { label: `${t.roman} trymestr` },
        ]}
        eyebrow={t.note}
        title={t.title}
        description={
          <>
            <p>
              Checklista badań {t.roman} trymestru ciąży ({t.weeksRange}) — jak w aplikacji Kidelo. Odhacz wykonane
              pozycje; terminy zawsze potwierdź z lekarzem prowadzącym.
            </p>
            <p className="mt-2 text-sm">
              Wróć do{" "}
              <Link href="/badania" className="font-semibold text-[var(--color-forest)] underline">
                kalendarza badań
              </Link>{" "}
              albo zobacz{" "}
              <Link href="/badania/szczepienia" className="font-semibold text-[var(--color-forest)] underline">
                szczepienia w ciąży
              </Link>
              .
            </p>
          </>
        }
        actions={<PlayStoreCTA source={`badania-${t.slug}`} label="Odhaczaj w aplikacji" />}
        motif="syringe"
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <ChecklistClient data={data} />

        <section className="mt-12" aria-labelledby="faq-tri">
          <h2 id="faq-tri" className="font-display text-xl font-semibold text-[var(--color-forest)]">
            Pytania o {t.title.toLowerCase()}
          </h2>
          <div className="mt-4 space-y-3">
            {t.faqs.map((f) => (
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
        </section>

        <nav className="mt-12 mb-8 grid gap-3 sm:grid-cols-2" aria-label="Inne trymestry">
          {others.map((o) => (
            <Link
              key={o.id}
              href={examPath(o)}
              className="rounded-2xl border border-[var(--color-line)] bg-white p-4 hover:border-[var(--color-forest)]/40"
            >
              <span className="font-mono-label text-xs text-[var(--color-peach-dark)]">{o.roman} trymestr</span>
              <p className="mt-1 font-display font-semibold text-[var(--color-forest)]">{o.title}</p>
            </Link>
          ))}
        </nav>

        <p className="mb-10 text-xs text-[var(--color-muted)]">
          Treści informacyjne — nie zastępują konsultacji lekarskiej.
        </p>
      </div>
    </div>
  );
}
