"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { adminPost } from "@/components/admin/adminClient";

/** Only same-site admin pages are allowed as the place to return to. */
function safeNext(value) {
  return typeof value === "string" && /^\/admin(\/[A-Za-z0-9/_-]*)?$/.test(value) && !value.startsWith("/admin/login")
    ? value
    : "/admin";
}

function LoginForm() {
  const router = useRouter();
  const next = safeNext(useSearchParams().get("next"));
  const [step, setStep] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  async function sendCode(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await adminPost("/api/admin/auth/code", { email, password });
      setPassword(""); // the server keeps it, encrypted, for the next step
      setStep("code");
      setInfo("We emailed you a 6-digit code.");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function verify(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await adminPost("/api/admin/auth/verify", { code });
      router.replace(next);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="ba-login">
      <div className="ba-login__card">
        <div className="ba-login__logo">
          <img src="/images/logo2.svg" alt="Wisemonie" />
        </div>
        <h1>Admin sign in</h1>
        <p>For the blog and payment reviews. We email you a code after your password.</p>
        {step === "password" ? (
          <form onSubmit={sendCode}>
            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                     required autoFocus autoComplete="username" />
            </label>
            <label>
              Password
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                     required autoComplete="current-password" />
            </label>
            {error && <div className="ba-error">{error}</div>}
            <button type="submit" className="ba-btn ba-btn--primary" disabled={busy}>
              {busy ? "Checking..." : "Continue"}
            </button>
          </form>
        ) : (
          <form onSubmit={verify}>
            {info && <div className="ad-info">{info}</div>}
            <label>
              6-digit code
              <input type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6}
                     value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                     required autoFocus />
            </label>
            {error && <div className="ba-error">{error}</div>}
            <button type="submit" className="ba-btn ba-btn--primary" disabled={busy || code.length !== 6}>
              {busy ? "Signing in..." : "Sign in"}
            </button>
            <button type="button" className="ba-btn ba-btn--ghost ad-link"
                    onClick={() => { setStep("password"); setCode(""); setError(""); setInfo(""); }}>
              Start again
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
