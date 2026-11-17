"use client";

import { useEffect, useRef, useState } from "react";
import Envelope from "@/components/Envelope";

const segments = [
  { label: "Rent", amount: "₦80K", pct: 40, className: "seg--rent" },
  { label: "Tithe", amount: "₦25K", pct: 12.5, className: "seg--tithe" },
  { label: "Family", amount: "₦20K", pct: 10, className: "seg--family" },
  { label: "Debt", amount: "₦15K", pct: 7.5, className: "seg--debt" },
  { label: "Left to live", amount: "₦60K", pct: 30, className: "seg--left" }
];

export default function SalaryAllocation() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <figure
      ref={ref}
      className={`allocation${visible ? " is-in" : ""}`}
      aria-label="Of a ₦200,000 salary, ₦140,000 is already committed to rent, tithe, family and debt, leaving ₦60,000 to actually live on."
    >
      <ul className="allocation__rows">
        {segments.map((segment) => (
          <li key={segment.label} className={`allocation__row ${segment.className}`}>
            <span className="allocation__name">{segment.label}</span>
            <span className="allocation__track" aria-hidden="true">
              <Envelope className="allocation__env" style={{ "--pct": `${segment.pct}%` }} />
            </span>
            <span className="allocation__legend-amt">{segment.amount}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
