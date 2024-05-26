import toast from 'react-hot-toast';

const url = process.env.REACT_APP_API_URL;

export const transferVehicle = async (vehicleNumber: string, fromDriver: string, toDriver: string) => {
    const response = await fetch(`${url}transfers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ VehicleNumber: vehicleNumber, FromDriver: fromDriver, ToDriver: toDriver }),
    });
    return response.ok;
};

export const fetchTransferHistory = async () => {
    const response = await fetch(`${url}transfers`);
    if (!response.ok) {
       return toast.error('Failed to fetch transfer history');
    }
    const history = await response.json();
    return history;
};
