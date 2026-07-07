import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import FaqSection from "@/sections/FaqSection";
import ContactCta from "@/sections/ContactCta";
import { getFaqs, getVehicles } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { formatINR, whatsappLink } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Cab Fares & Tariff — Transparent Car Rental Pricing in Hyderabad",
  description:
    "Srinivasa Travels tariff card: per-km outstation rates, 8hr/80km local packages and fixed airport transfer fares for every vehicle. No hidden charges — tolls and permits itemised.",
  path: "/pricing",
  keywords: ["cab fare Hyderabad", "innova per km rate Hyderabad", "taxi tariff Hyderabad"],
});

const billingNotes = [
  {
    title: "Outstation",
    points: [
      "Minimum 300 km billed per calendar day",
      "Driver allowance per day, fixed per vehicle",
      "Tolls, parking and inter-state permits at actuals",
      "Hill/ghat routes may carry a small supplement — always quoted up front",
    ],
  },
  {
    title: "Local packages",
    points: [
      "8hr/80km and 12hr/120km packages",
      "Extra usage billed per km and per hour at published rates",
      "Package starts at your pickup time, not garage time",
    ],
  },
  {
    title: "Airport transfers",
    points: [
      "Fixed fares by corridor — no surge, day or night",
      "Free waiting for flight delays on tracked flights",
      "Airport entry and parking itemised separately",
    ],
  },
];

export default async function PricingPage() {
  const [vehicles, faqs] = await Promise.all([getVehicles(), getFaqs()]);
  const pricingFaqs = faqs.filter((f) => f.category === "Pricing");

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="The fare you approve is the fare you pay"
        lede="Published rates for every vehicle, every trip type. Tolls, parking and permits are itemised at actuals in each quote — never folded in, never surprised on you."
      >
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]}
        />
      </PageHero>

      <section className="bg-surface py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="overflow-x-auto rounded-card border border-line bg-white shadow-card">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line bg-surface text-xs uppercase tracking-wider text-ink-faint">
                    <th className="px-6 py-4 font-medium">Vehicle</th>
                    <th className="px-6 py-4 font-medium">Seats</th>
                    <th className="px-6 py-4 font-medium">Outstation /km</th>
                    <th className="px-6 py-4 font-medium">Driver allowance</th>
                    <th className="px-6 py-4 font-medium">Local 8hr/80km</th>
                    <th className="px-6 py-4 font-medium">Airport from</th>
                    <th className="px-6 py-4 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((v) => (
                    <tr key={v.slug} className="border-b border-line last:border-0">
                      <td className="px-6 py-4">
                        <Link
                          href={`/fleet/${v.slug}`}
                          className="font-display font-medium text-ink hover:text-primary"
                        >
                          {v.name}
                        </Link>
                        <span className="block text-xs text-ink-faint">
                          {v.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-ink-soft">{v.seats}</td>
                      <td className="px-6 py-4 font-display font-semibold text-primary">
                        {formatINR(v.pricePerKm)}
                      </td>
                      <td className="px-6 py-4 text-ink-soft">
                        {formatINR(v.driverAllowancePerDay)}/day
                      </td>
                      <td className="px-6 py-4 text-ink-soft">
                        {formatINR(v.localPackageFare)}
                      </td>
                      <td className="px-6 py-4 text-ink-soft">
                        {formatINR(v.airportTransferFare)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a
                          href={whatsappLink(`Hi, I'd like a quote for the ${v.name}.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-btn bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary-deep"
                        >
                          Get quote
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How billing works"
            title="Three trip types, three simple rules"
            align="center"
          />
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {billingNotes.map((n, i) => (
              <Reveal key={n.title} delay={(i % 3) * 90}>
                <div className="h-full rounded-card border border-line bg-surface p-7">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {n.title}
                  </h3>
                  <span className="pinstripe mt-3" aria-hidden />
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink-soft">
                    {n.points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {pricingFaqs.length > 0 && (
        <FaqSection
          faqs={pricingFaqs}
          title="Pricing questions"
          lede="Billing, minimums and what 'at actuals' means in practice."
        />
      )}
      <ContactCta />
    </>
  );
}
