"use client";

import { motion, useReducedMotion } from "framer-motion";

const itemVariants = {
  up: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  }
};

const staticVariants = { hidden: { opacity: 1 }, visible: { opacity: 1 } };

const hoverLift = {
  whileHover: { y: -7, scale: 1.012, transition: { type: "spring", stiffness: 320, damping: 22 } },
  whileTap: { scale: 0.985, transition: { type: "spring", stiffness: 400, damping: 25 } }
};

export default function RevealItem({
  as = "article",
  variant = "up",
  className = "",
  hover = true,
  children,
  ...rest
}) {
  const Tag = motion[as] || motion.div;
  const shouldReduceMotion = useReducedMotion();
  const variantsToUse = shouldReduceMotion ? staticVariants : itemVariants[variant] || itemVariants.up;

  return (
    <Tag
      className={className}
      variants={variantsToUse}
      {...(hover && !shouldReduceMotion ? hoverLift : {})}
      {...rest}
    >
      {children}
    </Tag>
  );
}
