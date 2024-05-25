import express from "express";
import { AddDriver, deleteDriver, getAllDrivers, getDriver, updateDriver } from "../controllers/DriverController";

const driverRoutes = express.Router();

driverRoutes.route('/').get(getAllDrivers).post(AddDriver);
driverRoutes.route('/:id').put(updateDriver).delete(deleteDriver).get(getDriver);

export default driverRoutes;