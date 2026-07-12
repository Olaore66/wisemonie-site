// Server-side loader for the legal + account pages published by the Wisemonie
// backend as standalone HTML: Privacy Policy, Terms of Use, and Delete Account.
//
// Each backend page is a full HTML document with a single ".card" container
// holding the real content. We fetch it, extract that card, lift the
// "Version … · Effective …" line into the page hero, drop the duplicate
// wordmark/title headings, and strip any scripts — then hand the cleaned,
// first-party HTML to the site's own LegalPage so it renders inside the
// marketing site's header/footer instead of bouncing users to onrender.com.

const DEFAULT_BASE = "https://newmoniewise-6vpj.onrender.com";

export function legalBaseUrl() {
  return (process.env.LEGAL_API_BASE || DEFAULT_BASE).replace(/\/+$/, "");
}

function sanitize(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/\s+on[a-z]+\s*=\s*"[^"]*"/gi, "")
    .replace(/\s+on[a-z]+\s*=\s*'[^']*'/gi, "");
}

// The backend runs on a host that can sleep when idle, so the first request
// after a while may 5xx or hang while it wakes. Retry a few times with backoff
// so a build or hourly revalidation doesn't fall back over a cold start.
async function fetchHtmlWithRetry(url, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        headers: { Accept: "text/html" },
        // Re-pull the published copy hourly without needing a site rebuild.
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(20000),
      });
      if (res.ok) return await res.text();
      if (res.status < 500) return null; // real 4xx — don't hammer
    } catch {
      // network error / timeout — fall through to retry
    }
    if (i < attempts - 1) {
      await new Promise((r) => setTimeout(r, 2500 * (i + 1)));
    }
  }
  return null;
}

/**
 * Fetch a backend legal/account page and return its cleaned inner HTML.
 * @param {string} path e.g. "/privacy-policy", "/terms-of-use", "/delete-account"
 * @returns {Promise<{ html: string, meta: string | null } | null>}
 */
export async function fetchLegalContent(path) {
  try {
    const page = await fetchHtmlWithRetry(`${legalBaseUrl()}${path}`);
    if (!page) return null;

    // Extract the inner HTML of the single ".card" container.
    const card =
      page.match(/<div class="card">([\s\S]*?)<\/div>\s*<footer/i) ||
      page.match(/<div class="card">([\s\S]*?)<\/div>/i);
    if (!card) return null;
    let html = card[1];

    // Lift the "Version … · Effective …" line into the page hero meta.
    let meta = null;
    const metaMatch = html.match(/<p class="meta">([\s\S]*?)<\/p>/i);
    if (metaMatch) {
      meta = metaMatch[1].replace(/<[^>]+>/g, "").trim() || null;
      html = html.replace(metaMatch[0], "");
    }

    // Drop the leading "WISEMONIE" wordmark and the doc-title heading that
    // follows it — the site hero already shows the page title. Only strip the
    // title <h3> when the wordmark <h1> was present, so pages without a
    // wordmark (e.g. Delete Account) keep their own section headings.
    let strippedWordmark = false;
    html = html.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, () => {
      strippedWordmark = true;
      return "";
    });
    if (strippedWordmark) {
      html = html.replace(/^\s*<h3\b[^>]*>[\s\S]*?<\/h3>\s*/i, "");
    }

    html = sanitize(html).trim();
    if (!html) return null;

    return { html, meta };
  } catch {
    // Network / parse failure — caller renders a link to the live document
    // rather than any stale bundled copy.
    return null;
  }
}
