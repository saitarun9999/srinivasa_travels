import type { Testimonial } from "@/types";
import StarRating from "@/components/ui/StarRating";

export default function TestimonialCard({ t }: { t: Testimonial }) {
  const initials = t.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <figure className="flex h-full flex-col rounded-card border border-line bg-white p-7 shadow-card">
      <StarRating rating={t.rating} />
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-soft">
        “{t.review}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <span
          className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 font-display text-sm font-semibold text-primary"
          aria-hidden
        >
          {initials}
        </span>
        <div>
          <p className="font-display text-sm font-semibold text-ink">
            {t.name}
          </p>
          <p className="text-xs text-ink-faint">
            {t.location} · {t.trip}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
