import { Router } from "express";
import welcome from "../controllers/welcomeController";

const welcomeRouter = Router();
welcomeRouter.get("/", welcome)

export default welcomeRouter;