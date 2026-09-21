import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pageSocialMeta } from "@/lib/seo";

const title = "Polityka prywatności";
const description =
  "Polityka prywatności serwisu Kidelo Ciąża (kidelo-ciaza.pl): jakie dane zbieramy, cookies, Google Analytics i Twoje prawa RODO.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/polityka-prywatnosci" },
  ...pageSocialMeta({ title, description, path: "/polityka-prywatnosci" }),
};

export default function PrivacyPage() {
  return (
    <div className="px-4 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Polityka prywatności" }]} />
        <h1 className="mt-5 font-display text-[1.85rem] text-[var(--color-forest)] sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-[var(--color-muted)]">Ostatnia aktualizacja: 21 września 2026</p>

        <div className="prose-kidelo mt-8 space-y-6 text-base leading-relaxed text-[var(--color-ink)]">
          <section>
            <h2 className="font-display text-xl text-[var(--color-forest)]">1. Administrator</h2>
            <p className="mt-2 text-[var(--color-muted)]">
              Administratorem danych związanych z serwisem internetowym Kidelo Ciąża (domena kidelo-ciaza.pl) oraz
              aplikacją mobilną Kidelo Ciąża jest Kidelo. Kontakt:{" "}
              <a href="mailto:biuro@kidelo.pl" className="font-semibold text-[var(--color-forest)] underline">
                biuro@kidelo.pl
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[var(--color-forest)]">2. Zakres danych</h2>
            <p className="mt-2 text-[var(--color-muted)]">
              Serwis internetowy ma charakter informacyjny i nie wymaga konta użytkownika. Możemy przetwarzać:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[var(--color-muted)]">
              <li>dane techniczne (adres IP, typ przeglądarki, system) — w logach serwera i narzędziach analitycznych,</li>
              <li>dane z cookies / lokalnego przechowywania (np. postęp checklisty wyprawki w przeglądarce),</li>
              <li>dane podane dobrowolnie w wiadomości e-mail na biuro@kidelo.pl.</li>
            </ul>
            <p className="mt-2 text-[var(--color-muted)]">
              Dane dotyczące ciąży wprowadzane w aplikacji mobilnej są przetwarzane zgodnie z polityką prywatności
              aplikacji Kidelo Ciąża w Google Play.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[var(--color-forest)]">3. Cele i podstawy</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[var(--color-muted)]">
              <li>udostępnianie treści informacyjnych o ciąży, świadczeniach i przygotowaniach do porodu,</li>
              <li>analiza ruchu na stronie (Google Analytics 4, jeśli włączone) — art. 6 ust. 1 lit. f RODO,</li>
              <li>odpowiadanie na wiadomości e-mail — art. 6 ust. 1 lit. b lub f RODO.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-[var(--color-forest)]">4. Cookies i analityka</h2>
            <p className="mt-2 text-[var(--color-muted)]">
              Strona może korzystać z Google Analytics 4 (Google Ireland / Google LLC). Pliki cookies analityczne
              służą do zrozumienia, jak użytkownicy korzystają z serwisu. Możesz ograniczyć cookies w ustawieniach
              przeglądarki. Checklisty (wyprawka, torba do szpitala) zapisują stan zaznaczenia lokalnie w Twojej
              przeglądarce (localStorage) — dane nie są wysyłane na nasze serwery.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[var(--color-forest)]">5. Odbiorcy danych</h2>
            <p className="mt-2 text-[var(--color-muted)]">
              Dostawcy hostingu i narzędzi analitycznych mogą przetwarzać dane jako podmioty przetwarzające.
              Nie sprzedajemy danych osobowych.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[var(--color-forest)]">6. Twoje prawa</h2>
            <p className="mt-2 text-[var(--color-muted)]">
              Masz prawo dostępu do danych, sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych
              oraz sprzeciwu. Skargi możesz złożyć do Prezesa UODO. Kontakt w sprawach RODO:{" "}
              <a href="mailto:biuro@kidelo.pl" className="font-semibold text-[var(--color-forest)] underline">
                biuro@kidelo.pl
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[var(--color-forest)]">7. Treści medyczne</h2>
            <p className="mt-2 text-[var(--color-muted)]">
              Materiały na stronie mają charakter informacyjny i nie zastępują konsultacji lekarskiej ani położnej.
              W razie objawów niepokojących skontaktuj się z lekarzem lub pogotowiem.
            </p>
          </section>

          <p className="text-sm text-[var(--color-muted)]">
            Wróć do{" "}
            <Link href="/" className="font-semibold text-[var(--color-forest)] underline">
              strony głównej
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
