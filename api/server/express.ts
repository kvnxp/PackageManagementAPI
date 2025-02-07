import express from "express";
import morgan from "morgan";
import bodyParser, { urlencoded } from "body-parser";
import welcomeRouter from "../routes/welcomeRoute";
import { sentryStarup } from "./sentryReport";

export function expressInit() {

    const port = process.env.PORT ?? 3000;
    const app = express();

    app.use(morgan("dev"));
    app.use(bodyParser.json());
    app.use(urlencoded({ extended: true }));

    //Use for future  Auth Validation for endpoints 
    app.use("/", (req, res, next) => {

        next();
    })

    const routes: any = [welcomeRouter];
    app.use("/", routes);
    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`)
    })
    return app;
}

