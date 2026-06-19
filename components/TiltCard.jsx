"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

const springConfig = { stiffness: 150, damping: 18, mass: 0.4 };

export default function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const enabledRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), springConfig);

  useEffect(() => {
    enabledRef.current =
      !shouldReduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, [shouldReduceMotion]);

  function handleMouseMove(event) {
    if (!enabledRef.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      className={`tilt-card ${className}`}
      style={{ transformPerspective: 900, rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
