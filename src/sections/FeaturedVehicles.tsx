import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import VehicleCard from "@/components/cards/VehicleCard";
import { getVehicles } from "@/lib/data";

export default async function FeaturedVehicles() {
  const vehicles = (await getVehicles()).filter((v) => v.featured).slice(0, 3);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="The Fleet"
            title="Cars our guests ask for by name"
            lede="From the dependable Dzire to the hybrid HyCross — every vehicle serviced for the highway and sanitised before each trip."
          />
          <Button href="/fleet" variant="outline">
            View full fleet
          </Button>
        </div>
        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v, i) => (
            <Reveal key={v.slug} delay={i * 90}>
              <VehicleCard vehicle={v} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
