import Link from "next/link";
import type { Service } from "@/types";

const icons: Record<string, string> = {
  "airport-transfer": "M3 14l9-2 9 2M12 3v9M7 21h10M12 12l7-7M12 12L5 5",
  "local-rental": "M12 21c4-4 7-7.6 7-11a7 7 0 1 0-14 0c0 3.4 3 7 7 11z",
  "outstation-cab": "M4 17h16M6 17V7l6-3 6 3v10M10 21h4",
  "corporate-rental": "M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M20 21V11h-4M8 7h4M8 11h4M8 15h4",
  "wedding-rental": "M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z",
};

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-card border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <span className="grid size-12 place-items-center rounded-btn bg-primary/8 text-primary transition group-hover:bg-accent/15 group-hover:text-accent-deep">
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
          <path d={icons[service.slug] ?? icons["outstation-cab"]} />
        </svg>
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold text-ink group-hover:text-primary">
        {service.menuLabel}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
        {service.description}
      </p>
      <span className="mt-5 text-sm font-semibold text-primary transition group-hover:translate-x-1">
        Explore →
      </span>
    </Link>
  );
}
