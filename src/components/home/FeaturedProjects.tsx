import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github, Sparkles } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";

export default function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-violet-400">
            Selected Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-xl">
            Key machine learning, deep learning, and software projects demonstrating end-to-end engineering.
          </p>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors self-start md:self-auto group"
        >
          <span>Explore All Projects</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((project) => (
          <article
            key={project.id}
            className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-md overflow-hidden hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-950/20 transition-all duration-300"
          >
            {/* Visual Header / Mock Banner */}
            <div className="relative h-44 w-full bg-gradient-to-br from-slate-800 to-slate-950 border-b border-white/5 flex items-center justify-center overflow-hidden p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.15),transparent_70%)]" />
              <div className="relative z-10 text-center space-y-2">
                <span className="inline-block p-3 rounded-xl bg-white/5 border border-white/10 text-violet-300 shadow-inner">
                  <Sparkles size={24} />
                </span>
                <div className="text-xs font-mono tracking-wider uppercase text-neutral-400">
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

            {/* Content Body */}
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

                {/* Card Action Links */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <Link
                    href={`/projects/${project.category}/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-violet-400 transition-colors"
                  >
                    <span>View Case Study</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub repository`}
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
                        aria-label={`${project.title} live demo`}
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
    </section>
  );
}
