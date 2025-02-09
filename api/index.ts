import "dotenv/config"
import { envInit } from "./server/envInit";
import { expressInit } from "./server/expressIndex";
import { sentryStarup } from "./server/sentryReport";
import { MysqlManager } from "./server/mysqlManager";

export async function startServer() {
    envInit();
    sentryStarup();

    await MysqlManager.initPoolConnection();
    const app = expressInit();
    return await app;
}


// this output for Vercel serverless function
export default startServer();