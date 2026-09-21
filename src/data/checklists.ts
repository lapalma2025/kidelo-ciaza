// Skopiowane 1:1 z aplikacji mobilnej Kidelo Ciąża
// (kidelo-app/app/task/[id].tsx, TASK_CONTENT_PL.torba / .wyprawka),
// żeby treść na stronie zgadzała się z tym, co user widzi w apce.
// Aktualizuj ręcznie, jeśli lista w apce się zmieni.

export interface ChecklistSection {
  title: string;
  items: string[];
}

export interface ChecklistData {
  slug: string;
  title: string;
  pill: string;
  intro: string;
  sectionsTitle: string;
  sections: ChecklistSection[];
  tip?: string;
}

export const hospitalBagChecklist: ChecklistData = {
  slug: "torba-do-szpitala",
  title: "Torba do szpitala",
  pill: "gotowa przed 35. tygodniem",
  intro:
    "Najlepiej spakować torbę przed 35. tygodniem ciąży – powinna stać w przedpokoju lub bagażniku, gotowa nawet na wczesny poród. Każdy szpital może mieć też własną listę, sprawdź stronę wybranej placówki.\n\nRada: wszystkie tekstylia należy wyprać przed i po szpitalu w temp. min. 60°C.",
  sectionsTitle: "Torba do szpitala",
  sections: [
    {
      title: "Dokumenty",
      items: [
        "Dowód osobisty",
        "Karta ciąży",
        "Skierowanie do szpitala",
        "Grupa krwi i czynnik RH",
        "Badania prenatalne",
        "Wymaz GBS",
        "Wydruk badań w ciąży (glukoza, HCV, HIV, HBs, TOXO, TSH, OGTT, morfologia, mocz)",
      ],
    },
    {
      title: "Dla mamy",
      items: [
        "Koszule do porodu (rozpinane, 2 szt.)",
        "Ubrania po porodzie (koszule rozpinane, ciepłe skarpety, bluza)",
        "Ubrania na wyjście ze szpitala",
        "Podkłady 90x100cm (10 szt.)",
        "Podkłady poporodowe (min. 30 szt.)",
        "Majtki poporodowe siateczkowe (5-7 szt.)",
        "Butelka do podmywania",
        "Ręczniki papierowe",
        "Chusteczki higieniczne",
        "Ręczniki kąpielowe",
        "Klapki",
        "Krem do brodawek",
        "Kompresy chłodzące",
        "Wkładki laktacyjne",
        "Nakładki osłonki na brodawki (opcjonalnie)",
        "Nakładki na deskę WC (opcjonalnie)",
        "Pianka do higieny intymnej (opcjonalnie)",
        "Przekąski i posiłek regeneracyjny po porodzie",
        "Lizaki (podczas porodu usta wysychają i często pojawia się metaliczny posmak po lekach)",
        "Butelka wody z dzióbkiem – łatwiejsza do picia podczas skurczów",
        "Własne naczynia",
        "Ładowarka do telefonu",
        "Gumka do włosów",
        "Szlafrok",
        "Kosmetyczka (w tym szczoteczka do zębów i balsam do ust)",
        "Worki na zabrudzone rzeczy",
        "Mała lampka nocna (najlepiej bezprzewodowa, do karmienia na sali)",
      ],
    },
    {
      title: "Dla dziecka",
      items: [
        "Ubranka na start (body 3-4 szt., pajacyki 3-4 szt., czapeczka, skarpetki)",
        "Płatki kosmetyczne lub chusteczki nawilżane",
        "Pampersy, rozmiar 0 lub 1 na start (20-30 szt.)",
        "Pieluchy tetrowe/muślinowe",
        "Fotelik samochodowy tyłem do kierunku jazdy lub atestowana gondola samochodowa – zamontowane w aucie przed porodem. Zwykła gondola od wózka w aucie nie jest dopuszczona prawnie",
        "Kocyk / śpiworek / rożek",
        "Krem na odparzenia",
      ],
    },
    {
      title: "Dla partnera",
      items: [
        "Koszulka na zmianę i bluza",
        "Szczoteczka do zębów",
        "Ładowarka / powerbank",
        "Woda i przekąski",
        "Drobne pieniądze i karta płatnicza",
      ],
    },
  ],
  tip: "Kiedy torba jest spakowana, zapamiętaj gdzie co leży — podczas porodu partnerka może prosić o konkretne rzeczy, np. gumkę lub wodę.",
};

export const babyEssentialsChecklist: ChecklistData = {
  slug: "wyprawka",
  title: "Wyprawka dla dziecka",
  pill: "lista na start",
  intro:
    "To nasza propozycja — nie musisz kupować wszystkiego od razu, dopasuj listę do swoich potrzeb i stylu życia. Część rzeczy spokojnie poczeka do przyjścia dziecka na świat.\n\n🏥 — ta rzecz przyda się też w szpitalu, znajdziesz ją też na liście torby do szpitala.",
  sectionsTitle: "Co warto mieć w domu",
  sections: [
    {
      title: "Pokój i sen",
      items: [
        "Łóżeczko (standardowe i/lub dostawne niemowlęce)",
        "Materac do łóżeczka",
        "Ochraniacz na materac",
        "Niania elektroniczna (opcjonalnie)",
        "Mata do przewijania / przewijak",
        "Podkłady jednorazowe pod prześcieradło oraz na przewijak",
        "Kołyska (opcjonalnie)",
        "Ochraniacz na szczebelki, przepuszczający powietrze (opcjonalnie)",
        "Monitor oddechu (opcjonalnie)",
        "Karuzela do łóżeczka (opcjonalnie)",
        "Szumiś (opcjonalnie)",
      ],
    },
    {
      title: "Transport i spacery",
      items: [
        "Fotelik samochodowy tyłem do kierunku jazdy 🏥",
        "Ochraniacz na fotel samochodowy",
        "Lusterko na zagłówek",
        "Wózek – gondola i spacerowy",
        "Folia przeciwdeszczowa do wózka",
        "Moskitiera do wózka",
        "Torba do wózka",
        "Śpiworek zimowy do wózka, zależnie od pory roku",
        'Poduszka antywstrząsowa do wózka „motylek" (opcjonalnie)',
        "Łóżeczko turystyczne (można kupić po narodzinach)",
        "Silikon do konserwacji wózka (opcjonalnie)",
      ],
    },
    {
      title: "Kąpiel i pielęgnacja",
      items: [
        "Wanienka",
        "Wkładka niemowlęca do wanienki (opcjonalnie)",
        "Stojak do wanienki (opcjonalnie)",
        "Ręcznik z kapturkiem",
        "Balsam do kąpieli",
        "Oliwka lub krem do pielęgnacji niemowlaka",
        "Termometr do wody (opcjonalnie)",
        "Miękka gąbka do mycia",
        "Miękka szczotka do włosów",
        "Pampersy na pierwszy tydzień, rozmiar 0 i/lub 1 (ok. 8-12 dziennie przez pierwszy okres) 🏥",
        "Płatki kosmetyczne lub mokre chusteczki 🏥",
        "Krem przeciw odparzeniom 🏥",
        "Obcinacz do paznokci",
        "Pasta do zębów dla niemowlaka (można kupić po narodzinach)",
      ],
    },
    {
      title: "Tekstylia i ubranka",
      items: [
        "Ubranka na pierwsze tygodnie życia 🏥",
        "Pieluchy tetrowe, bambusowe, muślinowe 🏥",
        "Rożek / otulacz muślinowy 🏥",
        "Prześcieradła do łóżeczka",
        "Prześcieradło do gondoli",
        "Kocyki 🏥",
        "Śpiworki do spania 🏥",
        "Śliniaczki (można kupić po narodzinach)",
      ],
    },
    {
      title: "Karmienie",
      items: [
        "Wygodny fotel z oparciami do karmienia (np. bujany)",
        "Poduszka do karmienia na kolana (opcjonalnie)",
        "Wkładki laktacyjne 🏥",
        "Nakładki osłonki na brodawki (opcjonalnie) 🏥",
        "Nakładki kolektory pokarmu (opcjonalnie)",
        "Krem do brodawek 🏥",
        "Biustonosz do karmienia (opcjonalnie)",
        "Herbatki laktacyjne (opcjonalnie, można kupić po narodzinach)",
        "Butelki antykolkowe (można kupić po narodzinach)",
        "Szczotka do mycia butelek (można kupić po narodzinach)",
        "Laktator (można kupić po narodzinach)",
        "Woreczki do przechowywania mleka (można kupić po narodzinach)",
        "Podgrzewacz do butelek (opcjonalnie, można kupić po narodzinach)",
      ],
    },
    {
      title: "Noszenie i rozwój",
      items: [
        "Chusta do noszenia lub nosidełko",
        "Duża mata edukacyjna, np. piankowa",
        "Mała mata edukacyjna dla niemowlaka z wiszącymi zabawkami (opcjonalnie)",
        "Leżaczek-bujaczek (opcjonalnie)",
      ],
    },
    {
      title: "Dla mamy",
      items: [
        "Koszule do porodu (rozpinane, 2 szt.) 🏥",
        "Podkłady 90x100cm (min. 20 szt.) 🏥",
        "Podkłady poporodowe (min. 30 szt.) 🏥",
        "Butelka do podmywania 🏥",
        "Majtki poporodowe siateczkowe (5-7 szt.) 🏥",
      ],
    },
    {
      title: "Akcesoria dodatkowe",
      items: [
        "Inhalator (można kupić po narodzinach)",
        "Aspirator do nosa (można kupić po narodzinach)",
        "Smoczek (opcjonalnie, można kupić po narodzinach)",
        "Pojemnik na smoczek (opcjonalnie)",
        "Zawieszka do smoczka (opcjonalnie)",
        "Gryzak (można kupić po narodzinach)",
        "Szczelnie zamykany kosz na pieluchy (opcjonalnie)",
        "Krzesełko do karmienia z tacką (można kupić po narodzinach)",
        "Talerzyk, miseczka, sztućce dziecięce (wszystko można kupić po narodzinach)",
      ],
    },
  ],
};

export const checklists: ChecklistData[] = [hospitalBagChecklist, babyEssentialsChecklist];

export function getChecklist(slug: string): ChecklistData | undefined {
  return checklists.find((c) => c.slug === slug);
}
