export class responseStruct {
    status: "ok" | "err";
    message: string;
    data?: any;
    constructor(status: "ok" | "err", message: string, data?: any,) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

}