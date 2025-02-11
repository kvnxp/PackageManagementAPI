import { MessageList } from "../misc/messageList";

/**
 * Class representing a response structure.
 */
export class responseStruct extends Error {
    status: "ok" | "error";
    codeno?: number;
    data?: any;
    token?: string;

    /**
     * Constructs a new instance of the response structure.
     * 
     * @param status - The status of the response, either "ok" or "error".
     * @param message - The message associated with the response, which can be a `MessageList` or a string.
     * @param codeno - (Optional) The error code associated with the response.
     * @param data - (Optional) Additional data associated with the response.
     */
    constructor(status: "ok" | "error", message: MessageList | string, codeno?: number, data?: any) {
        super();
        this.status = status;
        this.message = message.toString();
        this.codeno = codeno;
        this.data = data;
    }

}

export const ErrorMessage = responseStruct