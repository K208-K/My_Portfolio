"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  // Clean phone number (digits only for wa.me URL)
  const rawNumber = siteConfig.whatsapp || "+919534957390";
  const cleanNumber = rawNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    "Hi Abdul Karim, I visited your portfolio and would like to connect!"
  )}`;

  return (
    <aside
      aria-label="Contact via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-end select-none pointer-events-auto"
    >
      <div className="relative flex items-center">
        {/* Hover / Active Tooltip Badge (Positioned to the left of the button) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: -14, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="absolute right-full whitespace-nowrap bg-slate-900/95 text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/10 shadow-xl backdrop-blur-md flex items-center gap-2 pointer-events-none"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>Chat with Abdul Karim</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glowing pulse rings */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none"
          style={{ animationDuration: "2.5s" }}
        />
        <span className="absolute -inset-2 rounded-full bg-[#25D366]/20 blur-sm pointer-events-none" />

        {/* WhatsApp Floating Button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="whatsapp-button"
          aria-label="Chat with Abdul Karim on WhatsApp"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.7)] transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          {/* WhatsApp Authentic SVG Icon */}
          <svg
            className="w-8 h-8 fill-current drop-shadow-sm"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.275-.1-.476-.15-.676.15-.2.301-.776.98-.952 1.18-.175.2-.351.226-.651.076-.301-.15-1.27-.468-2.42-1.493-.894-.798-1.498-1.783-1.674-2.083-.175-.3-.019-.462.131-.611.136-.134.301-.35.451-.525.15-.175.2-.301.301-.501.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-.926-2.233-.244-.588-.492-.508-.676-.517l-.576-.01c-.2 0-.525.075-.801.375s-1.052 1.028-1.052 2.508 1.077 2.908 1.228 3.109c.15.2 2.119 3.235 5.133 4.537.717.31 1.277.495 1.713.633.72.229 1.376.197 1.895.12.578-.087 1.78-.727 2.031-1.429.251-.702.251-1.303.175-1.429-.075-.125-.276-.2-.577-.35zM12.04 2C6.505 2 2.012 6.49 2.012 12.02c0 1.944.557 3.76 1.524 5.302L2 22l4.81-1.478a9.988 9.988 0 0 0 5.23 1.498c5.534 0 10.027-4.49 10.027-10.02S17.574 2 12.04 2zm0 18.293c-1.616 0-3.111-.47-4.38-1.28l-.314-.201-2.854.877.893-2.784-.22-.35a8.212 8.212 0 0 1-1.378-4.535c0-4.57 3.719-8.289 8.253-8.289 4.533 0 8.252 3.719 8.252 8.289 0 4.57-3.719 8.288-8.252 8.288z" />
          </svg>
        </motion.a>
      </div>
    </aside>
  );
}
