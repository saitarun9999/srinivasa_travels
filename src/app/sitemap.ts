import type { MetadataRoute } from "next";
import { getBlogPosts, getRoutes, getServices, getVehicles } from "@/lib/data";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [vehicles, services, routes, posts] = await Promise.all([
    getVehicles(),
    getServices(),
    getRoutes(),
    getBlogPosts(),
  ]);

  const staticPages = [
    "",
    "/fleet",
    "/services",
    "/routes",
    "/pricing",
    "/about",
    "/contact",
    "/faq",
    "/blog",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  return [
    ...staticPages,
    ...vehicles.map((v) => ({
      url: `${site.url}/fleet/${v.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...routes.map((r) => ({
      url: `${site.url}/routes/${r.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
