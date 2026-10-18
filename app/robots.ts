import type { MetadataRoute } from "next";

const SITE_URL = "https://eternaguard.cyberworldbuilders.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/demo/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
