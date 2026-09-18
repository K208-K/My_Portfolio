"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

const TOTAL_FRAMES = 151;


interface ScrollCanvasAnimationProps {
  className?: string;
  children?: React.ReactNode;
}

export default function ScrollCanvasAnimation({
  className = "",
  children,
}: ScrollCanvasAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);                                                           // changing here
  
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);

  const [overlayOpacity, setOverlayOpacity] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Helper to get image source path
  const getFrameSrc = (index: number) => {
    const frameNum = String(index + 1).padStart(3, "0");
    return `/img/ezgif-frame-${frameNum}.jpg`;
  };
  

  // Draw a specific frame on canvas with 'cover' aspect fit
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameIndex)));
    let img = imagesRef.current[clampedIndex];

    // Fallback to nearest loaded image if current frame hasn't completed loading yet
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[clampedIndex - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current[clampedIndex + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover math
    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const nx = (cw - nw) / 2;
    const ny = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, nx, ny, nw, nh);
  }, []);

  // Update canvas pixel dimensions matching DOM size & DPR
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      drawFrame(currentFrameRef.current);
    }
  }, [drawFrame]);

  // Preload frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    // 1. Immediately load frame 0
    const firstImg = new Image();
    firstImg.src = getFrameSrc(0);
    firstImg.onload = () => {
      images[0] = firstImg;
      setIsFirstFrameLoaded(true);
      resizeCanvas();
      drawFrame(0);
    };
    images[0] = firstImg;

    // 2. Load remaining frames sequentially/buffered
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / (TOTAL_FRAMES - 1)) * 100));
      };
      images[i] = img;
    }

    imagesRef.current = images;

    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [drawFrame, resizeCanvas]);

  // Scroll listener & continuous RAF interpolation (lerp)
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollDistance = container.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) return;

      // Scrolled amount within container
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollDistance));

      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
      setScrollProgress(progress);

      // Fade overlay smoothly between 0% and 25% of scroll progress
      const fadeThreshold = 0.22;
      const opacity = Math.max(0, Math.min(1, 1 - progress / fadeThreshold));
      setOverlayOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Lerp loop for ultra-smooth fluid frame transitions
    let lastRenderedFrame = -1;
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;

      // Snappy yet silky interpolation
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.16;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const rounded = Math.round(currentFrameRef.current);
      if (rounded !== lastRenderedFrame) {
        lastRenderedFrame = rounded;
        drawFrame(rounded);
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [drawFrame]);

  return (
    <div
      ref={containerRef}
      id="home"
      className={`relative w-full h-[320vh] ${className}`}
    >
      {/* Sticky viewport frame holding the canvas */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-background">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Cinematic Vignette Overlay to blend seamlessly into dark UI */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-background/90 pointer-events-none" />

        {/* Children / Hero content positioned over the canvas with scroll fade */}
        {children && (
          <div
            style={{
              opacity: overlayOpacity,
              pointerEvents: overlayOpacity > 0.05 ? "auto" : "none",
              transform: `translateY(${(1 - overlayOpacity) * -24}px)`,
              transition: "transform 0.1s ease-out",
            }}
            className="relative z-10 w-full h-full flex flex-col justify-center items-center"
          >
            {children}
          </div>
        )}

        {/* Subtle scroll indicator / progress feedback */}
        <div
          style={{ opacity: Math.max(0, 1 - scrollProgress * 5) }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-200"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
            Scroll to Animate
          </span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-accent-crimson animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
