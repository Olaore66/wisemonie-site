# Wisemonie Website

A Next.js frontend for the Wisemonie finance app website.

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
