"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement, options?: Parameters<Lenis["scrollTo"]>[1]) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for user's motion preferences
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let lenis: Lenis | null = null;

    const initLenis = () => {
      // If user prefers reduced motion, do not initialize smooth inertia
      if (motionQuery.matches) {
        if (lenisRef.current) {
          lenisRef.current.destroy();
          lenisRef.current = null;
          setLenisInstance(null);
        }
        return;
      }

      // Initialize Lenis with tuned parameters for a responsive, fluid feel
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        syncTouch: false,
      });

      lenisRef.current = lenis;
      setLenisInstance(lenis);

      // RAF animation loop
      const raf = (time: number) => {
        lenis?.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      };

      rafIdRef.current = requestAnimationFrame(raf);
    };

    initLenis();

    // Smooth anchor navigation handler
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          if (lenisRef.current && !motionQuery.matches) {
            lenisRef.current.scrollTo(targetElement as HTMLElement, {
              offset: -40,
              duration: 1.2,
            });
            // Update browser URL hash without jump
            window.history.pushState(null, "", href);
          } else {
            // Fallback for reduced motion or non-lenis
            targetElement.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", href);
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Listen for OS reduced motion toggle
    const handleMotionChange = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      initLenis();
    };

    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      motionQuery.removeEventListener("change", handleMotionChange);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  const scrollTo = (
    target: string | HTMLElement,
    options?: Parameters<Lenis["scrollTo"]>[1]
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    } else if (typeof target === "string") {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
