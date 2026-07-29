import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/site";

const tripTypes = [
  {
    title: "Outstation",
    detail: "Per-km rate with a fixed driver allowance per day",
    points: [
      "Minimum 300 km billed per calendar day",
      "Tolls, parking and inter-state permits at actuals",
    ],
  },
  {
    title: "Local packages",
    detail: "8hr/80km and 12hr/120km, starting at your pickup time",
    points: [
      "Extra hours and kilometres billed at the rates in your quote",
      "Driver allowance included in the package",
    ],
  },
  {
    title: "Airport transfers",
    detail: "One fixed fare per corridor — no surge, day or night",
    points: [
      "Free waiting on tracked flights",
      "Airport entry and parking itemised separately",
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="bg-primary-night py-20 text-white lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Every trip quoted, nothing hidden"
          lede="Rates move with fuel, season and route, so we don't publish a tariff that goes stale. Send us the trip on WhatsApp and you get an itemised quote — and the fare you approve is the fare you pay."
          onDark
        />
        <Reveal>
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {tripTypes.map((t) => (
              <div
                key={t.title}
                className="h-full rounded-card border border-white/10 bg-white/5 p-7"
              >
                <h3 className="font-display text-lg font-semibold text-white">
                  {t.title}
                </h3>
                <span className="pinstripe mt-3" aria-hidden />
                <p className="mt-4 text-sm font-medium text-accent">
                  {t.detail}
                </p>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-white/70">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Button
            href={whatsappLink(defaultWhatsappMessage)}
            variant="gold"
            external
          >
            Get a quote on WhatsApp
          </Button>
          <Link href="/pricing" className="text-sm font-semibold text-accent">
            How billing works →
          </Link>
        </div>
      </div>
    </section>
  );
}
