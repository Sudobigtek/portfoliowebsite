const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");

const initErrorTracking = (app) => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app })
    ],
    tracesSampleRate: 1.0,
  });

  // RequestHandler creates a separate execution context
  app.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());

  // Error handler must be before any other error middleware
  app.use(Sentry.Handlers.errorHandler());

  // Optional fallthrough error handler
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
      error: 'Internal Server Error',
      eventId: res.sentry
    });
  });
};

module.exports = initErrorTracking; 