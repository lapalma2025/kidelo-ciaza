import Link from "next/link";
import type { ReactNode } from "react";

/** Map PDF / draft paths → live Kidelo Ciąża routes. */
const HREF_MAP: Record<string, string> = {
  "/kalkulator-ciazy": "/blog/kalkulator-ciazy",
  "/tydzien-ciazy/1-41": "/ciaza-tydzien-po-tygodniu",
  "/kiedy-do-szpitala": "/blog/kiedy-jechac-do-szpitala",
  "/kiedy-jechac-do-szpitala": "/blog/kiedy-jechac-do-szpitala",
  "/wyprawka-dla-noworodka": "/blog/wyprawka-dla-noworodka",
  "/becikowe-800-plus": "/blog/becikowe-i-800-plus",
  "/becikowe": "/finanse/becikowe",
  "/800-plus": "/finanse/rodzina-800-plus",
};

function resolveHref(href: string): string {
  if (HREF_MAP[href]) return HREF_MAP[href];
  // already absolute site path
  return href;
}

/** Lightweight markdown → React for blog articles. */
export default function BlogMarkdown({ source }: { source: string }) {
  const blocks = source.replace(/\r\n/g, "\n").split(/\n\n+/);
  const nodes: ReactNode[] = [];
  let inFaq = false;

  for (let i = 0; i < blocks.length; i++) {
    const raw = blocks[i].trim();
    if (!raw) continue;

    if (raw === "---") {
      inFaq = false;
      nodes.push(<hr key={i} className="my-8 border-[var(--color-line)]" />);
      continue;
    }

    if (raw.startsWith("> ")) {
      inFaq = false;
      const quote = raw
        .split("\n")
        .map((l) => l.replace(/^>\s?/, ""))
        .join(" ");
      nodes.push(
        <aside
          key={i}
          className="my-8 rounded-2xl border border-[var(--color-peach)]/40 bg-[var(--color-peach)]/15 px-5 py-4 text-[var(--color-ink)]"
        >
          <p className="text-base leading-relaxed">{inlineMd(quote)}</p>
        </aside>,
      );
      continue;
    }

    if (raw.startsWith("## ")) {
      const title = raw.slice(3);
      inFaq = /najczęstsze pytania/i.test(title);
      nodes.push(
        <h2
          key={i}
          className="mt-10 font-display text-2xl font-semibold text-[var(--color-forest)] sm:text-3xl"
        >
          {inlineMd(title)}
        </h2>,
      );
      continue;
    }

    if (raw.startsWith("### ")) {
      nodes.push(
        <h3 key={i} className="mt-6 font-display text-xl font-semibold text-[var(--color-forest)]">
          {inlineMd(raw.slice(4))}
        </h3>,
      );
      continue;
    }

    // Markdown table
    if (raw.includes("|") && raw.split("\n").length >= 2 && raw.split("\n")[0].includes("|")) {
      inFaq = false;
      const rows = raw
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean);
      const isSep = (r: string) => /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(r);
      const parseRow = (r: string) =>
        r
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((c) => c.trim());
      const header = parseRow(rows[0]);
      const bodyRows = rows.slice(1).filter((r) => !isSep(r)).map(parseRow);
      nodes.push(
        <div key={i} className="my-6 overflow-x-auto rounded-xl border border-[var(--color-line)]">
          <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[var(--color-sage)]/40">
                {header.map((cell, ci) => (
                  <th
                    key={ci}
                    className="border-b border-[var(--color-line)] px-3 py-2.5 font-semibold text-[var(--color-forest)]"
                  >
                    {inlineMd(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr key={ri} className="odd:bg-white/50 even:bg-[var(--color-sage)]/15">
                  {row.map((cell, ci) => (
                    <td key={ci} className="border-b border-[var(--color-line)]/60 px-3 py-2 align-top">
                      {inlineMd(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    // Unordered list
    if (/^[-*] /.test(raw) || raw.split("\n").every((l) => /^[-*] /.test(l.trim()) || !l.trim())) {
      const items = raw
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => /^[-*] /.test(l));
      if (items.length) {
        inFaq = false;
        nodes.push(
          <ul key={i} className="my-4 list-disc space-y-2 pl-5 text-[var(--color-ink)]">
            {items.map((item, ii) => (
              <li key={ii} className="leading-relaxed">
                {inlineMd(item.replace(/^[-*] /, ""))}
              </li>
            ))}
          </ul>,
        );
        continue;
      }
    }

    // Ordered list
    if (/^\d+\. /.test(raw) || raw.split("\n").every((l) => /^\d+\. /.test(l.trim()) || !l.trim())) {
      const items = raw
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => /^\d+\. /.test(l));
      if (items.length) {
        inFaq = false;
        nodes.push(
          <ol key={i} className="my-4 list-decimal space-y-2 pl-5 text-[var(--color-ink)]">
            {items.map((item, ii) => (
              <li key={ii} className="leading-relaxed">
                {inlineMd(item.replace(/^\d+\. /, ""))}
              </li>
            ))}
          </ol>,
        );
        continue;
      }
    }

    // FAQ: **Pytanie?** alone or with answer on following lines in same block
    const faqMatch = raw.match(/^\*\*(.+?\?)\*\*(?:\n+([\s\S]+))?$/);
    if (faqMatch || (inFaq && raw.startsWith("**") && raw.includes("?"))) {
      let question = faqMatch?.[1] ?? raw.replace(/^\*\*|\*\*$/g, "").trim();
      let answer = faqMatch?.[2]?.trim() ?? "";

      // If answer is empty, peek next block
      if (!answer && i + 1 < blocks.length) {
        const next = blocks[i + 1].trim();
        if (next && !next.startsWith("#") && !next.startsWith("**") && !next.startsWith(">") && next !== "---") {
          answer = next.replace(/\n/g, " ");
          i += 1;
        }
      }

      nodes.push(
        <div
          key={i}
          className="my-4 rounded-xl border border-[var(--color-line)] bg-white/70 px-4 py-3.5 sm:px-5"
        >
          <p className="font-semibold text-[var(--color-forest)]">{inlineMd(question)}</p>
          {answer && (
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
              {inlineMd(answer)}
            </p>
          )}
        </div>,
      );
      continue;
    }

    // Inline "Pytanie? Odpowiedź" without markdown bold (fallback)
    if (inFaq) {
      const inlineFaq = raw.match(/^(.+\?)\s+([\s\S]+)$/);
      if (inlineFaq) {
        nodes.push(
          <div
            key={i}
            className="my-4 rounded-xl border border-[var(--color-line)] bg-white/70 px-4 py-3.5 sm:px-5"
          >
            <p className="font-semibold text-[var(--color-forest)]">{inlineMd(inlineFaq[1])}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
              {inlineMd(inlineFaq[2].replace(/\n/g, " "))}
            </p>
          </div>,
        );
        continue;
      }
    }

    if (raw.startsWith("*") && raw.endsWith("*") && !raw.startsWith("**")) {
      inFaq = false;
      nodes.push(
        <p key={i} className="mt-8 text-sm italic text-[var(--color-muted)]">
          {inlineMd(raw.slice(1, -1))}
        </p>,
      );
      continue;
    }

    if (raw.startsWith("Zobacz też:")) {
      inFaq = false;
    }

    nodes.push(
      <p key={i} className="my-4 text-base leading-relaxed text-[var(--color-ink)] sm:text-[1.05rem]">
        {inlineMd(raw.replace(/\n/g, " "))}
      </p>,
    );
  }

  return <div className="blog-prose">{nodes}</div>;
}

function inlineMd(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[0].startsWith("**")) {
      parts.push(
        <strong key={key++} className="font-semibold text-[var(--color-ink)]">
          {m[0].slice(2, -2)}
        </strong>,
      );
    } else {
      const href = resolveHref(m[3]);
      const label = m[2];
      if (href.startsWith("/")) {
        parts.push(
          <Link key={key++} href={href} className="font-semibold text-[var(--color-forest)] underline">
            {label}
          </Link>,
        );
      } else {
        parts.push(
          <a
            key={key++}
            href={href}
            className="font-semibold text-[var(--color-forest)] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </a>,
        );
      }
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 ? parts[0] : parts;
}
