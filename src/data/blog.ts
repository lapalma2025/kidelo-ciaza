import fs from "fs";
import path from "path";

export interface BlogPostMeta {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  keyword: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  excerpt: string;
  order: number;
  /** Accent for hub tiles */
  accent: string;
  /** Related in-app path */
  relatedHref: string;
  relatedLabel: string;
}

export interface BlogPost extends BlogPostMeta {
  body: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** Jednolity mocniejszy peach jak na pierwszym kafelku. */
const TILE_ACCENT = "var(--color-peach)";

const TILE_META: Record<
  string,
  { accent: string; relatedHref: string; relatedLabel: string }
> = {
  "kalkulator-ciazy": {
    accent: TILE_ACCENT,
    relatedHref: "/ciaza-tydzien-po-tygodniu",
    relatedLabel: "Ciąża tydzień po tygodniu",
  },
  "torba-do-szpitala-lista": {
    accent: TILE_ACCENT,
    relatedHref: "/torba-do-szpitala",
    relatedLabel: "Torba do szpitala",
  },
  "wyprawka-dla-noworodka": {
    accent: TILE_ACCENT,
    relatedHref: "/wyprawka",
    relatedLabel: "Wyprawka",
  },
  "badania-w-ciazy": {
    accent: TILE_ACCENT,
    relatedHref: "/badania",
    relatedLabel: "Badania w ciąży",
  },
  "becikowe-i-800-plus": {
    accent: TILE_ACCENT,
    relatedHref: "/finanse",
    relatedLabel: "Finanse i świadczenia",
  },
  "kiedy-jechac-do-szpitala": {
    accent: TILE_ACCENT,
    relatedHref: "/torba-do-szpitala",
    relatedLabel: "Torba do szpitala",
  },
};

function readIndex(): BlogPostMeta[] {
  const raw = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, "index.json"), "utf8")) as Omit<
    BlogPostMeta,
    "accent" | "relatedHref" | "relatedLabel"
  >[];
  return raw
    .map((item) => {
      const tile = TILE_META[item.slug] ?? {
        accent: "var(--color-sage)",
        relatedHref: "/",
        relatedLabel: "Kidelo Ciąża",
      };
      return { ...item, ...tile };
    })
    .sort((a, b) => a.order - b.order);
}

export function getAllPosts(): BlogPostMeta[] {
  return readIndex();
}

export function getPostSlugs(): string[] {
  return readIndex().map((p) => p.slug);
}

export function getPost(slug: string): BlogPost | undefined {
  const meta = readIndex().find((p) => p.slug === slug);
  if (!meta) return undefined;
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  const body = fs.readFileSync(file, "utf8");
  return { ...meta, body };
}

export function blogPath(slug: string): string {
  return `/blog/${slug}`;
}
