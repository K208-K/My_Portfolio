import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects, ProjectCategory } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes = [
    "",
    "/about",
    "/academic",
    "/skills",
    "/projects",
    "/learning",
    "/ai-assistant",
    "/terminal",
    "/resume",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const categoryRoutes = [
    "machine-learning",
    "deep-learning",
    "data-science",
    "data-analytics",
    "generative-ai",
    "full-stack",
    "python",
  ].map((category) => ({
    url: `${baseUrl}/projects/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.category}/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...projectRoutes];
}
