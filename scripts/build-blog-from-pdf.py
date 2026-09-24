"""Rebuild blog markdown from full PDF text extract with safer boundaries."""
import re, json, os, pathlib

raw = open(os.path.join(os.environ["TEMP"], "kidelo-blog-articles.txt"), encoding="utf-8").read()
raw = re.sub(r"\nKidelo — 6 artykułów SEO[^\n]*\n", "\n", raw)
raw = re.sub(r"\nPage \d+ of 28\n", "\n", raw)
raw = re.sub(r"\n===== PAGE \d+ =====\n", "\n", raw)

parts = re.split(r"\nArtykuł (\d+)\.\s*", raw)
# drop preamble
chunks = []
i = 1
while i < len(parts):
    chunks.append((int(parts[i]), parts[i + 1].strip()))
    i += 2

slug_map = {
    1: "kalkulator-ciazy",
    2: "torba-do-szpitala-lista",
    3: "wyprawka-dla-noworodka",
    4: "badania-w-ciazy",
    5: "becikowe-i-800-plus",
    6: "kiedy-jechac-do-szpitala",
}
titles = {
    1: "Kalkulator ciąży — który to tydzień i kiedy termin porodu",
    2: "Torba do szpitala — kompletna lista dla mamy, dziecka i partnera",
    3: "Wyprawka dla noworodka — co naprawdę kupić przy pierwszym dziecku",
    4: "Badania w ciąży — kalendarz I, II i III trymestru",
    5: "Becikowe i 800+ — ile dostaniesz i jakie dokumenty",
    6: "Kiedy jechać do szpitala — skurcze, odejście wód i objawy alarmowe",
}
seo = {
    1: (
        "Kalkulator ciąży — który to tydzień i termin porodu",
        "Policz tydzień ciąży i termin porodu z ostatniej miesiączki, USG lub transferu zarodka. Wyjaśniamy, dlaczego wyniki się różnią i który jest wiążący.",
        "kalkulator ciąży",
    ),
    2: (
        "Torba do szpitala — lista dla mamy, dziecka i partnera",
        "Kompletna lista rzeczy do szpitala na poród i połóg: dokumenty, torba mamy, dziecka i partnera. Kiedy spakować i o co zapytać szpital.",
        "torba do szpitala lista",
    ),
    3: (
        "Wyprawka dla noworodka — lista przy pierwszym dziecku",
        "Co kupić dla noworodka: sen, kąpiel, ubranka, karmienie, transport. Ile czego potrzeba i jak rozłożyć zakupy w czasie.",
        "wyprawka dla noworodka",
    ),
    4: (
        "Badania w ciąży — kalendarz I, II i III trymestru",
        "Kalendarz badań w ciąży: morfologia, USG, OGTT, GBS i szczepienia. Harmonogram zgodny z polskim standardem opieki okołoporodowej.",
        "badania w ciąży",
    ),
    5: (
        "Becikowe i 800+ 2026 — kwoty, progi, wnioski i terminy",
        "Ile wynosi becikowe, jaki jest próg dochodowy i do kiedy złożyć wniosek o 800+. Dokumenty i terminy — na podstawie danych z Kidelo.",
        "becikowe",
    ),
    6: (
        "Kiedy jechać do szpitala — skurcze, wody, objawy alarmowe",
        "Zasada 5-1-1, różnica między skurczami Braxtona-Hicksa a porodowymi, co robić po odejściu wód i kiedy jechać natychmiast.",
        "kiedy jechać do szpitala poród",
    ),
}

HEADING_PREFIXES = (
    "Metoda pierwsza",
    "Metoda druga",
    "Metoda trzecia",
    "Termin porodu to przedział",
    "Najczęstsze pytania",
    "Kiedy spakować torbę",
    "Dokumenty —",
    "Dokumenty -",
    "Torba na poród",
    "Torba na połóg",
    "Torba dziecka",
    "Cesarskie cięcie",
    "O co zapytać",
    "I trymestr",
    "II trymestr",
    "III trymestr",
    "Badania prenatalne",
    "Szczepienia",
    "Becikowe",
    "Rodzina 800",
    "Jak złożyć",
    "Najczęstsze błędy",
    "Dokumenty do",
    "Skurcze",
    "Odejście wód",
    "Zasada 5-1-1",
    "Objawy alarmowe",
    "Krwawienie",
    "Kiedy jechać",
    "Co naprawdę",
    "Kiedy zaczynać",
    "Pokój i sen",
    "Kąpiel",
    "Ubranka",
    "Karmienie",
    "Transport",
    "Czego nie kupować",
    "Budżet",
    "Partner",
    "Źródła",
    "Bibliografia",
    "Jak liczyć skurcze",
    "Co dzieje się na izbie",
)


def is_heading(s: str) -> bool:
    if len(s) < 8 or len(s) > 95:
        return False
    return any(s.startswith(p) for p in HEADING_PREFIXES)


def to_markdown(body: str) -> str:
    # drop title + meta until blank line after description
    body = re.sub(r"^.*?\n", "", body, count=1)
    # Remove meta block: from Fraza to end of Meta description paragraph
    body = re.sub(
        r"Fraza główna:.*?Meta description:.*?(?:\n(?=[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż„\"])|\n\n)",
        "\n",
        body,
        count=1,
        flags=re.S,
    )
    # Sometimes meta is one long line - try again simpler
    body = re.sub(r"Fraza główna:.*?(?=\n[A-ZĄĆĘŁŃÓŚŹŻ„])", "", body, count=1, flags=re.S)
    body = re.sub(r"\nLinki wewnętrzne:.*", "", body, flags=re.S)
    body = re.sub(r"\n{3,}", "\n\n", body).strip()

    lines = [ln.rstrip() for ln in body.split("\n")]
    md: list[str] = []
    buf: list[str] = []

    def flush() -> None:
        if buf:
            para = " ".join(x.strip() for x in buf if x.strip())
            if para:
                md.append(para)
                md.append("")
            buf.clear()

    for ln in lines:
        s = ln.strip()
        if not s:
            flush()
            continue
        if s.startswith("CTA:"):
            flush()
            # join following buffered? CTA may wrap
            md.append("> **" + s[4:].strip() + "**")
            md.append("")
            continue
        if is_heading(s):
            flush()
            md.append("## " + s)
            md.append("")
            continue
        if "?" in s and len(s) < 240:
            parts = s.split("?", 1)
            if len(parts) == 2 and parts[1].strip() and len(parts[0]) < 130:
                flush()
                md.append(f"**{parts[0].strip()}?**")
                md.append("")
                md.append(parts[1].strip())
                md.append("")
                continue
        buf.append(s)
    flush()

    content = "\n".join(md).strip() + "\n"
    for old, new in [
        ("/tydzien-ciazy/1-41", "/ciaza-tydzien-po-tygodniu"),
        ("/kalkulator-ciazy", "/blog/kalkulator-ciazy"),
        ("/kiedy-do-szpitala", "/blog/kiedy-jechac-do-szpitala"),
        ("/becikowe-800-plus", "/blog/becikowe-i-800-plus"),
        ("/wyprawka-dla-noworodka", "/blog/wyprawka-dla-noworodka"),
        ("/torba-do-szpitala", "/torba-do-szpitala"),
        ("/badania", "/badania"),
        ("/finanse", "/finanse"),
        ("/wyprawka", "/wyprawka"),
    ]:
        content = content.replace(old, new)

    # merge broken CTA blockquotes that got split
    content = re.sub(
        r"> \*\*(.+?)\*\*\n\n([a-ząćęłńóśźż].+?)(?=\n\n|\n## |\Z)",
        lambda m: f"> **{m.group(1)} {m.group(2)}**\n",
        content,
        flags=re.S,
    )

    content += "\n---\n\n"
    content += "Powiązane w Kidelo: "
    content += "[ciąza tydzień po tygodniu](/ciaza-tydzien-po-tygodniu), "
    content += "[badania](/badania), "
    content += "[wyprawka](/wyprawka), "
    content += "[torba do szpitala](/torba-do-szpitala), "
    content += "[finanse](/finanse).\n\n"
    content += "*Treść ma charakter informacyjny i nie zastępuje konsultacji lekarskiej. Autor: **Kidelo Ciąża**.*\n"
    return content


out_dir = pathlib.Path(r"c:\Users\User\Desktop\kidelo-ciaza\content\blog")
out_dir.mkdir(parents=True, exist_ok=True)
index = []

for num, body in chunks:
    content = to_markdown(body)
    slug = slug_map[num]
    seo_title, description, keyword = seo[num]
    # excerpt
    excerpt = description
    for block in content.split("\n\n"):
        b = block.strip()
        if b and not b.startswith("#") and not b.startswith(">") and not b.startswith("*") and not b.startswith("---") and not b.startswith("Powiązane"):
            clean = re.sub(r"\*\*", "", b)
            if len(clean) > 80:
                excerpt = (clean[:170].rsplit(" ", 1)[0] + "…") if len(clean) > 170 else clean
                break
    (out_dir / f"{slug}.md").write_text(content, encoding="utf-8")
    index.append(
        {
            "slug": slug,
            "title": titles[num],
            "seoTitle": seo_title,
            "description": description[:155],
            "keyword": keyword,
            "author": "Kidelo Ciąża",
            "publishedAt": "2026-09-24",
            "updatedAt": "2026-09-24",
            "excerpt": excerpt,
            "order": num,
        }
    )
    print(num, slug, len(content), content[:60].replace("\n", " "))

index.sort(key=lambda x: x["order"])
(out_dir / "index.json").write_text(json.dumps(index, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK")
