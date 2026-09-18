"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Critical System Error</h1>
        <p className="text-sm text-neutral-400 mb-6 max-w-md">
          A critical error occurred while rendering the application.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs transition-all"
        >
          Reload Application
        </button>
      </body>
    </html>
  );
}
