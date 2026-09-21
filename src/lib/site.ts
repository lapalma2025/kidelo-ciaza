// Adres produkcyjny serwisu. Nadpisz przez NEXT_PUBLIC_SITE_URL, jeśli
// środowisko (np. preview) ma inną domenę.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kidelo-ciaza.pl";

export const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=pl.kidelo.app";

export const SITE_NAME = "Kidelo Ciąża";

export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
