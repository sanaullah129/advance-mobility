import React, { useEffect, useState } from "react";
import {
  DeleteDriver,
  fetchAllDrivers,
  fetchDriverById,
} from "../../apis/DriverApi";
import { DriverInterface } from "../../utils/Interfaces";
import { Button, Table, TableColumnsType } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import EditDrivers from "./EditDrivers";
import AddDrivers from "./AddDrivers";
import toast from "react-hot-toast";

const Drivers = () => {
  const [drivers, setDrivers] = useState<DriverInterface[]>([]);
  const [singleDriver, setSingleDriver] = useState<DriverInterface | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  const fetchDrivers = async () => {
    const fetchedDrivers: DriverInterface[] = await fetchAllDrivers();
    setDrivers(fetchedDrivers);
  };

  useEffect(() => {
    fetchDrivers();
  }, [drivers]);

  const handleEditDriver = async (driverId: number) => {
    const driverDetails: any = await fetchDriverById(driverId); //temp solution any
    setSingleDriver(driverDetails);
    setIsModalOpen(true);
  };

  const handleDeleteDriver = async (id: number) => {
    const isDeleted: boolean = await DeleteDriver(id);
    if (isDeleted) {
      toast.success("Driver Deleted Successfully");
      fetchAllDrivers();
    } else toast.error("Some error occured");
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const columns: TableColumnsType<DriverInterface> = [
    {
      title: "Driver Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Profile Photo",
      dataIndex: "profilePhoto",
      key: "profilePhoto",
      render: (text: string) => (
        <img src={text} alt="Profile Photo" className="h-[70px] w-[60px]" />
      ),
    },
    {
      title: "Edit Details",
      key: "editDriver",
      width: "12%",
      render: (driver: DriverInterface) => {
        return (
          <div className="flex justify-around">
            <Button onClick={() => handleEditDriver(driver.DriverId)}>
              <EditTwoTone />
            </Button>
            <Button onClick={() => handleDeleteDriver(driver.DriverId)}>
              <DeleteTwoTone />
            </Button>
          </div>
        );
      },
    },
  ];

  const rows: DriverInterface[] = drivers.map((driver) => ({
    DriverId: driver.DriverId,
    name: driver.name,
    phoneNumber: driver.phoneNumber,
    profilePhoto: driver.profilePhoto,
  }));

  return (
    <>
      <div className="flex justify-between mx-8 px-4 my-8">
        <div>Manage Drivers</div>
        <div>
          <Button type="primary" onClick={handleOpenAddModal}>
            Add Driver
          </Button>
        </div>
      </div>
      <div className="px-8 my-3">
        <Table
          columns={columns}
          dataSource={rows}
          rowKey="DriverId"
          pagination={{ pageSize: 50 }}
          scroll={{ x: true, y: 500 }}
        />
      </div>
      <EditDrivers
        data={singleDriver}
        open={isModalOpen}
        close={() => setIsModalOpen(false)}
      />
      <AddDrivers open={openAddModal} close={() => setOpenAddModal(false)} />
    </>
  );
};

export default Drivers;
