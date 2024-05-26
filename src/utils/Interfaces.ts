export interface DriverInterface{
    DriverId: number;
    name: string;
    phoneNumber: number;
    profilePhoto: string;
}

export interface VehicleInterface{
    VehicleId: number;
    vehicleNumber: string;
    vehicleType: string;
    pucCertificate: string;
    insuranceCertificate: string;
}