import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PlayStoreCTA from "@/components/PlayStoreCTA";
import PageHero from "@/components/PageHero";
import ChecklistClient from "@/components/ChecklistClient";
import { babyEssentialsChecklist } from "@/data/checklists";
import { pageSocialMeta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import wyprawkaScreenshot from "@/assets/08-screenshot.jpg";

const title = "Wyprawka dla noworodka — lista na pierwsze dziecko";
const description =
  "Wyprawka dla noworodka i na pierwsze dziecko: pokój i sen, kąpiel, ubranka, karmienie, transport. Interaktywna checklista — odhacz to, co już masz. Gotowa lista wyprawki 2026.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "wyprawka dla noworodka",
    "wyprawka pierwsze dziecko",
    "lista wyprawki",
    "wyprawka dla dziecka checklista",
    "co kupić do wyprawki",
  ],
  alternates: { canonical: "/wyprawka" },
  ...pageSocialMeta({ title, description, path: "/wyprawka", image: wyprawkaScreenshot }),
};

export default function WyprawkaPage() {
  const data = babyEssentialsChecklist;
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.title,
    description: data.intro.replace(/\n+/g, " "),
    url: absoluteUrl("/wyprawka"),
    inLanguage: "pl-PL",
    step: data.sections.map((section, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: section.title,
      itemListElement: section.items.map((item, j) => ({
        "@type": "HowToDirection",
        position: j + 1,
        text: item,
      })),
    })),
  };

  return (
    <div>
      <JsonLd data={howToJsonLd} />
      <PageHero
        crumbs={[{ label: "Start", href: "/" }, { label: "Wyprawka" }]}
        eyebrow={data.pill}
        title={data.title}
        description={
          <>
            <p className="whitespace-pre-line">{data.intro}</p>
            <p className="mt-2 text-sm">
              Zobacz też osobną listę do{" "}
              <Link href="/torba-do-szpitala" className="font-semibold text-[var(--color-forest)] underline">
                torby do szpitala
              </Link>
              .
            </p>
          </>
        }
        actions={<PlayStoreCTA source="wyprawka" label="Otwórz checklistę" />}
        motif="bodysuit"
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mx-auto mt-2 w-full max-w-[220px] sm:mt-4 sm:max-w-xs">
          <Image
            src={wyprawkaScreenshot}
            alt="Ekran aplikacji Kidelo Ciąża z checklistą wyprawki oraz sklepem kidelo.pl"
            className="rounded-[24px] shadow-[0_30px_60px_-30px_rgba(21,76,60,0.35)] sm:rounded-[28px]"
            placeholder="blur"
            sizes="(max-width: 640px) 220px, 320px"
          />
        </div>

        <div className="mt-10 sm:mt-12">
          <ChecklistClient data={data} />
        </div>
      </div>
    </div>
  );
}
