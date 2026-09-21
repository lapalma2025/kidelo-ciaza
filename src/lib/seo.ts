import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";
import defaultOg from "@/assets/01-screenshot.jpg";

/** Wspólne Open Graph + Twitter dla hubów i stron treści. */
export function pageSocialMeta({
  title,
  description,
  path,
  image = defaultOg,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: StaticImageData;
  type?: "website" | "article";
}): Pick<Metadata, "openGraph" | "twitter"> {
  const url = absoluteUrl(path);
  return {
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "pl_PL",
      type,
      images: [{ url: image.src, width: image.width, height: image.height, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.src],
    },
  };
}

export function organizationJsonLd(appIconUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kidelo",
    url: "https://kidelo.pl",
    logo: appIconUrl,
    email: "biuro@kidelo.pl",
    sameAs: ["https://play.google.com/store/apps/details?id=pl.kidelo.app"],
  };
}

export function mobileAppJsonLd(appIconUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: SITE_NAME,
    alternateName: "Kidelo Ciaza",
    url: SITE_URL,
    description:
      "Polska aplikacja ciążowa: kalendarz ciąży tydzień po tygodniu (1–41), badania I–III trymestru, szczepienia, świadczenia 800+ i becikowe, wyprawka i torba do szpitala.",
    applicationCategory: "HealthApplication",
    operatingSystem: "Android",
    inLanguage: "pl-PL",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "PLN",
    },
    installUrl: "https://play.google.com/store/apps/details?id=pl.kidelo.app",
    downloadUrl: "https://play.google.com/store/apps/details?id=pl.kidelo.app",
    image: appIconUrl,
    author: {
      "@type": "Organization",
      name: "Kidelo",
      url: "https://kidelo.pl",
    },
    publisher: {
      "@type": "Organization",
      name: "Kidelo",
      url: "https://kidelo.pl",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "pl-PL",
    publisher: {
      "@type": "Organization",
      name: "Kidelo",
      url: "https://kidelo.pl",
    },
  };
}
