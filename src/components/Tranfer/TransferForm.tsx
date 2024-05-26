import React, { FC, useState, useEffect } from 'react';
import { Modal, Select, Button } from 'antd';
import toast from 'react-hot-toast';
import { fetchAllDrivers } from '../../apis/DriverApi';
import { fetchAllVehicles } from '../../apis/VehiclesApi';
import { transferVehicle } from '../../apis/TransferApi';

const { Option } = Select;

interface TransferFormProps {
    open: boolean;
    close: () => void;
}

const TransferForm: FC<TransferFormProps> = ({ open, close }) => {
    const [vehicleNumber, setVehicleNumber] = useState<string>('');
    const [fromDriver, setFromDriver] = useState<string>('');
    const [toDriver, setToDriver] = useState<string>('');
    const [drivers, setDrivers] = useState<any[]>([]);
    const [vehicles, setVehicles] = useState<any[]>([]);

    useEffect(() => {
        const fetchDriversAndVehicles = async () => {
            try {
                const [driversRes, vehiclesRes] = await Promise.all([
                    fetchAllDrivers(),
                    fetchAllVehicles()
                ]);

                setDrivers(driversRes);
                setVehicles(vehiclesRes);
            } catch (error) {
                toast.error("Error fetching drivers or vehicles");
            }
        };

        fetchDriversAndVehicles();
    }, []);

    const handleTransfer = async () => {
        try {
            const success = await transferVehicle(vehicleNumber, fromDriver, toDriver);
            if (success) {
                toast.success("Vehicle transferred successfully");
                close();
            } else {
                toast.error("Failed to transfer vehicle");
            }
        } catch (error) {
            toast.error("Error transferring vehicle");
        }
    };

    return (
        <Modal
            title="Transfer Vehicle"
            open={open}
            onCancel={close}
            footer={null}
        >
            <div className="space-y-4">
                <div className="flex flex-col">
                    <label>Vehicle *</label>
                    <Select
                        value={vehicleNumber}
                        onChange={setVehicleNumber}
                        placeholder="Select Vehicle"
                    >
                        {vehicles.map(vehicle => (
                            <Option key={vehicle.vehicleNumber} value={vehicle.vehicleNumber}>
                                {vehicle.vehicleNumber}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className="flex flex-col">
                    <label>From Driver *</label>
                    <Select
                        value={fromDriver}
                        onChange={setFromDriver}
                        placeholder="Select From Driver"
                    >
                        {drivers.map(driver => (
                            <Option key={driver.name} value={driver.name}>
                                {driver.name}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className="flex flex-col">
                    <label>To Driver *</label>
                    <Select
                        value={toDriver}
                        onChange={setToDriver}
                        placeholder="Select To Driver"
                    >
                        {drivers.map(driver => (
                            <Option key={driver.name} value={driver.name}>
                                {driver.name}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button type="primary" onClick={handleTransfer}>
                        Transfer
                    </Button>
                    <Button onClick={close}>Cancel</Button>
                </div>
            </div>
        </Modal>
    );
};

export default TransferForm;
