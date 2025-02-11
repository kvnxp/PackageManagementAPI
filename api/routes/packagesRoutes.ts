import { Router } from "express";
import { SecurityManager } from "../security/securityManager";
import { Roles } from "../enums/roleEnum";
import { PackageController } from "../controllers/packageController";

const packageRouter = Router();
const path = "/package/";
packageRouter.post(path + "create", SecurityManager.validateRole([Roles.admin, Roles.user]), PackageController.createPackage);
packageRouter.get(path + "list", PackageController.getPackageList);

export default packageRouter;