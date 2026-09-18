"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useSmoothScroll } from "@/components/global/SmoothScroll";

const TOTAL_FRAMES = 151;

function getFrameSrc(index: number) {
  const frameNum = String(index + 1).padStart(3, "0");
  return `/img/ezgif-frame-${frameNum}.jpg`;
}

export default function FullPageScrollCanvas() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { lenis } = useSmoothScroll();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Draw a frame using cover-fit scaling on the canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameIndex)));
    let img = imagesRef.current[idx];

    // Fall back to nearest available frame
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[idx - offset];
        if (prev?.complete && prev.naturalWidth > 0) { img = prev; break; }
        const next = imagesRef.current[idx + offset];
        if (next?.complete && next.naturalWidth > 0) { img = next; break; }
      }
    }
    if (!img?.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const nw = img.naturalWidth * scale;
    const nh = img.naturalHeight * scale;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - nw) / 2, (ch - nh) / 2, nw, nh);
  }, []);

  // Resize canvas to match viewport at device pixel ratio
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(window.innerWidth * dpr);
    const h = Math.round(window.innerHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      drawFrame(currentFrameRef.current);
    }
  }, [drawFrame]);

  // Preload all frames
  useEffect(() => {
    if (!isHome) return;

    const images: HTMLImageElement[] = [];
    let cancelled = false;

    currentFrameRef.current = 0;
    targetFrameRef.current = 0;

    // Frame 0 first for instant first paint
    const first = new Image();
    first.src = getFrameSrc(0);
    first.onload = () => {
      if (cancelled) return;
      images[0] = first;
      imagesRef.current = images;
      resizeCanvas();
      drawFrame(0);
    };
    images[0] = first;

    // All remaining frames
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      images[i] = img;
    }
    imagesRef.current = images;

    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();

    return () => {
      cancelled = true;
      window.removeEventListener("resize", resizeCanvas);
      imagesRef.current = [];
    };
  }, [isHome, drawFrame, resizeCanvas]);

  // Map Lenis's current route-aware scroll state to the 151 frames.
  useEffect(() => {
    if (!isHome) {
      currentFrameRef.current = 0;
      targetFrameRef.current = 0;
      return;
    }

    const updateTargetFrame = () => {
      // Lenis owns the animated scroll position and recalculates its limit when
      // route content changes. The native values are only a reduced-motion
      // fallback while Lenis is unavailable.
      const maxScroll = lenis?.limit ?? document.documentElement.scrollHeight - window.innerHeight;
      const scroll = lenis?.scroll ?? window.scrollY;
      if (maxScroll <= 0) {
        targetFrameRef.current = 0;
        return;
      }
      const progress = Math.max(0, Math.min(1, scroll / maxScroll));
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    };

    const removeLenisListener = lenis?.on("scroll", updateTargetFrame);
    if (!lenis) {
      window.addEventListener("scroll", updateTargetFrame, { passive: true });
    }
    updateTargetFrame();

    // Next.js replaces route content asynchronously. Refresh Lenis after the
    // new Home DOM has committed, then initialise from its current geometry.
    const syncRouteGeometry = requestAnimationFrame(() => {
      lenis?.resize();
      resizeCanvas();
      updateTargetFrame();
    });

    // RAF lerp loop — silky interpolation
    let lastFrame = -1;
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.15;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }
      const rounded = Math.round(currentFrameRef.current);
      if (rounded !== lastFrame) {
        lastFrame = rounded;
        drawFrame(rounded);
      }
      rafIdRef.current = requestAnimationFrame(loop);
    };
    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(syncRouteGeometry);
      removeLenisListener?.();
      window.removeEventListener("scroll", updateTargetFrame);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isHome, lenis, drawFrame, resizeCanvas]);

  // Only render the scroll canvas animation on the home page
  if (!isHome) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none select-none"
      style={{ zIndex: 0 }}
    />
  );
}
