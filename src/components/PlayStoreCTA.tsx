import QRCode from "qrcode";
import Link from "next/link";
import { GOOGLE_PLAY_URL } from "@/lib/site";
import PlayStoreLinkClient from "./PlayStoreLinkClient";

interface PlayStoreCTAProps {
  label?: string;
  source: string;
  withQr?: boolean;
  className?: string;
}

// Server Component — generuje QR kod po stronie serwera (bez zewnętrznego
// API typu Google Charts) i renderuje link do Google Play jako prawdziwy
// <a href>, obecny w HTML jeszcze zanim JS/GSAP się wykona.
export default async function PlayStoreCTA({
  label = "Pobierz w Google Play",
  source,
  withQr = false,
  className = "",
}: PlayStoreCTAProps) {
  const qrSvg = withQr
    ? await QRCode.toString(GOOGLE_PLAY_URL, { type: "svg", margin: 1, width: 120, color: { dark: "#154c3c" } })
    : null;

  return (
    <div className={`flex flex-wrap items-center gap-3 sm:gap-4 ${className}`}>
      <PlayStoreLinkClient source={source} label={label} />
      {qrSvg && (
        <div
          className="hidden md:block rounded-xl border border-[var(--color-line)] bg-white p-2"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: qrSvg }}
        />
      )}
    </div>
  );
}

export function PlayStoreTextLink({ source, children }: { source: string; children: React.ReactNode }) {
  return (
    <Link href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" data-cta-source={source}>
      {children}
    </Link>
  );
}
