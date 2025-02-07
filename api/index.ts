import "dotenv/config"
import { envInit } from "./server/envInit";
import { expressInit } from "./server/express";
import { sentryStarup } from "./server/sentryReport";

envInit();
const app = expressInit();
sentryStarup();

// this output for Vercel serverless function
export default app;