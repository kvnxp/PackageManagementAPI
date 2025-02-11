import { Router } from "express";
import { SecurityManager } from "../security/securityManager";
import { Roles } from "../enums/roleEnum";
import { DriverController } from "../controllers/driverController";


const driverRouter: Router = Router();
const path = "/driver/";
driverRouter.post(path + 'createDriver', SecurityManager.validateRole([Roles.admin]), DriverController.createDriver);
driverRouter.get(path + 'getDriverList', SecurityManager.validateRole([Roles.admin]), DriverController.getDriverList);

export default driverRouter;