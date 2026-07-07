import Link from "next/link";
import type { RouteInfo } from "@/types";
import { formatINR } from "@/lib/site";

export default function RouteCard({ route }: { route: RouteInfo }) {
  return (
    <Link
      href={`/routes/${route.slug}`}
      className="group flex flex-col rounded-card border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="flex items-center gap-3">
        {/* Journey line: origin dot → dashed gold route → destination */}
        <div className="flex flex-col items-center self-stretch py-1" aria-hidden>
          <span className="size-2.5 rounded-full border-2 border-primary bg-white" />
          <span className="route-line w-0.5 flex-1" />
          <span className="size-2.5 rounded-full bg-accent" />
        </div>
        <div className="flex flex-1 flex-col justify-between gap-2 py-0.5">
          <p className="text-sm font-medium text-ink-faint">{route.from}</p>
          <h3 className="font-display text-lg font-semibold text-ink group-hover:text-primary">
            {route.to}
          </h3>
        </div>
        <div className="text-right">
          <p className="font-display text-lg font-semibold text-primary">
            {route.distanceKm} km
          </p>
          <p className="text-xs text-ink-faint">{route.duration}</p>
        </div>
      </div>
      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-ink-soft">
        {route.description}
      </p>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <p className="text-sm text-ink-soft">
          Round trip from{" "}
          <span className="font-display font-semibold text-primary">
            {formatINR(route.roundTripFareFrom)}
          </span>
        </p>
        <span className="text-sm font-semibold text-primary transition group-hover:translate-x-1">
          View route →
        </span>
      </div>
    </Link>
  );
}
