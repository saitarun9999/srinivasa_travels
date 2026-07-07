import "server-only";
import type {
  BlogPost,
  RouteInfo,
  Service,
  SiteFAQ,
  Testimonial,
  Vehicle,
} from "@/types";
import { vehicles as fallbackVehicles } from "./fallback/vehicles";
import { services as fallbackServices } from "./fallback/services";
import { routes as fallbackRoutes } from "./fallback/routes";
import {
  blogPosts as fallbackBlogPosts,
  faqs as fallbackFaqs,
  testimonials as fallbackTestimonials,
} from "./fallback/misc";

/**
 * Content API — the single seam between the UI and its data source.
 *
 * Today: a Google Apps Script endpoint (CONTENT_API_URL) that serves each
 * Google Sheet tab as JSON, with typed local fallbacks when the endpoint is
 * absent or unreachable. Tomorrow: point CONTENT_API_URL at FastAPI and
 * nothing above this file changes.
 */
const CONTENT_API_URL = process.env.CONTENT_API_URL;
const REVALIDATE_SECONDS = 3600;

async function fetchCollection<T>(sheet: string, fallback: T[]): Promise<T[]> {
  if (!CONTENT_API_URL) return fallback;
  try {
    const url = `${CONTENT_API_URL}${CONTENT_API_URL.includes("?") ? "&" : "?"}sheet=${sheet}`;
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) throw new Error(`Content API ${sheet}: HTTP ${res.status}`);
    const data = (await res.json()) as T[];
    if (!Array.isArray(data) || data.length === 0) return fallback;
    return data;
  } catch (err) {
    console.error(`[content] falling back to local data for "${sheet}"`, err);
    return fallback;
  }
}

export const getVehicles = () =>
  fetchCollection<Vehicle>("vehicles", fallbackVehicles);

export const getServices = () =>
  fetchCollection<Service>("services", fallbackServices);

export const getRoutes = () =>
  fetchCollection<RouteInfo>("routes", fallbackRoutes);

export const getTestimonials = () =>
  fetchCollection<Testimonial>("testimonials", fallbackTestimonials);

export const getFaqs = () => fetchCollection<SiteFAQ>("faqs", fallbackFaqs);

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const posts = await fetchCollection<BlogPost>("blog", fallbackBlogPosts);
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
};

export async function getVehicle(slug: string): Promise<Vehicle | undefined> {
  return (await getVehicles()).find((v) => v.slug === slug);
}

export async function getService(slug: string): Promise<Service | undefined> {
  return (await getServices()).find((s) => s.slug === slug);
}

export async function getRoute(slug: string): Promise<RouteInfo | undefined> {
  return (await getRoutes()).find((r) => r.slug === slug);
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  return (await getBlogPosts()).find((p) => p.slug === slug);
}

export async function getVehiclesBySlugs(slugs: string[]): Promise<Vehicle[]> {
  const all = await getVehicles();
  return slugs
    .map((slug) => all.find((v) => v.slug === slug))
    .filter((v): v is Vehicle => Boolean(v));
}
