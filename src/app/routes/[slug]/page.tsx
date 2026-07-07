import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import VehicleCard from "@/components/cards/VehicleCard";
import EnquiryForm from "@/components/EnquiryForm";
import FaqSection from "@/sections/FaqSection";
import ContactCta from "@/sections/ContactCta";
import { getRoute, getRoutes, getVehiclesBySlugs } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { formatINR } from "@/lib/site";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return (await getRoutes()).map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = await getRoute(slug);
  if (!route) return {};
  return buildMetadata({
    title: `${route.from} to ${route.to} Cab — Fare from ${formatINR(route.roundTripFareFrom)}`,
    description: `Book a chauffeur-driven cab from ${route.from} to ${route.to}: ${route.distanceKm} km, ${route.duration}. Round trips from ${formatINR(route.roundTripFareFrom)}, itemised fares, experienced drivers.`,
    path: `/routes/${route.slug}`,
    keywords: [
      `${route.from} to ${route.to} cab`,
      `${route.from} to ${route.to} taxi fare`,
      `${route.to} car rental from ${route.from}`,
    ],
  });
}

export default async function RoutePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const route = await getRoute(slug);
  if (!route) notFound();

  const vehicles = await getVehiclesBySlugs(route.recommendedVehicleSlugs);

  const quickFacts = [
    { label: "Distance", value: `${route.distanceKm} km` },
    { label: "Journey time", value: route.duration },
    { label: "One way from", value: formatINR(route.oneWayFareFrom) },
    { label: "Round trip from", value: formatINR(route.roundTripFareFrom) },
  ];

  return (
    <>
      <PageHero
        eyebrow="Route Guide"
        title={`${route.from} to ${route.to} by Cab`}
        lede={route.description}
      >
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Routes", path: "/routes" },
            {
              name: `${route.from} to ${route.to}`,
              path: `/routes/${route.slug}`,
            },
          ]}
        />
        <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
          {quickFacts.map((f) => (
            <div
              key={f.label}
              className="rounded-card border border-white/12 bg-white/5 p-4"
            >
              <dt className="text-[11px] uppercase tracking-wider text-white/55">
                {f.label}
              </dt>
              <dd className="mt-1 font-display text-lg font-semibold text-accent">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
          <div>
            <span className="pinstripe" aria-hidden />
            <div className="mt-5 space-y-5 leading-relaxed text-ink-soft">
              {route.longDescription.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>

            <h2 className="mt-12 font-display text-2xl font-semibold text-ink">
              Along the way &amp; around {route.to}
            </h2>
            <div className="relative mt-6 space-y-0">
              {route.attractions.map((a, i) => (
                <div key={a.name} className="relative flex gap-4 pb-6">
                  {/* journey line connecting stops */}
                  <div className="flex flex-col items-center" aria-hidden>
                    <span
                      className={`mt-1 size-3 shrink-0 rounded-full ${
                        i === route.attractions.length - 1
                          ? "bg-accent"
                          : "border-2 border-primary bg-white"
                      }`}
                    />
                    {i < route.attractions.length - 1 && (
                      <span className="route-line w-0.5 flex-1" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-ink">
                      {a.name}
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft">{a.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-card border border-line bg-white p-6 shadow-card">
              <p className="font-display text-lg font-semibold text-ink">
                Plan this trip
              </p>
              <p className="mb-4 mt-1 text-sm text-ink-soft">
                Share your date and group size — we reply with an itemised
                fare for this route.
              </p>
              <EnquiryForm
                compact
                context={`${route.from} to ${route.to}`}
                defaultMessage={`${route.from} to ${route.to} trip`}
              />
            </div>
          </aside>
        </div>
      </section>

      {vehicles.length > 0 && (
        <section className="bg-surface py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Recommended"
              title={`Best cars for the ${route.to} run`}
            />
            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((v, i) => (
                <Reveal key={v.slug} delay={(i % 3) * 90}>
                  <VehicleCard vehicle={v} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {route.faqs.length > 0 && (
        <FaqSection
          faqs={route.faqs}
          title={`${route.from} to ${route.to} — common questions`}
          lede="Asked by guests planning this journey."
        />
      )}
      <ContactCta />
    </>
  );
}
