import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// El sitio es una sola página: no hay subrutas que mapear.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
