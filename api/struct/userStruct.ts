import { genderEnum } from "../enums/genderEnum";
import { Roles } from "../enums/roleEnum";
import { UserInterface } from "../interfaces/userInterface";
import { ErrorR } from "./errorStruct";

export class User implements UserInterface {
    id: string;
    idCard: number;
    firstName: string;
    lastName: string;
    gender: genderEnum | undefined;
    country: string;
    state: string;
    city: string;
    address: string;
    postalCode: number;
    email: string;
    phone: number;
    dateBirth: string | Date | undefined;
    createdAt: Date;
    updatedAt: Date;
    role: Roles | undefined;
    password: string;

    constructor(data?: UserInterface) {

        if (data?.dateBirth) {
            const regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])(?: (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])?)?$/
            if (typeof data.dateBirth === 'string' && !regex.test(data.dateBirth)) {
                throw new ErrorR('Invalid date format', 400);
            }
        }

        if (data?.email) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(data.email)) {
                throw new ErrorR('Invalid email format', 400);
            }
        }

        const birthDate = data?.dateBirth ? new Date(data.dateBirth) : undefined;

        this.id = typeof data?.id === 'string' ? data.id : crypto.randomUUID();
        this.idCard = data?.idCard ?? 0;
        this.email = data?.email.trim() ?? '';
        this.password = data?.password.trim() ?? '';
        this.firstName = data?.firstName ?? '';
        this.lastName = data?.lastName ?? '';
        this.gender = data?.gender ?? undefined;
        this.address = data?.address ?? '';
        this.country = data?.country ?? '';
        this.city = data?.city ?? '';
        this.state = data?.state ?? '';
        this.postalCode = data?.postalCode ?? 0;
        this.phone = data?.phone ?? 0;
        this.dateBirth = birthDate;
        this.createdAt = data?.createdAt ? new Date(data.createdAt) : new Date();
        this.updatedAt = data?.updatedAt ? new Date(data.updatedAt) : new Date();
        this.role = data?.role ?? undefined;
    }

    public static toInsert(data: UserInterface) {

        var keyes: string = "";
        var values: any[] = [];
        var comodin: string = "";
        for (const key in data) {
            const keyName = key as keyof UserInterface;
            if (data[keyName] !== undefined) {
                keyes += key + ','
                values.push(data[keyName]);
                comodin += '?,'
            }
        }

        keyes = keyes.slice(0, -1);
        comodin = comodin.slice(0, -1);

        return { keyes, values, comodin };

    }
}