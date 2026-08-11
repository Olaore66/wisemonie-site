"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import Icon from "@/components/Icon";

const WAITLIST_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyKCsAf_1e8FqEVEjzTvpW4xNzpcLFOiiJbjewJpgkud0RQCVIrlJQf602tMM3T4QmtjA/exec";

const BRAND_COLORS = ["#02a399", "#68e570", "#d9fc62", "#016078"];

export default function IosWaitlistDialog({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = setTimeout(() => inputRef.current?.focus(), 60);

    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      clearTimeout(focusTimer);
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setMessage("");
    }
  }, [open]);

  if (!open) return null;

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      inputRef.current?.focus();
      return;
    }

    setStatus("loading");
    setMessage("Adding you to the list…");

    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ email: trimmedEmail, platform: "ios" })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || (result.result && result.result !== "success")) {
        throw new Error(result.message || "Request failed");
      }
      setEmail("");
      setStatus("success");
      setMessage("You're on the list — we'll email you the moment iOS launches.");
      try {
        confetti({
          particleCount: 90,
          spread: 65,
          startVelocity: 34,
          origin: { y: 0.5 },
          colors: BRAND_COLORS
        });
      } catch {}
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div
      className="ios-dialog__backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ios-dialog-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="ios-dialog__card" ref={cardRef}>
        <button
          type="button"
          className="ios-dialog__close"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <Icon name="close" />
        </button>

        <div className="ios-dialog__icon" aria-hidden="true">
          <Icon name="smartphone" />
        </div>

        <h2 id="ios-dialog-title" className="ios-dialog__title">
          Be first when iOS is ready
        </h2>
        <p className="ios-dialog__sub">
          Wisemonie is live on Google Play now. Drop your email and we'll ping you the moment the
          App Store version is live.
        </p>

        {status === "success" ? (
          <div className="ios-dialog__success" role="status">
            <span className="ios-dialog__check" aria-hidden="true">
              <Icon name="check_circle" />
            </span>
            <p>{message}</p>
            <button type="button" className="button button--primary" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <form className="ios-dialog__form" onSubmit={handleSubmit} noValidate>
            <label className="ios-dialog__label" htmlFor="ios-waitlist-email">
              Email address
            </label>
            <input
              id="ios-waitlist-email"
              ref={inputRef}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="you@example.com"
              className={status === "error" ? "input-error" : ""}
              required
            />

            <button
              type="submit"
              className="button button--primary ios-dialog__submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <Icon name="progress_activity" className="spin" />
              ) : (
                "Notify me when iOS launches"
              )}
            </button>

            <p
              className={`ios-dialog__feedback ios-dialog__feedback--${status}`}
              aria-live="polite"
            >
              {status === "idle"
                ? "No spam. One email when iOS is ready."
                : message}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
