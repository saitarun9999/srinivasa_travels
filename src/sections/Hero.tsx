import Button from "@/components/ui/Button";
import EnquiryForm from "@/components/EnquiryForm";
import HeroCanvas from "@/components/three/HeroCanvas";
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
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]"
      />
      <HeroCanvas className="absolute inset-x-0 bottom-0 h-[44svh] [mask-image:linear-gradient(to_bottom,transparent,black_22%)] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[64%] lg:[mask-image:linear-gradient(to_right,transparent,black_28%)]" />

      <div className="pointer-events-none relative mx-auto w-full max-w-7xl px-4 pb-[46svh] pt-32 sm:px-6 lg:px-8 lg:pb-40 lg:pt-40">
        <div className="pointer-events-auto max-w-2xl animate-fade-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/80 backdrop-blur">
            <span className="relative flex size-1.5" aria-hidden>
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            Hyderabad&apos;s trusted chauffeur service since {site.foundedYear}
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-7xl">
            Every journey,
            <br />
            <span className="text-shimmer">chauffeur driven.</span>
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

          <dl className="mt-12 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-md"
              >
                <dt className="order-2 text-xs text-white/55">{s.label}</dt>
                <dd className="font-display text-2xl font-semibold text-white">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-10 hidden items-center gap-2 text-xs text-white/40 lg:absolute lg:bottom-28 lg:right-8 lg:flex">
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" />
          </svg>
          Drag the car to spin it
        </p>
        <p className="pointer-events-auto absolute bottom-3 right-4 text-[10px] text-white/30 sm:right-8">
          3D model:{" "}
          <a
            href="https://sketchfab.com/3d-models/2020-toyota-fortuner-legender-3d9701bc2610466198f2cea996bd0fdc"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted hover:text-white/60"
          >
            David_Holiday
          </a>
          , CC BY 4.0
        </p>
      </div>
    </section>
  );
}

/** Quote card that floats over the hero's lower edge. */
export function HeroQuote() {
  return (
    <section className="relative z-10 -mt-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-card border border-white/60 bg-white/95 p-6 shadow-[0_30px_80px_-20px_rgba(6,41,79,0.45)] backdrop-blur-xl sm:p-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="font-display text-xl font-semibold text-ink">
              Get a quote in minutes
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              Tell us the trip — we reply on WhatsApp with an itemised fare.
            </p>
          </div>
          <span className="pinstripe" aria-hidden />
        </div>
        <EnquiryForm />
      </div>
    </section>
  );
}
