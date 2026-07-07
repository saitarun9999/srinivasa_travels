import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";
import FaqSection from "@/sections/FaqSection";
import ContactCta from "@/sections/ContactCta";
import EnquiryForm from "@/components/EnquiryForm";
import { getVehicle, getVehicles } from "@/lib/data";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { formatINR, site, whatsappLink } from "@/lib/site";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return (await getVehicles()).map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);
  if (!vehicle) return {};
  return buildMetadata({
    title: `${vehicle.name} for Rent in Hyderabad with Driver`,
    description: `Book the ${vehicle.name} with chauffeur in Hyderabad — ${vehicle.seats} seats, ${vehicle.fuel}, from ₹${vehicle.pricePerKm}/km outstation. Transparent fares, verified drivers.`,
    path: `/fleet/${vehicle.slug}`,
  });
}

export default async function VehiclePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);
  if (!vehicle) notFound();

  const specs = [
    { label: "Category", value: vehicle.category },
    { label: "Seating", value: `${vehicle.seats} + driver` },
    { label: "Luggage", value: `${vehicle.luggage} bags` },
    { label: "Fuel", value: vehicle.fuel },
    { label: "Transmission", value: vehicle.transmission },
    { label: "Min. billing", value: `${vehicle.minKmPerDay} km/day` },
  ];

  const pricing = [
    {
      label: "Outstation",
      value: `${formatINR(vehicle.pricePerKm)}/km`,
      note: `+ ${formatINR(vehicle.driverAllowancePerDay)}/day driver allowance`,
    },
    {
      label: "Local package",
      value: formatINR(vehicle.localPackageFare),
      note: "8 hours / 80 km",
    },
    {
      label: "Airport transfer",
      value: `from ${formatINR(vehicle.airportTransferFare)}`,
      note: "RGIA ↔ city, tolls itemised",
    },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: `${vehicle.name} — chauffeur-driven rental`,
          description: vehicle.description,
          image: `${site.url}${vehicle.image}`,
          brand: { "@type": "Brand", name: site.name },
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: vehicle.airportTransferFare,
            availability: "https://schema.org/InStock",
            url: `${site.url}/fleet/${vehicle.slug}`,
          },
        }}
      />
      {vehicle.faqs.length > 0 && <JsonLd data={faqJsonLd(vehicle.faqs)} />}

      <PageHero
        eyebrow={vehicle.category}
        title={vehicle.name}
        lede={vehicle.tagline}
      >
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Fleet", path: "/fleet" },
            { name: vehicle.name, path: `/fleet/${vehicle.slug}` },
          ]}
        />
      </PageHero>

      <section className="bg-surface py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
          <div>
            <div className="relative aspect-[8/5] overflow-hidden rounded-img shadow-card">
              <Image
                src={vehicle.image}
                alt={vehicle.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>

            <h2 className="mt-10 font-display text-2xl font-semibold text-ink">
              Overview
            </h2>
            <span className="pinstripe mt-3" aria-hidden />
            <p className="mt-4 leading-relaxed text-ink-soft">
              {vehicle.description}
            </p>

            <h2 className="mt-10 font-display text-2xl font-semibold text-ink">
              Specifications
            </h2>
            <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="rounded-card border border-line bg-white p-4"
                >
                  <dt className="text-xs uppercase tracking-wider text-ink-faint">
                    {s.label}
                  </dt>
                  <dd className="mt-1 font-display font-semibold text-ink">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-10 font-display text-2xl font-semibold text-ink">
              What&apos;s included
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {vehicle.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-sm text-ink-soft"
                >
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-deep" aria-hidden>
                    <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 6.5 4.5 9 10 3.5" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-display text-2xl font-semibold text-ink">
              Ideal for
            </h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {vehicle.idealFor.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-card border border-line bg-white p-6 shadow-card">
              <p className="font-display text-lg font-semibold text-ink">
                Pricing
              </p>
              <dl className="mt-4 space-y-4">
                {pricing.map((p) => (
                  <div
                    key={p.label}
                    className="flex items-baseline justify-between gap-3 border-b border-line pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <dt className="text-sm font-medium text-ink">
                        {p.label}
                      </dt>
                      <dd className="text-xs text-ink-faint">{p.note}</dd>
                    </div>
                    <p className="font-display text-lg font-semibold text-primary">
                      {p.value}
                    </p>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-ink-faint">
                Tolls, parking and permits at actuals — itemised in your quote.
              </p>
              <div className="mt-5 grid gap-3">
                <Button
                  href={whatsappLink(
                    `Hi, I'd like to book the ${vehicle.name}. Please share availability and an itemised quote.`,
                  )}
                  variant="gold"
                  external
                  className="w-full"
                >
                  Book Your Ride
                </Button>
                <Button
                  href={`tel:${site.phone}`}
                  variant="outline"
                  external
                  className="w-full"
                >
                  Call {site.phoneDisplay}
                </Button>
              </div>
            </div>

            <div className="rounded-card border border-line bg-white p-6 shadow-card">
              <p className="font-display text-lg font-semibold text-ink">
                Enquire about this car
              </p>
              <div className="mt-4">
                <EnquiryForm compact context={vehicle.name} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {vehicle.faqs.length > 0 && (
        <FaqSection
          faqs={vehicle.faqs}
          title={`${vehicle.name} — common questions`}
          lede="Asked by guests booking this vehicle."
        />
      )}
      <ContactCta />
    </>
  );
}
