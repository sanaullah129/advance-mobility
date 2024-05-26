import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Transfer a vehicle from one driver to another
// /api/transfer
export const transferVehicle = async (req: Request, res: Response) => {
    try {
        const { vehicleNumber, fromDriver, toDriver } = req.body;

        if (!vehicleNumber || !fromDriver || !toDriver) {
            return res.status(400).json({ message: "Please provide all required details" });
        }

        const transfer = await prisma.transfers.create({
            data: {
                VehicleNumber: vehicleNumber,
                FromDriver: fromDriver,
                ToDriver: toDriver,
            },
        });

        const vehicle = await prisma.vehicles.findFirst({
            where: { vehicleNumber: vehicleNumber },
        });

        if (vehicle) {
            await prisma.vehicles.update({
                where: { VehicleId: vehicle.VehicleId },
                data: { driverId: (await prisma.drivers.findFirst({ where: { name: toDriver } }))?.DriverId },
            });
        }

        res.status(201).json({ status: "Vehicle transferred successfully", transfer });
    } catch (error: any) {
        console.log("Transfer Vehicle Error: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get transfer history
// /api/transfers
export const getTransferHistory = async (req: Request, res: Response) => {
    try {
        const transferHistory = await prisma.transfers.findMany();

        res.status(200).json(transferHistory);
    } catch (error: any) {
        console.log("Get Transfer History Error: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
