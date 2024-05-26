import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Select } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';

const { Option } = Select;

interface TransferFormProps {
    open: boolean;
    close: () => void;
}

const TransferForm: React.FC<TransferFormProps> = ({ open, close }) => {
    const [vehicleNumber, setVehicleNumber] = useState<string>('');
    const [fromDriver, setFromDriver] = useState<string>('');
    const [toDriver, setToDriver] = useState<string>('');
    const [drivers, setDrivers] = useState<any[]>([]);
    const [vehicles, setVehicles] = useState<any[]>([]);

    useEffect(() => {
        const fetchDriversAndVehicles = async () => {
            try {
                const [driversRes, vehiclesRes] = await Promise.all([
                    axios.get('/api/drivers'),
                    axios.get('/api/vehicles')
                ]);

                setDrivers(driversRes.data);
                setVehicles(vehiclesRes.data);
            } catch (error) {
                toast.error("Error fetching drivers or vehicles");
            }
        };

        fetchDriversAndVehicles();
    }, []);

    const handleTransfer = async () => {
        try {
            const response = await axios.post('/api/transfer', {
                vehicleNumber,
                fromDriver,
                toDriver,
            });

            if (response.status === 201) {
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
