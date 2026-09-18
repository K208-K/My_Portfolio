import React from "react";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-2 ${alignClass} ${className}`}>
      {label && (
        <span className="text-[11px] font-mono tracking-widest uppercase text-violet-400">
          {label}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
