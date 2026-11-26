"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }) {
  const reduce = useReducedMotion();
  const pathname = usePathname() || "";

  // The admin area renders without the fade-in. The fade starts the page at
  // opacity 0 and needs JavaScript to reveal it, so a failed script load
  // (for example an open tab after a redeploy) left admin pages blank.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return children;
  }

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
