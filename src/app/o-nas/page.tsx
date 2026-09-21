import type { Metadata } from "next";
import Link from "next/link";
import PlayStoreCTA from "@/components/PlayStoreCTA";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { pageSocialMeta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const title = "O nas — Kidelo Ciąża, aplikacja stworzona przez rodziców";
const description =
  "Kidelo Ciąża powstała z doświadczenia rodziców: kompleksowa aplikacja ciążowa z kalendarzem, badaniami, świadczeniami i checklistami — tym, czego brakowało nam i naszym znajomym w popularnych aplikacjach.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Kidelo Ciąża o nas",
    "aplikacja ciążowa Polska",
    "aplikacja dla rodziców",
    "ciąza pierwsze dziecko",
  ],
  alternates: { canonical: "/o-nas" },
  ...pageSocialMeta({ title, description, path: "/o-nas", type: "article" }),
};

export default function AboutPage() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: title,
    description,
    url: absoluteUrl("/o-nas"),
    inLanguage: "pl-PL",
    mainEntity: {
      "@type": "Organization",
      name: "Kidelo",
      url: "https://kidelo.pl",
      email: "biuro@kidelo.pl",
      description:
        "Twórcy polskiej aplikacji ciążowej Kidelo Ciąża — rodzice, którzy zbudowali narzędzie łączące kalendarz ciąży, badania, świadczenia i checklisty.",
    },
  };

  return (
    <div className="overflow-x-clip">
      <JsonLd data={aboutJsonLd} />

      <PageHero
        crumbs={[{ label: "Start", href: "/" }, { label: "O nas" }]}
        eyebrow="Stworzone przez rodziców dla rodziców"
        title="O nas"
        description="Kidelo Ciąża powstała z prawdziwej potrzeby — nie z listy funkcji do odhaczenia. Jesteśmy rodzicami i wiemy, jak wygląda codzienna niepewność w ciąży."
        actions={<PlayStoreCTA source="o-nas" label="Pobierz Kidelo Ciąża" />}
        motif="family"
        align="center"
      />

      <section className="px-4 sm:px-6">
        <AnimatedSection className="mx-auto max-w-3xl space-y-8">
          <div className="reveal-item space-y-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            <p>
              Gdy sami przechodziliśmy przez ciążę, szukaliśmy jednego miejsca, w którym jest{" "}
              <strong className="font-semibold text-[var(--color-ink)]">wszystko naraz</strong>: tydzień po tygodniu,
              badania, szczepienia, świadczenia, wyprawka i torba do szpitala. Popularne aplikacje były ładne, ale często
              omijały to, co w Polsce jest najważniejsze — formalności, terminy NFZ i praktyczne listy „co teraz”.
            </p>
            <p>
              Słyszeliśmy to samo od znajomych: brakowało konkretów, które spokojnie prowadzą przez cały etap — od
              pierwszego testu aż po pierwsze dni z dzieckiem. Dlatego stworzyliśmy Kidelo Ciąża: kompleksową, polską
              aplikację, której sami potrzebowaliśmy.
            </p>
          </div>

          <div className="reveal-item rounded-3xl border border-[var(--color-line)] bg-white p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-[var(--color-forest)] sm:text-2xl">
              Co dla nas znaczy „kompleksowo”
            </h2>
            <ul className="mt-4 space-y-3 text-[var(--color-muted)]">
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-peach)]" aria-hidden />
                <span>
                  Kalendarz ciąży tydzień po tygodniu i{" "}
                  <Link href="/badania" className="font-semibold text-[var(--color-forest)] underline">
                    badania I–III trymestru
                  </Link>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-peach)]" aria-hidden />
                <span>
                  Świadczenia i formalności —{" "}
                  <Link href="/finanse" className="font-semibold text-[var(--color-forest)] underline">
                    becikowe, 800+, macierzyński
                  </Link>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-peach)]" aria-hidden />
                <span>
                  Praktyczne checklisty:{" "}
                  <Link href="/wyprawka" className="font-semibold text-[var(--color-forest)] underline">
                    wyprawka
                  </Link>{" "}
                  i{" "}
                  <Link href="/torba-do-szpitala" className="font-semibold text-[var(--color-forest)] underline">
                    torba do szpitala
                  </Link>
                </span>
              </li>
            </ul>
          </div>

          <div className="reveal-item space-y-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            <h2 className="font-display text-xl font-semibold text-[var(--color-forest)] sm:text-2xl">
              Konsultacje i odpowiedzialność
            </h2>
            <p>
              Treści w aplikacji i na tej stronie{" "}
              <strong className="font-semibold text-[var(--color-ink)]">konsultowaliśmy ze specjalistami</strong> —
              zależało nam, żeby informacje były rzetelne i zgodne z polskimi realiami. Jednocześnie chcemy powiedzieć to
              wprost:
            </p>
          </div>

          <aside className="reveal-item rounded-2xl border border-[var(--color-peach)]/40 bg-[var(--color-peach)]/10 px-5 py-5 sm:px-6">
            <p className="text-sm leading-relaxed text-[var(--color-ink)] sm:text-base">
              <strong className="font-semibold">Ważne:</strong> wszystko, co znajdziesz w Kidelo Ciąża — w aplikacji i na
              stronie — ma charakter <strong className="font-semibold">wyłącznie informacyjny</strong> i nie zastępuje
              konsultacji z lekarzem, położną ani innym specjalistą. Wątpliwości dotyczące zdrowia zawsze omawiaj z osobą
              prowadzącą Twoją ciążę.
            </p>
          </aside>

          <div className="reveal-item pb-4 text-center sm:pb-8">
            <p className="text-[var(--color-muted)]">Jeśli czujesz, że przyda Ci się spokojniejszy przewodnik — jesteśmy tu dla Ciebie.</p>
            <div className="mt-5 flex justify-center">
              <PlayStoreCTA source="o-nas-bottom" label="Pobierz w Google Play" />
            </div>
            <p className="mt-4 text-sm text-[var(--color-muted)]">
              Napisz do nas:{" "}
              <a href="mailto:biuro@kidelo.pl" className="font-semibold text-[var(--color-forest)] underline">
                biuro@kidelo.pl
              </a>
            </p>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
