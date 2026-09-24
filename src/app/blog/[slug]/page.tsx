import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import BlogMarkdown from "@/components/BlogMarkdown";
import PlayStoreCTA from "@/components/PlayStoreCTA";
import JsonLd from "@/components/JsonLd";
import { getAllPosts, getPost, getPostSlugs, blogPath } from "@/data/blog";
import { pageSocialMeta } from "@/lib/seo";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const title = post.seoTitle;
  const description = post.description;
  return {
    title,
    description,
    keywords: [post.keyword, "Kidelo Ciąża", "ciąża", "pierwsze dziecko"],
    authors: [{ name: post.author }],
    alternates: { canonical: blogPath(slug) },
    ...pageSocialMeta({ title, description, path: blogPath(slug), type: "article" }),
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = getAllPosts().filter((p) => p.slug !== slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: "pl-PL",
    author: {
      "@type": "Organization",
      name: post.author,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: absoluteUrl(blogPath(slug)),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(blogPath(slug)) },
    ],
  };

  return (
    <div className="overflow-x-clip">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <PageHero
        crumbs={[
          { label: "Start", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
        eyebrow={post.keyword}
        title={post.title}
        align="center"
        description={
          <p className="text-sm sm:text-base">
            Autor: <strong className="font-semibold text-[var(--color-ink)]">{post.author}</strong>
            <span className="mx-1.5">·</span>
            Aktualizacja {post.updatedAt}
          </p>
        }
        motif="book"
      />

      <article className="mx-auto max-w-3xl px-4 pb-8 sm:px-6">
        <BlogMarkdown source={post.body} />

        <div className="mt-10 rounded-2xl border border-[var(--color-line)] bg-white/60 p-5 sm:p-6">
          <p className="font-display text-lg font-semibold text-[var(--color-forest)]">
            Zobacz też w Kidelo
          </p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Ten poradnik jest zsynchronizowany z listami w aplikacji — od razu możesz przejść do powiązanej
            sekcji na stronie.
          </p>
          <Link
            href={post.relatedHref}
            className="mt-4 inline-flex font-semibold text-[var(--color-forest)] underline"
          >
            {post.relatedLabel} →
          </Link>
        </div>

        <div className="mt-10 flex justify-center">
          <PlayStoreCTA source={`blog-${slug}`} />
        </div>
      </article>

      {others.length > 0 && (
        <section className="border-t border-[var(--color-line)]/80 bg-white/30 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-2xl font-semibold text-[var(--color-forest)]">Inne artykuły</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={blogPath(p.slug)}
                  className="rounded-xl border border-[var(--color-line)] bg-white/70 p-4 transition hover:border-[var(--color-forest)]/40"
                >
                  <p className="font-mono-label text-[0.65rem] uppercase text-[var(--color-peach-dark)]">
                    {p.keyword}
                  </p>
                  <p className="mt-1 font-display text-base font-semibold text-[var(--color-forest)]">{p.title}</p>
                </Link>
              ))}
            </div>
            <p className="mt-6 text-center text-sm">
              <Link href="/blog" className="font-semibold text-[var(--color-forest)] underline">
                Wszystkie artykuły na blogu
              </Link>
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
