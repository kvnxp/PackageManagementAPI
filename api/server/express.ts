import express from "express";
import morgan from "morgan";
import welcomeRouter from "../routes/welcomeRoute";

export function expressInit() {

    const port = process.env.PORT ?? 3000;
    const app = express();

    app.use(morgan("dev"));

    const routes: any = [welcomeRouter];
    app.use("/", routes);
    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`)
    })
    return app;
}

