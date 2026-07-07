import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "@/types";
import { formatINR, whatsappLink } from "@/lib/site";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <Link
        href={`/fleet/${vehicle.slug}`}
        className="relative block aspect-[8/5] overflow-hidden"
      >
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
          {vehicle.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">
              <Link href={`/fleet/${vehicle.slug}`}>{vehicle.name}</Link>
            </h3>
            <p className="mt-0.5 text-sm text-ink-faint">{vehicle.tagline}</p>
          </div>
        </div>

        <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink-soft">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Seats</dt>
            <svg viewBox="0 0 24 24" className="size-4 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
            </svg>
            <dd>{vehicle.seats} + driver</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Fuel</dt>
            <svg viewBox="0 0 24 24" className="size-4 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 21V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v16" />
              <path d="M4 21h13M15 9h2.5a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0v-6L19 6.5" />
            </svg>
            <dd>{vehicle.fuel}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Transmission</dt>
            <svg viewBox="0 0 24 24" className="size-4 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="6" cy="18" r="2" />
              <path d="M6 8v8M6 12h12M18 8v4" />
            </svg>
            <dd>{vehicle.transmission}</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
          <div>
            <p className="text-xs text-ink-faint">Outstation from</p>
            <p className="font-display text-xl font-semibold text-primary">
              {formatINR(vehicle.pricePerKm)}
              <span className="text-sm font-medium text-ink-faint">/km</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/fleet/${vehicle.slug}`}
              className="rounded-btn border border-line px-4 py-2.5 text-sm font-semibold text-primary transition hover:border-primary/40 hover:bg-surface"
            >
              Details
            </Link>
            <a
              href={whatsappLink(
                `Hi, I'd like to book the ${vehicle.name}. Please share availability and fare.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-btn bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-deep"
            >
              Book
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
