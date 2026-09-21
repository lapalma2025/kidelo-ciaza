import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import NurseryScroll from "./NurseryScroll";

type Motif =
  | "cradle"
  | "sleepsuit"
  | "bottle"
  | "mobile"
  | "rattle"
  | "hospitalBag"
  | "bodysuit"
  | "wallet"
  | "syringe"
  | "family";

interface PageHeroProps {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  /** Animacja po prawej stronie (tylko desktop — na mobile nie nachodzi na tekst). */
  motif?: Motif;
  aside?: ReactNode;
  align?: "left" | "center";
}

export default function PageHero({
  crumbs,
  eyebrow,
  title,
  description,
  actions,
  motif,
  aside,
  align = "left",
}: PageHeroProps) {
  const centered = align === "center";

  return (
    <section className="page-hero relative overflow-x-clip px-4 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-8 lg:pb-16">
      <div className="page-hero-glow" aria-hidden="true" />
      {motif && (
        <NurseryScroll
          motif={motif}
          className="absolute right-2 top-10 z-10 hidden h-40 w-32 opacity-80 lg:block xl:right-8 xl:h-52 xl:w-40"
          travel={60}
          spin={10}
        />
      )}
      <div
        className={`relative mx-auto max-w-6xl ${
          aside ? "grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr]" : ""
        } ${centered ? "text-center" : ""}`}
      >
        <div
          className={`${centered ? "mx-auto max-w-3xl" : ""} ${
            motif && !aside && !centered ? "lg:max-w-3xl lg:pr-8" : ""
          }`}
        >
          <div className={centered ? "flex justify-center" : ""}>
            <Breadcrumbs items={crumbs} />
          </div>
          {eyebrow && (
            <p className="font-mono-label mt-4 text-xs text-[var(--color-peach-dark)] sm:mt-5">{eyebrow}</p>
          )}
          <h1 className="mt-2 font-display text-[1.85rem] leading-[1.15] text-[var(--color-forest)] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <div
              className={`mt-3 text-base leading-relaxed text-[var(--color-muted)] sm:mt-4 sm:text-lg ${
                centered ? "mx-auto max-w-2xl" : "max-w-2xl"
              }`}
            >
              {description}
            </div>
          )}
          {actions && (
            <div className={`mt-6 sm:mt-7 ${centered ? "flex justify-center" : ""}`}>{actions}</div>
          )}
        </div>
        {aside && <div className="mt-2 w-full min-w-0 sm:mt-0">{aside}</div>}
      </div>
    </section>
  );
}
