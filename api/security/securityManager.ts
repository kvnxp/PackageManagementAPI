import { NextFunction, Request, Response } from "express";
import { ErrorMessage } from "../struct/responseStruct";
import { MessageList } from "../misc/messageList";
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
            next(new ErrorMessage("error", MessageList.AUTH_TOKEN_NOT_FOUND, 404));
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
                next(new ErrorMessage("error", MessageList.UNAUTHORIZED, 401));
                return;
            }

            const found = allowedRoles.find(role => {
                if (user.role === role) {
                    return true;
                }
            })

            if (found) {
                next();
                return;
            }

            next(new ErrorMessage("error", MessageList.UNAUTHORIZED, 401));

        }
    }

}

