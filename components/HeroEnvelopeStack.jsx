"use client";

import { motion, useReducedMotion } from "framer-motion";

const cards = [
  {
    kind: "balance",
    title: "Total balance",
    amount: "₦450,000",
    rows: [
      { label: "Budgeted", value: "₦382,000" },
      { label: "Wallet", value: "₦68,000" }
    ]
  },
  {
    kind: "envelope",
    title: "Transport",
    percent: 60,
    available: "₦600",
    locked: false,
    action: "Fund"
  },
  {
    kind: "envelope",
    title: "Parents",
    percent: 100,
    available: "₦5,000",
    locked: false,
    action: "Send"
  },
  {
    kind: "envelope",
    title: "Tithe",
    percent: 0,
    available: "Locked till Sunday",
    locked: true,
    action: null
  }
];

export default function HeroEnvelopeStack() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="hero-stack" aria-hidden="true">
      <div className="hero-stack__backdrop">
        <img src="/images/wisemonie1.jpeg" alt="" />
      </div>
      <div className="hero-stack__cards">
        {cards.map((card, index) => (
          <motion.div
            className="stack-card"
            key={card.title}
            initial={
              shouldReduceMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: -22, scale: 0.95 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.5 + index * 0.16,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {card.kind === "balance" ? (
              <>
                <span className="stack-card__label">{card.title}</span>
                <strong className="stack-card__amount">{card.amount}</strong>
                <div className="stack-card__rows">
                  {card.rows.map((row) => (
                    <div key={row.label}>
                      <span>{row.label}</span>
                      <strong>{row.value}</strong>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="stack-card__head">
                  <strong>{card.title}</strong>
                </div>
                <div className="stack-card__bar">
                  <span style={{ width: `${card.percent}%` }} />
                </div>
                <div className="stack-card__foot">
                  <span className={card.locked ? "is-locked" : "is-available"}>
                    {card.locked ? card.available : `Available ${card.available}`}
                  </span>
                  {card.action ? <span className="stack-card__action">{card.action}</span> : null}
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
