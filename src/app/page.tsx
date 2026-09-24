import type { Metadata } from "next";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import PlayStoreCTA from "@/components/PlayStoreCTA";
import AnimatedSection from "@/components/AnimatedSection";
import ParallaxLayer from "@/components/ParallaxLayer";
import KineticHeadline from "@/components/KineticHeadline";
import TimelinePath from "@/components/TimelinePath";
import GalleryReveal from "@/components/GalleryReveal";
import SequentialReveal from "@/components/SequentialReveal";
import HeroVideo from "@/components/HeroVideo";
import NurseryScroll from "@/components/NurseryScroll";
import JsonLd from "@/components/JsonLd";
import { Baby, Wallet, Luggage, Pill, HeartPulse, ClipboardCheck, Syringe, type LucideIcon } from "lucide-react";
import { ALL_WEEK_NUMBERS, getWeek, weekPath, fruitEmoji } from "@/data/pregnancyWeeks";
import { ACTIVE_BENEFITS, benefitPath } from "@/data/benefits";
import { pageSocialMeta } from "@/lib/seo";
import heroScreenshot from "@/assets/01-screenshot.jpg";
import medsScreenshot from "@/assets/05-screenshot.jpg";
import kicksScreenshot from "@/assets/06-screenshot.jpg";
import postpartumScreenshot from "@/assets/07-screenshot.jpg";

const homeTitle = "Aplikacja ciążowa — kalendarz, badania, wyprawka";
const homeDescription =
  "Polska aplikacja ciążowa na pierwsze dziecko: ciąża tydzień po tygodniu, badania I–III trymestru, szczepienia Tdap/RSV, świadczenia 800+ i becikowe, wyprawka i torba do szpitala. Bezpłatnie w Google Play.";

export const metadata: Metadata = {
  title: { absolute: `Kidelo Ciąża — ${homeTitle}` },
  description: homeDescription,
  keywords: [
    "aplikacja ciążowa",
    "ciąża tydzień po tygodniu",
    "badania w ciąży",
    "kalendarz badań w ciąży",
    "wyprawka dla noworodka",
    "wyprawka pierwsze dziecko",
    "torba do szpitala lista",
    "szczepienia w ciąży",
    "becikowe",
    "800+",
  ],
  alternates: { canonical: "/" },
  ...pageSocialMeta({
    title: `Kidelo Ciąża — ${homeTitle}`,
    description: homeDescription,
    path: "/",
    image: heroScreenshot,
  }),
};

const appFaqs = [
  {
    q: "Czy Kidelo Ciąża jest darmowa?",
    a: "Tak — kalendarz ciąży tydzień po tygodniu, oś zadań, kalkulator świadczeń i checklisty (wyprawka, torba do szpitala) są dostępne bezpłatnie, i wiele więcej. Część funkcji, jak licznik kopnięć czy dziennik badań, odblokujesz w Premium.",
  },
  {
    q: "Skąd aplikacja wie, w którym tygodniu ciąży jestem?",
    a: "Wystarczy podać datę ostatniej miesiączki, termin porodu z USG lub datę zabiegu przy IVF — Kidelo samo przeliczy aktualny tydzień i dzień ciąży.",
  },
  {
    q: "Czy znajdę tam informacje o zasiłkach i formalnościach?",
    a: "Tak — sekcja Finanse opisuje wszystkie świadczenia dla rodziców w Polsce (becikowe, 800+, zasiłek macierzyński, kosiniakowe i inne) razem z kryteriami, dokumentami i terminami.",
  },
  {
    q: "Gdzie jest kalendarz badań w ciąży?",
    a: "W zakładce Badania znajdziesz checklisty I, II i III trymestru (USG, OGTT, GBS) oraz zalecane szczepienia Tdap i RSV — te same listy co w aplikacji Kidelo.",
  },
];

const healthFaqs = [
  {
    q: "Test ciążowy – kiedy zrobić?",
    a: "Najbardziej wiarygodny wynik uzyskasz zwykle po terminie spodziewanej miesiączki. Wcześniej pomocne może być badanie beta-hCG z krwi.",
  },
  {
    q: "Suplementy – jakie są najważniejsze w ciąży?",
    a: "Podstawą jest kwas foliowy – warto przyjmować kompleksowe suplementy dla ciężarnych. Lekarz może dodatkowo zalecić witaminę D, DHA, jod lub żelazo.",
  },
  {
    q: "Dieta – czego unikać w ciąży?",
    a: "Unikaj alkoholu, surowego mięsa, surowych ryb i owoców morza, surowych jaj oraz niepasteryzowanych produktów mlecznych. Przed spożyciem dokładnie myj owoce i warzywa, a mięso, ryby i jaja zawsze poddawaj odpowiedniej obróbce termicznej.",
  },
  {
    q: "Ćwiczenia w ciąży – co można?",
    a: "W większości ciąż umiarkowana aktywność fizyczna jest wskazana. Dobrym wyborem są spacery, basen lub joga dla ciężarnych. Nie przeciążaj się ponad siły, unikaj szczególnie dźwigania ciężkich przedmiotów.",
  },
  {
    q: "Mdłości – jak sobie radzić?",
    a: "Pomagają małe, częste posiłki, odpowiednie nawodnienie oraz unikanie produktów i zapachów, które nasilają dolegliwości. Mdłości najczęściej pojawiają się w pierwszym trymestrze i zwykle ustępują pod jego koniec.",
  },
  {
    q: "Zgaga – jak sobie radzić?",
    a: "Zgaga jest częstą dolegliwością, szczególnie w drugiej połowie ciąży. Pomocne mogą być mniejsze, częstsze posiłki, unikanie tłustych i ciężkostrawnych potraw oraz niewchodzenie do łóżka bezpośrednio po jedzeniu.",
  },
  {
    q: "Pierwsze ruchy dziecka – kiedy je poczuję?",
    a: "Najczęściej między 18. a 24. tygodniem ciąży. W kolejnej ciąży ruchy mogą być odczuwalne nieco wcześniej.",
  },
  {
    q: "Płeć dziecka – kiedy można ją poznać?",
    a: "W sprzyjających warunkach płeć dziecka można czasem rozpoznać już około 16. t.c., jednak nie zawsze jest to możliwe. Najczęściej i najpewniej potwierdzana jest podczas USG połówkowego wykonywanego między 18. a 22. t.c.",
  },
  {
    q: "Kiedy jechać do szpitala?",
    a: "Jeśli pojawią się takie sygnały jak: regularne skurcze (zasada 5-1-1, czyli skurcze co 5 minut, trwające co najmniej minutę, przez godzinę), odejście wód płodowych lub wystąpienie krwawienia. Wystarczy jeden z nich, żeby jechać do szpitala.",
  },
  {
    q: "Jak odróżnić skurcze porodowe od przepowiadających?",
    a: "Skurcze przepowiadające są zwykle nieregularne i często ustępują po odpoczynku. Z kolei skurcze porodowe stają się regularne, coraz częstsze, dłuższe i silniejsze oraz nie ustępują mimo odpoczynku czy zmiany pozycji.",
  },
];

const faqs = [...appFaqs, ...healthFaqs];

const journey = [
  { title: "Pierwsze „będziemy”", desc: "Pierwsze tygodnie, pierwsze pytania — wiesz, co dalej." },
  { title: "Coraz bliżej spotkania", desc: "Badania, formalności i wyprawka — nic Ci nie umknie." },
  { title: "Już jesteście razem", desc: "Pierwsze dni z dzieckiem, bez chaosu w dokumentach." },
];

export default function HomePage() {
  const showcaseWeeks = [8, 16, 24, 32, 40].map((n) => getWeek(n)).filter(Boolean);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="overflow-x-clip">
      <JsonLd data={faqJsonLd} />

      {/* Hero — pełnoekranowe wideo + wyśrodkowany blok tekstu i CTA */}
      <section className="hero relative flex h-[100svh] min-h-[520px] w-full items-center overflow-hidden">
        <HeroVideo />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[var(--color-forest-dark)]/40 via-[var(--color-forest-dark)]/50 to-[var(--color-forest-dark)]/85"
        />

        <AnimatedSection className="relative z-[1] flex w-full flex-col items-center justify-center px-4 pb-8 pt-16 text-center sm:px-6 sm:pb-12 sm:pt-8">
          <KineticHeadline className="font-display max-w-4xl text-[2.35rem] leading-[1.08] text-white sm:text-6xl lg:text-7xl">
            Wielkie zmiany.
            <br />
            Małe kroki.
            <br />
            Razem spokojniej.
          </KineticHeadline>
          <p className="reveal-item mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:mt-6 sm:max-w-2xl sm:text-xl">
            Kalendarz ciąży tydzień po tygodniu, badania I–III trymestru, świadczenia, wyprawka i torba do szpitala —
            wszystko po polsku, w jednej bezpłatnej aplikacji.
          </p>
          <div className="reveal-item mt-7 flex w-full max-w-sm justify-center sm:mt-9 sm:max-w-none">
            <PlayStoreCTA source="home-hero" withQr label="Pobierz Kidelo Ciąża" className="w-full justify-center sm:w-auto" />
          </div>
        </AnimatedSection>
      </section>

      {/* Motywy nursery — tylko desktop, żeby nie nachodziły na treść na telefonie */}
      <div className="relative mx-auto hidden max-w-6xl lg:block" aria-hidden="true">
        <NurseryScroll
          motif="sleepsuit"
          className="absolute -top-8 left-8 z-10 h-36 w-28 opacity-80"
          travel={100}
          spin={12}
        />
        <NurseryScroll
          motif="rattle"
          className="absolute -top-4 right-4 z-10 h-32 w-20 opacity-70"
          travel={70}
          spin={-14}
        />
      </div>

      <section className="bg-mist-panel relative px-4 py-12 sm:px-6 sm:py-20">
        <AnimatedSection className="mx-auto grid max-w-6xl items-center gap-8 sm:gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="reveal-item order-2 lg:order-1">
            <p className="font-mono-label text-xs text-[var(--color-peach-dark)]">W aplikacji</p>
            <h2 className="mt-2 font-display text-[1.75rem] leading-tight text-[var(--color-forest)] sm:text-4xl lg:text-5xl">
              Twój dzień w ciąży
            </h2>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-[var(--color-muted)] sm:mt-4 sm:text-lg">
              Kalendarz ciąży, oś zadań, leki i suplementy, badania, świadczenia, wyprawka i torba do szpitala — a także
              licznik kopnięć i wsparcie po porodzie. Wszystko dopasowane do Twojego tygodnia, w jednej aplikacji.
            </p>
          </div>
          <div className="reveal-item order-1 mx-auto w-full max-w-[240px] sm:max-w-xs lg:order-2 lg:max-w-sm lg:-rotate-2">
            <ParallaxLayer distance={-35}>
              <Image
                src={heroScreenshot}
                alt="Ekrany aplikacji Kidelo Ciąża — panel główny z asystentem leków oraz oś zadań ciążowych"
                className="rounded-[24px] shadow-[0_35px_70px_-25px_rgba(21,76,60,0.45)] sm:rounded-[28px]"
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 384px, 70vw"
              />
            </ParallaxLayer>
          </div>
        </AnimatedSection>
      </section>

      <section id="mozliwosci" className="relative px-4 py-12 sm:px-6 sm:py-16">
        <NurseryScroll
          motif="bottle"
          className="absolute right-[4%] top-6 z-10 hidden h-36 w-20 opacity-60 lg:block"
          travel={90}
          spin={6}
        />
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="font-mono-label text-xs text-[var(--color-peach-dark)]">01 · Możliwości</p>
            <h2 className="mt-2 font-display text-[1.75rem] text-[var(--color-forest)] sm:text-4xl">Od czego zacząć</h2>
          </div>
          <SequentialReveal className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            <SimpleFeature
              href="/ciaza-tydzien-po-tygodniu"
              icon={Baby}
              title="Ciąża tydzień po tygodniu"
              desc="Rozwój dziecka i wskazówki na wszystkie 41 tygodni."
            />
            <SimpleFeature
              href="/badania"
              icon={Syringe}
              title="Badania i szczepienia"
              desc="Kalendarz I–III trymestru: USG, OGTT, GBS, Tdap, RSV."
            />
            <SimpleFeature
              href="/finanse"
              icon={Wallet}
              title="Finanse i formalności"
              desc="Becikowe, 800+, macierzyński — w jednym miejscu."
            />
            <SimpleFeature
              href="/wyprawka"
              icon={Luggage}
              title="Wyprawka i torba do szpitala"
              desc="Interaktywne checklisty na start i do szpitala."
            />
          </SequentialReveal>
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            Listy:{" "}
            <Link href="/badania" className="font-semibold text-[var(--color-forest)] underline">
              badania w ciąży
            </Link>
            {" · "}
            <Link href="/wyprawka" className="font-semibold text-[var(--color-forest)] underline">
              wyprawka
            </Link>
            {" · "}
            <Link href="/torba-do-szpitala" className="font-semibold text-[var(--color-forest)] underline">
              torba do szpitala
            </Link>
          </p>
        </div>
      </section>

      <section className="relative px-4 py-12 sm:px-6 sm:py-16">
        <AnimatedSection className="mx-auto max-w-6xl">
          <div className="reveal-item flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4">
            <div>
              <p className="font-mono-label text-xs text-[var(--color-peach-dark)]">02 · Kalendarz ciąży</p>
              <h2 className="mt-2 font-display text-[1.75rem] text-[var(--color-forest)] sm:text-4xl">
                Jak rośnie Twoje dziecko
              </h2>
            </div>
            <Link
              href="/ciaza-tydzien-po-tygodniu"
              className="reveal-item text-sm font-semibold text-[var(--color-forest)] underline decoration-[var(--color-peach)] decoration-2 underline-offset-4 sm:text-base"
            >
              Zobacz wszystkie 41 tygodni →
            </Link>
          </div>
          <GalleryReveal className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-5 sm:gap-4">
            {showcaseWeeks.map((w) => (
              <Link
                key={w!.tydzien}
                href={weekPath(w!.tydzien)}
                className="gallery-item week-tile"
              >
                <span className="week-tile__num">Tydzień {w!.tydzien}</span>
                <span className="week-tile__emoji" aria-hidden="true">
                  {fruitEmoji(w!.rozmiar_dziecka.porownanie, w!.tydzien)}
                </span>
                <span className="week-tile__label">{w!.rozmiar_dziecka.porownanie}</span>
              </Link>
            ))}
          </GalleryReveal>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {ALL_WEEK_NUMBERS.map((n) => (
              <Link
                key={n}
                href={weekPath(n)}
                className="font-mono-label flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-line)] bg-white text-[11px] normal-case tracking-normal text-[var(--color-forest)] transition-colors hover:border-[var(--color-forest)] hover:bg-[var(--color-sage)]/50 sm:h-9 sm:w-9"
              >
                {n}
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="relative px-4 py-6 sm:px-6 sm:py-8">
        <div className="relative mx-auto flex max-w-6xl items-center justify-center py-2 sm:py-6">
          <NurseryScroll motif="cradle" className="relative z-10 h-36 w-44 sm:h-56 sm:w-72" travel={40} spin={4} />
          <NurseryScroll
            motif="mobile"
            className="absolute right-[8%] top-0 z-10 hidden h-40 w-44 opacity-80 lg:block"
            travel={110}
            spin={-6}
          />
        </div>
      </section>

      <section id="historia" className="relative overflow-x-clip bg-[var(--color-forest)] px-4 py-12 text-[var(--color-cream)] sm:px-6 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/3 rounded-full bg-[var(--color-peach)]/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 rounded-full bg-white/10 blur-3xl"
        />
        <AnimatedSection className="relative mx-auto max-w-6xl">
          <p className="font-mono-label reveal-item text-xs text-[var(--color-peach)]">03 · Droga razem</p>
          <h2 className="reveal-item mt-2 font-display text-[1.75rem] sm:text-4xl">Od testu do pierwszych dni razem</h2>
          <div className="relative mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
            <TimelinePath />
            {journey.map((step, i) => (
              <div
                key={step.title}
                className="card-lift reveal-item relative rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/12"
              >
                <span className="font-mono-label text-[var(--color-peach)]">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-display text-xl">{step.title}</p>
                <p className="mt-2 text-sm text-[var(--color-cream)]/80">{step.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <AnimatedSection className="mx-auto max-w-6xl">
          <div className="reveal-item max-w-2xl">
            <p className="font-mono-label text-xs text-[var(--color-peach-dark)]">04 · Więcej niż kalendarz</p>
            <h2 className="mt-2 font-display text-[1.75rem] text-[var(--color-forest)] sm:text-4xl">
              Leki, kopnięcia i życie po porodzie
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
            <MiniFeature
              image={medsScreenshot}
              imageAlt="Ekran aplikacji Kidelo Ciąża z listą badań i formularzem dodawania leku"
              title="Leki i badania"
              desc="Przypomnienia o lekach i suplementach oraz listy badań kontrolnych dla każdego trymestru."
              icon={Pill}
            />
            <MiniFeature
              image={kicksScreenshot}
              imageAlt="Ekran aplikacji Kidelo Ciąża z licznikiem kopnięć i timerem skurczów"
              title="Licznik kopnięć i timer skurczów"
              desc="Monitoruj ruchy dziecka i mierz odstępy między skurczami — z podpowiedzią, kiedy jechać do szpitala."
              icon={HeartPulse}
            />
            <MiniFeature
              image={postpartumScreenshot}
              imageAlt="Ekran aplikacji Kidelo Ciąża z kalendarzem karmień i szczepień"
              title="Asystent młodego rodzica"
              desc="Karmienia, szczepienia wg kalendarza GIS i formalności po porodzie — wsparcie nie kończy się na porodzie."
              icon={ClipboardCheck}
            />
          </div>
        </AnimatedSection>
      </section>

      <section className="relative px-4 py-12 sm:px-6 sm:py-16">
        <NurseryScroll
          motif="sleepsuit"
          className="absolute bottom-8 left-[2%] z-10 hidden h-32 w-24 opacity-50 xl:block"
          travel={60}
          spin={-8}
        />
        <AnimatedSection className="mx-auto max-w-6xl">
          <div className="reveal-item max-w-2xl">
            <p className="font-mono-label text-xs text-[var(--color-peach-dark)]">05 · Finanse</p>
            <h2 className="mt-2 font-display text-[1.75rem] text-[var(--color-forest)] sm:text-4xl">
              Świadczenia bez zgadywania
            </h2>
            <p className="mt-3 text-base text-[var(--color-muted)] sm:text-[1rem]">
              Zweryfikowane wg ZUS i gov.pl: kwoty, kryteria dochodowe, wymagane dokumenty i terminy składania
              wniosków.
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIVE_BENEFITS.slice(0, 6).map((b) => (
              <Link
                key={b.id}
                href={benefitPath(b)}
                className="card-lift reveal-item flex items-center justify-between rounded-2xl border border-[var(--color-line)] bg-white p-4 hover:border-[var(--color-forest)]/40"
              >
                <div className="min-w-0">
                  <p className="font-display font-semibold text-[var(--color-forest)]">{b.name}</p>
                  <p className="text-sm text-[var(--color-muted)]">{b.amount_display}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/finanse"
            className="reveal-item mt-6 inline-block text-sm font-semibold text-[var(--color-forest)] underline decoration-[var(--color-peach)] decoration-2 underline-offset-4 sm:text-base"
          >
            Zobacz wszystkie świadczenia →
          </Link>
        </AnimatedSection>
      </section>

      <section id="pytania" className="scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16">
        <AnimatedSection className="mx-auto max-w-3xl">
          <p className="font-mono-label reveal-item text-xs text-[var(--color-peach-dark)]">06 · Pytania</p>
          <h2 className="reveal-item mt-2 font-display text-[1.75rem] text-[var(--color-forest)] sm:text-4xl">
            Najczęstsze pytania
          </h2>

          <p className="font-mono-label reveal-item mt-8 text-xs text-[var(--color-muted)]">O aplikacji</p>
          <div className="mt-3 space-y-3">
            {appFaqs.map((f) => (
              <details
                key={f.q}
                className="reveal-item group rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5"
              >
                <summary className="cursor-pointer font-display text-[0.95rem] font-semibold text-[var(--color-forest)] sm:text-base">
                  {f.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{f.a}</p>
              </details>
            ))}
          </div>

          <p className="font-mono-label reveal-item mt-10 text-xs text-[var(--color-muted)]">O ciąży i zdrowiu</p>
          <div className="mt-3 space-y-3">
            {healthFaqs.map((f) => (
              <details
                key={f.q}
                className="reveal-item group rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5"
              >
                <summary className="cursor-pointer font-display text-[0.95rem] font-semibold text-[var(--color-forest)] sm:text-base">
                  {f.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{f.a}</p>
              </details>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section id="pobierz" className="bg-mist-panel relative px-4 py-14 text-center sm:px-6 sm:py-24">
        <NurseryScroll
          motif="mobile"
          className="absolute left-[6%] top-8 z-10 hidden h-36 w-40 opacity-60 lg:block"
          travel={50}
          spin={8}
        />
        <NurseryScroll
          motif="cradle"
          className="absolute right-[5%] bottom-6 z-10 hidden h-36 w-44 opacity-55 lg:block"
          travel={40}
          spin={-4}
        />
        <AnimatedSection className="relative mx-auto max-w-2xl">
          <h2 className="reveal-item font-display text-[1.75rem] text-[var(--color-forest)] sm:text-4xl">
            Pobierz i miej spokój pod ręką
          </h2>
          <div className="reveal-item mt-7 flex justify-center sm:mt-8">
            <PlayStoreCTA source="home-download-section" withQr label="Pobierz Kidelo Ciąża" className="justify-center" />
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

function MiniFeature({
  image,
  imageAlt,
  title,
  desc,
  icon: Icon,
}: {
  image: StaticImageData;
  imageAlt: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}) {
  return (
    <div className="card-lift reveal-item overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white">
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-[var(--color-sage)]/25">
        <Image src={image} alt={imageAlt} fill className="object-contain object-center" sizes="(min-width: 640px) 33vw, 100vw" />
      </div>
      <div className="p-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-sage)]/70 text-[var(--color-forest)]">
          <Icon size={18} strokeWidth={2} />
        </div>
        <p className="mt-3 font-display text-lg font-semibold text-[var(--color-forest)]">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{desc}</p>
      </div>
    </div>
  );
}

function SimpleFeature({
  href,
  title,
  desc,
  icon: Icon,
}: {
  href: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="card-lift sequential-item block rounded-2xl border border-[var(--color-line)] bg-white p-6"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-sage)]/70 text-[var(--color-forest)]">
        <Icon size={20} strokeWidth={2} />
      </div>
      <p className="mt-4 font-display text-lg font-semibold text-[var(--color-forest)]">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{desc}</p>
    </Link>
  );
}
