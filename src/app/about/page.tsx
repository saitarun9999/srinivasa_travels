import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ContactCta from "@/sections/ContactCta";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "About Us — Srinivasa Travels, Hyderabad",
  description:
    "Srinivasa Travels has run chauffeur-driven car rentals in Hyderabad since 2009 — a family-run fleet built on verified drivers, honest fares and journeys that arrive on time.",
  path: "/about",
});

const milestones = [
  {
    year: "2009",
    title: "One Indica, one promise",
    detail:
      "Srinivasa Travels began with a single car at Ameerpet and a rule that still runs the company: quote the full fare before the trip, never after.",
  },
  {
    year: "2014",
    title: "The Tirupati years",
    detail:
      "Weekly darshan trips made the overnight Tirupati run our signature. The route discipline we built then — rest halts, senior drivers on ghats — became the standard for every route.",
  },
  {
    year: "2018",
    title: "Corporate desks open",
    detail:
      "IT-corridor companies asked for what our families already had: fixed chauffeurs, consolidated invoices, a coordinator who answers. Corporate accounts became a second home for the fleet.",
  },
  {
    year: "2023",
    title: "A fleet for every journey",
    detail:
      "From the Dzire to the 17-seat Tempo Traveller and the hybrid HyCross — the fleet now covers every trip a Hyderabad family or company takes.",
  },
];

const values = [
  {
    title: "The fare is the fare",
    detail:
      "Itemised quotes before every trip. In seventeen years, the surprise-charge complaint count we aim for has stayed the same: zero.",
  },
  {
    title: "Drivers are the product",
    detail:
      "Police verification, five-year minimum experience, and routes assigned by familiarity. A calm hand at 3 AM on NH-44 is what you actually book.",
  },
  {
    title: "Answer the phone",
    detail:
      "A 24×7 desk with a person on it. Bookings, changes, a driver running five minutes late — you hear it from us first.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Seventeen years of Hyderabad roads"
        lede={`Srinivasa Travels is a family-run chauffeur company — ${new Date().getFullYear() - site.foundedYear}+ years, 50,000+ trips, and the same founding rule: the fare you approve is the fare you pay.`}
      >
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]}
        />
      </PageHero>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Story"
            title="From one Indica to a full fleet"
          />
          <div className="relative mt-12 max-w-3xl">
            {milestones.map((m, i) => (
              <Reveal key={m.year}>
                <div className="relative flex gap-6 pb-10">
                  <div className="flex flex-col items-center" aria-hidden>
                    <span className="grid size-14 shrink-0 place-items-center rounded-full border-2 border-accent bg-white font-display text-sm font-semibold text-primary">
                      {m.year}
                    </span>
                    {i < milestones.length - 1 && (
                      <span className="route-line w-0.5 flex-1" />
                    )}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {m.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">
                      {m.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we stand by"
            title="Three rules, no exceptions"
            align="center"
          />
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 90}>
                <div className="h-full rounded-card border border-line bg-white p-7 shadow-card">
                  <span className="pinstripe" aria-hidden />
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                    {v.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
