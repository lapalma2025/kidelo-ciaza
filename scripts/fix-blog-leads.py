# -*- coding: utf-8 -*-
from pathlib import Path
import json
import re

leads = {
    "kalkulator-ciazy.md": (
        "Dwa testy pokazały dwie kreski i pierwsze pytanie brzmi zawsze tak samo: "
        "który to właściwie tydzień? Odpowiedź bywa zaskakująca, bo tygodnie ciąży "
        "liczy się nie od poczęcia, tylko od pierwszego dnia ostatniej miesiączki. "
        "W praktyce oznacza to, że w chwili, gdy test wychodzi dodatni, jesteś już "
        "zwykle w 4.–5. tygodniu, choć zarodek ma dwa tygodnie mniej.\n\n"
    ),
    "torba-do-szpitala-lista.md": (
        "Torbę do szpitala pakuje się raz, a otwiera w najmniej komfortowym momencie "
        "życia. Dlatego liczy się nie to, żeby zmieścić w niej wszystko, tylko żeby "
        "po ciemku, w skurczach albo tuż po cesarce znaleźć w niej dokładnie tę jedną "
        "rzecz, której się szuka.\n\n"
        "Poniższa lista powstała z zestawienia wymagań polskich oddziałów położniczych "
        "oraz tego, co realnie przydaje się na sali porodowej i przez kolejne dwie–trzy "
        "doby na połogu — w zgodzie z checklistą w aplikacji Kidelo Ciąża.\n\n"
    ),
    "wyprawka-dla-noworodka.md": (
        "Przy pierwszym dziecku wyprawka potrafi rozrosnąć się do listy, której nie da "
        "się domknąć. Ten artykuł pomaga odsiać rzeczy naprawdę potrzebne od tych, które "
        "świetnie wyglądają na zdjęciach — zgodnie z checklistą w Kidelo.\n\n"
    ),
    "badania-w-ciazy.md": (
        "Kalendarz badań w ciąży porządkuje wizyty, wyniki i terminy — od pierwszej "
        "morfologii po posiew GBS przed porodem. Poniżej znajdziesz przejrzysty układ "
        "I–III trymestru, zgodny z listami w aplikacji Kidelo Ciąża.\n\n"
    ),
    "becikowe-i-800-plus.md": (
        "Becikowe i 800+ to dwa świadczenia, o które pyta niemal każda przyszła mama "
        "w Polsce. Poniżej: kwoty, progi, dokumenty i terminy — w oparciu o dane zebrane "
        "w sekcji Finanse aplikacji Kidelo Ciąża.\n\n"
    ),
    "kiedy-jechac-do-szpitala.md": (
        "Jedno z najczęstszych pytań pod koniec ciąży: kiedy jechać do szpitala? "
        "Poniżej jasne sygnały alarmowe, zasada 5-1-1, różnica między skurczami "
        "przepowiadającymi a porodowymi oraz co robić po odejściu wód — zgodnie "
        "z FAQ w Kidelo.\n\n"
    ),
}

blog = Path("content/blog")

for name, lead in leads.items():
    p = blog / name
    text = p.read_text(encoding="utf-8")
    m = re.search(r"\n## ", text)
    if m:
        rest = text[m.start() + 1 :]
        text = lead + rest
    # Join CTA blockquote split across lines
    text = re.sub(
        r"(> \*\*[^*]+)\*\*\n\n([a-ząćęłńóśźż][^\n]{10,220})\n",
        r"\1 \2**\n\n",
        text,
    )
    p.write_text(text, encoding="utf-8")
    print("fixed", name, len(text))

idx_path = blog / "index.json"
idx = json.loads(idx_path.read_text(encoding="utf-8"))
for item in idx:
    md = (blog / f"{item['slug']}.md").read_text(encoding="utf-8")
    for block in md.split("\n\n"):
        b = block.strip()
        if (
            b
            and not b.startswith("#")
            and not b.startswith(">")
            and not b.startswith("*")
            and not b.startswith("---")
            and not b.startswith("Powiązane")
        ):
            clean = re.sub(r"\*\*", "", b)
            if len(clean) > 60:
                item["excerpt"] = (
                    clean[:170].rsplit(" ", 1)[0] + "…"
                    if len(clean) > 170
                    else clean
                )
                break

idx_path.write_text(json.dumps(idx, ensure_ascii=False, indent=2), encoding="utf-8")
print("index ok")
