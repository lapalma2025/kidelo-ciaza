// Skopiowane z aplikacji Kidelo Ciąża
// (kidelo-pregna/.../ListaScreen.tsx — badania_t1 / t2 / t3 + szczepienia).
// Aktualizuj ręcznie, jeśli lista w apce się zmieni.

export interface ExamItem {
  id: string;
  label: string;
}

export interface ExamTrimester {
  id: string;
  slug: string;
  roman: "I" | "II" | "III";
  title: string;
  note: string;
  weeksRange: string;
  seoTitle: string;
  seoDescription: string;
  items: ExamItem[];
  faqs: { q: string; a: string }[];
}

export interface VaccineRec {
  id: string;
  name: string;
  when: string;
  detail: string;
  freeNote: string;
}

export const EXAMS_UPDATED_AT = "2026-03-21";

export const TRIMESTER_EXAMS: ExamTrimester[] = [
  {
    id: "badania_t1",
    slug: "i-trymestr",
    roman: "I",
    title: "Badania I trymestru",
    note: "do 14. tygodnia ciąży",
    weeksRange: "do 14. t.c.",
    seoTitle: "Badania I trymestru ciąży — lista NFZ i PTGiP",
    seoDescription:
      "Kalendarz badań I trymestru ciąży: morfologia, grupa krwi, Rh, HIV, HBs, TSH, glukoza, USG 11–14 t.c. Checklista dla pierwszego dziecka i każdej ciąży.",
    items: [
      { id: "1", label: "Morfologia krwi z rozmazem" },
      { id: "2", label: "Grupa krwi i czynnik Rh" },
      { id: "3", label: "Badania serologiczne: kiła (VDRL), HIV, WZW C (anty-HCV)" },
      { id: "4", label: "Antygen HBs (WZW B) — do 10. t.c." },
      { id: "5", label: "Ferrytyna (zapasy żelaza) — do 10. t.c." },
      { id: "6", label: "TSH (tarczyca)" },
      { id: "7", label: "Ogólne badanie moczu + posiew" },
      { id: "8", label: "Glukoza na czczo" },
      { id: "9", label: "USG I trymestru (11–14 t.c.) + ocena ryzyka T21/T18/T13" },
      { id: "10", label: "Badanie cytologiczne szyjki macicy (jeśli nie wykonane w ostatnich 3 latach)" },
      { id: "11", label: "Toksoplazmoza IgG/IgM (jeśli wynik nieznany)" },
      { id: "12", label: "Przeciwciała odpornościowe do antygenów krwinek czerwonych (przesiewowe badanie przeciwciał)" },
      { id: "13", label: "Kontrola stomatologiczna" },
    ],
    faqs: [
      {
        q: "Jakie badania w I trymestrze ciąży są obowiązkowe?",
        a: "Na pierwszej wizycie (najpóźniej do 10. t.c.) zleca się m.in. morfologię, grupę krwi i Rh, serologię (VDRL, HIV, HCV), HBs, TSH, mocz, glukozę na czczo oraz — między 11. a 14. t.c. — USG I trymestru z oceną ryzyka wad genetycznych.",
      },
      {
        q: "Kiedy robi się USG I trymestru?",
        a: "USG pierwszego trymestru wykonuje się między 11. a 14. tygodniem ciąży. To kluczowy moment na ocenę budowy płodu i ryzyka T21/T18/T13.",
      },
    ],
  },
  {
    id: "badania_t2",
    slug: "ii-trymestr",
    roman: "II",
    title: "Badania II trymestru",
    note: "14–28. tydzień ciąży",
    weeksRange: "14–28. t.c.",
    seoTitle: "Badania II trymestru ciąży — USG połówkowe i OGTT",
    seoDescription:
      "Badania II trymestru ciąży: USG połówkowe 18–22 t.c., morfologia, mocz, OGTT 75 g (24–28 t.c.), toksoplazmoza, anty-D przy Rh(−). Pełna checklista.",
    items: [
      { id: "1", label: "USG połówkowe (18–22 t.c.) — pełna ocena anatomii płodu" },
      { id: "2", label: "Morfologia krwi" },
      { id: "3", label: "Ogólne badanie moczu" },
      { id: "4", label: "OGTT 75 g — doustny test obciążenia glukozą (24–28 t.c.)" },
      { id: "5", label: "Toksoplazmoza — kontrolna serologia (jeśli nieodporna)" },
      { id: "6", label: "Pomiar ciśnienia tętniczego (przy każdej wizycie)" },
      { id: "7", label: "Przeciwciała anty-D — kobiety z Rh(−) (26.–28. t.c.)" },
    ],
    faqs: [
      {
        q: "Kiedy jest USG połówkowe?",
        a: "USG połówkowe (anatomiczne) wykonuje się zwykle między 18. a 22. tygodniem ciąży. Lekarz ocenia budowę narządów płodu, łożysko i ilość płynu owodniowego.",
      },
      {
        q: "Kiedy robi się OGTT w ciąży?",
        a: "Doustny test obciążenia glukozą 75 g (OGTT) zaleca się między 24. a 28. tygodniem ciąży — to standardowe badanie w kierunku cukrzycy ciążowej.",
      },
    ],
  },
  {
    id: "badania_t3",
    slug: "iii-trymestr",
    roman: "III",
    title: "Badania III trymestru",
    note: "28–40. tydzień ciąży",
    weeksRange: "28–40. t.c.",
    seoTitle: "Badania III trymestru ciąży — GBS, KTG, USG",
    seoDescription:
      "Badania III trymestru: USG 28–32 t.c., posiew GBS 35–37 t.c., KTG, morfologia, HIV/HBs kontrolne, szczepienia Tdap i RSV. Checklista przed porodem.",
    items: [
      { id: "1", label: "USG III trymestru (28–32 t.c.) — ocena płodu, łożyska, płynu owodniowego" },
      { id: "2", label: "Morfologia krwi" },
      { id: "3", label: "Ogólne badanie moczu + posiew" },
      { id: "4", label: "Posiew GBS (wymazik z pochwy i odbytu) — 35–37. t.c." },
      { id: "5", label: "KTG (kardiotokografia) — od 36. t.c. lub wcześniej przy wskazaniach" },
      { id: "6", label: "Badanie koagulologiczne (PT, APTT) — przed planowanym porodem" },
      { id: "7", label: "Konsultacja anestezjologiczna (33–37 t.c.) — jeśli planujesz znieczulenie" },
      { id: "8", label: "Pomiar ciśnienia tętniczego (przy każdej wizycie)" },
      { id: "9", label: "Immunoglobulina anty-D — kobiety z Rh(−): profilaktyczna dawka 26.–28. t.c." },
      { id: "10", label: "HIV Ag/Ab — badanie kontrolne (33.–37. t.c.)" },
      { id: "11", label: "Antygen HBs (WZW B) — badanie kontrolne (33.–37. t.c.)" },
      { id: "12", label: "Kiła (VDRL) i HCV — ponownie, przy zwiększonym ryzyku zakażenia" },
      {
        id: "13",
        label:
          "Zalecane szczepienie na RSV między 24. a 36. t.c. (odstęp z innymi szczepieniami min. 2 tygodnie) – bezpłatne w POZ, wymagana recepta",
      },
      {
        id: "14",
        label:
          "Zalecane szczepienie Tdap (błonica, tężec, krztusiec) między 27. a 36. t.c. – bezpłatne w POZ, bez recepty",
      },
    ],
    faqs: [
      {
        q: "Kiedy robi się wymaz GBS w ciąży?",
        a: "Posiew w kierunku paciorkowca grupy B (GBS) pobiera się zwykle między 35. a 37. tygodniem ciąży — wymaz z pochwy i odbytu.",
      },
      {
        q: "Jakie badania przed porodem są najważniejsze?",
        a: "W III trymestrze kluczowe są USG 28–32 t.c., kontrolne morfologia i mocz, GBS 35–37 t.c., KTG od ok. 36. t.c. oraz — przy Rh(−) — immunoglobulina anty-D. Warto też omówić szczepienia Tdap i RSV.",
      },
    ],
  },
];

export const PREGNANCY_VACCINES: VaccineRec[] = [
  {
    id: "tdap",
    name: "Tdap (błonica, tężec, krztusiec)",
    when: "27.–36. tydzień ciąży",
    detail:
      "Chroni noworodka przed krztuścem w pierwszych miesiącach życia, zanim dziecko dostanie własne szczepienia. Jedna dawka w każdej ciąży.",
    freeNote: "Bezpłatne w POZ, bez recepty",
  },
  {
    id: "rsv",
    name: "RSV (syncytialny wirus oddechowy)",
    when: "24.–36. tydzień ciąży",
    detail:
      "Przeciwciała przechodzą przez łożysko i chronią niemowlę przed ciężkim przebiegiem RSV. Zachowaj min. 2 tygodnie odstępu od innych szczepień.",
    freeNote: "Bezpłatne w POZ, wymagana recepta",
  },
  {
    id: "grypa",
    name: "Grypa",
    when: "dowolny trymestr (sezon zachorowań)",
    detail:
      "Szczepionka inaktywowana jest bezpieczna w ciąży. Chroni mamę i zmniejsza ryzyko powikłań oddechowych u noworodka.",
    freeNote: "Bezpłatnie po skierowaniu od lekarza",
  },
];

export function getTrimesterBySlug(slug: string): ExamTrimester | undefined {
  return TRIMESTER_EXAMS.find((t) => t.slug === slug);
}

export function examPath(t: ExamTrimester): string {
  return `/badania/${t.slug}`;
}

export function trimesterToChecklist(t: ExamTrimester) {
  return {
    slug: `badania-${t.slug}`,
    title: t.title,
    pill: t.note,
    intro: `Lista badań ${t.roman} trymestru ciąży (${t.weeksRange}) — zgodna z checklistą w aplikacji Kidelo Ciąża. Odhacz wykonane badania; terminy zawsze potwierdź z lekarzem prowadzącym.`,
    sectionsTitle: t.title,
    sections: [{ title: t.title, items: t.items.map((i) => i.label) }],
  };
}
