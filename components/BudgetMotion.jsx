"use client";

import { motion, useReducedMotion } from "framer-motion";
import Icon from "@/components/Icon";

const allocations = [
  ["Transport", "NGN 45,000", "88%"],
  ["Food", "NGN 60,000", "56%"],
  ["Bills", "NGN 120,000", "92%"]
];

export default function BudgetMotion() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="budget-motion"
      aria-label="Example budget allocation progress"
      initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.93 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="panel-heading">
        <strong>Live allocation</strong>
        <Icon name="auto_graph" />
      </div>
      {allocations.map(([name, amount, width]) => (
        <div className="budget-row" key={name}>
          <div>
            <div className="budget-row__top">
              <strong>{name}</strong>
              <span>{amount}</span>
            </div>
            <div className="progress-track">
              <motion.div
                className="progress-fill"
                initial={{ width: shouldReduceMotion ? width : 0 }}
                whileInView={{ width }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 1.1,
                  delay: shouldReduceMotion ? 0 : 0.25,
                  ease: [0.16, 1, 0.3, 1]
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
