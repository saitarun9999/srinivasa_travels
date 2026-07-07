import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryForm from "@/components/EnquiryForm";
import JsonLd from "@/components/ui/JsonLd";
import { buildMetadata, localBusinessJsonLd } from "@/lib/seo";
import { site, whatsappLink, defaultWhatsappMessage } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us — Book a Cab in Hyderabad",
  description:
    "Book a chauffeur-driven cab with Srinivasa Travels: call, WhatsApp, or send an enquiry. 24×7 booking desk in Ameerpet, Hyderabad.",
  path: "/contact",
});

const channels = [
  {
    title: "WhatsApp",
    detail: "Fastest — itemised quote usually within 15 minutes",
    action: "Chat now",
    href: whatsappLink(defaultWhatsappMessage),
    external: true,
  },
  {
    title: "Phone",
    detail: `${site.phoneDisplay} · a person answers, 24×7`,
    action: "Call the desk",
    href: `tel:${site.phone}`,
    external: true,
  },
  {
    title: "Email",
    detail: `${site.email} · for corporate accounts and itineraries`,
    action: "Write to us",
    href: `mailto:${site.email}`,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <PageHero
        eyebrow="Contact"
        title="Tell us the trip — we'll handle the road"
        lede="Pickup, destination, date. That's all we need to send back an itemised quote."
      >
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]}
        />
      </PageHero>

      <section className="bg-surface py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
          <div className="space-y-5">
            {channels.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 rounded-card border border-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <div>
                  <h2 className="font-display text-lg font-semibold text-ink group-hover:text-primary">
                    {c.title}
                  </h2>
                  <p className="mt-1 text-sm text-ink-soft">{c.detail}</p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-primary">
                  {c.action} →
                </span>
              </a>
            ))}

            <div className="rounded-card border border-line bg-white p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold text-ink">
                Visit the office
              </h2>
              <address className="mt-2 text-sm not-italic leading-relaxed text-ink-soft">
                {site.address.street}
                <br />
                {site.address.locality}, {site.address.city} —{" "}
                {site.address.postalCode}
                <br />
                <span className="text-ink-faint">{site.hours}</span>
              </address>
              <a
                href={site.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-btn border border-line px-4 py-2.5 text-sm font-semibold text-primary transition hover:border-primary/40 hover:bg-surface"
              >
                Open in Google Maps
              </a>
            </div>
          </div>

          <div className="rounded-card border border-line bg-white p-7 shadow-card lg:p-9">
            <h2 className="font-display text-xl font-semibold text-ink">
              Send an enquiry
            </h2>
            <p className="mb-6 mt-1 text-sm text-ink-soft">
              We reply on WhatsApp with an itemised fare — no callbacks you
              didn&apos;t ask for.
            </p>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
