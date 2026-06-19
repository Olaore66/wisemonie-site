"use client";

import { motion, useReducedMotion } from "framer-motion";

const variants = {
  up: { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -34 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 34 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.93 }, visible: { opacity: 1, scale: 1 } }
};

const staticVariants = { hidden: { opacity: 1 }, visible: { opacity: 1 } };

export default function Reveal({
  as = "div",
  variant = "up",
  delay = 0,
  duration = 0.7,
  className = "",
  children,
  ...rest
}) {
  const Tag = motion[as] || motion.div;
  const shouldReduceMotion = useReducedMotion();

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      variants={shouldReduceMotion ? staticVariants : variants[variant] || variants.up}
      transition={shouldReduceMotion ? { duration: 0 } : { duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
