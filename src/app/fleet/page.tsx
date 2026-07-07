import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import FleetExplorer from "@/components/FleetExplorer";
import ContactCta from "@/sections/ContactCta";
import { getVehicles } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Fleet — Chauffeur-Driven Cars for Rent in Hyderabad",
  description:
    "Browse Srinivasa Travels' chauffeur-driven fleet: Dzire, Ertiga, Innova Crysta, HyCross, Fortuner and Tempo Travellers. Transparent per-km rates, sanitised vehicles, verified drivers.",
  path: "/fleet",
  keywords: [
    "car hire with driver Hyderabad",
    "Innova rental Hyderabad",
    "tempo traveller Hyderabad",
  ],
});

export default async function FleetPage() {
  const vehicles = await getVehicles();

  return (
    <>
      <PageHero
        eyebrow="The Fleet"
        title="Choose the car for the journey"
        lede="Every vehicle is company-run, serviced for highway duty and sanitised before your trip — from the dependable Dzire to the 17-seat Tempo Traveller."
      >
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Fleet", path: "/fleet" },
          ]}
        />
      </PageHero>
      <section className="bg-surface py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FleetExplorer vehicles={vehicles} />
        </div>
      </section>
      <ContactCta />
    </>
  );
}
