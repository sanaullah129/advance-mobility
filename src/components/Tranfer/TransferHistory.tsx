import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { fetchTransferHistory } from "../../apis/TransferApi";
import TransferForm from "./TransferForm";

const TransferHistory: React.FC = () => {
  const [transferHistory, setTransferHistory] = useState<any[]>([]);
  const [isModaalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchHistory = async () => {
    try {
      const history = await fetchTransferHistory();
      setTransferHistory(history);
    } catch (error) {
      console.error("Error fetching transfer history", error);
    }
  };

  const handleOpenAddModal  = () => {
    setIsModalOpen(true);
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  const columns = [
    {
      title: "Vehicle Number",
      dataIndex: "VehicleNumber",
      key: "VehicleNumber",
    },
    {
      title: "From Driver",
      dataIndex: "FromDriver",
      key: "FromDriver",
    },
    {
      title: "To Driver",
      dataIndex: "ToDriver",
      key: "ToDriver",
    },
    {
      title: "Transfer Date",
      dataIndex: "TransferDate",
      key: "TransferDate",
      render: (text: string) => new Date(text).toLocaleString(),
    },
  ];

  const rows = transferHistory.map((transfer) => ({
    VehicleNumber: transfer.VehicleNumber,
    FromDriver: transfer.FromDriver,
    ToDriver: transfer.ToDriver,
    TransferDate: transfer.TransferDate,
  }));

  return (
    <>
    <div className="flex justify-between mx-8 px-4 my-8">
        <div>Manage Transfers</div>
        <div>
          <Button type="primary" onClick={handleOpenAddModal}>
            Transfer
          </Button>
        </div>
      </div>
      <div className="px-8 my-3">
      <Table dataSource={rows} columns={columns} rowKey="transferId" />
      </div>
      <TransferForm close={() => setIsModalOpen(false)} open={isModaalOpen} />
    </>
  );
};

export default TransferHistory;
