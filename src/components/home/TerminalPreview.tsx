"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal as TerminalIcon, ArrowRight, CornerDownLeft } from "lucide-react";
import { projects } from "@/data/projects";

export default function TerminalPreview() {
  const [history, setHistory] = useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: "whoami",
      output: "Abdul Karim (Karrim) — AI/ML Student @ Quantum University Roorkee",
    },
    {
      cmd: "skills --featured",
      output: "Python, Scikit-learn, TensorFlow, PyTorch, SQL, React, Next.js",
    },
  ]);
  const [input, setInput] = useState("");

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    let output = "";
    const lower = cmd.toLowerCase();

    if (lower === "help") {
      output = "Available preview commands: help, whoami, skills, projects, about, clear. For full CLI, click 'Open Terminal'!";
    } else if (lower === "whoami") {
      output = "Abdul Karim (Karrim) — AI/ML Student @ Quantum University Roorkee";
    } else if (lower === "skills" || lower.startsWith("skills")) {
      output = "Python, Scikit-learn, TensorFlow, PyTorch, SQL, Pandas, NumPy, Next.js, React";
    } else if (lower === "projects") {
      output = projects.map((p) => `• ${p.title} (${p.categoryLabel})`).join("\n");
    } else if (lower === "about") {
      output = "AI/ML Undergraduate passionate about neural systems, machine learning pipelines, and full-stack software.";
    } else if (lower === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else {
      output = `Command not recognized: "${cmd}". Type "help" or open full terminal.`;
    }

    setHistory((prev) => [...prev, { cmd, output }]);
    setInput("");
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="rounded-3xl bg-slate-950/90 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono text-neutral-400">
              KARRIM@portfolio: ~ (interactive shell)
            </span>
          </div>

          <Link
            href="/terminal"
            className="flex items-center gap-1.5 text-xs font-mono font-medium text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <span>Open Full Terminal</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Terminal Body */}
        <div className="p-6 font-mono text-xs sm:text-sm space-y-4">
          <div className="text-neutral-400">
            Welcome to Karrim&apos;s Portfolio Shell. Type <span className="text-cyan-400">help</span> to explore or test commands below:
          </div>

          {/* Rendered History */}
          <div className="space-y-3">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="text-emerald-400">KARRIM@portfolio:~$</span>
                  <span className="text-white">{item.cmd}</span>
                </div>
                <div className="text-neutral-300 pl-4 whitespace-pre-line leading-relaxed">
                  {item.output}
                </div>
              </div>
            ))}
          </div>

          {/* Active Input Line */}
          <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
            <span className="text-emerald-400 shrink-0">KARRIM@portfolio:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Try "projects", "whoami", or "help"...'
              className="flex-1 bg-transparent text-white focus:outline-none placeholder-neutral-600"
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-neutral-300 text-[11px]"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
