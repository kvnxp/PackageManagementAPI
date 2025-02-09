import { Router } from "express";
import { UserController } from "../controllers/userController";

const userRouter = Router();
const path = "/auth/"
userRouter.post(path + "login", UserController.login);
userRouter.post(path + "register", UserController.register);

export default userRouter;