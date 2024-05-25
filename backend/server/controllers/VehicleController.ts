import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add a vehicle
// /api/vehicles
export const AddVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleNumber, vehicleType, pucCertificate, insuranceCertificate } = req.body;
    await prisma.vehicles.create({
      data: {
        vehicleNumber: vehicleNumber,
        vehicleType: vehicleType,
        pucCertificate: pucCertificate,
        insuranceCertificate: insuranceCertificate
      }
    })
    res.status(201).json({ status: "Vehicle Added Successfully" });
  } catch (error: any) {
    console.log("Add Driver Error: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


// Get all vehicles
// /api/vehicles
export const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const fetchvehicles = await prisma.vehicles.findMany();
    const vehicles = fetchvehicles.map(vehicle => ({
      ...vehicle,
      VehicleId: vehicle.VehicleId.toString(),
    }));
    res.status(200).json(vehicles);
  } catch (error: any) {
    console.log("GetAllVehicles Error: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get vehicle by ID
// /api/vehicles/:id
export const getVehicle = async (req: Request, res: Response) => {
  try {
    const vehicleId = req.params.id;
    if (!vehicleId)
      return res.status(403).json({ message: "Vehicle Id is required" });

    const fetchVehicle = await prisma.vehicles.findUnique({
      where: { VehicleId: BigInt(vehicleId) },
    });

    if (!fetchVehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    const vehicle = { ...fetchVehicle, VehicleId: fetchVehicle.VehicleId.toString() }

    res.status(200).json(vehicle);
  } catch (error: any) {
    console.log("Get one vehicle error: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a vehicle
// /api/vehicles/:id
export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const vehicleId = req.params.id;
    const { vehicleNumber, vehicleType, PUCCertificate, InsuranceCertificate } = req.body;

    if (!vehicleId)
      return res.status(403).json({ message: "Vehicle Id is required" });

    const vehicle = await prisma.vehicles.findUnique({ where: { VehicleId: BigInt(vehicleId) } })
    if (!vehicle) {
      res.status(404).json({ message: "Vehicle not found" });
    }
    else {
      await prisma.vehicles.update({
        where: { VehicleId: BigInt(vehicleId) },
        data: {
          vehicleNumber: vehicleNumber,
          vehicleType: vehicleType,
          pucCertificate: PUCCertificate,
          insuranceCertificate: InsuranceCertificate,
        },
      });
    }

    res.status(200).json({ status: "Vehicle Updated Successfully" });
  } catch (error: any) {
    console.log("Update Vehicle Error: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Delete a vehicle
// /api/vehicles/:id
export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const vehicleId = req.params.id;
    if (!vehicleId)
      return res.status(403).json({ message: "Vehicle Id is required" });

    const vehicle = await prisma.vehicles.findUnique({ where: { VehicleId: BigInt(vehicleId) } });

    if (!vehicle) {
      res.send(404).json({ message: "Vehicle not found" });
    } else {
      await prisma.vehicles.delete({
        where: { VehicleId: BigInt(vehicleId) },
      });
      res.status(200).json({ message: "Vehicle deleted successfully" });
    }
  } catch (error: any) {
    console.log("Delete Vehicle Error: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};