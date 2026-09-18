import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  Database,
  BarChart2,
  Calendar,
  Sparkles,
} from "lucide-react";
import { projects, getProjectBySlug, Project } from "@/data/projects";

interface ProjectPageProps {
  params: {
    category: string;
    slug: string;
  };
}

export function generateStaticParams() {
  return projects.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
  };
}

export default function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Related projects from same category or featured
  const relatedProjects = projects
    .filter((p) => p.id !== project.id && (p.category === project.category || p.featured))
    .slice(0, 2);

  return (
    <article className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 space-y-16">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Projects Hub</span>
        </Link>
      </div>

      {/* Hero Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/projects/${project.category}`}
            className="text-xs font-mono uppercase tracking-wider text-violet-400 hover:text-violet-300"
          >
            {project.categoryLabel}
          </Link>
          <span className="text-neutral-600">&bull;</span>
          <span
            className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
              project.status === "Completed"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-amber-500/10 border-amber-500/20 text-amber-400"
            }`}
          >
            {project.status}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-xl text-neutral-300 max-w-3xl leading-relaxed">
          {project.description}
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-950 font-semibold text-xs hover:bg-neutral-200 transition-all shadow-lg"
            >
              <Github size={15} />
              <span>Source Repository</span>
            </Link>
          )}

          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-medium text-xs hover:bg-white/10 transition-all"
            >
              <ExternalLink size={14} className="text-cyan-400" />
              <span>Live Application</span>
            </Link>
          )}
        </div>
      </header>

      {/* Overview & Core Tech Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-md space-y-4">
          <h2 className="text-xl font-bold text-white">Project Overview</h2>
          <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
            {project.longDescription || project.description}
          </p>
        </div>

        {/* Tech Stack Sidebar */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-md space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers size={18} className="text-violet-400" />
            <span>Technologies</span>
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-200 font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Problem & Objective */}
      {(project.problem || project.objective) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.problem && (
            <div className="p-8 rounded-3xl bg-slate-900/70 border border-white/10 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-rose-400">
                Context &amp; Need
              </span>
              <h3 className="text-lg font-bold text-white">Problem Statement</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">{project.problem}</p>
            </div>
          )}

          {project.objective && (
            <div className="p-8 rounded-3xl bg-slate-900/70 border border-white/10 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Target Output
              </span>
              <h3 className="text-lg font-bold text-white">Project Objective</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">{project.objective}</p>
            </div>
          )}
        </div>
      )}

      {/* Dataset & Methodology */}
      {(project.dataset || project.methodology) && (
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 space-y-6">
          {project.dataset && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-cyan-400">
                <Database size={18} />
                <h3 className="text-base font-bold text-white">Dataset &amp; Ingestion</h3>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">{project.dataset}</p>
            </div>
          )}

          {project.methodology && (
            <div className="space-y-2 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-violet-400">
                <Cpu size={18} />
                <h3 className="text-base font-bold text-white">Engineering Methodology</h3>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">{project.methodology}</p>
            </div>
          )}
        </div>
      )}

      {/* Model Architecture & Evaluation Metrics */}
      {(project.model || project.metrics) && (
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-violet-500/30 space-y-6 shadow-2xl">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-violet-400">
              Architecture &amp; Performance
            </span>
            <h3 className="text-xl font-bold text-white">
              Model Evaluation &amp; Results
            </h3>
            {project.model && (
              <p className="text-sm text-neutral-300">
                <span className="font-semibold text-white">Primary Architecture:</span>{" "}
                {project.model}
              </p>
            )}
          </div>

          {project.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {Object.entries(project.metrics).map(([metricKey, metricVal]) => (
                <div
                  key={metricKey}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 text-center space-y-1"
                >
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    {metricKey}
                  </div>
                  <div className="text-xl font-mono font-bold text-white">{metricVal}</div>
                </div>
              ))}
            </div>
          )}

          {project.results && (
            <div className="pt-4 border-t border-white/10 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              <span className="font-semibold text-white">Key Findings:</span> {project.results}
            </div>
          )}
        </div>
      )}

      {/* Challenges & Learnings */}
      {(project.challenges || project.learnings) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.challenges && (
            <div className="p-8 rounded-3xl bg-slate-900/70 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertTriangle size={18} />
                <h3 className="text-lg font-bold text-white">Technical Challenges</h3>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">{project.challenges}</p>
            </div>
          )}

          {project.learnings && (
            <div className="p-8 rounded-3xl bg-slate-900/70 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <Lightbulb size={18} />
                <h3 className="text-lg font-bold text-white">Key Learnings</h3>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">{project.learnings}</p>
            </div>
          )}
        </div>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="pt-8 border-t border-white/10 space-y-6">
          <h2 className="text-xl font-bold text-white">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map((rel) => (
              <Link
                key={rel.id}
                href={`/projects/${rel.category}/${rel.slug}`}
                className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-violet-500/40 transition-colors flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-violet-400">
                    {rel.categoryLabel}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">{rel.title}</h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                    {rel.description}
                  </p>
                </div>
                <div className="text-xs font-semibold text-violet-400 flex items-center gap-1">
                  <span>View Case Study</span>
                  <ArrowLeft size={12} className="rotate-180" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
