import toast from "react-hot-toast";
import { DriverInterface } from "../utils/Interfaces";

const url: string = process.env.REACT_APP_API_URL as string

export const fetchAllDrivers = async () => {
    const response = await fetch(url + "drivers");
    const drivers: DriverInterface[] = await response.json();
    return drivers;
}

export const fetchDriverById = async (id: number) => {
    if (!id)
        return toast.error("Some error occured");

    const response = await fetch(url + "drivers/" + id);
    const driver: DriverInterface = await response.json();
    return driver;
}

export const AddDriver = async (name: string, phoneNumber: string, imageLink: string): Promise<boolean> => {
    const response = await fetch(url + "drivers", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, phoneNumber: phoneNumber, profilePhoto: imageLink })
    });
    if (response.ok) {
        return true;
    }
    else {
        return false;
    }
}

export const UpdateDriver = async (driverId: number, name: string, phoneNumber: number, imageLink: string): Promise<boolean> => {
    const response = await fetch(url + "drivers/" + driverId, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, phoneNumber: phoneNumber, profilePhoto: imageLink }),
    });
    if (response.ok)
        return true;
    else
        return false;
}

export const DeleteDriver = async (driverId: number): Promise<boolean> => {
    const response = await fetch(url + "drivers/" + driverId, {
        method: 'DELETE',
    });
    if (response.ok)
        return true;
    else
        return false;
}