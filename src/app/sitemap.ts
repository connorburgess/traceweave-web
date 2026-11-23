import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/sources";

export const dynamic = "force-static";

const ROUTES = [
  "",
  "/how-it-works",
  "/coverage",
  "/evidence",
  "/roadmap",
  "/about",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "" || route === "/roadmap" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
