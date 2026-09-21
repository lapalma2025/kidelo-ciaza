import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PlayStoreCTA from "@/components/PlayStoreCTA";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/PageHero";
import { ACTIVE_BENEFITS, RETIRED_BENEFITS, benefitPath, BENEFITS_META } from "@/data/benefits";
import { pageSocialMeta } from "@/lib/seo";
import financeScreenshot from "@/assets/03-screenshot.jpg";

const title = "Świadczenia dla rodziców — becikowe, 800+, zasiłek macierzyński";
const description =
  "Wszystkie świadczenia dla rodziców w Polsce: becikowe, 800+, zasiłek macierzyński, kosiniakowe. Kwoty, kryteria, dokumenty i terminy — zweryfikowane wg ZUS i gov.pl.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/finanse" },
  ...pageSocialMeta({ title, description, path: "/finanse", image: financeScreenshot }),
};

export default function BenefitsHubPage() {
  return (
    <div>
      <PageHero
        crumbs={[{ label: "Start", href: "/" }, { label: "Finanse" }]}
        eyebrow="Zweryfikowane wg ZUS/gov.pl"
        title="Świadczenia dla rodziców"
        description={`Becikowe, 800+, zasiłek macierzyński, kosiniakowe i inne — kwoty, kryteria dochodowe, wymagane dokumenty i terminy. Dane zweryfikowane wg ZUS i gov.pl (${BENEFITS_META.last_verified}).`}
        actions={<PlayStoreCTA source="benefits-hub" label="Policz wariant w aplikacji" />}
        motif="wallet"
        aside={
          <div className="relative mx-auto w-full max-w-[220px] sm:max-w-xs">
            <Image
              src={financeScreenshot}
              alt="Ekran aplikacji Kidelo Ciąża z kalkulatorem świadczeń i kalkulatorem urlopowym ZUS"
              className="rounded-[24px] shadow-[0_30px_60px_-30px_rgba(21,76,60,0.35)] sm:rounded-[28px]"
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 320px, 70vw"
            />
          </div>
        }
      />

      <section className="px-4 sm:px-6">
        <AnimatedSection className="mx-auto max-w-6xl">
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {ACTIVE_BENEFITS.map((b) => (
              <Link
                key={b.id}
                href={benefitPath(b)}
                className="card-lift reveal-item flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-5 hover:border-[var(--color-forest)]/40"
              >
                <p className="font-display text-lg font-semibold text-[var(--color-forest)]">{b.name}</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{b.summary}</p>
                <p className="mt-3 font-display text-xl font-semibold text-[var(--color-peach-dark)]">
                  {b.amount_display}
                </p>
                {b.income_means_tested && (
                  <span className="mt-2 inline-block w-fit rounded-full bg-[var(--color-sage)]/60 px-2.5 py-1 text-xs font-semibold text-[var(--color-forest)]">
                    Kryterium dochodowe
                  </span>
                )}
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {RETIRED_BENEFITS.length > 0 && (
        <section className="mt-12 px-4 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-xl font-semibold text-[var(--color-muted)]">
              Świadczenia wycofane (dla porównania)
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {RETIRED_BENEFITS.map((b) => (
                <Link
                  key={b.id}
                  href={benefitPath(b)}
                  className="flex flex-col rounded-2xl border border-dashed border-[var(--color-line)] bg-white/35 p-5 opacity-80 backdrop-blur-sm transition-opacity hover:opacity-100"
                >
                  <span className="w-fit rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700">
                    Wycofane
                  </span>
                  <p className="mt-2 font-display text-lg font-semibold text-[var(--color-ink)]">{b.name}</p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{b.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
