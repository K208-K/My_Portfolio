"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Terminal as TerminalIcon, CornerDownLeft, Maximize2, RotateCcw } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { education } from "@/data/education";
import { learningItems } from "@/data/learning";
import { siteConfig } from "@/config/site";

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

const COMMAND_LIST = [
  "help",
  "whoami",
  "about",
  "academic",
  "education",
  "skills",
  "projects",
  "analytics",
  "datascience",
  "ml",
  "deeplearning",
  "genai",
  "fullstack",
  "learning",
  "resume",
  "cv",
  "github",
  "linkedin",
  "contact",
  "ls",
  "cat about",
  "clear",
  "history",
  "theme",
];

export default function TerminalPage() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: "init",
      output: (
        <div className="space-y-2 text-neutral-300">
          <div className="text-cyan-400 font-bold">
            Welcome to Karrim&apos;s Portfolio Terminal v2.4 (x86_64-portfolio-linux)
          </div>
          <div>Type <span className="text-emerald-400 font-bold">help</span> to view available commands.</div>
          <div>Type <span className="text-violet-400 font-bold">project &lt;slug&gt;</span> to inspect and navigate to a project case study.</div>
        </div>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex =
        historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Autocomplete hint
      const match = COMMAND_LIST.find((c) => c.startsWith(input.trim().toLowerCase()));
      if (match) {
        setInput(match);
      }
    }
  };

  const executeCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    setCommandHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);
    setInput("");

    const parts = raw.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").toLowerCase();

    let output: React.ReactNode = null;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-2 text-neutral-300">
            <div className="text-white font-semibold">Available Portfolio Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-xs">
              <div><span className="text-emerald-400 font-bold">whoami</span> — Identity &amp; title</div>
              <div><span className="text-emerald-400 font-bold">about</span> — Bio &amp; engineering philosophy</div>
              <div><span className="text-emerald-400 font-bold">academic</span> — Education &amp; university</div>
              <div><span className="text-emerald-400 font-bold">skills</span> — Skills categorized</div>
              <div><span className="text-emerald-400 font-bold">projects</span> — List all portfolio projects</div>
              <div><span className="text-emerald-400 font-bold">project &lt;slug&gt;</span> — Navigate to case study</div>
              <div><span className="text-emerald-400 font-bold">learning</span> — Growth &amp; goals roadmap</div>
              <div><span className="text-emerald-400 font-bold">resume / cv</span> — View documents</div>
              <div><span className="text-emerald-400 font-bold">github / linkedin</span> — Social profiles</div>
              <div><span className="text-emerald-400 font-bold">contact</span> — Get in touch</div>
              <div><span className="text-emerald-400 font-bold">ls / cat about</span> — Unix-style exploration</div>
              <div><span className="text-emerald-400 font-bold">clear</span> — Reset terminal output</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        output = (
          <div className="text-neutral-200">
            {profile.name} ({profile.nickname}) — {profile.title} @ Quantum University Roorkee
          </div>
        );
        break;

      case "about":
      case "cat":
        if (cmd === "cat" && arg !== "about") {
          output = <div className="text-amber-400">File not found. Try: &quot;cat about&quot;</div>;
        } else {
          output = (
            <div className="space-y-2 text-neutral-300">
              <div className="font-semibold text-white">About Karrim:</div>
              <div>{profile.shortBio}</div>
              <div className="text-xs text-neutral-400">Direction: {profile.careerDirection}</div>
            </div>
          );
        }
        break;

      case "ls":
        output = (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-cyan-400">
            <span>about.txt</span>
            <span>education.md</span>
            <span>skills.json</span>
            <span>projects/</span>
            <span>learning.log</span>
            <span>resume.pdf</span>
            <span>cv.pdf</span>
            <span>contact.sh</span>
          </div>
        );
        break;

      case "academic":
      case "education":
        output = (
          <div className="space-y-2">
            {education.map((e) => (
              <div key={e.id} className="text-xs">
                <span className="text-violet-400 font-semibold">{e.level}:</span>{" "}
                <span className="text-white">{e.institution}</span> ({e.startYear}-{e.endYear})
                {e.field && <span className="text-neutral-400"> — {e.field}</span>}
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2 text-xs">
            {skillCategories.map((c) => (
              <div key={c.id}>
                <span className="text-cyan-400 font-bold">{c.label}:</span>{" "}
                <span className="text-neutral-300">{c.skills.map((s) => s.name).join(", ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2">
            <div className="text-white font-semibold">Available Projects:</div>
            {projects.map((p) => (
              <div key={p.id} className="text-xs flex flex-wrap items-center gap-2">
                <span className="text-emerald-400 font-mono font-bold">{p.slug}</span>
                <span className="text-neutral-400">[{p.categoryLabel}]</span>
                <span className="text-neutral-300">— {p.title}</span>
              </div>
            ))}
            <div className="text-xs text-violet-400 pt-1">
              Type &quot;project &lt;slug&gt;&quot; to open any case study!
            </div>
          </div>
        );
        break;

      case "project":
        if (!arg) {
          output = (
            <div className="text-amber-400">
              Please specify a slug. Example: <span className="text-white font-bold">project house-price-prediction</span>
            </div>
          );
        } else {
          const match = projects.find(
            (p) => p.slug.toLowerCase() === arg || p.id.toLowerCase() === arg
          );
          if (match) {
            output = (
              <div className="text-emerald-400">
                Opening case study for: <span className="text-white font-bold">{match.title}</span>...
              </div>
            );
            router.push(`/projects/${match.category}/${match.slug}`);
          } else {
            output = (
              <div className="text-rose-400">
                Project &quot;{arg}&quot; not found. Type &quot;projects&quot; to list valid slugs.
              </div>
            );
          }
        }
        break;

      case "learning":
        output = (
          <div className="space-y-2 text-xs">
            <div className="text-white font-semibold">Learning Roadmap:</div>
            {learningItems.slice(0, 6).map((l) => (
              <div key={l.id}>
                <span className="text-amber-400 font-mono">[{l.status}]</span>{" "}
                <span className="text-white font-medium">{l.topic}</span>: {l.description}
              </div>
            ))}
          </div>
        );
        break;

      case "resume":
      case "cv":
        output = (
          <div className="text-emerald-400">
            Navigating to document viewer: <span className="text-white">/resume</span>...
          </div>
        );
        router.push("/resume");
        break;

      case "contact":
        output = (
          <div className="text-emerald-400">
            Navigating to contact page: <span className="text-white">/contact</span>...
          </div>
        );
        router.push("/contact");
        break;

      case "github":
        output = (
          <div className="text-neutral-300">
            GitHub: <a href={siteConfig.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{siteConfig.github}</a>
          </div>
        );
        break;

      case "linkedin":
        output = (
          <div className="text-neutral-300">
            LinkedIn: <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{siteConfig.linkedin}</a>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      case "history":
        output = (
          <div className="space-y-1 text-xs text-neutral-400">
            {commandHistory.map((c, i) => (
              <div key={i}>{i + 1} {c}</div>
            ))}
          </div>
        );
        break;

      case "theme":
        output = <div className="text-neutral-300">Current theme: Dark Slate Futuristic Tech (Default)</div>;
        break;

      default:
        output = (
          <div className="text-rose-400 text-xs">
            Command not recognized: &quot;{cmd}&quot;. Type <span className="text-white font-bold">&quot;help&quot;</span> for a list of valid commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: raw, output }]);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20">
      <div className="rounded-3xl bg-slate-950 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-3 text-xs font-mono text-neutral-400">
              KARRIM@portfolio: ~ (bash simulated shell)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setHistory([])}
              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-white/5 transition-colors"
              title="Clear Terminal"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* Terminal Content Area */}
        <div
          className="p-6 font-mono text-xs sm:text-sm min-h-[500px] max-h-[650px] overflow-y-auto space-y-4"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              {item.command !== "init" && (
                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="text-emerald-400">KARRIM@portfolio:~$</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
              )}
              <div className="pl-2 border-l border-white/10">{item.output}</div>
            </div>
          ))}

          {/* Prompt input line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeCommand(input);
            }}
            className="flex items-center gap-2 pt-2"
          >
            <span className="text-emerald-400 shrink-0">KARRIM@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Type "help", "projects", or "about"...'
              className="flex-1 bg-transparent text-white focus:outline-none placeholder-neutral-600 font-mono caret-cyan-400"
              autoFocus
            />
          </form>

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
