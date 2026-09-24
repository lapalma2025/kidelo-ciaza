# -*- coding: utf-8 -*-
from pathlib import Path
import json
import re

blog = Path("content/blog")
idx = json.loads((blog / "index.json").read_text(encoding="utf-8"))
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
                    clean[:170].rsplit(" ", 1)[0] + "…" if len(clean) > 170 else clean
                )
                break
(blog / "index.json").write_text(
    json.dumps(idx, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
)
print("ok")
