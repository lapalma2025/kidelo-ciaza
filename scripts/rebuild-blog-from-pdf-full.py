# -*- coding: utf-8 -*-
"""Full rebuild from Kidelo SEO PDF — keep complete article prose."""
from __future__ import annotations

import json
import os
import re
from pathlib import Path

from pypdf import PdfReader

downloads = Path(os.path.expanduser("~/Downloads"))
target = None
for f in downloads.glob("*.pdf"):
    low = f.name.lower()
    if "kidelo" in low or "seo" in low:
        r = PdfReader(str(f))
        if len(r.pages) >= 20:
            target = f
            break
if not target:
    raise SystemExit("PDF not found")

print("PDF:", target.name, "pages", len(PdfReader(str(target)).pages))
r = PdfReader(str(target))
raw = "\n\n".join((p.extract_text() or "") for p in r.pages).replace("\u00a0", " ")
raw = re.sub(r"(?m)^Kidelo [—\-–] 6 artyku[^\n]*$", "", raw)
raw = re.sub(r"(?m)^Page \d+ of \d+$", "", raw)
# Also strip inline footers that pypdf glues into paragraphs
raw = re.sub(r"\nKidelo [—\-–] 6 artyku[^\n]*\n", "\n", raw)
raw = re.sub(r"\nPage \d+ of \d+\n", "\n", raw)

parts = re.split(r"\nArtyku\w*\s*(\d+)\.\s*", raw)
chunks: dict[int, str] = {}
i = 1
while i < len(parts):
    chunks[int(parts[i])] = parts[i + 1].strip()
    i += 2
print("chunk sizes:", {k: len(v) for k, v in sorted(chunks.items())})

# Where real prose starts (after SEO briefing block)
LEADS = {
    1: "Dwa testy pokaza",
    2: "Torbę do szpitala pakuje",
    3: "Przy pierwszym dziecku",
    4: "Zakres badań",
    5: "Po urodzeniu dziecka polska rodzina",
    6: "Pierwszy poród ma jedną wspólną cechę",
}

# Auto-detect leads 3-6 if needed by scanning after Meta description
for n in range(1, 7):
    b = chunks[n]
    lead = LEADS.get(n)
    if lead and lead[:18] in b:
        continue
    # find Meta description end
    m = re.search(r"Meta description:.*?(?:\n(?![A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż]*:).{60,})", b, re.S)
    # simpler: last occurrence of 'wiążący.' / 'szpital.' then next paragraph
    for needle in (
        "który jest wiążący.",
        "o co zapytać szpital.",
        "rozłożyć zakupy w czasie.",
        "GBS i szczepienia.",
        "danych z Kidelo.",
        "jechać natychmiast.",
        "wiążący.",
        "szpital.",
    ):
        idx = b.find(needle)
        if idx >= 0:
            rest = b[idx + len(needle) :].lstrip("\n ")
            # take first substantial line
            for line in rest.splitlines():
                s = line.strip()
                if len(s) >= 40:
                    LEADS[n] = s[:50]
                    print(f"auto lead {n}: {s[:70]!r}")
                    break
            break

META = {
    1: {
        "slug": "kalkulator-ciazy",
        "title": "Kalkulator ciąży — który to tydzień i kiedy termin porodu",
        "seoTitle": "Kalkulator ciąży — który to tydzień i termin porodu",
        "description": "Policz tydzień ciąży i termin porodu z ostatniej miesiączki, USG lub transferu zarodka. Wyjaśniamy, dlaczego wyniki się różnią i który jest wiążący.",
        "keyword": "kalkulator ciąży",
    },
    2: {
        "slug": "torba-do-szpitala-lista",
        "title": "Torba do szpitala — kompletna lista dla mamy, dziecka i partnera",
        "seoTitle": "Torba do szpitala — lista dla mamy, dziecka i partnera",
        "description": "Kompletna lista rzeczy do szpitala na poród i połóg: dokumenty, torba mamy, dziecka i partnera. Kiedy spakować i o co zapytać szpital.",
        "keyword": "torba do szpitala lista",
    },
    3: {
        "slug": "wyprawka-dla-noworodka",
        "title": "Wyprawka dla noworodka — co naprawdę kupić przy pierwszym dziecku",
        "seoTitle": "Wyprawka dla noworodka — lista przy pierwszym dziecku",
        "description": "Co kupić dla noworodka: sen, kąpiel, ubranka, karmienie, transport. Ile czego potrzeba i jak rozłożyć zakupy w czasie.",
        "keyword": "wyprawka dla noworodka",
    },
    4: {
        "slug": "badania-w-ciazy",
        "title": "Badania w ciąży — kalendarz I, II i III trymestru",
        "seoTitle": "Badania w ciąży — kalendarz I, II i III trymestru",
        "description": "Kalendarz badań w ciąży: morfologia, USG, OGTT, GBS i szczepienia. Harmonogram zgodny z polskim standardem opieki okołoporodowej.",
        "keyword": "badania w ciąży",
    },
    5: {
        "slug": "becikowe-i-800-plus",
        "title": "Becikowe i 800+ — ile dostaniesz i jakie dokumenty",
        "seoTitle": "Becikowe i 800+ 2026 — kwoty, progi, wnioski i terminy",
        "description": "Ile wynosi becikowe, jaki jest próg dochodowy i do kiedy złożyć wniosek o 800+. Dokumenty i terminy — na podstawie danych z Kidelo.",
        "keyword": "becikowe",
    },
    6: {
        "slug": "kiedy-jechac-do-szpitala",
        "title": "Kiedy jechać do szpitala — skurcze, odejście wód i objawy alarmowe",
        "seoTitle": "Kiedy jechać do szpitala — skurcze, wody, objawy alarmowe",
        "description": "Zasada 5-1-1, różnica między skurczami Braxtona-Hicksa a porodowymi, co robić po odejściu wód i kiedy jechać natychmiast.",
        "keyword": "kiedy jechać do szpitala poród",
    },
}

HEADINGS = [
    "Metoda pierwsza",
    "Metoda druga",
    "Metoda trzecia",
    "Termin porodu to przedział",
    "Najczęstsze pytania",
    "Kiedy spakować torbę",
    "Dokumenty — bez nich nie ruszaj",
    "Dokumenty",
    "Torba na poród",
    "Torba na połóg",
    "Torba dziecka",
    "Torba partnera",
    "Jeśli planowane jest cesarskie cięcie",
    "Sześć pytań",
    "Czego nie pakować",
    "Pokój i sen",
    "Kąpiel",
    "Ubranka",
    "Karmienie",
    "Transport",
    "Co może poczekać",
    "Co kupić najpierw",
    "I trymestr",
    "II trymestr",
    "III trymestr",
    "Szczepienia w ciąży",
    "Becikowe",
    "800+",
    "Pozostałe świadczenia",
    "Sprawdź też świadczenia",
    "Kalendarz pierwszych",
    "Zasada 5-1-1",
    "Skurcze",
    "Odejście wód",
    "Jedź natychmiast",
    "Objawy alarmowe",
    "Co zabrać",
]

FOOTER = (
    "\n\n---\n\n"
    "Powiązane w Kidelo: [ciąża tydzień po tygodniu](/ciaza-tydzien-po-tygodniu), "
    "[badania](/badania), [wyprawka](/wyprawka), [torba do szpitala](/torba-do-szpitala), "
    "[finanse](/finanse).\n\n"
    "*Treść ma charakter informacyjny i nie zastępuje konsultacji lekarskiej. "
    "Autor: **Kidelo Ciąża**.*\n"
)

out = Path("content/blog")
out.mkdir(parents=True, exist_ok=True)
index = []

for num, meta in META.items():
    body = chunks[num]

    # Trim trailing editorial only for last article
    if num == 6:
        m = re.search(r"\n(?:Źródła|Zrodla|Jak publikować|Checklist SEO|Nota redakcyjna)\b", body)
        if m and m.start() > len(body) * 0.55:
            body = body[: m.start()].strip()

    lead = LEADS[num]
    idx = body.find(lead[:24]) if lead else -1
    if idx < 0 and lead:
        idx = body.find(lead[:16])
    if idx >= 0:
        body = body[idx:]
    else:
        print("WARN: lead not found for", num, lead)

    # Strip any residual page chrome
    body = re.sub(r"(?m)^Kidelo [—\-–] 6 artyku[^\n]*$", "", body)
    body = re.sub(r"(?m)^Page \d+ of \d+$", "", body)
    body = re.sub(r"\n{3,}", "\n\n", body)

    lines: list[str] = []
    for line in body.splitlines():
        s = line.strip()
        hit = next((h for h in HEADINGS if s.startswith(h) and len(s) < 110), None)
        if hit:
            lines += ["", f"## {s}", ""]
        elif s.endswith("?") and 15 < len(s) < 130 and not s.startswith(("http", "*", "-")):
            lines += ["", f"**{s}**", ""]
        else:
            lines.append(line)
    body = re.sub(r"\n{3,}", "\n\n", "\n".join(lines)).strip()

    body = re.sub(
        r"(?m)^((?:Policz swój|W Kidelo|Kidelo (?:pokazuje|liczy)|Pobierz Kidelo).+)$",
        r"> **\1**",
        body,
    )

    body = body.rstrip() + FOOTER
    (out / f"{meta['slug']}.md").write_text(body, encoding="utf-8")

    excerpt = meta["description"]
    for block in re.split(r"\n\n+", body):
        b = re.sub(r"\s+", " ", block.strip())
        if (
            b
            and not b.startswith(("#", ">", "*", "---", "Powiązane", "**"))
            and len(b) > 80
        ):
            clean = re.sub(r"\*\*", "", b)
            excerpt = clean[:170].rsplit(" ", 1)[0] + "…" if len(clean) > 170 else clean
            break

    index.append(
        {
            **meta,
            "author": "Kidelo Ciąża",
            "publishedAt": "2026-09-24",
            "updatedAt": "2026-09-24",
            "excerpt": excerpt,
            "order": num,
        }
    )
    print(f"OK {num} {meta['slug']}: {len(body)} chars | {body.splitlines()[0][:70]!r}")

(out / "index.json").write_text(
    json.dumps(index, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
)
print("DONE")
