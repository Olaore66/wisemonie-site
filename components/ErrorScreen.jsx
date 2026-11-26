"use client";

import { useEffect, useState } from "react";

const RELOAD_KEY = "wm-stale-reload-at";

/**
 * True when the page's code no longer matches the live site: usually a tab
 * left open across a redeploy, or a sleeping tab woken later. A reload fixes it.
 */
export function isStaleBuildError(error) {
  const text = `${error?.name || ""} ${error?.message || ""}`;
  return /ChunkLoadError|Loading (CSS )?chunk|dynamically imported module|Importing a module script failed|Failed to load module script/i.test(text);
}

/** Reloads once for a stale build. Returns true if it is reloading. */
function reloadOnceForStaleBuild(error) {
  if (!isStaleBuildError(error)) return false;
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
    if (Date.now() - last < 60_000) return false; // already tried; show the screen instead
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // Storage blocked: still safe to reload once per page load.
  }
  window.location.reload();
  return true;
}

/** What went wrong, short enough to screenshot and send. */
export function errorSummary(error) {
  const parts = [];
  if (error?.name && error.name !== "Error") parts.push(error.name);
  if (error?.message) parts.push(error.message);
  if (error?.digest) parts.push(`ref ${error.digest}`);
  return parts.join(": ").slice(0, 400) || "Unknown error";
}

/** Shown instead of a blank page when part of the site fails. */
export default function ErrorScreen({ error, reset, title = "Something went wrong" }) {
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    console.error("[site] page error", error);
    if (reloadOnceForStaleBuild(error)) setReloading(true);
  }, [error]);

  if (reloading) {
    return (
      <div className="ba-login">
        <div className="ba-login__card"><p>Loading the latest version…</p></div>
      </div>
    );
  }

  return (
    <div className="ba-login">
      <div className="ba-login__card">
        <h1>{title}</h1>
        <p>This page stopped working. Your data is safe. Reload to carry on.</p>
        <p className="ad-hint" style={{ overflowWrap: "anywhere" }}>
          Details: <code>{errorSummary(error)}</code>
        </p>
        <button type="button" className="ba-btn ba-btn--primary" onClick={() => window.location.reload()}>
          Reload
        </button>
        {reset && (
          <button type="button" className="ba-btn ba-btn--ghost ad-link" onClick={() => reset()}>
            Try without reloading
          </button>
        )}
      </div>
    </div>
  );
}
