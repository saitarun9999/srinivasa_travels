export const site = {
  name: "Srinivasa Travels",
  legalName: "Srinivasa Travels, Hyderabad",
  tagline: "Chauffeur-driven car rentals in Hyderabad",
  description:
    "Premium chauffeur-driven car rentals in Hyderabad — airport transfers, local rentals, outstation cabs, corporate and wedding travel. Transparent pricing, verified chauffeurs, 24×7 support.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.srinivasatravel.com",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+919059288288",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+91 90592 88288",
  phoneAlt: "+919948278756",
  phoneAltDisplay: "+91 99482 78756",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "919059288288",
  email: "srinivasatipamula@gmail.com",
  address: {
    street: "9-1-44, Road No.06, Sri Venkateshwara Colony",
    locality: "Shivanarayanapuram, Badangpet",
    city: "Hyderabad",
    region: "Telangana",
    postalCode: "500058",
    country: "IN",
  },
  hours: "Open 24 hours, all days",
  mapUrl: "https://maps.app.goo.gl/baRzHDcTgGv8zoDq6",
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
