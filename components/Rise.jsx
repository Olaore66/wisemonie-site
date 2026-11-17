"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Rise({ children, className, id }) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      className={className}
      id={id}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.section>
  );
}
