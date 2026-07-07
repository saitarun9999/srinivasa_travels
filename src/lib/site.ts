export const site = {
  name: "Srinivasa Travels",
  legalName: "Srinivasa Travels, Hyderabad",
  tagline: "Chauffeur-driven car rentals in Hyderabad",
  description:
    "Premium chauffeur-driven car rentals in Hyderabad — airport transfers, local rentals, outstation cabs, corporate and wedding travel. Transparent pricing, verified chauffeurs, 24×7 support.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.srinivasatravels.in",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+919876543210",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+91 98765 43210",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "919876543210",
  email: "bookings@srinivasatravels.in",
  address: {
    street: "Plot 12, Ameerpet Main Road",
    locality: "Ameerpet",
    city: "Hyderabad",
    region: "Telangana",
    postalCode: "500016",
    country: "IN",
  },
  hours: "Open 24 hours, all days",
  mapUrl: "https://maps.google.com/?q=Srinivasa+Travels+Hyderabad",
  social: {
    instagram: "https://instagram.com/srinivasatravels",
    facebook: "https://facebook.com/srinivasatravels",
    youtube: "https://youtube.com/@srinivasatravels",
  },
  foundedYear: 2009,
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage =
  "Hi Srinivasa Travels, I'd like to enquire about a chauffeur-driven cab.";

export const nav = [
  { label: "Home", href: "/" },
  { label: "Fleet", href: "/fleet" },
  { label: "Services", href: "/services" },
  { label: "Routes", href: "/routes" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
