"use client";

import { useState, type FormEvent } from "react";
import { whatsappLink } from "@/lib/site";

const tripTypes = [
  "Airport Transfer",
  "Local Rental (8hr/80km)",
  "Outstation Round Trip",
  "Outstation One Way",
  "Wedding / Event",
  "Corporate",
];

const inputCls =
  "w-full rounded-btn border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-primary focus:outline-none";

/**
 * Quick enquiry widget. Composes a structured WhatsApp message — the
 * conversation continues where the customer already lives.
 */
export default function EnquiryForm({
  compact = false,
  defaultMessage = "",
  context = "",
}: {
  compact?: boolean;
  defaultMessage?: string;
  context?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [tripType, setTripType] = useState(tripTypes[0]);
  const [travelDate, setTravelDate] = useState("");
  const [details, setDetails] = useState(defaultMessage);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !/^[\d+\s-]{10,}$/.test(phone.trim())) {
      setError("Please add your name and a valid 10-digit mobile number.");
      return;
    }
    setError("");
    const lines = [
      "New enquiry — Srinivasa Travels",
      context && `Regarding: ${context}`,
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Trip type: ${tripType}`,
      travelDate && `Travel date: ${travelDate}`,
      details.trim() && `Details: ${details.trim()}`,
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? "space-y-3" : "space-y-4"}
      aria-label="Trip enquiry"
    >
      <div className={compact ? "space-y-3" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label htmlFor="enq-name" className="sr-only">
            Your name
          </label>
          <input
            id="enq-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            className={inputCls}
            required
          />
        </div>
        <div>
          <label htmlFor="enq-phone" className="sr-only">
            Mobile number
          </label>
          <input
            id="enq-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Mobile number"
            type="tel"
            autoComplete="tel"
            className={inputCls}
            required
          />
        </div>
        <div>
          <label htmlFor="enq-trip" className="sr-only">
            Trip type
          </label>
          <select
            id="enq-trip"
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            className={inputCls}
          >
            {tripTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="enq-date" className="sr-only">
            Travel date
          </label>
          <input
            id="enq-date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            type="date"
            className={inputCls}
            aria-label="Travel date"
          />
        </div>
      </div>
      <div>
        <label htmlFor="enq-details" className="sr-only">
          Trip details
        </label>
        <textarea
          id="enq-details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Pickup point, destination, number of travellers…"
          rows={compact ? 2 : 3}
          className={inputCls}
        />
      </div>
      {error && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="w-full rounded-btn bg-accent py-3.5 font-display text-sm font-semibold text-primary-night transition hover:bg-[#ffc51e] active:scale-[0.99]"
      >
        Get Quote on WhatsApp
      </button>
      <p className="text-center text-xs text-ink-faint">
        Opens WhatsApp with your enquiry pre-filled. We reply with an itemised
        quote — usually within 15 minutes.
      </p>
    </form>
  );
}
