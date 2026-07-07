import Link from "next/link";
import { site, whatsappLink, defaultWhatsappMessage } from "@/lib/site";
import { getRoutes, getServices } from "@/lib/data";

export default async function Footer() {
  const [services, routes] = await Promise.all([getServices(), getRoutes()]);

  return (
    <footer className="bg-primary-night pb-24 text-white lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-xl font-semibold">
              Srinivasa Travels
            </p>
            <span className="pinstripe mt-3" aria-hidden />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Chauffeur-driven car rentals in Hyderabad since{" "}
              {site.foundedYear}. Airport transfers, outstation journeys and
              wedding fleets — with transparent fares and verified chauffeurs.
            </p>
            <div className="mt-6 flex gap-3">
              {Object.entries(site.social).map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-10 place-items-center rounded-btn border border-white/20 text-xs font-semibold uppercase text-white/70 transition hover:border-accent hover:text-accent"
                >
                  {name.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Services">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Services
            </p>
            <ul className="space-y-2.5 text-sm text-white/70">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="transition hover:text-white"
                  >
                    {s.menuLabel}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/fleet" className="transition hover:text-white">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition hover:text-white">
                  Pricing
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Popular routes">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Popular Routes
            </p>
            <ul className="space-y-2.5 text-sm text-white/70">
              {routes.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/routes/${r.slug}`}
                    className="transition hover:text-white"
                  >
                    {r.from} to {r.to}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/faq" className="transition hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Contact
            </p>
            <address className="space-y-3 text-sm not-italic leading-relaxed text-white/70">
              <p>
                {site.address.street}
                <br />
                {site.address.locality}, {site.address.city}{" "}
                {site.address.postalCode}
              </p>
              <p>
                <a href={`tel:${site.phone}`} className="hover:text-white">
                  {site.phoneDisplay}
                </a>
                <br />
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </p>
              <p className="text-white/50">{site.hours}</p>
            </address>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={whatsappLink(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-btn bg-accent px-4 py-2.5 font-display text-xs font-semibold text-primary-night transition hover:bg-[#ffc51e]"
              >
                WhatsApp Us
              </a>
              <a
                href={site.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-btn border border-white/25 px-4 py-2.5 font-display text-xs font-semibold text-white/80 transition hover:border-white/60"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>Chauffeur-driven car rentals · Hyderabad, Telangana</p>
        </div>
      </div>
    </footer>
  );
}
