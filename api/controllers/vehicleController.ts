import { Request, Response } from "express";
import { SQL } from "../server/mysqlManager";
import { VehicleQuery } from "../sql/vehicleQuery";
import { Vehicle } from "../struct/vehicleStruct";
import { ErrorMessage, responseStruct } from "../struct/responseStruct";
import { MessageList } from "../misc/messageList";
import { converToSQLInsert } from "../misc/createSQLInsert";

export class VehicleController {

    public static async createVehicle(req: Request, res: Response, next: any) {
        const body: Vehicle = req.body;
        body.licencePlate = body.licencePlate!.toUpperCase().replace("-", "");

        try {
            const query = VehicleQuery.GET_VEHICLE_LIST + " WHERE licencePlate = ?";
            const result: any = await SQL.promise().query(query, [body.licencePlate]);

            if (result[0].length > 0) {
                throw new ErrorMessage("error", MessageList.VEHICLE_EXISTS, 400);
            }

        } catch (error) {
            next(error);
        }

        try {
            const vehicle: Vehicle = new Vehicle(body);
            vehicle.id = crypto.randomUUID();
            const gpsdata = vehicle.gpsLocation;
            delete vehicle.gpsLocation;
            const query = converToSQLInsert(vehicle, "vehicles");

            const result: any = await SQL.promise().query(query.query, query.values);
            if (result[0].affectedRows === 0) {
                throw new ErrorMessage("error", MessageList.VEHICLE_CREATE_FAILED, 400);
            }

            res.send(new responseStruct("ok", MessageList.VEHICLE_CREATED, 200, vehicle));

        } catch (error) {
            next(error);
        }

    }

    public static async getVehicleList(req: Request, res: Response, next: any) {

        const param = req.query;
        let query: string = VehicleQuery.GET_VEHICLE_LIST;
        let value: any;

        if (param.licencePlate) {
            query += " WHERE licencePlate = ?";
            value = param.licencePlate;
        } else if (param.id) {
            query += " WHERE id = ?";
            value = param.id;
        }

        try {
            const result: any = await SQL.promise().query(query, [value]);

            if (result[0].length === 0) {
                throw new ErrorMessage("error", MessageList.VEHICLE_NOT_FOUND, 404);
            }

            res.send(new responseStruct("ok", "", 200, result[0]));

        } catch (error) {

        }

    }

    public static async updateVehicle(req: Request, res: Response) {

    }

    public static async setGPSLocation(req: Request, res: Response) {

    }

}