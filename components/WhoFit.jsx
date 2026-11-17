"use client";

import { useEffect, useRef, useState } from "react";
import Envelope from "@/components/Envelope";
import { targetPersona } from "@/data/productContent";

const tones = ["lagoon", "teal", "ink", "lime", "teal"];

export default function WhoFit() {
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
      aria-label={targetPersona.closing}
    >
      <ol>
        {targetPersona.points.map((point, index) => (
          <li key={point} className={`feat-order__row feat-order__row--line feat-order__row--${tones[index]}`}>
            <Envelope className="feat-order__mark" />
            <span>{point}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
