import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import welcomeRouter from "../routes/welcomeRoute";
import userRouter from "../routes/userRoutes";
import { ErrorR } from "../struct/errorStruct";


export function expressInit() {

    const port = process.env.PORT ?? 3000;
    const app = express();

    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //Use for future  Auth Validation for endpoints 
    app.use("/", (req, res, next) => {
        next();
    })

    const routes: any = [welcomeRouter, userRouter];
    app.use("/", routes);


    app.use((err: ErrorR, req: Request, res: Response, next: NextFunction) => {
        console.log(err);

        const ecode = err.ecode ?? 500;
        let errorRet;

        if (err.hasOwnProperty("errno")) {
            const message = err.message.split(";")[0];
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

