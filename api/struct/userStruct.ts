import { genderEnum } from "../enums/genderEnum";
import { Roles } from "../enums/roleEnum";
import { Tools } from "../misc/Tools";

export class User {
    id: string;
    idCard: number;
    firstName: string;
    lastName: string;
    gender: genderEnum | undefined;
    country: string;
    state: string;
    city: string;
    address: string;
    postalCode?: number | undefined;
    email: string;
    phone: number;
    dateBirth: string | Date | undefined;
   
    createdAt: Date;
    updatedAt: Date;
    role: Roles | undefined;
    password?: string;
    notes?: string;

    constructor(data?: User) {

        Tools.validateIfIsAnumber(data?.idCard, "idCard");
        Tools.validateDate(data?.dateBirth as string);
        Tools.validateEmail(data?.email as string);
        Tools.validatePhonenumber(data?.phone as number);

        const birthDate = data?.dateBirth ? new Date(data.dateBirth) : undefined;

        this.id = typeof data?.id === 'string' ? data.id : crypto.randomUUID();
        this.idCard = data?.idCard ?? 0;
        this.email = data?.email.trim() ?? '';
        this.password = data?.password ? data.password.trim() : undefined;
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
        this.notes = data?.notes ?? "";

    }
}