// Dane świadczeń — 1:1 skopiowane z aplikacji mobilnej Kidelo Ciąża
// (kidelo-app/src/data/benefits.json), zweryfikowane wg ZUS/gov.pl.
// Zawiera pełne kryteria, dokumenty, kroki i podstawę prawną — nie skrót.
import raw from "./benefits.json";

export interface LegalBasis {
  act: string;
  journal?: string;
  article?: string;
  url: string;
}

export interface SourceCitation {
  label: string;
  url: string;
  verified: string;
  key_quote?: string;
}

export interface DeadlineRule {
  type: string;
  value?: number | null;
  description: string;
}

export interface Benefit {
  id: string;
  slug: string;
  name: string;
  official_name: string;
  summary: string;
  status?: "retired";
  withdrawn_since?: string;
  replaced_by?: string;
  amount_pln?: number;
  amount_display: string;
  unit?: string;
  unit_display?: string;
  income_means_tested: boolean;
  income_limit_per_capita_pln?: number;
  income_limit_note?: string;
  channel: string;
  channel_display: string;
  submission_methods: string[];
  deadline_rule: DeadlineRule;
  criteria: string[];
  required_documents: string[];
  steps: string[];
  legal_basis: LegalBasis;
  source_citations: SourceCitation[];
  common_mistakes?: string[];
  additional_info?: string[];
}

interface RawData {
  _meta: { version: string; valid_from: string; valid_to: string; last_verified: string };
  benefits: Benefit[];
}

const data = raw as unknown as RawData;

export const BENEFITS_META = data._meta;

// Kolejność aktywnych świadczeń na stronie /finanse — od najbardziej
// powszechnych (dotyczą każdej rodziny) do specjalistycznych.
const DISPLAY_ORDER = [
  "becikowe",
  "800plus",
  "macierzynski",
  "kosiniakowe",
  "aktywni-rodzice-w-pracy",
  "aktywnie-w-zlobku",
  "aktywnie-w-domu",
  "za-zyciem",
  "swiadczenie-pielegnacyjne",
  "pfron-programy",
  "rko",
];

export const ACTIVE_BENEFITS: Benefit[] = DISPLAY_ORDER.map((id) =>
  data.benefits.find((b) => b.id === id)
).filter((b): b is Benefit => Boolean(b) && b!.status !== "retired");

export const RETIRED_BENEFITS: Benefit[] = data.benefits.filter((b) => b.status === "retired");

export const ALL_BENEFITS: Benefit[] = [...ACTIVE_BENEFITS, ...RETIRED_BENEFITS];

export function getBenefit(slug: string): Benefit | undefined {
  return data.benefits.find((b) => b.slug === slug || b.id === slug);
}

export function benefitPath(b: Benefit): string {
  return `/finanse/${b.slug}`;
}
