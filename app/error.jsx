"use client";

import ErrorScreen from "@/components/ErrorScreen";

/** Any public page that fails shows this instead of a blank screen. */
export default function SiteError({ error, reset }) {
  return <ErrorScreen error={error} reset={reset} />;
}
