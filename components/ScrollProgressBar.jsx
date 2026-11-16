"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { bounce: 0, duration: 0.35 });

  return (
    <motion.div className="scroll-progress-bar" style={{ scaleX }} aria-hidden="true" />
  );
}
