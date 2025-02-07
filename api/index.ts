import "dotenv/config"
import { envInit } from "./server/envInit";
import { expressInit } from "./server/express";
import * as Sentry from "@sentry/node"

export const sentry = Sentry.init({
  dsn: process.env.SENTRYDSN,
  tracesSampleRate: 1.0,
})

envInit();
const app = expressInit();
Sentry.setupExpressErrorHandler(app);

// this output for Vercel serverless function
export default app;