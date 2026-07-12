# wisemonie Website

A Next.js frontend for the wisemonie finance app website.

## Tech Stack

- Next.js App Router
- React
- Plain global CSS
- Static assets served from `public/images`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

## Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Pages

- `/`
- `/about`
- `/contact`
- `/security`
- `/privacy-policy`
- `/terms-of-service`
- `/cookie-policy`

The old static HTML files are still in the project root as migration reference files. The Next.js app lives in `app/`, with shared components in `components/` and page data in `data/`.

## Legal & account pages (Privacy, Terms, Delete Account)

`/privacy-policy`, `/terms-of-use`, and `/delete-account` render **live** content
published by the backend, embedded inside the site's own header/footer.

- Loader: `data/legalApi.js` — server-side fetch, revalidated hourly (ISR), with
  retry/backoff for backend cold starts.
- Sources: `GET {LEGAL_API_BASE}/privacy-policy`, `/terms-of-use`, `/delete-account`
  (each a standalone HTML page). The loader extracts the `.card` body, lifts the
  "Version … · Effective …" line into the page hero, and strips the duplicate
  wordmark/title before rendering it via `components/LegalPage.jsx`.
- If the backend is unreachable, the page shows a short notice linking to the live
  document — it never shows stale/placeholder legal text.
- `/terms-of-service` permanently redirects to `/terms-of-use` (see `next.config.mjs`).

`/security` and `/cookie-policy` still use bundled copy in `data/legalPages.js`.

### Environment variables

| Variable         | Default                                  | Purpose                                    |
| ---------------- | ---------------------------------------- | ------------------------------------------ |
| `LEGAL_API_BASE` | `https://newmoniewise-6vpj.onrender.com` | Backend base URL for the published pages.  |
