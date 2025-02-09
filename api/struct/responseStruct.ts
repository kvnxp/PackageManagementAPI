import { MessageList } from "../tools/messageList";

/**
 * Class representing a response structure.
 */
export class responseStruct {
    status: "ok" | "error";
    message: MessageList | string;
    ecode?: number;
    data?: any;
    token?: string;


    /**
     * Constructs a new instance of the response structure.
     * 
     * @param status - The status of the response, either "ok" or "error".
     * @param message - The message associated with the response, which can be a `MessageList` or a string.
     * @param ecode - (Optional) The error code associated with the response.
     * @param data - (Optional) Additional data associated with the response.
     */
    constructor(status: "ok" | "error", message: MessageList | string, ecode?: number, data?: any) {
        this.status = status;
        this.message = message;
        this.ecode = ecode;
        this.data = data;
    }

}