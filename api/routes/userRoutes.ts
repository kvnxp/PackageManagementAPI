import { Router } from "express";
import { UserController } from "../controllers/userController";
import { SecurityManager } from "../security/securityManager";
import { Roles } from "../enums/roleEnum";
const userRouter = Router();
const path = "/user/"

userRouter.get(path + "list", SecurityManager.validateRole([Roles.admin]), UserController.getUserList);
userRouter.get(path + "get/:id", SecurityManager.validateRole([Roles.admin, Roles.driver ]), UserController.getUser);


export default userRouter;