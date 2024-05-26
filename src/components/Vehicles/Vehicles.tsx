import { Button, Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { VehicleInterface } from "../../utils/Interfaces";
import {
  DeleteVehicle,
  fetchAllVehicles,
  fetchVehicleById,
} from "../../apis/VehiclesApi";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import AddVehicles from "./AddVehicles";
import toast from "react-hot-toast";
import EditVehicles from "./EditVehicles";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<VehicleInterface[]>([]);
  const [singleVehicle, setSingleVehicle] = useState<VehicleInterface | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  const fetchVehicles = async () => {
    const fetchedVehicles: VehicleInterface[] = await fetchAllVehicles();
    setVehicles(fetchedVehicles);
  };

  const handleEditVehicle = async (driverId: number) => {
    const vehicleDetail: any = await fetchVehicleById(driverId); //temp solution any
    setSingleVehicle(vehicleDetail);
    setIsModalOpen(true);
  };

  const handleDeleteVehicle = async (id: number) => {
    const isDeleted: boolean = await DeleteVehicle(id);
    if (isDeleted) {
      toast.success("Driver Deleted Successfully");
      fetchAllVehicles();
    } else toast.error("Some error occured");
  };

  useEffect(() => {
    fetchVehicles();
  }, [vehicles]);

  const columns: TableColumnsType<VehicleInterface> = [
    {
      title: "Vehicle Number",
      dataIndex: "vehicleNumber",
      key: "vehicleNumber",
    },
    {
      title: "Vehicl eType",
      dataIndex: "vehicleType",
      key: "vehicleType",
    },
    {
      title: "Insurance Certificate",
      dataIndex: "insuranceCertificate",
      key: "insuranceCertificate",
      render: (text: string) => (
        <img
          src={text}
          alt="Insurance Certificate"
          className="h-[70px] w-[60px]"
        />
      ),
    },
    {
      title: "PUC Certificate",
      dataIndex: "pucCertificate",
      key: "pucCertificate",
      render: (text: string) => (
        <img src={text} alt="PUC Certificate" className="h-[70px] w-[60px]" />
      ),
    },
    {
      title: "Edit Details",
      key: "editDriver",
      width: "12%",
      render: (driver: VehicleInterface) => {
        return (
          <div className="flex justify-between">
            <Button onClick={() => handleEditVehicle(driver.VehicleId)}>
              <EditTwoTone />
            </Button>
            <Button onClick={() => handleDeleteVehicle(driver.VehicleId)}>
              <DeleteTwoTone />
            </Button>
          </div>
        );
      },
    },
  ];

  const rows: VehicleInterface[] = vehicles.map((vehicle) => ({
    VehicleId: vehicle.VehicleId,
    vehicleNumber: vehicle.vehicleNumber,
    vehicleType: vehicle.vehicleType,
    insuranceCertificate: vehicle.insuranceCertificate,
    pucCertificate: vehicle.pucCertificate,
  }));

  return (
    <>
      <div className="flex justify-between mx-8 px-4 my-8">
        <div>Manage Vehicles</div>
        <div>
          <Button type="primary" onClick={() => setOpenAddModal(true)}>
            Add Vehicle
          </Button>
        </div>
      </div>
      <div>
        <Table
          rowKey="VehicleId"
          columns={columns}
          dataSource={rows}
          pagination={{ pageSize: 50 }}
          scroll={{ x: true, y: 500 }}
        />
      </div>
      <AddVehicles open={openAddModal} close={() => setOpenAddModal(false)} />
      <EditVehicles
        data={singleVehicle}
        open={isModalOpen}
        close={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Vehicles;
