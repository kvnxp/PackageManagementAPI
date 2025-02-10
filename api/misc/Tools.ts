import { responseStruct } from "../struct/responseStruct";
import { MessageList } from "./messageList";

export class Tools {

    public static validateDate(date: string): string | Date {
        if (date == "" || date == undefined) {
            return "";
        }

        const regex = /\b(\d{4}-\d{2}-\d{2})(T(\d{2}:\d{2}:\d{2})Z)?\b/

        if (!regex.test(date)) {
            throw new responseStruct("error", MessageList.AUTH_INVALID_DATE, 400);
        }
        return new Date(date);
    }

    public static validateEmail(email: string): string {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new responseStruct("error", MessageList.AUTH_INVALID_EMAIL, 400);
        }
        return email;
    }

    public static validateIfIsAnumber(data: any, varName: string) {
        if (data && typeof data !== 'number' || data == "") {
            throw new Error(varName + ' must be a number');
        }
    }

    public static validatePhonenumber(phoneN: any) {
        const regex = /^(3[0-9]{9}|[1-9][0-9]{6})$/;
        if (!regex.test(phoneN)) {
            throw new responseStruct("error", MessageList.AUTH_INVALID_PHONE, 400);
        }

    }
}