"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (prefersReducedMotion || !hasFinePointer) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      syncTouch: false
    });

    let frameId = requestAnimationFrame(raf);
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return null;
}
