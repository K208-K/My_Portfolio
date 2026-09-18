import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { User, Compass, Target, Lightbulb, ArrowRight, FileText, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/global/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description: "About Abdul Karim (Karrim) — AI/ML Student, background, technical interests, and career direction.",
};

export default function AboutPage() {
  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono tracking-widest uppercase text-violet-400">
          Digital Identity &bull; About Me
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Abdul Karim (Karrim)
        </h1>
        <p className="text-base sm:text-lg text-neutral-300">
          Computer Science &amp; Engineering Student &bull; Artificial Intelligence &amp; Machine Learning
        </p>
      </div>

      {/* Bio / About Me Block */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
            <User size={20} />
          </div>
          <h2 className="text-2xl font-bold text-white">About Me</h2>
        </div>
        <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed whitespace-pre-line">
          {profile.longBio}
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div>
            <span className="text-neutral-500">Location:</span>{" "}
            <span className="text-neutral-200">{profile.location}</span>
          </div>
          <div>
            <span className="text-neutral-500">Status:</span>{" "}
            <span className="text-emerald-400 font-sans font-medium">{profile.availability}</span>
          </div>
        </div>
      </div>

      {/* Grid: Interests, Career Direction, Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Technical Interests */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 backdrop-blur-md flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="p-2.5 w-fit rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
              <Compass size={18} />
            </div>
            <h3 className="text-lg font-bold text-white">Technical Interests</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Domains I spend my time exploring, researching, and building in:
            </p>
            <ul className="space-y-1.5 pt-2">
              {profile.interests.map((interest) => (
                <li key={interest} className="flex items-center gap-2 text-xs text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{interest}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-4 border-t border-white/5">
            <Link
              href="/skills"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Explore Skills Matrix</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Career Direction */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 backdrop-blur-md flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="p-2.5 w-fit rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
              <Target size={18} />
            </div>
            <h3 className="text-lg font-bold text-white">Career Direction</h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {profile.careerDirection}
            </p>
          </div>
          <div className="pt-4 border-t border-white/5">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
            >
              <span>Review Practical Work</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Personal Philosophy */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 backdrop-blur-md flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="p-2.5 w-fit rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
              <Lightbulb size={18} />
            </div>
            <h3 className="text-lg font-bold text-white">Engineering Philosophy</h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {profile.philosophy}
            </p>
          </div>
          <div className="pt-4 border-t border-white/5">
            <Link
              href="/learning"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Track Learning Journey</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom CTA Block */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-violet-950/40 via-slate-900/70 to-slate-950/70 border border-white/10 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Looking for verified documents?</h3>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
          View official resume, transcript summaries, or run questions through the AI assistant.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/resume"
            className="px-5 py-2.5 rounded-xl bg-white text-slate-950 font-semibold text-xs hover:bg-neutral-200 transition-all flex items-center gap-1.5"
          >
            <FileText size={14} />
            <span>Open Resume &amp; CV</span>
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-white/10 text-white font-medium text-xs hover:bg-white/15 border border-white/10 transition-all"
          >
            Contact Karrim
          </Link>
        </div>
      </div>
    </div>
  );
}
