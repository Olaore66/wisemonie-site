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
  const webLinkRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = setTimeout(() => webLinkRef.current?.focus(), 60);

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
      setMessage("You're on the list. We'll email you when the App Store version is live.");
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

        <img
          className="ios-dialog__art"
          src="/images/brand/scene-people.jpg"
          alt=""
        />

        <h2 id="ios-dialog-title" className="ios-dialog__title">
          Use Wisemonie on your iPhone
        </h2>
        <p className="ios-dialog__sub">
          The App Store app is still on the way. Use the web app today, then add it to your Home Screen.
        </p>

        <ol className="ios-dialog__steps">
          <li>
            <span>1</span>
            <p>
              Open Safari and go to{" "}
              <a href="https://web.wisemonie.app" target="_blank" rel="noopener">
                web.wisemonie.app
              </a>
              .
            </p>
          </li>
          <li>
            <span>2</span>
            <p>Tap Share, then Add to Home Screen.</p>
          </li>
          <li>
            <span>3</span>
            <p>Turn on Open as Web App, then tap Add.</p>
          </li>
        </ol>

        <a
          ref={webLinkRef}
          className="button button--primary ios-dialog__web"
          href="https://web.wisemonie.app"
          target="_blank"
          rel="noopener"
        >
          Open web.wisemonie.app
        </a>

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
            <p className="ios-dialog__later">Want the App Store app later? Leave your email.</p>
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
                "Email me when the App Store version is live"
              )}
            </button>

            <p
              className={`ios-dialog__feedback ios-dialog__feedback--${status}`}
              aria-live="polite"
            >
              {status === "idle"
                ? "No spam. One email when the App Store version is ready."
                : message}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
