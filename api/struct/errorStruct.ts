export class ErrorR extends Error {
    ecode: number;
    constructor(message: string | undefined, code: number) {
        super(message);
        this.ecode = code;
    }
}