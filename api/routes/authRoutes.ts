import { Router } from "express";
import { AuthController } from "../controllers/authController";

const authRouter = Router();
const path = "/auth/"
authRouter.post(path + "login", AuthController.login);
authRouter.post(path + "register", AuthController.register);

export default authRouter;