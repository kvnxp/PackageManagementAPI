import { packageTypeEnum } from "../enums/packageStateEnum";
import { Tools } from "../misc/Tools";

export class Package {
    id: number | undefined;
    senderName?: string;
    senderIdCard?: number;
    senderAddress?: string;
    senderCountry?: string;
    senderCity?: string;
    senderState?: string;
    senderPostalCode?: number;
    senderPhone?: number;
    reciverName?: string;
    reciverIdCard?: number;
    reciverAddress?: string;
    reciverCountry?: string;
    reciverState?: string;
    reciverCity?: string;
    reciverPostalCode?: number;
    reciverPhone?: string;
    vehicleId?: number;
    createdAt: Date | undefined;
    createdBy?: string;
    updatedAt: Date | undefined;
    updatedBy?: string;
    recivedAt: Date | undefined;
    recivedBy?: string;
    recivedByIdCard?: number;
    deliverDateEtaAt: Date | undefined;
    packageState?: number;
    weight?: number;
    dimentions?: string;
    description?: string;
    packageType?: packageTypeEnum | undefined;
    notes?: string;
    gpsLocation?: any;

    constructor(data: Partial<Package>) {

        Tools.validateIfIsAnumber(data.senderPhone, 'senderPhone');
        Tools.validateIfIsAnumber(data.reciverPhone, 'reciverPhone');

        this.id = data.id ?? 0;
        this.senderName = data.senderName ?? '';
        this.senderIdCard = data.senderIdCard ?? 0;
        this.senderAddress = data.senderAddress ?? '';
        this.senderCountry = data.senderCountry ?? '';
        this.senderCity = data.senderCity ?? '';
        this.senderState = data.senderState ?? '';
        this.senderPostalCode = data.senderPostalCode ?? 0;
        this.senderPhone = data.senderPhone ?? 0;
        this.reciverName = data.reciverName ?? '';
        this.reciverIdCard = data.reciverIdCard ?? 0;
        this.reciverAddress = data.reciverAddress ?? '';
        this.reciverCountry = data.reciverCountry ?? '';
        this.reciverState = data.reciverState ?? '';
        this.reciverCity = data.reciverCity ?? '';
        this.reciverPostalCode = data.reciverPostalCode ?? 0;
        this.reciverPhone = data.reciverPhone ?? '';
        this.vehicleId = data.vehicleId ?? 0;
        this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
        this.createdBy = data.createdBy ?? "";
        this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
        this.updatedBy = data.updatedBy ?? "";
        this.recivedAt = data.recivedAt ?? undefined;
        this.recivedBy = data.recivedBy ?? "";
        this.recivedByIdCard = data.recivedByIdCard ?? 0;
        this.deliverDateEtaAt = data.deliverDateEtaAt ? new Date(data.deliverDateEtaAt) : undefined;
        this.packageState = data.packageState ?? undefined;
        this.weight = data.weight ?? undefined;
        this.dimentions = data.dimentions ?? undefined;
        this.description = data.description ?? undefined;
        this.packageType = data.packageType ?? packageTypeEnum.General;
        this.notes = data.notes ?? undefined;
        this.gpsLocation = data.gpsLocation;
    }
}