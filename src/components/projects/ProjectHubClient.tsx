"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, ArrowRight, ExternalLink, Github, Sparkles, FolderGit2 } from "lucide-react";
import { projects, Project, ProjectCategory, categoryMeta } from "@/data/projects";

type SortOption = "featured" | "latest" | "category";

interface CategoryFilterOption {
  value: "all" | ProjectCategory;
  label: string;
}

const filterOptions: CategoryFilterOption[] = [
  { value: "all", label: "All Categories" },
  { value: "machine-learning", label: "Machine Learning" },
  { value: "deep-learning", label: "Deep Learning" },
  { value: "data-science", label: "Data Science" },
  { value: "data-analytics", label: "Data Analytics" },
  { value: "generative-ai", label: "Generative AI" },
  { value: "full-stack", label: "Full Stack" },
  { value: "python", label: "Python" },
  
];

export default function ProjectHubClient({ initialCategory }: { initialCategory?: ProjectCategory }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | ProjectCategory>(
    initialCategory || "all"
  );
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        // Category match
        if (selectedCategory !== "all" && project.category !== selectedCategory) {
          return false;
        }

        // Search match
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchText = `${project.title} ${project.description} ${project.technologies.join(
            " "
          )} ${project.categoryLabel}`.toLowerCase();
          return matchText.includes(q);
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "featured") {
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
        if (sortBy === "category") {
          return a.category.localeCompare(b.category);
        }
        return a.title.localeCompare(b.title);
      });
  }, [search, selectedCategory, sortBy]);

  return (
    <div className="space-y-10">
      {/* Search and Filter Controls */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects by name, technology, or problem domain..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end md:self-auto w-full md:w-auto">
            <span className="text-xs font-mono text-neutral-400 shrink-0">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full md:w-auto bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
            >
              <option value="featured">Featured First</option>
              <option value="category">Category</option>
              <option value="latest">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelectedCategory(opt.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === opt.value
                  ? "bg-violet-600 text-white shadow-md shadow-violet-900/30"
                  : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
        <span>
          Showing {filteredProjects.length} of {projects.length} projects
        </span>
        {search && (
          <button
            onClick={() => setSearch("")}
            className="text-violet-400 hover:underline"
          >
            Clear search filter
          </button>
        )}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-slate-900/40 border border-white/5 space-y-3">
          <FolderGit2 size={32} className="mx-auto text-neutral-500" />
          <h3 className="text-base font-semibold text-white">No projects found</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Try adjusting your search terms or clearing category filters to find what you&apos;re looking for.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs hover:bg-white/15 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-md overflow-hidden hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-950/20 transition-all duration-300"
            >
              {/* Card Banner */}
              <div className="relative h-40 w-full bg-gradient-to-br from-slate-800 to-slate-950 border-b border-white/5 flex items-center justify-center p-4">
                <div className="text-center space-y-1 z-10">
                  <span className="inline-block p-2.5 rounded-xl bg-white/5 text-violet-300 border border-white/10">
                    <Sparkles size={20} />
                  </span>
                  <div className="text-[11px] font-mono tracking-wider uppercase text-neutral-400">
                    {project.categoryLabel}
                  </div>
                </div>
                <div className="absolute top-3 right-3 z-10">
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                      project.status === "Completed"
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                    <Link href={`/projects/${project.category}/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-neutral-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <Link
                      href={`/projects/${project.category}/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-violet-400 transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub repo"
                          className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-white/5 transition-colors"
                        >
                          <Github size={14} />
                        </Link>
                      )}
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live app"
                          className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-white/5 transition-colors"
                        >
                          <ExternalLink size={14} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
