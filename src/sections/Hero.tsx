import Image from "next/image";
import Button from "@/components/ui/Button";
import EnquiryForm from "@/components/EnquiryForm";
import { site } from "@/lib/site";

const stats = [
  { value: "17+", label: "Years on the road" },
  { value: "50,000+", label: "Trips completed" },
  { value: "4.9★", label: "Google rating" },
  { value: "24×7", label: "Booking desk" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-primary-night text-white">
      {/* Layered night-highway backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(90%_70%_at_75%_10%,rgba(11,78,162,0.65),transparent),radial-gradient(60%_50%_at_10%_90%,rgba(244,180,0,0.12),transparent)]"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-px w-[140%] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/60 to-transparent"
      />
      <Image
        src="/images/fleet/suv.svg"
        alt=""
        aria-hidden
        width={800}
        height={500}
        className="pointer-events-none absolute -right-24 bottom-0 hidden w-[46rem] opacity-[0.16] xl:block"
        priority
      />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 pb-20 pt-32 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8 lg:pt-36">
        <div className="animate-fade-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/80">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            Hyderabad&apos;s trusted chauffeur service since {site.foundedYear}
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
            Every journey,
            <br />
            <span className="text-accent">chauffeur driven.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Flight-tracked airport pickups, overnight Tirupati departures,
            wedding fleets and corporate accounts — with verified chauffeurs
            and fares itemised before you ride.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" variant="gold">
              Book Your Ride
            </Button>
            <Button href="/fleet" variant="ghost-light">
              View Fleet
            </Button>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="order-2 text-xs text-white/55">{s.label}</dt>
                <dd className="font-display text-2xl font-semibold text-white">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-fade-up rounded-card border border-white/10 bg-white p-6 shadow-2xl sm:p-7 lg:justify-self-end lg:w-full lg:max-w-md">
          <p className="font-display text-lg font-semibold text-ink">
            Get a quote in minutes
          </p>
          <p className="mb-5 mt-1 text-sm text-ink-soft">
            Tell us the trip — we reply on WhatsApp with an itemised fare.
          </p>
          <EnquiryForm compact />
        </div>
      </div>
    </section>
  );
}
