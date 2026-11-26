"use client";

import { useEffect } from "react";

/** Any admin page that fails shows this instead of a blank screen. */
export default function AdminError({ error, reset }) {
  useEffect(() => {
    console.error("[admin] page error", error);
  }, [error]);

  return (
    <div className="ba-login">
      <div className="ba-login__card">
        <h1>Something went wrong</h1>
        <p>This admin page could not load. Your data is safe. Reload to try again.</p>
        <button type="button" className="ba-btn ba-btn--primary" onClick={() => window.location.reload()}>
          Reload
        </button>
        <button type="button" className="ba-btn ba-btn--ghost ad-link" onClick={() => reset()}>
          Try without reloading
        </button>
      </div>
    </div>
  );
}
