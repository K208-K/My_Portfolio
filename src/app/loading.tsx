import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
      <Loader2 size={32} className="animate-spin text-violet-400" />
      <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
        Loading Portfolio System...
      </span>
    </div>
  );
}
