"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useInView,
  useReducedMotion
} from "framer-motion";
import Icon from "@/components/Icon";

const allocations = [
  ["Transport", 45000, "88%"],
  ["Food", 60000, "56%"],
  ["Bills", 120000, "92%"]
];

function AnimatedAmount({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const formatted = useTransform(count, (latest) => `NGN ${Math.round(latest).toLocaleString()}`);

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [isInView, value, shouldReduceMotion, count]);

  return <motion.span ref={ref}>{formatted}</motion.span>;
}

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
              <AnimatedAmount value={amount} />
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
