import React from "react";
import type { Metadata } from "next";
import ProjectHubClient from "@/components/projects/ProjectHubClient";

export const metadata: Metadata = {
  title: "Projects",
  description: "Machine learning, deep learning, data science, and full-stack projects built by Abdul Karim (Karrim).",
};

export default function ProjectsPage() {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono tracking-widest uppercase text-violet-400">
          Portfolio Hub &bull; Engineering Artifacts
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Projects &amp; Case Studies
        </h1>
        <p className="text-base sm:text-lg text-neutral-300">
          Explore machine learning models, deep learning perception systems, data pipelines, and full-stack software applications.
        </p>
      </div>

      {/* Client Filter & Grid */}
      <ProjectHubClient />
    </div>
  );
}
