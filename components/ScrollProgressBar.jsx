"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 280, damping: 32, mass: 0.2 });

  return <motion.div className="scroll-progress-bar" style={{ scaleX }} aria-hidden="true" />;
}
