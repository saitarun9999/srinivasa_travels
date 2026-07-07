import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/ui/JsonLd";
import BlogCard, { formatDate } from "@/components/cards/BlogCard";
import ContactCta from "@/sections/ContactCta";
import { getBlogPost, getBlogPosts } from "@/lib/data";
import { blogPostJsonLd, buildMetadata } from "@/lib/seo";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return (await getBlogPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const related = (await getBlogPosts())
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <JsonLd data={blogPostJsonLd(post)} />
      <PageHero eyebrow="Travel Notes" title={post.title} lede={post.excerpt}>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]}
        />
        <p className="mt-6 text-sm text-white/60">
          {formatDate(post.date)} · {post.readMinutes} min read ·{" "}
          {post.author}
        </p>
      </PageHero>

      <article className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="pinstripe" aria-hidden />
          <div className="mt-6 space-y-6 text-[17px] leading-relaxed text-ink-soft">
            {post.content.map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-2.5 border-t border-line pt-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-surface py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-2xl font-semibold text-ink">
                Keep reading
              </h2>
              <Link
                href="/blog"
                className="text-sm font-semibold text-primary hover:underline"
              >
                All articles →
              </Link>
            </div>
            <div className="mt-8 grid gap-7 md:grid-cols-2">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
      <ContactCta />
    </>
  );
}
