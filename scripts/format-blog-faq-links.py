# -*- coding: utf-8 -*-
"""Format FAQ blocks + rewrite internal PDF paths to live site routes."""
from __future__ import annotations

import re
from pathlib import Path

LINK_MAP = {
    "/kalkulator-ciazy": "/blog/kalkulator-ciazy",
    "/tydzien-ciazy/1-41": "/ciaza-tydzien-po-tygodniu",
    "/kiedy-do-szpitala": "/blog/kiedy-jechac-do-szpitala",
    "/kiedy-jechac-do-szpitala": "/blog/kiedy-jechac-do-szpitala",
    "/torba-do-szpitala": "/torba-do-szpitala",
    "/wyprawka-dla-noworodka": "/blog/wyprawka-dla-noworodka",
    "/wyprawka": "/wyprawka",
    "/becikowe-800-plus": "/blog/becikowe-i-800-plus",
    "/becikowe": "/finanse/becikowe",
    "/badania": "/badania",
    "/finanse": "/finanse",
}

LINK_LABELS = {
    "/blog/kalkulator-ciazy": "kalkulator ciąży",
    "/ciaza-tydzien-po-tygodniu": "ciąża tydzień po tygodniu",
    "/blog/kiedy-jechac-do-szpitala": "kiedy jechać do szpitala",
    "/torba-do-szpitala": "torba do szpitala",
    "/blog/wyprawka-dla-noworodka": "wyprawka dla noworodka",
    "/wyprawka": "wyprawka",
    "/blog/becikowe-i-800-plus": "becikowe i 800+",
    "/finanse/becikowe": "becikowe",
    "/badania": "badania",
    "/finanse": "finanse",
}


def split_faq_block(text: str) -> str:
    """Turn 'Pytanie? Odpowiedź...' runs into **Pytanie?**\\n\\nOdpowiedź blocks."""
    # Collapse whitespace within lines but keep paragraph structure later
    flat = re.sub(r"[ \t]+\n", "\n", text)
    flat = re.sub(r"\n(?!\n)", " ", flat)  # join soft line wraps
    flat = re.sub(r" +", " ", flat).strip()

    # Split on question starts: capital letter ... ?
    # Prefer splitting before a new question that ends with ?
    parts = re.split(
        r"(?=(?:Czy |Co |Ile |Kiedy |Jak |Który |Która |Które |Dlaczego |Kalkulator ))",
        flat,
    )
    items = []
    for part in parts:
        part = part.strip()
        if not part:
            continue
        m = re.match(r"^(.+\?)\s*(.*)$", part, re.S)
        if m:
            q, a = m.group(1).strip(), m.group(2).strip()
            # Drop table leftovers glued after answers
            if "Wiek ciążowy w chwili" in a:
                a = a.split("Wiek ciążowy w chwili")[0].strip()
            if "Szczepienie Optymalny" in a:
                a = a.split("Szczepienie Optymalny")[0].strip()
            if "Kiedy Co zrobić" in a:
                a = a.split("Kiedy Co zrobić")[0].strip()
            items.append((q, a))
        else:
            # leftover prose — skip table junk
            if any(
                x in part
                for x in (
                    "Wiek ciążowy",
                    "Szczepienie Optymalny",
                    "Kiedy Co zrobić",
                    "Tdap",
                )
            ):
                continue
            if items and not items[-1][1]:
                q, _ = items[-1]
                items[-1] = (q, part)
            elif items:
                q, a = items[-1]
                items[-1] = (q, (a + " " + part).strip())

    if not items:
        return text

    out = []
    for q, a in items:
        out.append(f"**{q}**")
        out.append("")
        if a:
            out.append(a)
            out.append("")
    return "\n".join(out).rstrip() + "\n"


def rewrite_links_line(line: str) -> str:
    if not line.startswith("Linki wewnętrzne:"):
        return line
    # Extract path-like tokens
    tokens = re.findall(r"(/[a-z0-9\-/]+)", line)
    links = []
    seen = set()
    for tok in tokens:
        # fix truncated paths
        if tok.endswith("-") or tok.endswith("/"):
            continue
        mapped = LINK_MAP.get(tok, tok)
        # blog aliases
        if mapped.startswith("/kalkulator"):
            mapped = "/blog/kalkulator-ciazy"
        if mapped not in seen:
            seen.add(mapped)
            label = LINK_LABELS.get(mapped, mapped.strip("/").replace("-", " "))
            links.append(f"[{label}]({mapped})")
    if not links:
        return line
    return "Zobacz też: " + " · ".join(links)


def process(md: str) -> str:
    # FAQ section
    def faq_repl(m: re.Match[str]) -> str:
        head = m.group(1)
        body = m.group(2)
        return head + split_faq_block(body)

    md = re.sub(
        r"(## Najczęstsze pytania\n+)(.*?)(?=\n(?:CTA:|Linki wewnętrzne:|Zastrzeżenie:|Bibliografia|---|> |\Z))",
        faq_repl,
        md,
        flags=re.S,
    )

    # CTA lines → blockquote
    md = re.sub(
        r"(?m)^CTA:\s*(.+)$",
        r"> **\1**",
        md,
    )

    lines = []
    for line in md.splitlines():
        if line.startswith("Linki wewnętrzne:"):
            lines.append(rewrite_links_line(line))
        elif line.strip() in ("Bibliografia", "Zastrzeżenie:"):
            continue
        elif line.startswith("Zastrzeżenie:"):
            continue
        else:
            lines.append(line)
    md = "\n".join(lines)

    # Also rewrite bare path mentions in body text to markdown links sparingly —
    # only the explicit "Linki" line is enough; related footer already correct.

    # Normalize double blank lines
    md = re.sub(r"\n{3,}", "\n\n", md)
    return md.strip() + "\n"


blog = Path("content/blog")
for path in sorted(blog.glob("*.md")):
    old = path.read_text(encoding="utf-8")
    new = process(old)
    path.write_text(new, encoding="utf-8")
    print("OK", path.name, len(old), "->", len(new))
