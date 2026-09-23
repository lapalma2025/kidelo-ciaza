// Dane tygodni ciąży — 1:1 skopiowane z aplikacji mobilnej Kidelo Ciąża
// (kidelo-app/assets/ciaza-tydzien-po-tygodniu.json), żeby treść na stronie
// zgadzała się z tym, co user widzi w apce.
import raw from "./pregnancyWeeks.json";

export interface PregnancyWeekSize {
  dlugosc: string;
  waga: string;
  porownanie: string;
}

export interface PregnancyWeek {
  tydzien: number;
  trymestr: number;
  miesiac_ciazy: number;
  etap_nazwa: string;
  podsumowanie: string;
  rozmiar_dziecka: PregnancyWeekSize;
  rozwoj_dziecka: string;
  cialo_kobiety: string;
  typowe_objawy: string[];
  co_zrobic: string[];
  badania_i_wizyty: string[];
  na_co_zwrocic_uwage: string[];
  wskazowki: string[];
}

interface RawData {
  meta: { objawy_alarmowe_zawsze: string[]; disclaimer: string; zaktualizowano: string };
  tygodnie: PregnancyWeek[];
}

const data = raw as unknown as RawData;

export const FIRST_WEEK = 1;
export const LAST_WEEK = 41;
export const ALARM_SYMPTOMS = data.meta.objawy_alarmowe_zawsze;
export const DATA_UPDATED_AT = data.meta.zaktualizowano;

const byWeek = new Map<number, PregnancyWeek>(data.tygodnie.map((w) => [w.tydzien, w]));

export function getWeek(week: number): PregnancyWeek | undefined {
  return byWeek.get(week);
}

export function getTrimesterLabel(trymestr: number): string {
  if (trymestr === 1) return "I trymestr";
  if (trymestr === 2) return "II trymestr";
  return "III trymestr";
}

/** Unikalna ikona na każdy tydzień (1–41) — dopasowana do porównania wielkości. */
const WEEK_EMOJI: Record<number, string> = {
  1: "🤰",
  2: "🌱",
  3: "🌾",
  4: "🫘",
  5: "🟡",
  6: "🫐",
  7: "🫛",
  8: "🍇",
  9: "🍓",
  10: "🫒",
  11: "🍊",
  12: "🍑",
  13: "🍋",
  14: "🍎",
  15: "🥑",
  16: "🍐",
  17: "🫑",
  18: "🥭",
  19: "🍌",
  20: "🥕",
  21: "🍈",
  22: "🍊",
  23: "🌽",
  24: "🧅",
  25: "🥗",
  26: "🥦",
  27: "🍆",
  28: "🍠",
  29: "🥬",
  30: "🥥",
  31: "🍃",
  32: "🍍",
  33: "🍈",
  34: "🍯",
  35: "🌿",
  36: "🪴",
  37: "🥒",
  38: "🍉",
  39: "🍉",
  40: "🎃",
  41: "🍂",
  42: "🍂",
};

export function fruitEmoji(_porownanie: string, week?: number): string {
  if (week != null && WEEK_EMOJI[week]) return WEEK_EMOJI[week];
  return "·";
}

export function weekEmoji(week: number): string {
  return WEEK_EMOJI[week] ?? "·";
}

export function weekPath(week: number): string {
  return `/ciaza-tydzien-po-tygodniu/${week}`;
}

export const ALL_WEEK_NUMBERS: number[] = Array.from(
  { length: LAST_WEEK - FIRST_WEEK + 1 },
  (_, i) => i + FIRST_WEEK
);
