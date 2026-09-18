import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center space-y-6">
      <div className="p-4 rounded-3xl bg-violet-600/10 border border-violet-500/20 text-violet-400 font-mono text-3xl font-bold">
        404
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl font-bold text-white">Page Not Found</h1>
        <p className="text-sm text-neutral-400 leading-relaxed">
          The requested portfolio page or project does not exist or may have been moved.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-950 font-semibold text-xs hover:bg-neutral-200 transition-all shadow-lg"
        >
          <Home size={14} />
          <span>Return Home</span>
        </Link>
        <Link
          href="/projects"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-medium text-xs hover:bg-white/10 transition-all"
        >
          <Search size={14} />
          <span>Browse Projects</span>
        </Link>
      </div>
    </div>
  );
}
