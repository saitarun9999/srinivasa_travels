import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceCard from "@/components/cards/ServiceCard";
import Reveal from "@/components/ui/Reveal";
import ContactCta from "@/sections/ContactCta";
import { getServices } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Car Rental Services in Hyderabad — Airport, Outstation, Corporate & Wedding",
  description:
    "Srinivasa Travels' chauffeur-driven services in Hyderabad: RGIA airport transfers, local hourly rentals, outstation cabs, corporate accounts and wedding fleets.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="One number for every kind of journey"
        lede="Five services, one standard: verified chauffeurs, itemised fares, and a desk that answers around the clock."
      >
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]}
        />
      </PageHero>
      <section className="bg-surface py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 90}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
