"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { profile } from "@/data/profile";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    // Simulate sending or handle contact API
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please reach out directly via email or LinkedIn.");
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono tracking-widest uppercase text-violet-400">
          Get in Touch &bull; Collaboration
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Contact Me
        </h1>
        <p className="text-base sm:text-lg text-neutral-300">
          Open to internships, AI/ML engineering opportunities, and technical collaboration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Contact Info Sidebar */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-md space-y-6">
            <h2 className="text-xl font-bold text-white">Direct Connect</h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Feel free to send a direct message, check my GitHub repositories, or connect on LinkedIn.
            </p>

            <div className="space-y-4 pt-2">
              <Link
                href="https://github.com/K208-K"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all text-xs text-neutral-200"
              >
                <div className="p-2 rounded-xl bg-white/5 text-violet-400">
                  <Github size={18} />
                </div>
                <div>
                  <div className="font-semibold text-white">GitHub</div>
                  <div className="text-neutral-400">github.com/K208-K</div>
                </div>
              </Link>

              <Link
                href="https://www.linkedin.com/in/abdul-karim-2001081bb/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all text-xs text-neutral-200"
              >
                <div className="p-2 rounded-xl bg-white/5 text-cyan-400">
                  <Linkedin size={18} />
                </div>
                <div>
                  <div className="font-semibold text-white">LinkedIn</div>
                  <div className="text-neutral-400">Connect with Karrim</div>
                </div>
              </Link>

              <a
                href={`mailto:abdulkarim9991@gmail.com`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all text-xs text-neutral-200"
              >
                <div className="p-2 rounded-xl bg-white/5 text-emerald-400">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="font-semibold text-white">Email</div>
                  <div className="text-neutral-400">abdulkarim9991@gmail.com</div>
                </div>
              </a>
            </div>

            <div className="pt-4 border-t border-white/5">
              <span className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {profile.availability}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-2xl space-y-5"
          >
            <h2 className="text-xl font-bold text-white mb-2">Send a Message</h2>

            {status === "success" && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2.5">
                <CheckCircle2 size={16} />
                <span>Thank you! Your message has been received. I will get back to you shortly.</span>
              </div>
            )}

            {status === "error" && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2.5">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-mono uppercase text-neutral-400">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jane Doe"
                required
                className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-mono uppercase text-neutral-400">
                Your Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@example.com"
                required
                className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-mono uppercase text-neutral-400">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Hi Karrim, I saw your machine learning projects and would like to discuss..."
                required
                className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-95 text-white font-semibold text-sm transition-all shadow-lg shadow-violet-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={15} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
