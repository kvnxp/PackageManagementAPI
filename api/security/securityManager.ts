import { NextFunction, Request, Response } from "express";
import { errorStruct } from "../struct/responseStruct";
import { MessageList } from "../tools/messageList";
import { JWTManager } from "../jwt/jwtManager";
import { Roles } from "../enums/roleEnum";

export class SecurityManager {

    public static async validateUser(req: Request, res: Response, next: NextFunction) {
        console.log("validateUser");
        const tokenHeader = req.headers["authorization"];

        if (!tokenHeader) {
            next(new errorStruct("error", MessageList.AUTH_TOKEN_NOT_FOUND, 404));
            return;
        }
        try {
            const { payload } = await SecurityManager.validateToken(tokenHeader);
            req.body["user"] = payload;
            next();
        } catch (error) {
            next(error);
        }
        // next();
    }

    static async validateToken(token: string) {

        const verified  = await JWTManager.verifyToken(token);
        return verified
    }

    public static validateRole(allowedRoles: Roles[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            const user = req.body["user"];
            allowedRoles.forEach(role => {
                if (user.role === role) {
                    next();
                    return;
                }
            })
                
            next(new errorStruct("error", MessageList.UNAUTHORIZED, 401));  

        }
    }

}

