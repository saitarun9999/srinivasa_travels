"use client";

import { useMemo, useState } from "react";
import type { Vehicle } from "@/types";
import VehicleCard from "@/components/cards/VehicleCard";

const seatBands = [
  { label: "Any seats", test: () => true },
  { label: "Up to 4", test: (s: number) => s <= 4 },
  { label: "5 – 7", test: (s: number) => s >= 5 && s <= 7 },
  { label: "8+", test: (s: number) => s >= 8 },
];

const priceBands = [
  { label: "Any price", test: () => true },
  { label: "Under ₹15/km", test: (p: number) => p < 15 },
  { label: "₹15 – ₹25/km", test: (p: number) => p >= 15 && p <= 25 },
  { label: "Above ₹25/km", test: (p: number) => p > 25 },
];

const selectCls =
  "rounded-btn border border-line bg-white px-4 py-2.5 text-sm text-ink focus:border-primary focus:outline-none";

export default function FleetExplorer({ vehicles }: { vehicles: Vehicle[] }) {
  const categories = useMemo(
    () => ["All categories", ...new Set(vehicles.map((v) => v.category))],
    [vehicles],
  );
  const fuels = useMemo(
    () => ["Any fuel", ...new Set(vehicles.map((v) => v.fuel))],
    [vehicles],
  );

  const [category, setCategory] = useState("All categories");
  const [seatBand, setSeatBand] = useState(0);
  const [transmission, setTransmission] = useState("Any transmission");
  const [fuel, setFuel] = useState("Any fuel");
  const [priceBand, setPriceBand] = useState(0);

  const filtered = vehicles.filter(
    (v) =>
      (category === "All categories" || v.category === category) &&
      seatBands[seatBand].test(v.seats) &&
      (transmission === "Any transmission" ||
        v.transmission === transmission) &&
      (fuel === "Any fuel" || v.fuel === fuel) &&
      priceBands[priceBand].test(v.pricePerKm),
  );

  return (
    <div>
      <div
        className="flex flex-wrap gap-3"
        role="group"
        aria-label="Filter vehicles"
      >
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={selectCls}
          aria-label="Category"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          value={seatBand}
          onChange={(e) => setSeatBand(Number(e.target.value))}
          className={selectCls}
          aria-label="Seats"
        >
          {seatBands.map((b, i) => (
            <option key={b.label} value={i}>
              {b.label}
            </option>
          ))}
        </select>
        <select
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
          className={selectCls}
          aria-label="Transmission"
        >
          {["Any transmission", "Manual", "Automatic"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
          className={selectCls}
          aria-label="Fuel"
        >
          {fuels.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
        <select
          value={priceBand}
          onChange={(e) => setPriceBand(Number(e.target.value))}
          className={selectCls}
          aria-label="Price"
        >
          {priceBands.map((b, i) => (
            <option key={b.label} value={i}>
              {b.label}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-6 text-sm text-ink-faint" aria-live="polite">
        {filtered.length} of {vehicles.length} vehicles
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-card border border-line bg-white p-10 text-center">
          <p className="font-display text-lg font-semibold text-ink">
            No vehicles match those filters
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Widen a filter or two — or message us on WhatsApp and we&apos;ll
            suggest the right vehicle for your trip.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((v) => (
            <VehicleCard key={v.slug} vehicle={v} />
          ))}
        </div>
      )}
    </div>
  );
}
