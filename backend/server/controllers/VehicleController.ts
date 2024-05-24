import { Request, Response } from "express";
import pool from "../database";
import { Vehicles } from "../interfaces/VehicleInterface";
import { ResponseStatus } from "../interfaces/CommonTypes";

export const getAllVehicles = async (req: Request, res: Response) => {
  try {
    await pool.query(
      "CALL GetAllVehicles()",
      function (error: any, result: Vehicles[]) {
        if (error) {
          console.log("Database level GetAllVehicles Error: ", error);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.status(200).json(result);
        }
      }
    );
  } catch (error: any) {
    console.log("GetAllVehicles Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getVehicle = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { vehicleId } = req.body;
    await pool.query(
      "CALL GetVehicle(?)"[vehicleId],
      function (error: any, result: Vehicles) {
        if (error) {
          console.log("Database level Get one vehicle error: " + error);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.status(200).json(result);
        }
      }
    );
  } catch (error) {
    console.log("Get one vehicle error: " + error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { vehicleNumber, vehicleType, PUCCertificate, InsuranceCertificate } =
      req.body;
    await pool.query(
      "CALL UpdateVehicle(?, ?, ?, ?)" [vehicleNumber, vehicleType, PUCCertificate, InsuranceCertificate],
      function (error: any, result: ResponseStatus) {
        if(error){
            console.log("Database level Update Vehicle Error", error);
            res.status(500).json({error: "Internal Server Error"});
        }
      }
    );
  } catch (error: any) {
    console.log("Update Vehicle Error: " + error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const deleteVeg
