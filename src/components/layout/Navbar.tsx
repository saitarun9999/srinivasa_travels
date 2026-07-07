"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site, whatsappLink, defaultWhatsappMessage } from "@/lib/site";

/**
 * Sticky navbar: transparent over the dark page hero, solid white after
 * scrolling past it. Every page opens with a dark hero band, so the
 * transparent state is always legible.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-line bg-white/95 shadow-sm backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            className={`grid size-9 place-items-center rounded-btn font-display text-lg font-bold ${
              solid ? "bg-primary text-white" : "bg-white/15 text-white"
            }`}
            aria-hidden
          >
            S
          </span>
          <span className="leading-tight">
            <span
              className={`block font-display text-[15px] font-semibold tracking-wide ${
                solid ? "text-ink" : "text-white"
              }`}
            >
              Srinivasa Travels
            </span>
            <span
              className={`block text-[10px] uppercase tracking-[0.2em] ${
                solid ? "text-primary" : "text-accent"
              }`}
            >
              Chauffeur Driven
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  solid
                    ? active
                      ? "text-primary"
                      : "text-ink-soft hover:text-primary"
                    : active
                      ? "text-accent"
                      : "text-white/85 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${site.phone}`}
            className={`text-sm font-semibold ${
              solid ? "text-primary" : "text-white"
            }`}
          >
            {site.phoneDisplay}
          </a>
          <a
            href={whatsappLink(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-btn bg-accent px-5 py-2.5 font-display text-sm font-semibold text-primary-night transition hover:bg-[#ffc51e]"
          >
            Book Your Ride
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className={`grid size-10 place-items-center rounded-btn lg:hidden ${
            solid ? "text-ink" : "text-white"
          }`}
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav
          className="border-t border-line bg-white px-4 pb-6 pt-2 lg:hidden"
          aria-label="Mobile"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block border-b border-line/70 py-3.5 font-display text-[15px] font-medium text-ink"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={whatsappLink(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block rounded-btn bg-accent py-3 text-center font-display text-sm font-semibold text-primary-night"
          >
            Book Your Ride
          </a>
        </nav>
      )}
    </header>
  );
}
