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
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Cab Fares & Tariff — Car Rental Pricing in Hyderabad",
  description:
    "Outstation, 8hr/80km local packages and airport transfers for every vehicle in the Srinivasa Travels fleet. Rates change with fuel, season and route — message us on WhatsApp for a current itemised quote.",
  path: "/pricing",
  keywords: ["cab fare Hyderabad", "innova rate Hyderabad", "taxi tariff Hyderabad"],
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
      "Extra usage billed per km and per hour at the rates in your quote",
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
        lede="Rates move with fuel, season and route, so we quote every trip fresh on WhatsApp instead of publishing numbers that go stale. Tolls, parking and permits are itemised at actuals — never folded in, never surprised on you."
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
            <div className="overflow-hidden rounded-card border border-line bg-white shadow-card">
              <div className="border-b border-line bg-surface px-6 py-5">
                <p className="font-display font-semibold text-ink">
                  Every fare is quoted per trip
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  Outstation (per km + driver allowance), local 8hr/80km
                  packages and airport transfers — rates move with fuel, season
                  and route. Send the vehicle, date and route on WhatsApp and
                  you get an itemised quote, usually within minutes.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-line text-xs uppercase tracking-wider text-ink-faint">
                      <th className="px-6 py-4 font-medium">Vehicle</th>
                      <th className="px-6 py-4 font-medium">Seats</th>
                      <th className="px-6 py-4 font-medium">Luggage</th>
                      <th className="px-6 py-4 font-medium">Fuel</th>
                      <th className="px-6 py-4 font-medium">Transmission</th>
                      <th className="px-6 py-4 font-medium">Fare</th>
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
                        <td className="px-6 py-4 text-ink-soft">
                          {v.seats} + driver
                        </td>
                        <td className="px-6 py-4 text-ink-soft">
                          {v.luggage} bags
                        </td>
                        <td className="px-6 py-4 text-ink-soft">{v.fuel}</td>
                        <td className="px-6 py-4 text-ink-soft">
                          {v.transmission}
                        </td>
                        <td className="px-6 py-4 font-display font-semibold text-primary">
                          On request
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
