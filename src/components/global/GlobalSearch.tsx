"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, FolderGit2, Sparkles, GraduationCap, BookOpen, User, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { education } from "@/data/education";
import { learningItems } from "@/data/learning";

interface SearchItem {
  id: string;
  title: string;
  category: string;
  href: string;
  icon: React.ElementType;
  description?: string;
}

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // All indexed items
  const allItems: SearchItem[] = [
    {
      id: "about-page",
      title: "About Abdul Karim (Karrim)",
      category: "About",
      href: "/about",
      icon: User,
      description: "Bio, career direction, and engineering philosophy.",
    },
    {
      id: "academic-page",
      title: "Academic Journey",
      category: "Academic",
      href: "/academic",
      icon: GraduationCap,
      description: "Quantum University B.Tech AI/ML and educational milestones.",
    },
    {
      id: "skills-page",
      title: "Technical Skills Overview",
      category: "Skills",
      href: "/skills",
      icon: Sparkles,
      description: "Categorized skills in Python, ML, Deep Learning, and Web.",
    },
    {
      id: "learning-page",
      title: "Learning Journey",
      category: "Learning",
      href: "/learning",
      icon: BookOpen,
      description: "Completed, currently learning, and future technical roadmap.",
    },
    // Projects
    ...projects.map((p) => ({
      id: `proj-${p.id}`,
      title: p.title,
      category: `Project (${p.categoryLabel})`,
      href: `/projects/${p.category}/${p.slug}`,
      icon: FolderGit2,
      description: p.description,
    })),
    // Skills categories
    ...skillCategories.map((c) => ({
      id: `skill-${c.id}`,
      title: `${c.label} Skills`,
      category: "Skills",
      href: "/skills",
      icon: Sparkles,
      description: c.skills.map((s) => s.name).join(", "),
    })),
  ];

  const filteredItems = query.trim()
    ? allItems.filter((item) => {
        const text = `${item.title} ${item.category} ${item.description || ""}`.toLowerCase();
        return text.includes(query.toLowerCase());
      })
    : allItems.slice(0, 6);

  // Keyboard shortcut Ctrl+K or / or T
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is inside an input/textarea
      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "/" && !isInput) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Navigate with up/down arrows
  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      const item = filteredItems[selectedIndex];
      setIsOpen(false);
      router.push(item.href);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md transition-all"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Global search command palette"
    >
      <div
        className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyNavigation}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search size={18} className="text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search projects, skills, academic, or learning... (Esc to close)"
            className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded text-neutral-400 hover:text-white"
              aria-label="Clear query"
            >
              <X size={14} />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono text-neutral-400 bg-white/5 border border-white/10 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-white/[0.04]">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-neutral-400">
              No results found for &ldquo;<span className="text-white">{query}</span>&rdquo;
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                    isSelected ? "bg-white/10 text-white" : "text-neutral-300 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        isSelected ? "bg-violet-600/30 text-violet-300" : "bg-white/5 text-neutral-400"
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="truncate">
                      <div className="text-sm font-medium text-white truncate">{item.title}</div>
                      {item.description && (
                        <div className="text-xs text-neutral-400 truncate">{item.description}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-neutral-400">
                      {item.category}
                    </span>
                    <ArrowRight size={14} className={isSelected ? "text-violet-400" : "text-neutral-600"} />
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 bg-slate-950/70 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500">
          <span>Navigate with ↑ ↓ and Enter</span>
          <span>Shortcut: Ctrl + K or /</span>
        </div>
      </div>
    </div>
  );
}
