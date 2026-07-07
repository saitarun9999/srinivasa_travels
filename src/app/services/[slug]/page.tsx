import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import VehicleCard from "@/components/cards/VehicleCard";
import EnquiryForm from "@/components/EnquiryForm";
import FaqSection from "@/sections/FaqSection";
import ContactCta from "@/sections/ContactCta";
import { getService, getServices, getVehiclesBySlugs } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const vehicles = await getVehiclesBySlugs(service.recommendedVehicleSlugs);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={service.title}
        lede={service.tagline}
      >
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.menuLabel, path: `/services/${service.slug}` },
          ]}
        />
      </PageHero>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
          <div>
            <span className="pinstripe" aria-hidden />
            <div className="mt-5 space-y-5 leading-relaxed text-ink-soft">
              {service.longDescription.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {service.highlights.map((h, i) => (
                <Reveal key={h.title} delay={(i % 2) * 90}>
                  <div className="h-full rounded-card border border-line bg-surface p-6">
                    <h3 className="font-display font-semibold text-ink">
                      {h.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {h.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-card border border-line bg-white p-6 shadow-card">
              <p className="font-display text-lg font-semibold text-ink">
                Enquire about {service.menuLabel.toLowerCase()}
              </p>
              <p className="mb-4 mt-1 text-sm text-ink-soft">
                Itemised quote on WhatsApp, usually within 15 minutes.
              </p>
              <EnquiryForm compact context={service.menuLabel} />
            </div>
          </aside>
        </div>
      </section>

      {vehicles.length > 0 && (
        <section className="bg-surface py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Recommended"
              title={`Cars our guests pick for ${service.menuLabel.toLowerCase()}`}
            />
            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((v, i) => (
                <Reveal key={v.slug} delay={(i % 3) * 90}>
                  <VehicleCard vehicle={v} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.faqs.length > 0 && (
        <FaqSection
          faqs={service.faqs}
          title={`${service.menuLabel} — common questions`}
          lede="Asked by guests booking this service."
        />
      )}
      <ContactCta />
    </>
  );
}
