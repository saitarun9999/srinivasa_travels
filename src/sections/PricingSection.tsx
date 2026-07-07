import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { getVehicles } from "@/lib/data";
import { formatINR, whatsappLink } from "@/lib/site";

export default async function PricingSection() {
  const vehicles = await getVehicles();
  const rows = vehicles.slice(0, 5);

  return (
    <section className="bg-primary-night py-20 text-white lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Transparent Pricing"
          title="No hidden charges. Ever."
          lede="Published per-kilometre rates, fixed driver allowance, tolls at actuals. What you see below is what appears on your quote."
          onDark
        />
        <Reveal>
          <div className="mt-12 overflow-x-auto rounded-card border border-white/10 bg-white/5">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/50">
                  <th className="px-6 py-4 font-medium">Vehicle</th>
                  <th className="px-6 py-4 font-medium">Outstation /km</th>
                  <th className="px-6 py-4 font-medium">Local 8hr/80km</th>
                  <th className="px-6 py-4 font-medium">Airport transfer</th>
                  <th className="px-6 py-4 font-medium" />
                </tr>
              </thead>
              <tbody>
                {rows.map((v) => (
                  <tr
                    key={v.slug}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/fleet/${v.slug}`}
                        className="font-display font-medium text-white hover:text-accent"
                      >
                        {v.name}
                      </Link>
                      <span className="block text-xs text-white/45">
                        {v.seats} + driver · {v.fuel}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-display font-semibold text-accent">
                      {formatINR(v.pricePerKm)}
                    </td>
                    <td className="px-6 py-4 text-white/80">
                      {formatINR(v.localPackageFare)}
                    </td>
                    <td className="px-6 py-4 text-white/80">
                      from {formatINR(v.airportTransferFare)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={whatsappLink(
                          `Hi, I'd like a quote for the ${v.name}.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-btn border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:border-accent hover:text-accent"
                      >
                        Get quote
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <p className="mt-6 text-sm text-white/55">
          Outstation billed at minimum 300 km/day + driver allowance. Tolls,
          parking and permits at actuals — itemised in every quote.{" "}
          <Link href="/pricing" className="font-semibold text-accent">
            See full pricing →
          </Link>
        </p>
      </div>
    </section>
  );
}
