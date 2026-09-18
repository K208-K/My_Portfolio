"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { siteConfig } from "@/config/site";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-neutral-300">
            {profile.availability}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-2"
        >
          <div className="text-xs sm:text-sm font-mono tracking-widest uppercase text-violet-400">
            AI / ML Student &bull; Quantum University
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
            KARRIM
          </h1>
          <p className="text-lg sm:text-2xl font-medium bg-gradient-to-r from-violet-300 via-cyan-200 to-white bg-clip-text text-transparent">
            Data &bull; AI &bull; Software
          </p>
        </motion.div>

        {/* Short Bio */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed drop-shadow"
        >
          {profile.shortBio}
        </motion.p>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-2 flex flex-wrap justify-center items-center gap-3"
        >
          <Link
            href="/projects"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-950 font-semibold text-sm hover:bg-neutral-200 transition-all shadow-lg shadow-white/10 hover:scale-[1.02]"
          >
            <span>View Projects</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/resume"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 border border-white/15 text-white font-medium text-sm hover:bg-white/10 backdrop-blur-md transition-all hover:scale-[1.02]"
          >
            <FileText size={16} className="text-violet-400" />
            <span>View Resume / CV</span>
          </Link>

          <a
            href={profile.resumePath}
            download="Karrim_Resume.pdf"
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 text-neutral-300 text-sm hover:text-white hover:bg-white/10 backdrop-blur-md transition-all"
            title="Download Resume"
          >
            <Download size={15} />
            <span className="hidden sm:inline">Download</span>
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-4 flex justify-center items-center gap-4 text-neutral-400"
        >
          <Link
            href="https://github.com/K208-K"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="flex items-center gap-1.5 text-xs hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
          >
            <Github size={16} />
            <span>GitHub</span>
          </Link>
          <span className="text-neutral-700">&bull;</span>
          <Link
            href="https://www.linkedin.com/in/abdul-karim-2001081bb/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="flex items-center gap-1.5 text-xs hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
          >
            <Linkedin size={16} />
            <span>LinkedIn</span>
          </Link>
          <span className="text-neutral-700">&bull;</span>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 text-xs hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
          >
            <Mail size={16} />
            <span>Contact</span>
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <div className="pt-8 flex flex-col items-center gap-2 opacity-60">
          <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
            Scroll to scrub animation &bull; Explore portfolio
          </span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-violet-400 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
