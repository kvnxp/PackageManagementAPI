import { NextFunction, Request, Response } from "express";
import { errorStruct } from "../struct/responseStruct";
import { MessageList } from "../tools/messageList";
import { JWTManager } from "../jwt/jwtManager";
import { Roles } from "../enums/roleEnum";

export class SecurityManager {

    public static async validateUser(req: Request, res: Response, next: NextFunction) {
        console.log("validateUser");
        const tokenHeader: string = req.headers["authorization"] as string;

        if (!tokenHeader) {
            req.body["user"] = {
                role: Roles.guest
            }
            req.body.token = undefined;
            next();
            return;
        }

        if (!tokenHeader) {
            next(new errorStruct("error", MessageList.AUTH_TOKEN_NOT_FOUND, 404));
            return;
        }
        try {
            const { payload } = await SecurityManager.validateToken(tokenHeader);
            req.body["user"] = payload;
            req.body.token = tokenHeader;
            next();
        } catch (error) {
            next(error);
        }
    }

    static async validateToken(token: string) {

        const verified = await JWTManager.verifyToken(token);
        return verified
    }

    public static validateRole(allowedRoles: Roles[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            const user = req.body["user"];
            const token = req.body["token"];

            if (token && token != req.headers["authorization"]) {
                next(new errorStruct("error", MessageList.UNAUTHORIZED, 401));
                return;
            }

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

