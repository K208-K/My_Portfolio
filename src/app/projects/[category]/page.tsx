import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectHubClient from "@/components/projects/ProjectHubClient";
import { ProjectCategory, categoryMeta } from "@/data/projects";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  const categories: ProjectCategory[] = [
    "machine-learning",
    "deep-learning",
    "data-science",
    "data-analytics",
    "generative-ai",
    "full-stack",
    "python",
  ];
  return categories.map((category) => ({ category }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const meta = categoryMeta[params.category as ProjectCategory];
  if (!meta) {
    return { title: "Category Not Found" };
  }
  return {
    title: `${meta.label} Projects`,
    description: meta.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const catKey = params.category as ProjectCategory;
  const meta = categoryMeta[catKey];

  if (!meta) {
    notFound();
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>All Projects Hub</span>
        </Link>
      </div>

      {/* Category Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono tracking-widest uppercase text-violet-400">
          Domain Category
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {meta.label}
        </h1>
        <p className="text-base sm:text-lg text-neutral-300">{meta.description}</p>
      </div>

      {/* Filtered Project Hub */}
      <ProjectHubClient initialCategory={catKey} />
    </div>
  );
}
