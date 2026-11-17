"use client";

import { useEffect, useRef, useState } from "react";

export default function EnvelopeFilm({ className = "" }) {
  const ref = useRef(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  const classes = `envelope-film${className ? ` ${className}` : ""}`;

  if (reduce) {
    return (
      <img
        className={classes}
        src="/images/brand/scene-envelopes.jpg"
        alt="Four envelopes on a table"
      />
    );
  }

  return (
    <video
      ref={ref}
      className={classes}
      src="/videos/envelopes.mp4"
      poster="/images/brand/scene-envelopes.jpg"
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="Envelopes opening on a table"
    />
  );
}
