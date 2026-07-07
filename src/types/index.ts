export type VehicleCategory =
  | "Sedan"
  | "MUV"
  | "SUV"
  | "Luxury"
  | "Tempo Traveller";

export type Transmission = "Manual" | "Automatic";

export type Fuel = "Petrol" | "Diesel" | "CNG" | "Hybrid";

export interface FAQ {
  question: string;
  answer: string;
}

export interface Vehicle {
  slug: string;
  name: string;
  category: VehicleCategory;
  seats: number;
  luggage: number;
  fuel: Fuel;
  transmission: Transmission;
  pricePerKm: number;
  minKmPerDay: number;
  driverAllowancePerDay: number;
  airportTransferFare: number;
  localPackageFare: number; // 8 hr / 80 km package
  image: string;
  gallery: string[];
  tagline: string;
  description: string;
  features: string[];
  idealFor: string[];
  featured: boolean;
  faqs: FAQ[];
}

export interface Service {
  slug: string;
  title: string;
  menuLabel: string;
  tagline: string;
  description: string;
  longDescription: string[];
  highlights: { title: string; detail: string }[];
  keywords: string[];
  recommendedVehicleSlugs: string[];
  faqs: FAQ[];
}

export interface RouteInfo {
  slug: string;
  from: string;
  to: string;
  distanceKm: number;
  duration: string;
  description: string;
  longDescription: string[];
  oneWayFareFrom: number;
  roundTripFareFrom: number;
  attractions: { name: string; note: string }[];
  recommendedVehicleSlugs: string[];
  faqs: FAQ[];
}

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  review: string;
  trip: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  author: string;
  readMinutes: number;
  tags: string[];
  content: string[]; // paragraphs
}

export interface SiteFAQ extends FAQ {
  category: string;
}
