import { Router, Request, Response } from "express";

const welcomeRouter = Router();
welcomeRouter.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the API");
});

export default welcomeRouter;