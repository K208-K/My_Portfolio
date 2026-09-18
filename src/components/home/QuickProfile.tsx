import React from "react";
import Link from "next/link";
import { Brain, Cpu, Database, BarChart3, Code2, Sparkles, ArrowUpRight } from "lucide-react";

interface FocusArea {
  title: string;
  category: string;
  description: string;
  icon: React.ElementType;
  href: string;
  tags: string[];
}

const focusAreas: FocusArea[] = [
  {
    title: "Artificial Intelligence",
    category: "Specialization",
    description: "Intelligent systems, neural perception, and automated decision logic.",
    icon: Brain,
    href: "/projects/deep-learning",
    tags: ["Neural Nets", "Vision", "Perception"],
  },
  {
    title: "Machine Learning",
    category: "Core Discipline",
    description: "Supervised classification, regression pipelines, and predictive algorithms.",
    icon: Cpu,
    href: "/projects/machine-learning",
    tags: ["Random Forest", "Scikit-learn", "XGBoost"],
  },
  {
    title: "Data Science",
    category: "Methodology",
    description: "Exploratory data analysis, statistical validation, and feature engineering.",
    icon: Database,
    href: "/projects/data-science",
    tags: ["EDA", "Preprocessing", "Statistics"],
  },
  {
    title: "Data Analytics",
    category: "Business Insight",
    description: "Data wrangling, KPI formulation, dashboarding, and actionable insights.",
    icon: BarChart3,
    href: "/projects/data-analytics",
    tags: ["Pandas", "Power BI", "Matplotlib"],
  },
  {
    title: "Software & Web",
    category: "Engineering",
    description: "Modern full-stack web applications, REST APIs, and responsive architectures.",
    icon: Code2,
    href: "/projects/full-stack",
    tags: ["Next.js", "React", "Python", "Flask"],
  },
  {
    title: "Generative AI",
    category: "Emerging Focus",
    description: "LLMs, prompt engineering, retrieval-augmented generation (RAG), and agents.",
    icon: Sparkles,
    href: "/projects/generative-ai",
    tags: ["LLM", "RAG", "Gemini API"],
  },
];

export default function QuickProfile() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono tracking-widest uppercase text-violet-400">
          Core Domains
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">
          Technical Focus Areas
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 mt-2">
          Specializing in AI/ML with a solid computer science engineering foundation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {focusAreas.map((area) => {
          const Icon = area.icon;
          return (
            <Link
              key={area.title}
              href={area.href}
              className="group relative p-6 rounded-2xl bg-slate-900/70 border border-white/[0.08] backdrop-blur-md hover:border-violet-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-violet-400 group-hover:text-white group-hover:bg-violet-600 transition-colors">
                    <Icon size={20} />
                  </div>
                  <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-400 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                    {area.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white group-hover:text-violet-300 transition-colors flex items-center gap-1.5">
                  <span>{area.title}</span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-violet-400"
                  />
                </h3>

                <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                  {area.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                {area.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] text-neutral-400 bg-white/[0.03] px-2 py-0.5 rounded-md border border-white/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
