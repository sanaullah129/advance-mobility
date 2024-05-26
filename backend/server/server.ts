import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import vehicleRoutes from './routes/VehicleRoutes';
import driverRoutes from './routes/DriverRoutes';
import transferRoutes from './routes/TransferRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3200;

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/transfers", transferRoutes);

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
