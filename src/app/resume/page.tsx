"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  FileText, 
  Download, 
  ExternalLink, 
  BarChart3, 
  Code2, 
  BrainCircuit, 
  Check 
} from "lucide-react";
import { profile } from "@/data/profile";

type DocTab = "resume" | "cv";
type DomainRole = "ai_ml" | "software_dev" | "data_analyst";

interface DomainOption {
  id: DomainRole;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  badgeColor: string;
  borderColor: string;
}

const DOMAIN_OPTIONS: DomainOption[] = [
  {
    id: "ai_ml",
    title: "AI / ML Developer",
    subtitle: "Deep Learning, PyTorch, LLMs, Computer Vision",
    icon: BrainCircuit,
    badgeColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    borderColor: "hover:border-violet-500/50",
  },
  {
    id: "software_dev",
    title: "Software Developer",
    subtitle: "Full-Stack, Next.js, Node.js, Systems Architecture",
    icon: Code2,
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    borderColor: "hover:border-cyan-500/50",
  },
  {
    id: "data_analyst",
    title: "Data Analyst",
    subtitle: "SQL, Tableau, Pandas, Statistical Modeling",
    icon: BarChart3,
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    borderColor: "hover:border-emerald-500/50",
  },
];

export default function ResumePage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "cv" ? "cv" : "resume";

  const [activeTab, setActiveTab] = useState<DocTab>(initialTab);
  const [selectedDomain, setSelectedDomain] = useState<DomainRole>("ai_ml");
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch by rendering browser-specific elements after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isResume = activeTab === "resume";

  const docPath =
    profile.documents?.[selectedDomain]?.[activeTab] ||
    (isResume ? profile.resumePath : profile.cvPath);

  const currentDomainInfo = DOMAIN_OPTIONS.find((d) => d.id === selectedDomain);
  const docTitle = `Abdul Karim — ${currentDomainInfo?.title} (${isResume ? "Resume" : "CV"})`;
  const downloadName = `Abdul_Karim_${selectedDomain}_${isResume ? "Resume" : "CV"}.pdf`;

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-violet-400">
            Professional Credentials
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Resume &amp; CV Hub
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Select a targeted profile domain to view aligned project experience and technical skills.
          </p>
        </div>

        {/* Format Switcher */}
        <div className="flex items-center p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setActiveTab("resume")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              isResume
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            1-Page Resume
          </button>
          <button
            onClick={() => setActiveTab("cv")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              !isResume
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Detailed CV
          </button>
        </div>
      </div>

      {/* Role Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DOMAIN_OPTIONS.map((domain) => {
          const Icon = domain.icon;
          const isSelected = selectedDomain === domain.id;

          return (
            <button
              key={domain.id}
              onClick={() => setSelectedDomain(domain.id)}
              className={`p-5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "bg-slate-900 border-violet-500 shadow-xl shadow-violet-950/40 ring-1 ring-violet-500/50"
                  : `bg-slate-950/40 border-white/10 ${domain.borderColor} hover:bg-slate-900/60`
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl border ${domain.badgeColor}`}>
                  <Icon size={20} />
                </div>
                {isSelected && (
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-600 text-white">
                    <Check size={14} />
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-white">{domain.title}</h3>
              <p className="text-xs text-neutral-400 mt-1">{domain.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* PDF Document Viewer Container */}
      <div className="rounded-3xl bg-slate-900/80 border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-slate-950/80 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <FileText size={18} className="text-violet-400 shrink-0" />
            <span className="text-xs font-mono font-semibold text-white tracking-wide truncate">
              {docTitle}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={docPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <ExternalLink size={14} />
              <span>Open in new tab</span>
            </a>

            <a
              href={docPath}
              download={downloadName}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-all shadow-md"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Clean, Hydration-Safe Viewer */}
        <div className="relative min-h-[650px] w-full bg-slate-950 flex flex-col items-center justify-center p-2 sm:p-4">
          {isMounted ? (
            <iframe
              src={`${docPath}#toolbar=0&navpanes=0`}
              className="w-full h-[720px] rounded-2xl border border-white/5"
              title={docTitle}
            />
          ) : (
            <div className="p-8 text-center text-xs font-mono text-neutral-400 animate-pulse">
              Loading preview...
            </div>
          )}
          
        </div>
      </div>
      {/* Digital Summary of Document Credentials */}
<div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 space-y-6">
  <h2 className="text-lg font-bold text-white">Digital Document Summary</h2>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
    <div className="p-4 rounded-xl bg-slate-950/50 border border-white/5 space-y-1">
      <span className="text-neutral-500 font-mono">Degree Program</span>
      <div className="font-semibold text-white">B.Tech Computer Science &amp; Engineering</div>
      <div className="text-cyan-400">Specialization: AI / ML</div>
    </div>
    <div className="p-4 rounded-xl bg-slate-950/50 border border-white/5 space-y-1">
      <span className="text-neutral-500 font-mono">Institution</span>
      <div className="font-semibold text-white">Quantum University</div>
      <div className="text-neutral-400">Roorkee, Uttarakhand, India</div>
    </div>
    <div className="p-4 rounded-xl bg-slate-950/50 border border-white/5 space-y-1">
      <span className="text-neutral-500 font-mono">Focus Domains</span>
      <div className="font-semibold text-white">Machine Learning &bull; Deep Learning</div>
      <div className="text-emerald-400">Python &bull; Scikit-learn &bull; Full Stack</div>
    </div>
  </div>
</div>
    </div>
  );
}

