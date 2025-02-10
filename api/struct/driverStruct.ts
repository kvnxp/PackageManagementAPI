import { Tools } from "../misc/Tools";
import { User } from "./userStruct";

export class Driver extends User {
    hireName?: string;
    licenceNumber?: number;
    licenceExpirationAt?: Date;

    constructor(data?: Driver) {
        super();
        if (data?.licenceNumber != undefined || data?.licenceNumber != "") {

            if (data?.licenceExpirationAt == undefined || data?.licenceExpirationAt as unknown as string | Date == "") {
                throw new Error("licenceExpirationAt is required");
            }

            Tools.validateIfIsAnumber(data?.licenceNumber, "licenceNumber");
            Tools.validateDate(data?.licenceExpirationAt as unknown as string);

            this.hireName = data?.hireName ?? undefined;
            this.licenceNumber = data?.licenceNumber ?? undefined;
            this.licenceExpirationAt = data?.licenceExpirationAt ? new Date(data.licenceExpirationAt) : undefined;
            
        }
    }
}