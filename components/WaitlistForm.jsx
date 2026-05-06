"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

const FORM_ENDPOINT = "https://formspree.io/f/mdkqqyjq";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("Join the waitlist for early access.");

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!trimmedEmail) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    if (!isValidEmail) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("Joining the waitlist...");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: trimmedEmail })
      });

      if (!response.ok) {
        throw new Error("Waitlist request failed");
      }

      setEmail("");
      setStatus("success");
      setMessage("You are on the waitlist. We will be in touch.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit}>
      <div className="waitlist-form__row">
        <input
          id="email-input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          aria-label="Email address"
          className={status === "error" ? "input-error" : ""}
        />
        <button type="submit" className="button button--primary" disabled={status === "loading"}>
          {status === "loading" ? (
            <Icon name="progress_activity" className="spin" />
          ) : status === "success" ? (
            "Joined"
          ) : (
            "Join the Waitlist"
          )}
        </button>
      </div>
      <p className={`form-feedback form-feedback--${status}`} aria-live="polite">
        {message}
      </p>
    </form>
  );
}
