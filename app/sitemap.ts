import { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = PROJECTS.map((project) => ({
    url: `https://nuriakhmedov.dev/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://nuriakhmedov.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectUrls,
  ];
}
