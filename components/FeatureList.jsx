"use client";

import { useEffect, useRef, useState } from "react";
import Envelope from "@/components/Envelope";
import { moneyFeatures } from "@/data/productContent";

const tones = ["lagoon", "teal", "ink", "lime"];

export default function FeatureList() {
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
      { threshold: 0.01 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <ol ref={ref} className={`feat__list${visible ? " is-in" : ""}`}>
      {moneyFeatures.map((feature, index) => (
        <li key={feature.title} className={`feat__row feat__row--${tones[index % tones.length]}`}>
          <Envelope className="feat__mark" />
          <div>
            <h2>{feature.title}</h2>
            <p>{feature.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
