"use client";

import { useEffect } from "react";

/** Marks the admin as started, which hides the "didn't start" box. */
export default function AdminReady() {
  useEffect(() => {
    document.documentElement.classList.add("admin-ready");
  }, []);
  return null;
}
