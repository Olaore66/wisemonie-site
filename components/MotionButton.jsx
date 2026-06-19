"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function MotionButton({ as = "a", className = "", children, ...rest }) {
  const Tag = motion[as] || motion.a;
  const shouldReduceMotion = useReducedMotion();

  return (
    <Tag
      className={className}
      {...(shouldReduceMotion
        ? {}
        : {
            whileHover: { y: -3, scale: 1.02 },
            whileTap: { scale: 0.96 },
            transition: { type: "spring", stiffness: 400, damping: 22 }
          })}
      {...rest}
    >
      {children}
    </Tag>
  );
}
