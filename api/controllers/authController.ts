import { Request, Response } from "express";
import { SQL } from "../server/mysqlManager";
import { UserQueryList } from "../sql/userQuery";
import { User } from "../struct/userStruct";
import * as  bcrypt from 'bcrypt';
import { Roles } from "../enums/roleEnum";
import { responseStruct } from "../struct/responseStruct";
import { AuthInterface } from "../interfaces/authInterface";
import { MessageList } from "../tools/messageList";
import { JWTManager } from "../jwt/jwtManager";
import { validateAddress } from "../tools/addressValidator";

export class AuthController {

    public static async login(req: Request, res: Response, next: any) {
        const body: AuthInterface = req.body;

        let userData: User;
        //Search if user exists
        try {
            const result: any = await SQL.promise().query(UserQueryList.SELECT_USER_BY_EMAIL, [body.email.trim()]);
            if (result[0].length == 0) {
                // res.send(new responseStruct("error", "User not found",404));
                next(new responseStruct("error", MessageList.USER_NOT_FOUND, 404));
                return;
            }

            userData = result[0][0];

        } catch (error) {
            next(error);
            return;
        }

        //Compare password
        if (!bcrypt.compareSync(body.password!, userData.password!)) {
            next(new responseStruct("error", MessageList.AUTH_INVALID_PASSWORD, 401));
            return;
        }

        delete userData.password;
        //Create token

        try {
            const token = await JWTManager.createToken(userData);
            const response = new responseStruct("ok", MessageList.AUTH_SUCCESS, 200, userData);
            response.token = token; 
            res.send(response);

        } catch (error) {
            next(error);
        }

    }

    public static async register(req: Request, res: Response, next: any) {
        const body: User = req.body;

        let userList: any[];

        try {
            userList = await SQL.promise().query(UserQueryList.SELECT_USER_BY_IDCARD, [body.idCard]);
            if (userList[0].length > 0) {
                next(new responseStruct("error", MessageList.USER_EXISTS, 409));
                return;
            }
        } catch (error) {
            return;
        }

        try {
            const userData: User = new User(body);

            if (userData.country != '' && userData.city != '' && userData.address != '') {
                const fullAddress = `${userData.address}, ${userData.city}, ${userData.country}`;
                const result:any[] = await validateAddress(fullAddress);
                if(result.length == 0){
                    next(new responseStruct("error", MessageList.USER_INVALID_ADDRESS, 404));
                    return;
                }
                result;
            }

            userData.password = bcrypt.hashSync(userData.password!, 10);
            userData.role = Roles.user;
            const values = User.toInsert(userData);

            const query = `INSERT INTO users (${values.keyes}) VALUES (${values.comodin})`;

            const result = await SQL.promise().query(query, values.values);

            res.send(new responseStruct("ok", MessageList.USER_CREATED, 201));

        }
        catch (error) {
            next(error);
        }
    }
}