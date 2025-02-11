import { Router } from "express";
import { VehicleController } from "../controllers/vehicleController";
import { SecurityManager } from "../security/securityManager";
import { Roles } from "../enums/roleEnum";

const vehicleRouter = Router();
const path = "/vehicle/";
vehicleRouter.post(path + "create", SecurityManager.validateRole([Roles.admin]),VehicleController.createVehicle);
vehicleRouter.get(path + "list", SecurityManager.validateRole([Roles.admin, Roles.driver]), VehicleController.getVehicleList);

export default vehicleRouter;