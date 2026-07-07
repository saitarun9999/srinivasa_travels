import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Accordion from "@/components/ui/Accordion";
import JsonLd from "@/components/ui/JsonLd";
import Button from "@/components/ui/Button";
import { faqJsonLd } from "@/lib/seo";
import type { FAQ } from "@/types";

export default function FaqSection({
  faqs,
  title = "Questions, answered plainly",
  lede = "The things guests ask before their first booking — billing, drivers, timings.",
  showAllLink = false,
}: {
  faqs: FAQ[];
  title?: string;
  lede?: string;
  showAllLink?: boolean;
}) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <JsonLd data={faqJsonLd(faqs)} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="FAQ" title={title} lede={lede} align="center" />
        <Reveal className="mt-12">
          <Accordion items={faqs} />
        </Reveal>
        {showAllLink && (
          <div className="mt-8 text-center">
            <Button href="/faq" variant="outline">
              See all FAQs
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
