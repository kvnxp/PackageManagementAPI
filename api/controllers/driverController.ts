import { Request, Response } from "express";
import { SQL } from "../server/mysqlManager";
import { DriverQuery } from "../sql/driverQuery";
import { MessageList } from "../misc/messageList";
import { ErrorMessage, responseStruct } from "../struct/responseStruct";
import { converToSQLInsert } from "../misc/createSQLInsert";
import { User } from "../struct/userStruct";
import { Roles } from "../enums/roleEnum";
import { UserQueryList } from "../sql/userQuery";
import { Driver } from "../struct/driverStruct";

export class DriverController {
    public static async createDriver(req: Request, res: Response, next: any) {

        const body: Driver = req.body;

        try {

            const resp: any = await SQL.promise().query(UserQueryList.SELECT_USER_BY_IDCARD, [body.idCard]);
            if (resp[0].length > 0) {
                throw new ErrorMessage("error", MessageList.USER_EXISTS, 400);
            }
        } catch (error) {
            next(error);
            return
        }

        try {
            const driverData: Driver = new User(body);
            driverData.role = Roles.driver
            driverData.password = "changeAtLogin";

            const { query, values } = converToSQLInsert(driverData, "users");

            const resp: any = await SQL.promise().query(query, values);
            SQL.release();

            const message = new responseStruct("ok", MessageList.DRIVER_CREATED, 200);
            res.send(message);

        } catch (error: any) {
            next(error);
        }
    }

    public static async getDriverList(req: Request, res: Response, next: any) {

        try {
            const param = req.query;
            let query: string = DriverQuery.DRIVER_LIST;
            if (param.idcard) {
                query += ` AND idCard =${param.idcard} `;
            }

            if (param.id) {
                query += ` AND id = ${param.id}`;
            }

            query += ` ORDER BY createdAt DESC`;

            const resp: any = await SQL.promise().query(query!, Roles.driver);
            SQL.release();

            const result = resp[0];

            if (result.length == 0) {
                throw new ErrorMessage("error", MessageList.NO_DRIVER_FOUND, 404);
            }

            const message = new responseStruct("ok", "", 200, resp[0]);
            res.send(message);

        } catch (error: any) {
            next(error);
        }
    }

}