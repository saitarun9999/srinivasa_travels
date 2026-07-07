import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogCard from "@/components/cards/BlogCard";
import Reveal from "@/components/ui/Reveal";
import ContactCta from "@/sections/ContactCta";
import { getBlogPosts } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Travel Notes — Route Guides & Trip Planning from Hyderabad",
  description:
    "Route guides, vehicle-choice advice and trip planning for journeys from Hyderabad — written from thousands of real chauffeur-driven trips.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageHero
        eyebrow="Travel Notes"
        title="Guides from the driver's seat"
        lede="What our chauffeurs and booking desk have learned from thousands of trips — timings, routes and honest vehicle advice."
      >
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]}
        />
      </PageHero>
      <section className="bg-surface py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <BlogCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
