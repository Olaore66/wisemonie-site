"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import confetti from "canvas-confetti";
import Icon from "@/components/Icon";

const BRAND_COLORS = ["#23c97d", "#cbe84c", "#005f5a", "#c9982a"];

const FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyKCsAf_1e8FqEVEjzTvpW4xNzpcLFOiiJbjewJpgkud0RQCVIrlJQf602tMM3T4QmtjA/exec";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [pressure, setPressure] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const shouldReduceMotion = useReducedMotion();

  function growTextarea(event) {
    const el = event.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!trimmedEmail || !isValidEmail) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("Joining the early-access list...");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify({
          email: trimmedEmail,
          weekThreePressure: pressure.trim()
        })
      });

      const result = await response.json();

      if (!response.ok || result.result !== "success") {
        throw new Error(result.message || "Waitlist request failed");
      }

      setEmail("");
      setPressure("");
      setStatus("success");
      setMessage("Thanks for joining early. We'll email you when private beta opens.");

      if (!shouldReduceMotion) {
        confetti({
          particleCount: 120,
          spread: 70,
          startVelocity: 38,
          origin: { y: 0.7 },
          colors: BRAND_COLORS
        });
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form className="waitlist-form waitlist-form--compact" onSubmit={handleSubmit}>
      <label>
        Email address
        <input
          id="email-input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          className={status === "error" ? "input-error" : ""}
        />
      </label>
      <label>
        What&apos;s your typical week-3 financial pressure?{" "}
        <span className="waitlist-form__optional">(optional)</span>
        <textarea
          id="pressure-input"
          rows={1}
          value={pressure}
          onChange={(event) => {
            setPressure(event.target.value);
            growTextarea(event);
          }}
          placeholder="e.g. transport money runs out before the next alert"
        />
      </label>
      <div className="waitlist-form__submit">
        <motion.button
          type="submit"
          className="button button--primary"
          disabled={status === "loading"}
          {...(shouldReduceMotion
            ? {}
            : {
                whileHover: { y: -3, scale: 1.02 },
                whileTap: { scale: 0.96 },
                transition: { type: "spring", stiffness: 400, damping: 22 }
              })}
        >
          {status === "loading" ? (
            <Icon name="progress_activity" className="spin" />
          ) : status === "success" ? (
            "Joined"
          ) : (
            "Get Early Access"
          )}
        </motion.button>
      </div>
      <p className={`form-feedback form-feedback--${status}`} aria-live="polite">
        {status === "success" ? <strong>You&apos;re on the list.</strong> : null}
        {status === "idle" ? "We'll email you when private beta opens. No spam, just product updates." : message}
      </p>
    </form>
  );
}
