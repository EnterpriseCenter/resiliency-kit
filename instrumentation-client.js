import * as Sentry from '@sentry/nextjs'

// NEXT_PUBLIC_ prefix is required for Next.js to inline this into the
// browser bundle -- SENTRY_DSN (used server/edge-side in instrumentation.js)
// isn't available here. Same DSN value either way; GlitchTip/Sentry DSNs
// are public write-only ingest keys, safe client-side by design.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0,
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
