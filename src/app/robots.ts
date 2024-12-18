import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // disallow: env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "/" : undefined,
    },
    sitemap: "https://acme.com/sitemap.xml", //TODO: add sitemap
  };
}
