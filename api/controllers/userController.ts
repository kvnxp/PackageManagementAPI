import { Request, Response } from "express";

export class UserController {
    static getUser(req: Request, res: Response, next: any) {
        res.send("Hello World");
    }

    public static async getUserList(req: Request, res: Response, next: any) {


    }
}