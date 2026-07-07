import type { ReactNode } from "react";

/**
 * Dark hero band used on every inner page — keeps the transparent navbar
 * legible and gives the site a consistent opening rhythm.
 */
export default function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-primary-night pb-16 pt-32 text-white lg:pb-20 lg:pt-44">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_0%,rgba(11,78,162,0.55),transparent)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </p>
        <span className="pinstripe" aria-hidden />
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
          {title}
        </h1>
        {lede && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {lede}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
