import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import Accordion from "@/components/ui/Accordion";
import JsonLd from "@/components/ui/JsonLd";
import ContactCta from "@/sections/ContactCta";
import { getFaqs } from "@/lib/data";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FAQs — Booking, Pricing & Trips",
  description:
    "Answers to common questions about booking chauffeur-driven cabs with Srinivasa Travels — billing rules, driver verification, payments and trip planning.",
  path: "/faq",
});

export default async function FaqPage() {
  const faqs = await getFaqs();
  const categories = [...new Set(faqs.map((f) => f.category))];

  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered plainly"
        lede="Everything guests ask before their first booking. If yours isn't here, WhatsApp us — a person replies."
      >
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]}
        />
      </PageHero>

      <section className="bg-surface py-14 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="mb-2 font-display text-xl font-semibold text-ink">
                {category}
              </h2>
              <span className="pinstripe mb-5" aria-hidden />
              <Accordion items={faqs.filter((f) => f.category === category)} />
            </div>
          ))}
        </div>
      </section>
      <ContactCta />
    </>
  );
}
