import { Request, Response } from "express";
import { SQL } from "../server/mysqlManager";
import { UserQueryList } from "../sql/userQuery";
import { User } from "../struct/userStruct";
import * as  bcrypt from 'bcrypt';
import { Roles } from "../enums/roleEnum";
import { responseStruct } from "../struct/responseStruct";

export class UserController {

    public static async login(req: Request, res: Response) {
        res.send("User Login");
    }

    public static async register(req: Request, res: Response, next: any) {
        const body: User = req.body;

        let userList: any[];

        try {
            userList = await SQL.promise().query(UserQueryList.SELECT_USER_BY_IDCARD, [body.idCard]);

        } catch (error) {
            return;
        }

        try {
            const userData: User = new User(body);
            userData.password = bcrypt.hashSync(userData.password, 10);
            userData.role = Roles.user;
            const values = User.toInsert(userData);

            const query = `INSERT INTO users (${values.keyes}) VALUES (${values.comodin})`;

            const result = await SQL.promise().query(query, values.values);

            res.send(new responseStruct("ok", "User created"));

            console.log("write user to database");

        }
        catch (error) {
            next(error);
        }
    }
}