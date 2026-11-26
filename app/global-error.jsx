"use client";

import { useEffect } from "react";
import { errorSummary, isStaleBuildError } from "@/components/ErrorScreen";

/**
 * Last line of defence: used when the root layout itself fails (the header,
 * footer or page wrapper). It replaces the whole page, so it brings its own
 * html, body and styles.
 */
export default function GlobalError({ error }) {
  useEffect(() => {
    console.error("[site] root error", error);
    if (!isStaleBuildError(error)) return;
    try {
      const last = Number(sessionStorage.getItem("wm-stale-reload-at") || 0);
      if (Date.now() - last < 60_000) return;
      sessionStorage.setItem("wm-stale-reload-at", String(Date.now()));
    } catch {
      // Storage blocked: reload once anyway.
    }
    window.location.reload();
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#f6f8fa",
        fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif", color: "#111", padding: 20, boxSizing: "border-box" }}>
        <div style={{ maxWidth: 420, width: "100%", background: "#fff", borderRadius: 16, padding: 28,
          boxShadow: "0 10px 30px rgba(0,0,0,.08)" }}>
          <h1 style={{ fontSize: 20, margin: "0 0 8px" }}>Something went wrong</h1>
          <p style={{ margin: "0 0 12px", color: "#444" }}>The page stopped working. Your data is safe. Reload to carry on.</p>
          <p style={{ margin: "0 0 18px", color: "#6b7280", fontSize: 13, overflowWrap: "anywhere" }}>
            Details: <code>{errorSummary(error)}</code>
          </p>
          <button type="button" onClick={() => window.location.reload()}
                  style={{ background: "#02A399", color: "#fff", border: 0, borderRadius: 10, padding: "10px 18px",
                    font: "inherit", fontWeight: 600, cursor: "pointer" }}>
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
