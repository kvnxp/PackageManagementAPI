
export class gpsLocation {
    long: number;
    lat: number;

    constructor(data: Partial<gpsLocation>) {
        this.long = data.long ?? 0;
        this.lat = data.lat ?? 0;
    }
}

export class Vehicle {
    id: string; // Unique identifier for the vehicle
    vin?: string; // Vehicle Identification Number (VIN)
    make?: string; // Manufacturer of the vehicle
    model?: string; // Model of the vehicle
    licencePlate?: string; // License plate number
    cargoCapacityVolume?: number; // Cargo capacity in volume (e.g., cubic meters)
    cargoCapacityWeight?: number; // Cargo capacity in weight (e.g., kilograms)
    dimentionInterior?: string; // Interior dimensions of the vehicle
    owner?: string; // Owner of the vehicle
    dateAcquired?: Date; // Date when the vehicle was acquired
    vehicleStatus?: string; // Current status of the vehicle (e.g., active, inactive)
    driverId?: string; // Identifier for the driver associated with the vehicle
    dateCreatedAt: Date; // Timestamp when the record was created
    dateUpdatedAt: Date; // Timestamp when the record was last updated
    createdBy?: string; // User who created the record
    updatedBy?: string; // User who last updated the record
    notes?: string; // Additional notes about the vehicle
    gpsLocation?: string; // GPS location of the vehicle (Point)

    constructor(data: Partial<Vehicle>) {
        this.id = data.id ?? crypto.randomUUID();
        this.vin = data.vin;
        this.make = data.make;
        this.model = data.model;
        this.licencePlate = data.licencePlate;
        this.cargoCapacityVolume = data.cargoCapacityVolume;
        this.cargoCapacityWeight = data.cargoCapacityWeight;
        this.dimentionInterior = data.dimentionInterior;
        this.owner = data.owner;
        this.dateAcquired = data.dateAcquired ? new Date(data.dateAcquired) : undefined;
        this.vehicleStatus = data.vehicleStatus;
        this.driverId = data.driverId;
        this.dateCreatedAt = data.dateCreatedAt ? new Date(data.dateCreatedAt) : new Date();
        this.dateUpdatedAt = data.dateUpdatedAt ? new Date(data.dateUpdatedAt) : new Date();
        this.createdBy = data.createdBy;
        this.updatedBy = data.updatedBy;
        this.notes = data.notes;
        this.gpsLocation = data.gpsLocation;
    }
}