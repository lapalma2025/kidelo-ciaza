import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import PlayStoreCTA from "@/components/PlayStoreCTA";
import JsonLd from "@/components/JsonLd";
import { getAllPosts, blogPath } from "@/data/blog";
import { pageSocialMeta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const title = "Blog Kidelo Ciąża — poradniki o ciąży, badaniach i wyprawce";
const description =
  "Artykuły SEO od Kidelo Ciąża: kalkulator ciąży, torba do szpitala, wyprawka, badania, becikowe i 800+, kiedy jechać do szpitala. Zgodne z listami w aplikacji.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "blog ciążowy",
    "kalkulator ciąży",
    "torba do szpitala",
    "wyprawka dla noworodka",
    "badania w ciąży",
    "becikowe",
    "800 plus",
    "kiedy jechać do szpitala",
  ],
  alternates: { canonical: "/blog" },
  ...pageSocialMeta({ title, description, path: "/blog" }),
};

export default function BlogHubPage() {
  const posts = getAllPosts();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Blog Kidelo Ciąża",
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: absoluteUrl(blogPath(p.slug)),
    })),
  };

  return (
    <div className="overflow-x-clip">
      <JsonLd data={itemListJsonLd} />

      <PageHero
        crumbs={[{ label: "Start", href: "/" }, { label: "Blog" }]}
        eyebrow="Poradniki · Kidelo Ciąża"
        title="Blog"
        description={
          <p>
            Praktyczne artykuły o ciąży, badaniach, świadczeniach i wyprawce — napisane przez zespół{" "}
            <strong className="font-semibold text-[var(--color-ink)]">Kidelo Ciąża</strong> i dopasowane do list w
            aplikacji.
          </p>
        }
        motif="book"
        align="center"
      />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <AnimatedSection className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" itemSelector="a">
          {posts.map((post) => (
              <Link
                key={post.slug}
                href={blogPath(post.slug)}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white/70 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--color-forest)]/35 hover:shadow-md"
              >
                <div
                  className="h-2 w-full"
                  style={{ background: post.accent }}
                  aria-hidden
                />
                <div className="flex flex-1 flex-col p-5 text-center sm:p-6">
                  <p className="font-mono-label text-[0.65rem] uppercase tracking-wider text-[var(--color-peach-dark)]">
                    {post.keyword}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-semibold leading-snug text-[var(--color-forest)] group-hover:underline sm:text-[1.35rem]">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{post.excerpt}</p>
                  <div className="mt-5 border-t border-[var(--color-line)]/80 pt-4 text-xs text-[var(--color-muted)]">
                    <p>
                      Autor: <span className="font-medium text-[var(--color-ink)]">{post.author}</span>
                      <span className="mx-1.5">·</span>
                      Aktualizacja {post.updatedAt}
                    </p>
                    <p className="mt-2 font-semibold text-[var(--color-forest)] group-hover:underline">Czytaj →</p>
                  </div>
                </div>
              </Link>
          ))}
        </AnimatedSection>

        <div className="mt-14 flex justify-center">
          <PlayStoreCTA source="blog-hub" />
        </div>
      </section>
    </div>
  );
}
