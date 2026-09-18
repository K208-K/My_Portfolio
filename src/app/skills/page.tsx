import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { skillCategories, ProficiencyLevel } from "@/data/skills";

export const metadata: Metadata = {
  title: "Technical Skills",
  description: "Technical skills matrix of Abdul Karim (Karrim) — Python, ML, Deep Learning, Data Analytics, and Web Development.",
};

const proficiencyBadgeStyles: Record<ProficiencyLevel, string> = {
  Strong: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  "Project Experience": "bg-violet-500/10 text-violet-400 border-violet-500/30",
  Familiar: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  Learning: "bg-amber-500/10 text-amber-400 border-amber-500/30",
};

export default function SkillsPage() {
  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-14">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono tracking-widest uppercase text-violet-400">
          Core Competencies &bull; Technical Matrix
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Skills &amp; Technologies
        </h1>
        <p className="text-base sm:text-lg text-neutral-300">
          Grounded technical capabilities mapped across machine learning, data analytics, software engineering, and AI architectures.
        </p>

        {/* Legend */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-neutral-500 font-mono">Proficiency:</span>
          {(["Strong", "Project Experience", "Familiar", "Learning"] as ProficiencyLevel[]).map(
            (lvl) => (
              <span
                key={lvl}
                className={`px-2.5 py-0.5 rounded-full border font-mono ${proficiencyBadgeStyles[lvl]}`}
              >
                {lvl}
              </span>
            )
          )}
        </div>
      </div>

      {/* Skill Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category) => (
          <div
            key={category.id}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-xl flex flex-col justify-between space-y-6 hover:border-violet-500/40 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">{category.label}</h2>
                <span className="text-xs font-mono text-neutral-500">
                  {category.skills.length} skills
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {category.description}
              </p>
            </div>

            {/* Skills List with honest qualitative badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-white/5"
                >
                  <span className="text-xs font-medium text-neutral-200">{skill.name}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                      proficiencyBadgeStyles[skill.proficiency]
                    }`}
                  >
                    {skill.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Philosophy note */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
        <p>
          <span className="font-semibold text-neutral-300">No Fake Statistics:</span> Skills are represented through qualitative project experience and verifiable application rather than arbitrary percentage bars.
        </p>
        <Link
          href="/projects"
          className="shrink-0 inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-300 font-semibold"
        >
          <span>See Skills Applied in Projects</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
