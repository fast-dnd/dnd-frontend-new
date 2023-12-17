import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: process.env.VERCEL_ENV === "production" ? "/" : undefined,
    },
    sitemap: "https://acme.com/sitemap.xml",
  };
}
