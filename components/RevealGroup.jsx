"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function RevealGroup({ as = "div", className = "", stagger = 0.08, children, ...rest }) {
  const Tag = motion[as] || motion.div;
  const shouldReduceMotion = useReducedMotion();
  const effectiveStagger = shouldReduceMotion ? 0 : stagger;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: effectiveStagger, delayChildren: shouldReduceMotion ? 0 : 0.04 } }
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
