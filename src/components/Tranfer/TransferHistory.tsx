import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const TransferHistory: React.FC = () => {
    const [transferHistory, setTransferHistory] = useState<any[]>([]);

    useEffect(() => {
        const fetchTransferHistory = async () => {
            try {
                const response = await axios.get('/api/transfers');
                setTransferHistory(response.data);
            } catch (error) {
                console.error("Error fetching transfer history", error);
            }
        };

        fetchTransferHistory();
    }, []);

    const columns = [
        {
            title: 'Vehicle Number',
            dataIndex: 'VehicleNumber',
            key: 'VehicleNumber',
        },
        {
            title: 'From Driver',
            dataIndex: 'FromDriver',
            key: 'FromDriver',
        },
        {
            title: 'To Driver',
            dataIndex: 'ToDriver',
            key: 'ToDriver',
        },
        {
            title: 'Transfer Date',
            dataIndex: 'TransferDate',
            key: 'TransferDate',
            render: (text: string) => new Date(text).toLocaleString(),
        },
    ];

    return (
        <Table dataSource={transferHistory} columns={columns} rowKey="TransferId" />
    );
};

export default TransferHistory;
