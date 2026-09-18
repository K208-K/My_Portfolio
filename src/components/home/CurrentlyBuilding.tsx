import React from "react";
import Link from "next/link";
import { Hammer, ArrowRight, Sparkles } from "lucide-react";
import { getInProgressProjects } from "@/data/projects";

export default function CurrentlyBuilding() {
  const inProgress = getInProgressProjects();

  if (inProgress.length === 0) return null;

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-violet-500/20 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Hammer size={16} className="animate-pulse" />
            </span>
            <span className="text-xs font-mono tracking-widest uppercase text-amber-400">
              Active Development
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Currently Building
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mb-8">
            Projects actively in progress, exploring new architectures, models, and real-time systems.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inProgress.map((project) => (
              <div
                key={project.id}
                className="p-6 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-violet-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                      In Progress
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-white/5">
                    <Link
                      href={`/projects/${project.category}/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors group"
                    >
                      <span>Read Development Roadmap</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
