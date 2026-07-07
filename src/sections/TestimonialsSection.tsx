import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import TestimonialCard from "@/components/cards/TestimonialCard";
import { getTestimonials } from "@/lib/data";

export default async function TestimonialsSection() {
  const testimonials = (await getTestimonials()).slice(0, 6);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Guest Stories"
          title="Trips our guests still talk about"
          lede="Real journeys, real names — the airport pickups that waited, the night drives that let parents sleep."
          align="center"
        />
        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 90}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
