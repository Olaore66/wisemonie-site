"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

const FORM_ENDPOINT = "https://formspree.io/f/mdkqqyjq";
const WHATSAPP_NUMBER = "2348060214037";

const audienceOptions = [
  "Salary earner",
  "Freelancer",
  "Student",
  "Business owner",
  "Early-career professional",
  "Other"
];

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    audience: ""
  });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  function updateField(field, value) {
    setFormData((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      audience: formData.audience
    };
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);

    if (!payload.fullName || !payload.email || !payload.phone || !payload.audience) {
      setStatus("error");
      setMessage("Please complete all waitlist fields.");
      return;
    }

    if (!isValidEmail) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("Joining the waitlist...");
    setWhatsappUrl("");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Waitlist request failed");
      }

      const whatsappMessage = [
        "New wisemonie waitlist submission",
        `Full name: ${payload.fullName}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone}`,
        `Audience: ${payload.audience}`
      ].join("\n");

      setWhatsappUrl(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`
      );
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        audience: ""
      });
      setStatus("success");
      setMessage("Thanks for joining wisemonie early. We'll keep you updated as private beta opens.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit}>
      <div className="waitlist-form__intro">
        <h3>Join the wisemonie waitlist</h3>
        <p>Get early access updates and be among the first users invited into private beta.</p>
      </div>
      <div className="waitlist-form__fields">
        <label>
          Full name
          <input
            id="full-name-input"
            type="text"
            value={formData.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            placeholder="Your full name"
            required
            className={status === "error" && !formData.fullName.trim() ? "input-error" : ""}
          />
        </label>
        <label>
          Email address
          <input
            id="email-input"
            type="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@example.com"
            required
            className={status === "error" && !formData.email.trim() ? "input-error" : ""}
          />
        </label>
        <label>
          Phone number
          <input
            id="phone-input"
            type="tel"
            value={formData.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="Your phone number"
            required
            className={status === "error" && !formData.phone.trim() ? "input-error" : ""}
          />
        </label>
        <label>
          What best describes you?
          <select
            value={formData.audience}
            onChange={(event) => updateField("audience", event.target.value)}
            required
            className={status === "error" && !formData.audience ? "input-error" : ""}
          >
            <option value="">Select one</option>
            {audienceOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="waitlist-form__submit">
        <button type="submit" className="button button--primary" disabled={status === "loading"}>
          {status === "loading" ? (
            <Icon name="progress_activity" className="spin" />
          ) : status === "success" ? (
            "Joined"
          ) : (
            "Join Waitlist"
          )}
        </button>
      </div>
      <p className={`form-feedback form-feedback--${status}`} aria-live="polite">
        {status === "success" ? <strong>You're on the list.</strong> : null}
        {message}
      </p>
      {status === "success" && whatsappUrl ? (
        <a className="whatsapp-copy-link" href={whatsappUrl} target="_blank" rel="noreferrer">
          Send a copy on WhatsApp
        </a>
      ) : null}
    </form>
  );
}
