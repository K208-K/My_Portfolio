import React from "react";
import Link from "next/link";
import { FileText, Download, Eye, CheckCircle2 } from "lucide-react";
import { profile } from "@/data/profile";

export default function ResumeCards() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono tracking-widest uppercase text-violet-400">
          Professional Documents
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">
          Resume &amp; Curriculum Vitae
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 mt-2">
          Verified academic credentials, technical skills, and practical project track record ready for review.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Resume Card */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-md flex flex-col justify-between hover:border-violet-500/40 transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-violet-600/20 border border-violet-500/30 text-violet-400">
                <FileText size={24} />
              </div>
              <span className="text-xs font-mono uppercase px-2.5 py-1 rounded-full bg-white/5 text-neutral-400 border border-white/5">
                Standard &bull; 1-Page
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">Professional Resume</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Concise single-page technical summary highlighting core AI/ML coursework, verified projects, and software engineering capabilities.
            </p>

            <ul className="space-y-2 text-xs text-neutral-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>B.Tech AI/ML Coursework &amp; GPA</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>Featured ML &amp; Web Project Deployments</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>Python, Scikit-learn, and Web Tech Stack</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3">
            <Link
              href="/resume?tab=resume"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-950 font-semibold text-xs hover:bg-neutral-200 transition-all"
            >
              <Eye size={14} />
              <span>View Resume</span>
            </Link>
            <a
              href={profile.resumePath}
              download="Karrim_Resume.pdf"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 text-xs font-medium transition-all"
            >
              <Download size={14} />
              <span>Download</span>
            </a>
          </div>
        </div>

        {/* CV Card */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-md flex flex-col justify-between hover:border-cyan-500/40 transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-400">
                <FileText size={24} />
              </div>
              <span className="text-xs font-mono uppercase px-2.5 py-1 rounded-full bg-white/5 text-neutral-400 border border-white/5">
                Comprehensive &bull; Academic
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">Curriculum Vitae (CV)</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Complete academic curriculum vitae including in-depth project methodologies, coursework syllabi, technical architectures, and future research goals.
            </p>

            <ul className="space-y-2 text-xs text-neutral-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-cyan-400" />
                <span>Complete Academic History</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-cyan-400" />
                <span>Extended Architecture &amp; Methodology Notes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-cyan-400" />
                <span>Learning Roadmaps &amp; Research Interests</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3">
            <Link
              href="/resume?tab=cv"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-950 font-semibold text-xs hover:bg-neutral-200 transition-all"
            >
              <Eye size={14} />
              <span>View CV</span>
            </Link>
            <a
              href={profile.cvPath}
              download="Karrim_CV.pdf"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 text-xs font-medium transition-all"
            >
              <Download size={14} />
              <span>Download</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
