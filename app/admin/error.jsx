"use client";

import ErrorScreen from "@/components/ErrorScreen";

/** Any admin page that fails shows this instead of a blank screen. */
export default function AdminError({ error, reset }) {
  return <ErrorScreen error={error} reset={reset} />;
}
