import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import RouteCard from "@/components/cards/RouteCard";
import { getRoutes } from "@/lib/data";

export default async function PopularRoutes() {
  const routes = await getRoutes();

  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Popular Routes"
          title="Roads we know by heart"
          lede="Tirupati at dawn, Srisailam through the forest gates, the Bangalore corridor — planned with the timing details only frequency teaches."
          align="center"
        />
        <div className="mt-14 grid gap-7 md:grid-cols-2">
          {routes.map((r, i) => (
            <Reveal key={r.slug} delay={(i % 2) * 90}>
              <RouteCard route={r} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
