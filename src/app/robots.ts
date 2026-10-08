import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/metadata";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/login"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
