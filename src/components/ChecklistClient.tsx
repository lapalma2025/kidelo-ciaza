"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Home,
  Car,
  Bath,
  Shirt,
  Baby,
  PersonStanding,
  HeartPulse,
  PawPrint,
  FileText,
  Users,
  ClipboardList,
  Syringe,
  type LucideIcon,
} from "lucide-react";
import type { ChecklistData } from "@/data/checklists";

// Ikony SVG zamiast emoji przy tytułach sekcji — dopasowane po treści
// tytułu, nie po sztywnym indeksie (żeby działało dla obu list: wyprawki i
// torby do szpitala, nawet jeśli kolejność sekcji się zmieni).
const SECTION_ICONS: Array<{ match: RegExp; icon: LucideIcon }> = [
  { match: /dokument/i, icon: FileText },
  { match: /pokój|sen/i, icon: Home },
  { match: /transport|spacer/i, icon: Car },
  { match: /kąpiel|pielęgnacj/i, icon: Bath },
  { match: /tekstyli|ubran/i, icon: Shirt },
  { match: /karmien/i, icon: Baby },
  { match: /noszeni|rozwój/i, icon: PersonStanding },
  { match: /mamy/i, icon: HeartPulse },
  { match: /partner/i, icon: Users },
  { match: /dziecka/i, icon: Baby },
  { match: /akcesori/i, icon: PawPrint },
  { match: /szczep/i, icon: Syringe },
  { match: /badani|trymestr/i, icon: ClipboardList },
];

function iconForSection(title: string): LucideIcon {
  return SECTION_ICONS.find((s) => s.match.test(title))?.icon ?? FileText;
}

// Renderowane przez Next.js po stronie serwera przy pierwszym ładowaniu
// (Next SSR-uje też komponenty klienckie), więc cała lista jest w HTML od
// razu — stan zaznaczenia (localStorage) dochodzi dopiero po hydratacji.
export default function ChecklistClient({ data }: { data: ChecklistData }) {
  const storageKey = `kidelo-checklist-${data.slug}`;
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Celowo w efekcie, nie w lazy initializerze useState: localStorage nie
    // istnieje przy SSR, więc odczyt musi poczekać do hydratacji — inaczej
    // checkbox przy pierwszym renderze klienta różniłby się od HTML z serwera
    // (mismatch hydratacji). Krótki błysk "odznaczone -> zaznaczone" jest tu
    // zamierzonym kompromisem.
    try {
      const raw = window.localStorage.getItem(storageKey);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      // localStorage może być niedostępny (tryb prywatny) — lista dalej działa, bez zapamiętywania.
    }
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(checked));
    } catch {
      // ignore
    }
  }, [checked, hydrated, storageKey]);

  const totalItems = useMemo(() => data.sections.reduce((sum, s) => sum + s.items.length, 0), [data]);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  function toggle(key: string) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="sticky top-[57px] z-10 -mx-4 border-b border-[var(--color-line)]/70 bg-white/90 px-4 py-3 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border">
        <div className="flex items-center justify-between gap-3 text-sm font-semibold text-[var(--color-forest)]">
          <span>Twój postęp</span>
          <span className="shrink-0 tabular-nums">
            {checkedCount} / {totalItems} ({progress}%)
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--color-sage)]">
          <div
            className="h-full rounded-full bg-[var(--color-forest)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-8 sm:space-y-10">
        {data.sections.map((section) => {
          const Icon = iconForSection(section.title);
          return (
          <section key={section.title}>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-sage)]/60 text-[var(--color-forest)]">
                <Icon size={16} strokeWidth={2} />
              </span>
              <h2 className="font-display text-lg font-semibold text-[var(--color-forest)] sm:text-xl">{section.title}</h2>
            </div>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {section.items.map((item) => {
                const key = `${section.title}__${item}`;
                const isChecked = Boolean(checked[key]);
                return (
                  <li key={key}>
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[var(--color-line)] bg-white p-3 text-sm transition-colors hover:border-[var(--color-forest)]/40">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggle(key)}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-forest)]"
                      />
                      <span className={isChecked ? "text-[var(--color-muted)] line-through" : "text-[var(--color-ink)]"}>
                        {item}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
          );
        })}
      </div>
    </div>
  );
}
