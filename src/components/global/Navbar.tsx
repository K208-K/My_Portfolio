"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, FileText, Github, Linkedin, Mail, Search } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  // Accessibility focus management for drawer
  useEffect(() => {
    if (!menuOpen) return;
    const el = drawerRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll<HTMLElement>(
      'a,button,[tabindex]:not([tabindex="-1"])'
    );
    focusable[0]?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // social links for GitHub, LinkedIn, and Email
  const socialLinks = [
    { href: "https://github.com/K208-K", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/abdul-karim-2001081bb/", icon: Linkedin, label: "LinkedIn" },
    { href: "mailto:abdulkarim9991k@gmail.com", icon: Mail, label: "Email" },
  ];

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-0.5"
            : "bg-transparent backdrop-blur-sm border-b border-white/5 py-1"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-[56px] justify-between gap-4">

            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 group focus:outline-none"
              aria-label="Karrim portfolio home"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-violet-500/20 group-hover:shadow-cyan-500/40 transition-shadow duration-300"
              >
                <div className="w-full h-full bg-neutral-950/90 backdrop-blur-sm rounded-[11px] flex items-center justify-center">
                  <span className="font-black text-transparent bg-clip-text bg-gradient-to-tr from-violet-400 to-cyan-300 text-base font-mono">
                    K
                  </span>
                </div>
              </motion.div>

              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-white text-[15px] tracking-tight group-hover:text-cyan-300 transition-colors">
                  Karrim
                </span>
                <span className="text-[10px] font-mono font-medium text-neutral-400 flex items-center gap-1 tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AI/ML Dev
                </span>
              </div>
            </Link>

            {/* ── Desktop Navigation ── */}
            <nav
              className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/10 p-1 rounded-full backdrop-blur-md shadow-inner"
              role="navigation"
              aria-label="Main navigation"
              onMouseLeave={() => setHoveredNav(null)}
            >
              {mainNav.map((item) => {
                const active = isActive(item.href);
                const isHovered = hoveredNav === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setHoveredNav(item.href)}
                    className={`relative px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-200 rounded-full ${
                      active || isHovered
                        ? "text-white"
                        : "text-neutral-400 hover:text-neutral-100"
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>

                    {/* Hover Glow Effect */}
                    {isHovered && !active && (
                      <motion.div
                        layoutId="navbar-hover"
                        className="absolute inset-0 bg-white/10 rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Active Route Pill */}
                    {active && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-gradient-to-r from-red-600/80 via-orange-500/80 to-amber-500/80 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.5)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}

              <div className="w-px h-4 bg-white/10 mx-1" />

              {/* Social Links Embedded in Navigation Bar */}
              <div className="flex items-center gap-0.5">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.1, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors block"
                    >
                      <Icon size={14} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* ── Desktop Actions ── */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  window.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "K", ctrlKey: true })
                  );
                }}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-400 bg-white/5 border border-white/10 rounded-full hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 backdrop-blur-sm"
                aria-label="Search portfolio"
              >
                <Search size={13} className="text-cyan-400" />
                <span className="font-medium text-neutral-300">Search</span>
                <kbd className="font-mono text-[10px] bg-black/60 px-1.5 py-0.5 rounded-md text-neutral-400 border border-white/10 ml-1">
                  ⌘K
                </kbd>
              </motion.button>

              <div className="w-px h-4 bg-white/10 mx-1" />

              {/* Glowing CTA Resume Button */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/resume"
                  className="relative group flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_22px_rgba(239,68,68,0.7)] transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <Download size={13} className="relative z-10" />
                  <span className="relative z-10">Resume</span>
                </Link>
              </motion.div>
            </div>

            {/* ── Mobile Hamburger ── */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2 text-neutral-300 hover:text-white rounded-xl bg-white/5 border border-white/10 backdrop-blur-md transition-colors"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
            >
              <Menu size={20} />
            </motion.button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <motion.div
              key="drawer"
              id="mobile-drawer"
              ref={drawerRef}
              role="dialog"
              aria-label="Navigation menu"
              aria-modal="true"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-80 bg-neutral-950/80 backdrop-blur-2xl border-l border-white/10 flex flex-col justify-between overflow-y-auto shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-400 p-[1px]">
                    <div className="w-full h-full bg-black rounded-[7px] flex items-center justify-center font-mono font-bold text-cyan-400 text-sm">
                      K
                    </div>
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-white font-extrabold text-sm">Karrim</span>
                    <span className="text-[10px] font-mono text-red-400">AI/ML Developer</span>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors border border-white/10"
                >
                  <X size={16} />
                </motion.button>
              </div>

              {/* Drawer Links */}
              <nav className="flex flex-col px-4 py-6 gap-1.5" aria-label="Mobile navigation">
                {mainNav.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, ease: "easeOut" }}
                      whileHover={{ x: 4 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          active
                            ? "text-white bg-gradient-to-r from-red-600/30 via-orange-500/20 to-transparent border border-red-500/30 shadow-lg shadow-red-900/20"
                            : "text-neutral-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span>{item.label}</span>
                        {active && (
                          <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)] animate-pulse" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-white/10 bg-white/[0.02] flex flex-col gap-3">
                <Link
                  href="/resume"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white text-sm font-bold shadow-lg shadow-red-900/30 hover:opacity-95 transition-all"
                >
                  <Download size={15} />
                  Download Resume
                </Link>
                
                <Link
                  href="/resume"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-neutral-300 text-sm font-semibold hover:bg-white/10 hover:text-white transition-all"
                >
                  <FileText size={15} />
                  View Resume
                </Link>

                <div className="flex items-center justify-around pt-3">
                  {socialLinks.map(({ href, icon: Icon, label }) => (
                    <motion.div key={label} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Link
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        aria-label={label}
                        className="p-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors block"
                      >
                        <Icon size={16} />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}