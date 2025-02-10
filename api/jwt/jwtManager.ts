import * as jwt from "jose"
import { enviromentKeys } from "../server/enviromentKeys";
import { responseStruct } from "../struct/responseStruct";
import { MessageList } from "../tools/messageList";

export class JWTManager {
    public static async createToken(data: any) {
        try {

            const secret = new TextEncoder().encode(enviromentKeys.JWT_SECRET);
            const alg = "HS256";
            const expiresIn = "12h";
            const token = await new jwt.SignJWT(data).setProtectedHeader({ alg: alg }).setIssuedAt().setExpirationTime(expiresIn).sign(secret);
            return token;

        } catch (error: any) {
            throw new responseStruct("error", error.message, 500);
        }

    }

    public static async verifyToken(token: string) {
        try {
            const secret = new TextEncoder().encode(enviromentKeys.JWT_SECRET);
            const payload = await jwt.jwtVerify(token, secret, { algorithms: ["HS256"] });
            return payload;

        } catch (error: any) {
            throw new responseStruct("error", MessageList.AUTH_INVALID_TOKEN, 500);
        }
    }

}