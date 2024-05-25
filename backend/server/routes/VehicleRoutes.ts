import express from "express";
import { AddVehicle, deleteVehicle, getAllVehicles, getVehicle, updateVehicle } from "../controllers/VehicleController";

const vehicleRoutes = express.Router();

vehicleRoutes.route('/').get(getAllVehicles).post(AddVehicle);
vehicleRoutes.route('/:id').put(updateVehicle).delete(deleteVehicle).get(getVehicle);

export default vehicleRoutes;