import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCta from "@/components/StickyMobileCta";
import AmbientField from "@/components/AmbientField";
import CursorGlow from "@/components/CursorGlow";
import ScrollToTop from "@/components/ScrollToTop";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, GA4_MEASUREMENT_ID, absoluteUrl } from "@/lib/site";
import { mobileAppJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import ogScreenshot from "@/assets/01-screenshot.jpg";
import appIcon from "@/assets/00-ikona.png";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin-ext"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin-ext"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — kalendarz ciąży, świadczenia i wyprawka`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Polska aplikacja ciążowa: kalendarz ciąży tydzień po tygodniu (1–41), badania I–III trymestru i szczepienia, świadczenia 800+ i becikowe, wyprawka i torba do szpitala. Bezpłatnie w Google Play.",
  keywords: [
    "aplikacja ciążowa",
    "kalendarz ciąży",
    "ciąża tydzień po tygodniu",
    "badania w ciąży",
    "kalendarz badań w ciąży",
    "szczepienia w ciąży",
    "wyprawka dla noworodka",
    "wyprawka pierwsze dziecko",
    "torba do szpitala",
    "becikowe",
    "800+",
    "Kidelo Ciąża",
  ],
  authors: [{ name: "Kidelo", url: "https://kidelo.pl" }],
  creator: "Kidelo",
  publisher: "Kidelo",
  alternates: {
    canonical: "/",
    languages: { "pl-PL": SITE_URL },
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — kalendarz ciąży, świadczenia i wyprawka`,
    description:
      "Polska aplikacja ciążowa: kalendarz ciąży tydzień po tygodniu, świadczenia dla rodziców, wyprawka i torba do szpitala.",
    url: SITE_URL,
    images: [
      {
        url: ogScreenshot.src,
        width: ogScreenshot.width,
        height: ogScreenshot.height,
        alt: "Kidelo Ciąża — podgląd aplikacji",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — kalendarz ciąży i świadczenia`,
    description:
      "Kalendarz ciąży 1–41, 800+, becikowe, wyprawka i torba do szpitala — bezpłatna polska aplikacja.",
    images: [ogScreenshot.src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  category: "health",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const iconUrl = absoluteUrl(appIcon.src);

  return (
    <html lang="pl" className={`${bricolage.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <JsonLd data={organizationJsonLd(iconUrl)} />
        <JsonLd data={mobileAppJsonLd(iconUrl)} />
        <JsonLd data={websiteJsonLd()} />
        {GA4_MEASUREMENT_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--color-forest)] focus:px-4 focus:py-2 focus:text-white"
        >
          Przejdź do treści
        </a>
        <AmbientField />
        <CursorGlow />
        <ScrollToTop />
        <Header />
        <main id="main" className="mobile-page-pad overflow-x-clip">
          {children}
        </main>
        <Footer />
        <StickyMobileCta />
      </body>
    </html>
  );
}
