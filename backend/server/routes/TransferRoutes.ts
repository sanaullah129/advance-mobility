import express from "express";
import { getTransferHistory, transferVehicle } from "../controllers/TransferController";

const transferRoutes = express.Router();

transferRoutes.route('/').post(transferVehicle).get(getTransferHistory);

export default transferRoutes;