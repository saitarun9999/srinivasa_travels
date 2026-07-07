import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const reasons = [
  {
    title: "Verified chauffeurs",
    detail:
      "Police-verified drivers with a minimum of 5 years of commercial experience. Ghat roads and night highways go only to senior hands.",
    icon: "M12 3l7 3v5c0 4.4-3 8.4-7 10-4-1.6-7-5.6-7-10V6l7-3zM9 12l2 2 4-4",
  },
  {
    title: "Fares itemised up front",
    detail:
      "Per-km rate, driver allowance, tolls, permits — every line visible before you confirm. The fare you approve is the fare you pay.",
    icon: "M9 7h6M9 11h6M9 15h3M6 3h12a1 1 0 0 1 1 1v16l-2.5-1.5L14 20l-2-1.5L10 20l-2.5-1.5L5 20V4a1 1 0 0 1 1-1z",
  },
  {
    title: "Flight-tracked pickups",
    detail:
      "Airport pickups adjust automatically to your actual landing time. A delayed flight never means a missed cab or a waiting charge.",
    icon: "M12 6v6l4 2M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9z",
  },
  {
    title: "Route-experienced drivers",
    detail:
      "Our Tirupati drivers make that run weekly. They know the reliable midnight dhabas, the fuel stops, and the forest-gate timings.",
    icon: "M9 20l-5-2V6l5 2m0 12l6-2m-6 2V8m6 10l5 2V8l-5-2m0 12V6M9 8l6-2",
  },
  {
    title: "Sanitised, serviced vehicles",
    detail:
      "Interiors cleaned before every trip; vehicles serviced for highway duty, not just city miles. Owned fleet, not aggregated cabs.",
    icon: "M4 17l1.5-6A3 3 0 0 1 8.4 9h7.2a3 3 0 0 1 2.9 2l1.5 6M3 17h18v2.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V19H7v.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V17z",
  },
  {
    title: "A desk that answers at 3 AM",
    detail:
      "Red-eye departure? Midnight arrival? The booking desk runs 24×7 — a real person answers, every day of the year.",
    icon: "M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Srinivasa"
          title="The details that make a journey feel effortless"
          lede="Seventeen years of Hyderabad roads taught us where trips go wrong — so we built the service around preventing exactly those moments."
          align="center"
        />
        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 90}>
              <div className="h-full rounded-card border border-line bg-white p-7 shadow-card">
                <span className="grid size-12 place-items-center rounded-btn bg-primary/8 text-primary">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d={r.icon} />
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  {r.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                  {r.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
