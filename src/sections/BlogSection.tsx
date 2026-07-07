import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import BlogCard from "@/components/cards/BlogCard";
import { getBlogPosts } from "@/lib/data";

export default async function BlogSection() {
  const posts = (await getBlogPosts()).slice(0, 3);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Travel Notes"
            title="Guides from the driver's seat"
            lede="Route timings, vehicle choices, darshan planning — written from thousands of real trips, not brochures."
          />
          <Button href="/blog" variant="outline">
            All articles
          </Button>
        </div>
        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 90}>
              <BlogCard post={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
