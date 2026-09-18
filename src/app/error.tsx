"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-6">
      <div className="p-4 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
        <AlertTriangle size={32} />
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
          An unexpected runtime error occurred. You can retry the operation or navigate back to the home page.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-all shadow-lg"
        >
          <RotateCcw size={14} />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-medium text-xs hover:bg-white/10 transition-all"
        >
          <Home size={14} />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
