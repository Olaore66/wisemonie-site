"use client";

import { useEffect, useRef, useState } from "react";
import Envelope from "@/components/Envelope";
import { homeAudience } from "@/data/productContent";

const tones = ["lagoon", "teal", "ink", "lime"];

export default function WhoAudience() {
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
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <ol ref={ref} className={`feat__list${visible ? " is-in" : ""}`}>
      {homeAudience.personas.map((persona, index) => (
        <li key={persona.title} className={`feat__row feat__row--${tones[index % tones.length]}`}>
          <Envelope className="feat__mark" />
          <div>
            <h2>{persona.title}</h2>
            <p>{persona.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
