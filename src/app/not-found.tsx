import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-svh items-center bg-primary-night text-white">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          Wrong turn
        </p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
          This page isn&apos;t on the route
        </h1>
        <p className="mt-4 text-white/70">
          The address may have changed or never existed. The fleet, routes and
          booking desk are all still where you left them.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/" variant="gold">
            Back to home
          </Button>
          <Button href="/fleet" variant="ghost-light">
            View fleet
          </Button>
        </div>
      </div>
    </section>
  );
}
