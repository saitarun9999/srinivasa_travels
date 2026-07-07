import Button from "@/components/ui/Button";
import { site, whatsappLink, defaultWhatsappMessage } from "@/lib/site";

export default function ContactCta() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-white lg:py-24">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(70%_100%_at_20%_0%,rgba(255,255,255,0.08),transparent)]"
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <span className="pinstripe pinstripe--center" aria-hidden />
        <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">
          Your chauffeur is a message away
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/75">
          Send the trip details now — pickup, destination, date. An itemised
          quote comes back on WhatsApp, usually within 15 minutes.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            href={whatsappLink(defaultWhatsappMessage)}
            variant="gold"
            external
          >
            Book Your Ride on WhatsApp
          </Button>
          <Button href={`tel:${site.phone}`} variant="ghost-light" external>
            Call {site.phoneDisplay}
          </Button>
        </div>
      </div>
    </section>
  );
}
