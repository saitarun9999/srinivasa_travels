import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import RouteCard from "@/components/cards/RouteCard";
import Reveal from "@/components/ui/Reveal";
import ContactCta from "@/sections/ContactCta";
import { getRoutes } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Outstation Cab Routes from Hyderabad — Fares, Distances & Timings",
  description:
    "Popular chauffeur-driven routes from Hyderabad: Tirupati, Vijayawada, Bangalore and Srisailam. Distances, journey times, transparent fares and route tips from drivers who run them weekly.",
  path: "/routes",
});

export default async function RoutesPage() {
  const routes = await getRoutes();

  return (
    <>
      <PageHero
        eyebrow="Routes"
        title="Roads we know by heart"
        lede="Every route below is one our drivers run week after week — the fares, timings and tips come from the road, not a spreadsheet."
      >
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Routes", path: "/routes" },
          ]}
        />
      </PageHero>
      <section className="bg-surface py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-7 md:grid-cols-2">
            {routes.map((r, i) => (
              <Reveal key={r.slug} delay={(i % 2) * 90}>
                <RouteCard route={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
