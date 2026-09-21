import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Lightbulb } from "lucide-react";
import PlayStoreCTA from "@/components/PlayStoreCTA";
import PageHero from "@/components/PageHero";
import ChecklistClient from "@/components/ChecklistClient";
import { hospitalBagChecklist } from "@/data/checklists";
import { pageSocialMeta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import bagScreenshot from "@/assets/04-screenshot.jpg";

const title = "Torba do szpitala — lista rzeczy dla mamy i dziecka";
const description =
  "Co spakować do torby do szpitala przed porodem: dokumenty, rzeczy dla mamy, noworodka i partnera. Checklista — spakuj torbę przed 35. tygodniem ciąży.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "torba do szpitala",
    "lista torba do szpitala",
    "co spakować do szpitala poród",
    "torba do porodu",
  ],
  alternates: { canonical: "/torba-do-szpitala" },
  ...pageSocialMeta({ title, description, path: "/torba-do-szpitala", image: bagScreenshot }),
};

export default function TorbaPage() {
  const data = hospitalBagChecklist;
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.title,
    description: data.intro.replace(/\n+/g, " "),
    url: absoluteUrl("/torba-do-szpitala"),
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
        crumbs={[{ label: "Start", href: "/" }, { label: "Torba do szpitala" }]}
        eyebrow={data.pill}
        title={data.title}
        description={
          <>
            <p className="whitespace-pre-line">{data.intro}</p>
            <p className="mt-2 text-sm">
              Zobacz też pełną listę{" "}
              <Link href="/wyprawka" className="font-semibold text-[var(--color-forest)] underline">
                wyprawki dla dziecka
              </Link>
              .
            </p>
          </>
        }
        actions={<PlayStoreCTA source="torba-do-szpitala" label="Otwórz checklistę" />}
        motif="hospitalBag"
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mx-auto mt-2 w-full max-w-[220px] sm:mt-4 sm:max-w-xs">
          <Image
            src={bagScreenshot}
            alt="Ekran aplikacji Kidelo Ciąża z checklistą torby do szpitala i listą szkół rodzenia w okolicy"
            className="rounded-[24px] shadow-[0_30px_60px_-30px_rgba(21,76,60,0.35)] sm:rounded-[28px]"
            placeholder="blur"
            sizes="(max-width: 640px) 220px, 320px"
          />
        </div>

        <div className="mt-10 sm:mt-12">
          <ChecklistClient data={data} />
        </div>

        {data.tip && (
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[var(--color-line)] bg-white p-4 text-sm text-[var(--color-forest)] sm:p-5">
            <Lightbulb size={18} className="mt-0.5 shrink-0" strokeWidth={2} />
            <span>{data.tip}</span>
          </div>
        )}
      </div>
    </div>
  );
}
