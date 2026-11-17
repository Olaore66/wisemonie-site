"use client";

import { useEffect, useRef, useState } from "react";
import Envelope from "@/components/Envelope";

const steps = [
  { label: "Rent", amount: "₦80K", tone: "lagoon" },
  { label: "Tithe", amount: "₦15K", tone: "teal" },
  { label: "Parents", amount: "₦20K", tone: "ink" },
  { label: "Savings", amount: "₦25K", tone: "lagoon" }
];

export default function EssentialFirstFlow() {
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
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <figure
      ref={ref}
      className={`feat-order__flow${visible ? " is-in" : ""}`}
      aria-label="On payday, rent, tithe, parents and savings are funded first. Only what is left becomes flex money."
    >
      <ol>
        {steps.map((step) => (
          <li key={step.label} className={`feat-order__row feat-order__row--${step.tone}`}>
            <Envelope className="feat-order__mark" />
            <span>{step.label}</span>
            <strong>{step.amount}</strong>
          </li>
        ))}
        <li className="feat-order__row feat-order__row--lime">
          <Envelope className="feat-order__mark" />
          <span>Flex</span>
          <strong>What's left</strong>
        </li>
      </ol>
    </figure>
  );
}
