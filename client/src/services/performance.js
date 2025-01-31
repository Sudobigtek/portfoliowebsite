import * as Sentry from "@sentry/react";

export const initPerformanceMonitoring = () => {
  if (process.env.REACT_APP_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      tracesSampleRate: 1.0,
      integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay()
      ]
    });
  }
};

export const trackPerformanceMetric = (name, value) => {
  // Track custom performance metrics
}; 