import type { Metadata } from "next";
import Hero from "@/sections/Hero";
import FeaturedVehicles from "@/sections/FeaturedVehicles";
import WhyChooseUs from "@/sections/WhyChooseUs";
import ServicesSection from "@/sections/ServicesSection";
import PricingSection from "@/sections/PricingSection";
import PopularRoutes from "@/sections/PopularRoutes";
import TestimonialsSection from "@/sections/TestimonialsSection";
import FaqSection from "@/sections/FaqSection";
import BlogSection from "@/sections/BlogSection";
import ContactCta from "@/sections/ContactCta";
import { getFaqs } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — Chauffeur-Driven Car Rentals in Hyderabad`,
  description:
    "Premium chauffeur-driven car rentals in Hyderabad. Airport taxis with flight tracking, outstation cabs to Tirupati, Vijayawada & Bangalore, wedding and corporate fleets. Transparent fares, verified drivers, 24×7.",
  path: "/",
  keywords: [
    "car rental Hyderabad",
    "chauffeur driven cabs Hyderabad",
    "airport taxi Hyderabad",
    "outstation cabs Hyderabad",
  ],
});

export default async function HomePage() {
  const faqs = (await getFaqs()).slice(0, 6);

  return (
    <>
      <Hero />
      <FeaturedVehicles />
      <WhyChooseUs />
      <ServicesSection />
      <PricingSection />
      <PopularRoutes />
      <TestimonialsSection />
      <FaqSection faqs={faqs} showAllLink />
      <BlogSection />
      <ContactCta />
    </>
  );
}
