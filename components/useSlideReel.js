"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useSlideReel(count, intervalMs) {
  const [pos, setPos] = useState(0);
  const [motion, setMotion] = useState(true);
  const [reduce, setReduce] = useState(false);
  const [drag, setDrag] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [hidden, setHidden] = useState(false);
  const posRef = useRef(0);
  const originRef = useRef(null);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const sync = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  const next = useCallback(() => {
    setDrag(0);
    if (posRef.current >= count) {
      setMotion(false);
      setPos(0);
      posRef.current = 0;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setMotion(true);
          setPos(1);
        });
      });
      return;
    }
    setMotion(true);
    setPos(posRef.current + 1);
  }, [count]);

  const prev = useCallback(() => {
    setDrag(0);
    const current = posRef.current;
    if (current === 0 || current === count) {
      setMotion(false);
      setPos(count);
      posRef.current = count;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setMotion(true);
          setPos(count - 1);
        });
      });
      return;
    }
    setMotion(true);
    setPos(current - 1);
  }, [count]);

  const goTo = useCallback((index) => {
    setDrag(0);
    if (index === posRef.current % count) {
      setMotion(false);
      setPos(index);
      return;
    }
    setMotion(true);
    setPos(index);
  }, [count]);

  useEffect(() => {
    if (reduce || hovering || dragging || hidden) return undefined;
    const id = window.setInterval(next, intervalMs);
    return () => window.clearInterval(id);
  }, [reduce, hovering, dragging, hidden, intervalMs, next]);

  function onTransitionEnd(event) {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== "transform") return;
    if (posRef.current === count) {
      setMotion(false);
      setPos(0);
    }
  }

  function onPointerDown(event) {
    if (event.button !== 0) return;
    originRef.current = event.clientX;
    setDragging(true);
    setMotion(false);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event) {
    if (originRef.current == null) return;
    setDrag(event.clientX - originRef.current);
  }

  function endDrag(event) {
    if (originRef.current == null) return;
    const delta = event.clientX - originRef.current;
    originRef.current = null;
    setDragging(false);
    if (delta <= -48) next();
    else if (delta >= 48) prev();
    else {
      setDrag(0);
      setMotion(true);
    }
  }

  return {
    pos,
    visual: pos % count,
    drag,
    sliding: motion && !reduce && drag === 0 && !dragging,
    next,
    prev,
    goTo,
    setHovering,
    onTransitionEnd,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag
  };
}
