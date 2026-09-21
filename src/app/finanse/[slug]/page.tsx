import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlayStoreCTA from "@/components/PlayStoreCTA";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { ALL_BENEFITS, getBenefit, benefitPath } from "@/data/benefits";
import { absoluteUrl } from "@/lib/site";
import benefitOgImage from "@/assets/03-screenshot.jpg";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ALL_BENEFITS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const b = getBenefit(slug);
  if (!b) return { title: "Nie znaleziono świadczenia" };

  const title = `${b.name} — kwota, kryteria, wniosek`;
  const description = `${b.summary} Kwota: ${b.amount_display}. Sprawdź kryteria, wymagane dokumenty i terminy składania wniosku.`;
  const path = benefitPath(b);

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
      images: [{ url: benefitOgImage.src, width: benefitOgImage.width, height: benefitOgImage.height, alt: b.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [benefitOgImage.src],
    },
  };
}

export default async function BenefitPage({ params }: PageProps) {
  const { slug } = await params;
  const b = getBenefit(slug);
  if (!b) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: b.name,
    description: b.summary,
    url: absoluteUrl(benefitPath(b)),
    inLanguage: "pl-PL",
    dateModified: b.source_citations[0]?.verified,
    image: absoluteUrl(benefitOgImage.src),
    author: { "@type": "Organization", name: "Kidelo", url: "https://kidelo.pl" },
    publisher: {
      "@type": "Organization",
      name: "Kidelo",
      url: "https://kidelo.pl",
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon.png") },
    },
    mainEntityOfPage: absoluteUrl(benefitPath(b)),
  };

  return (
    <div>
      <JsonLd data={articleJsonLd} />

      <PageHero
        crumbs={[{ label: "Start", href: "/" }, { label: "Finanse", href: "/finanse" }, { label: b.name }]}
        eyebrow={b.official_name}
        title={b.name}
        description={
          <>
            {b.status === "retired" && (
              <span className="mb-3 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                Świadczenie wycofane {b.withdrawn_since ? `od ${b.withdrawn_since}` : ""}
              </span>
            )}
            <p>{b.summary}</p>
          </>
        }
        actions={
          <div className="flex flex-wrap items-center gap-4">
            <p className="font-display text-3xl font-semibold text-[var(--color-peach-dark)]">{b.amount_display}</p>
            {b.status !== "retired" && <PlayStoreCTA source={`benefit-${b.id}`} label="Policz wariant w aplikacji" />}
          </div>
        }
        motif="wallet"
      />

      <section className="px-4 sm:px-6">
        <AnimatedSection className="mx-auto grid max-w-3xl gap-6">
          {b.replaced_by && (
            <div className="reveal-item glass-surface rounded-2xl p-5 text-sm">
              To świadczenie zostało zastąpione przez{" "}
              <a href={`/finanse/${b.replaced_by}`} className="font-semibold text-[var(--color-forest)] underline">
                inne, aktywne świadczenie
              </a>
              .
            </div>
          )}

          <div className="reveal-item glass-surface rounded-3xl p-6 sm:p-7">
            <h2 className="font-display text-xl font-semibold text-[var(--color-forest)]">Kryteria</h2>
            <ul className="mt-3 space-y-2">
              {b.criteria.map((c) => (
                <li key={c} className="flex gap-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-peach)]" aria-hidden="true" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            {b.income_limit_note && (
              <p className="mt-4 rounded-xl bg-[var(--color-sage)]/40 p-3 text-sm font-medium text-[var(--color-forest)]">
                {b.income_limit_note}
              </p>
            )}
          </div>

          {b.required_documents.length > 0 && (
            <div className="reveal-item glass-surface rounded-3xl p-6 sm:p-7">
              <h2 className="font-display text-xl font-semibold text-[var(--color-forest)]">Wymagane dokumenty</h2>
              <ul className="mt-3 space-y-2">
                {b.required_documents.map((d) => (
                  <li key={d} className="flex gap-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-peach)]" aria-hidden="true" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {b.steps.length > 0 && (
            <div className="reveal-item glass-surface rounded-3xl p-6 sm:p-7">
              <h2 className="font-display text-xl font-semibold text-[var(--color-forest)]">Jak złożyć wniosek — krok po kroku</h2>
              <ol className="mt-3 space-y-2.5">
                {b.steps.map((s, i) => (
                  <li key={s} className="flex gap-3 text-sm leading-relaxed text-[var(--color-muted)]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-sage)] text-xs font-bold text-[var(--color-forest)]">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{s}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-[var(--color-muted)]">
                <span className="font-semibold text-[var(--color-forest)]">Gdzie złożyć:</span> {b.channel_display}
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                <span className="font-semibold text-[var(--color-forest)]">Termin:</span> {b.deadline_rule.description}
              </p>
            </div>
          )}

          {b.common_mistakes && b.common_mistakes.length > 0 && (
            <div className="reveal-item rounded-3xl border border-[var(--color-peach)]/50 bg-[var(--color-peach)]/15 p-6 backdrop-blur-sm sm:p-7">
              <h2 className="font-display text-xl font-semibold text-[var(--color-peach-dark)]">
                Najczęstsze błędy
              </h2>
              <ul className="mt-3 space-y-2">
                {b.common_mistakes.map((m) => (
                  <li key={m} className="flex gap-2 text-sm leading-relaxed text-[var(--color-ink)]">
                    <span aria-hidden="true">⚠️</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {b.additional_info && b.additional_info.length > 0 && (
            <div className="reveal-item glass-surface rounded-3xl p-6 sm:p-7">
              <h2 className="font-display text-xl font-semibold text-[var(--color-forest)]">Dodatkowe informacje</h2>
              <ul className="mt-3 space-y-2">
                {b.additional_info.map((info) => (
                  <li key={info} className="flex gap-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-peach)]" aria-hidden="true" />
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="reveal-item rounded-3xl border border-[var(--color-line)] bg-white/40 p-6 text-sm backdrop-blur-sm sm:p-7">
            <h2 className="font-display text-lg font-semibold text-[var(--color-forest)]">Podstawa prawna i źródła</h2>
            <p className="mt-2 text-[var(--color-muted)]">
              {b.legal_basis.act}
              {b.legal_basis.article ? `, ${b.legal_basis.article}` : ""}
              {b.legal_basis.journal ? ` (${b.legal_basis.journal})` : ""}
            </p>
            <a
              href={b.legal_basis.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-1 inline-block text-[var(--color-forest)] underline"
            >
              Zobacz akt prawny (isap.sejm.gov.pl)
            </a>
            <ul className="mt-4 space-y-2">
              {b.source_citations.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-[var(--color-forest)] underline"
                  >
                    {s.label}
                  </a>
                  <span className="text-[var(--color-muted)]"> — zweryfikowano {s.verified}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
