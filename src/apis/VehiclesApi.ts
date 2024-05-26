import toast from "react-hot-toast";
import { VehicleInterface } from "../utils/Interfaces";

const url: string = process.env.REACT_APP_API_URL as string

export const fetchAllVehicles = async () => {
    const response = await fetch(url + "vehicles");
    const vehicles: VehicleInterface[] = await response.json();
    return vehicles;
}

export const fetchVehicleById = async (id: number) => {
    if (!id)
        return toast.error("Some error occured");

    const response = await fetch(url + "vehicles/" + id);
    const vehicle: VehicleInterface = await response.json();
    return vehicle;
}

export const AddVehicle = async (vehicleNumber: string, vehicleType: string, pucCertificate: string, insuranceCertificate: string): Promise<boolean> => {
    const response = await fetch(url + "vehicles", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleNumber: vehicleNumber, vehicleType: vehicleType, pucCertificate: pucCertificate, insuranceCertificate: insuranceCertificate })
    });
    if (response.ok) {
        return true;
    }
    else {
        return false;
    }
}

export const UpdateVehicle = async (vehicleId: number, vehicleNumber: string, vehicleType: string, pucCertificate: string, insuranceCertificate: string): Promise<boolean> => {
    const response = await fetch(url + "vehicles/" + vehicleId, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleNumber: vehicleNumber, vehicleType: vehicleType, pucCertificate: pucCertificate, insuranceCertificate: insuranceCertificate }),
    });
    if (response.ok)
        return true;
    else
        return false;
}

export const DeleteVehicle = async (vehicleId: number): Promise<boolean> => {
    const response = await fetch(url + "vehicles/" + vehicleId, {
        method: 'DELETE',
    });
    if (response.ok)
        return true;
    else
        return false;
}