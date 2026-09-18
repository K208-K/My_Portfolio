import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, Compass, ArrowRight, BookOpen } from "lucide-react";
import { learningItems, LearningStatus } from "@/data/learning";

export const metadata: Metadata = {
  title: "Learning Journey",
  description: "Growth roadmap of Abdul Karim (Karrim) — completed studies, active focus areas, and upcoming goals in AI/ML.",
};

const statusConfig: Record<
  LearningStatus,
  {
    title: string;
    subtitle: string;
    badge: string;
    badgeStyle: string;
    icon: React.ElementType;
  }
> = {
  Completed: {
    title: "Completed Milestones",
    subtitle: "Foundational domains, toolsets, and architectures studied and applied.",
    badge: "Completed",
    badgeStyle: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: CheckCircle2,
  },
  "In Progress": {
    title: "Currently Learning & Deepening",
    subtitle: "Active areas of current daily study, problem solving, and experimentation.",
    badge: "In Progress",
    badgeStyle: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    icon: Clock,
  },
  "Next Goal": {
    title: "Upcoming Engineering Goals",
    subtitle: "Target topics scheduled on the roadmap for future research and mastery.",
    badge: "Next Goal",
    badgeStyle: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    icon: Compass,
  },
};

export default function LearningPage() {
  const sections: LearningStatus[] = ["In Progress", "Completed", "Next Goal"];

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono tracking-widest uppercase text-violet-400">
          Continuous Growth &bull; Engineering Roadmap
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Learning Journey
        </h1>
        <p className="text-base sm:text-lg text-neutral-300">
          A transparent log of what I have mastered, what I am currently practicing, and the goals I am working toward.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-14">
        {sections.map((status) => {
          const config = statusConfig[status];
          const Icon = config.icon;
          const items = learningItems.filter((item) => item.status === status);

          return (
            <div key={status} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${config.badgeStyle}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{config.title}</h2>
                  <p className="text-xs sm:text-sm text-neutral-400">{config.subtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md hover:border-white/20 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono tracking-wide uppercase text-neutral-400">
                          {item.area}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${config.badgeStyle}`}
                        >
                          {config.badge}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white">{item.topic}</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
        <p>
          Learning is backed by implementation. Browse how these technologies are applied in deployed projects.
        </p>
        <Link
          href="/projects"
          className="shrink-0 inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-300 font-semibold"
        >
          <span>View Project Case Studies</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
