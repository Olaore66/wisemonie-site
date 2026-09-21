const DEFAULT_BASE = "https://newmoniewise-6vpj.onrender.com";

function blogBaseUrl() {
  return (process.env.LEGAL_API_BASE || DEFAULT_BASE).replace(/\/+$/, "");
}

async function fetchJsonWithRetry(url, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(20000),
      });
      if (res.ok) return await res.json();
      if (res.status < 500) return null;
    } catch {
      // network / timeout - retry
    }
    if (i < attempts - 1) {
      await new Promise((r) => setTimeout(r, 2500 * (i + 1)));
    }
  }
  return null;
}

export async function fetchBlogPosts(page = 0, size = 20) {
  const data = await fetchJsonWithRetry(
    `${blogBaseUrl()}/blog/api/posts?page=${page}&size=${size}`
  );
  if (!data) return { posts: [], totalPages: 0, currentPage: 0, empty: true };
  return {
    posts: data.content || [],
    totalPages: data.totalPages || 0,
    currentPage: data.number || 0,
    empty: data.empty !== false,
  };
}

export async function fetchBlogPost(slug) {
  return fetchJsonWithRetry(`${blogBaseUrl()}/blog/api/posts/${encodeURIComponent(slug)}`);
}

export function estimateReadingTime(markdown) {
  if (!markdown) return 1;
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

export function formatBlogDate(dateStr) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}
