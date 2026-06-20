"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import RevealGroup from "@/components/RevealGroup";
import RevealItem from "@/components/RevealItem";
import Icon from "@/components/Icon";

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <RevealGroup as="div" className="faq-grid">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <RevealItem
            as="article"
            hover={false}
            className={`faq-item${isOpen ? " faq-item--open" : ""}`}
            key={item.question}
          >
            <button
              type="button"
              className="faq-item__trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <h3>{item.question}</h3>
              <span className="faq-item__chevron">
                <Icon name="chevron_down" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  className="faq-item__panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
