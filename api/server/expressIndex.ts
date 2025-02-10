import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import welcomeRouter from "../routes/welcomeRoute";
import authRouter from "../routes/authRoutes";
import { responseStruct } from "../struct/responseStruct";
import userRouter from "../routes/userRoutes";
import { SecurityManager } from "../security/securityManager";
import cors from "cors"
import driverRouter from "../routes/driverRoutes";
export function expressInit() {

    const port = process.env.PORT ?? 3000;
    const app = express();

    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cors());

    //Validate user token
    app.use(SecurityManager.validateUser);

    //load routes
    const routes: any = [welcomeRouter, authRouter, userRouter, driverRouter];
    app.use("/", routes);

    // Error handler
    app.use((err: responseStruct, req: Request, res: Response, next: NextFunction) => {
        console.log(err);

        const ecode = err.codeno ?? 500;
        let errorRet;

        if (err.status == "ok") {
            errorRet = {
                status: err.status,
                message: err.message,
                data: err.data
            }
            res.status(200).send(errorRet);
            return;
        }

        if (err.hasOwnProperty("errno")) {
            const message = err.message.toString().split(";")[0];
            errorRet = {
                error: {
                    code: ecode,
                    message: message
                }
            }
        } else {
            errorRet = {
                error: {
                    code: ecode,
                    message: err.message
                }
            }
        }

        res.status(ecode).send(errorRet);
    });

    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`)
    })
    return app;
}

