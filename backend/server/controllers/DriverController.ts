import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// Add a driver
// /api/drivers
export const AddDriver = async (req: Request, res: Response) => {
    try {
        const { name, phoneNumber, profilePhoto } = req.body;
        if (!name || !phoneNumber || !profilePhoto) {
            res.status(400).json({ message: "Please fill all the details" });
        };
        const driverDetails = await prisma.drivers.create({
            data: {
                name: name,
                phoneNumber: phoneNumber,
                profilePhoto: profilePhoto
            }
        })
        res.status(201).json({ status: "Driver Added Successfully" });
    } catch (error: any) {
        console.log("Add Driver Error: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// Get all drivers
// /api/drivers
export const getAllDrivers = async (req: Request, res: Response) => {
    try {
        const fetchDrivers = await prisma.drivers.findMany();

        const drivers = fetchDrivers.map(driver => ({
            ...driver,
            DriverId: driver.DriverId.toString(),
        }));

        res.status(200).json(drivers);
    } catch (error: any) {
        console.log("GetAllDrivers Error: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get driver by ID
// /api/drivers/:id
export const getDriver = async (req: Request, res: Response) => {
    try {
        if (!req.params.id)
            return res.status(403).json({ message: "Driver Id is required" });

        const fetchDriver = await prisma.drivers.findUnique({
            where: { DriverId: BigInt(req.params.id) },
        });

        if (!fetchDriver) {
            return res.status(404).json({ error: "Driver not found" });
        }

        const driver = {...fetchDriver, DriverId: fetchDriver.DriverId.toString()}

        res.status(200).json(driver);
    } catch (error: any) {
        console.log("Get driver by id error: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update a driver
// /api/drivers/:id
export const updateDriver = async (req: Request, res: Response) => {
    try {
        const driverId = req.params.id;
        if (!driverId)
            return res.status(403).json({ message: "Driver Id is required" });

        const { name, phoneNumber, profilePhoto } = req.body;

        const driver = await prisma.drivers.findUnique({ where: { DriverId: BigInt(driverId) } })

        if (!driver) {
            res.status(404).json({ message: "Driver not found" });
        }
        else {
            await prisma.drivers.update({
                where: { DriverId: BigInt(driverId) },
                data: {
                    name: name,
                    phoneNumber: phoneNumber,
                    profilePhoto: profilePhoto,
                },
            });
            res.status(201).json({ status: "Driver Details updated successfully" });
        }
    } catch (error: any) {
        console.log("Update Driver Error: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//Delete a driver
// /api/driver/:id
export const deleteDriver = async (req: Request, res: Response) => {
    try {
        const driverId = req.params.id;
        if (!driverId)
            return res.status(403).json({ message: "Driver Id is required" });

        const driver = await prisma.drivers.findUnique({ where: { DriverId: BigInt(driverId) } })

        if (!driver) {
            res.status(404).json({ message: "Driver not found" });
        } 
        else {
            await prisma.drivers.delete({
                where: { DriverId: BigInt(driverId) },
            });
            res.status(200).json({ message: "Driver deleted successfully" });
        }
    } catch (error: any) {
        console.log("Delete Vehicle Error: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};