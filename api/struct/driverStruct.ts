import { Tools } from "../misc/Tools";

export class Driver {
    id: any;
    firstName: any;
    lastName: any;
    idCard: any;
    gender: any;
    dateBirth: any;
    homeAddress: any;
    email: any;
    phone: any;
    hireName: any;
    licenceNumber: any;
    licenceExpirationAt: any;
    notes: any;
    dateCreatedAt: any;
    dateUpdateAt: any;
    createdBy: any;
    updateBy: any;

    constructor(data?: Driver) {

        Tools.validateDate(data?.dateBirth);
        Tools.validateEmail(data?.email);
        Tools.validateIfIsAnumber(data?.idCard);

        this.id = data?.id;
        this.firstName = data?.firstName;
        this.lastName = data?.lastName;
        this.idCard = data?.idCard;
        this.gender = data?.gender;
        this.dateBirth = data?.dateBirth;
        this.homeAddress = data?.homeAddress;
        this.email = data?.email;
        this.phone = data?.phone;
        this.hireName = data?.hireName;
        this.licenceNumber = data?.licenceNumber;
        this.licenceExpirationAt = data?.licenceExpirationAt;
        this.notes = data?.notes;
        this.dateCreatedAt = data?.dateCreatedAt;
        this.dateUpdateAt = data?.dateUpdateAt;
        this.createdBy = data?.createdBy;
        this.updateBy = data?.updateBy;
    }
}