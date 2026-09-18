"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, Terminal, Bot, FileText, ArrowRight, Heart, ChevronRight, Send } from "lucide-react";
import { siteConfig } from "@/config/site";

const pages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academic", href: "/academic" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Learning", href: "/learning" },
  { label: "Contact", href: "/contact" },
];

const interactive = [
  { label: "AI Assistant", href: "/ai-assistant", icon: Bot, color: "text-violet-400" },
  { label: "Terminal", href: "/terminal", icon: Terminal, color: "text-cyan-400" },
  { label: "Resume / CV", href: "/resume", icon: FileText, color: "text-neutral-300" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative w-full overflow-hidden bg-black/20 backdrop-blur-md border-t border-white/10" aria-label="Site footer">
      {/* Top subtle glow separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-900/40 to-transparent" />

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* ── Column 1: Brand ── */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label="Home">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-violet-500/20">
                K
              </span>
              <span className="font-bold text-white text-lg tracking-tight group-hover:text-violet-300 transition-colors">
                Karrim
              </span>
            </Link>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-[220px]">
              AI/ML Student &amp; Developer. Building intelligent, data-driven software solutions.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-1 pt-1">
              {[
                { href: "https://github.com/K208-K" , label: "GitHub", icon: Github },
                { href: "https://www.linkedin.com/in/abdul-karim-2001081bb/", label: "LinkedIn", icon: Linkedin },
                { href: `mailto:abdulkarim9991@gmail.com`, label: "Email", icon: Mail },
                { href: "#", label: "Twitter / X", icon: Twitter },
              ].map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <Icon size={15} />
                </Link>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="mt-3 border-l-2 border-red-600/60 pl-3">
              <p className="text-xs italic text-neutral-500">&ldquo;Discipline builds freedom.&rdquo;</p>
              <cite className="text-xs text-neutral-600 not-italic">— Karrim</cite>
            </blockquote>
          </div>

          {/* ── Column 2: Pages ── */}
          <div>
            <h3 className="text-[11px] font-bold text-neutral-300 uppercase tracking-[0.2em] mb-5">
              Pages
            </h3>
            <ul className="space-y-2.5">
              {pages.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-neutral-500 hover:text-white transition-colors duration-150"
                  >
                    <ChevronRight
                      size={12}
                      className="text-red-500/70 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Interactive ── */}
          <div>
            <h3 className="text-[11px] font-bold text-neutral-300 uppercase tracking-[0.2em] mb-5">
              Interactive
            </h3>
            <ul className="space-y-3">
              {interactive.map(({ label, href, icon: Icon, color }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-2 text-sm text-neutral-500 hover:${color} transition-colors duration-150`}
                  >
                    <Icon size={14} className={color} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Availability Badge */}
            <div className="mt-6 pt-5 border-t border-white/[0.06]">
              <span className="inline-flex items-center gap-2 text-xs text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                Open to internships
              </span>
              <p className="text-xs text-neutral-600 mt-0.5 ml-4">and opportunities</p>
            </div>

            {/* CTA Card */}
            <Link
              href="/contact"
              className="mt-5 flex items-center justify-between gap-3 p-3.5 rounded-xl bg-gradient-to-r from-red-900/30 to-red-800/20 border border-red-700/30 hover:border-red-600/50 hover:bg-red-900/40 transition-all duration-200 group"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-red-600/30 flex items-center justify-center">
                  <Send size={12} className="text-red-400" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">Let&apos;s build something amazing.</p>
                  <p className="text-[11px] text-neutral-500">Feel free to reach out!</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-red-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* ── Column 4: Stay Connected / Newsletter ── */}
          <div>
            <h3 className="text-[11px] font-bold text-neutral-300 uppercase tracking-[0.2em] mb-5">
              Stay Connected
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed mb-5">
              Get updates on my latest projects, blogs, and learnings.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-900/20 border border-emerald-700/30 text-emerald-400 text-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                You&apos;re subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full pl-8 pr-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-red-600/50 focus:bg-white/8 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors shadow-[0_0_14px_rgba(220,38,38,0.35)] hover:shadow-[0_0_20px_rgba(220,38,38,0.55)] whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-[11px] text-neutral-600 pl-1">No spam. Just meaningful updates.</p>
              </form>
            )}
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
          <p>© {year} Abdul Karim (Karrim). All rights reserved.</p>

          {/* Mantra */}
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-red-700/60" />
            <span className="tracking-[0.18em] text-neutral-600 uppercase text-[10px]">
              Build &bull; Learn &bull; Improve &bull; Repeat
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-red-700/60" />
          </div>

          <p className="flex items-center gap-1">
            Built with{" "}
            <Heart size={11} className="text-red-500 fill-red-500 mx-0.5" />{" "}
            using{" "}
            <span className="text-violet-400 font-medium">Next.js</span>,{" "}
            <span className="text-cyan-400 font-medium">TypeScript</span>{" "}
            &amp;{" "}
            <span className="text-emerald-400 font-medium">AI</span>
          </p>
        </div>
      </div>
    </footer>
  );
}