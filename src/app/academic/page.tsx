import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Calendar, BookOpen, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { education } from "@/data/education";

export const metadata: Metadata = {
  title: "Academic Journey",
  description: "Academic background of Abdul Karim (Karrim) — B.Tech Computer Science & Engineering (AI/ML) at Quantum University Roorkee.",
};

export default function AcademicPage() {
  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono tracking-widest uppercase text-violet-400">
          Education &amp; Credentials
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Academic Journey
        </h1>
        <p className="text-base sm:text-lg text-neutral-300">
          Formal education milestones from secondary school through B.Tech Computer Science (AI/ML Specialization).
        </p>
      </div>

      {/* Interactive Timeline */}
      <div className="relative border-l-2 border-violet-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12 my-8">
        {education.map((item, idx) => (
          <div key={item.id} className="relative group">
            {/* Timeline Node Icon */}
            <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-8 h-8 rounded-full bg-slate-900 border-2 border-violet-500 flex items-center justify-center text-violet-300 group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white transition-all shadow-lg shadow-violet-950/40">
              <GraduationCap size={15} />
            </div>

            {/* Content Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-xl group-hover:border-violet-500/40 transition-all space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono tracking-wider uppercase text-violet-400">
                    {item.level}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    {item.institution}
                  </h2>
                  {item.field && (
                    <div className="text-sm font-medium text-cyan-300 mt-0.5">
                      {item.field}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-neutral-300">
                    <Calendar size={12} className="text-violet-400" />
                    <span>
                      {item.startYear} &ndash; {item.endYear}
                    </span>
                  </span>
                </div>
              </div>

              {/* Performance Indicator: Marks or CGPA */}
              {(item.cgpa || item.percentage) && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                  <CheckCircle2 size={13} />
                  <span>
                    Performance: {item.cgpa ? `CGPA ${item.cgpa}` : `Score ${item.percentage}`}
                  </span>
                </div>
              )}

              {/* Description */}
              {item.description && (
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {item.description}
                </p>
              )}

              {/* Coursework & Subjects */}
              {item.subjects && item.subjects.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <BookOpen size={13} className="text-violet-400" />
                    <span>Relevant Coursework &amp; Subjects:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.subjects.map((subj) => (
                      <span
                        key={subj}
                        className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-neutral-300 border border-white/[0.06]"
                      >
                        {subj}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements if any */}
              {item.achievements && item.achievements.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Award size={13} />
                    <span>Key Achievements:</span>
                  </div>
                  <ul className="space-y-1">
                    {item.achievements.map((ach) => (
                      <li key={ach} className="text-xs text-neutral-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Note about verified data */}
      <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
        <div>
          <span className="font-semibold text-neutral-300">Verified Credentials:</span> All academic information is sourced directly from verified student records. Placeholders indicate pending official university marks.
        </div>
        <Link
          href="/resume"
          className="shrink-0 inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 font-semibold"
        >
          <span>View in Resume</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
