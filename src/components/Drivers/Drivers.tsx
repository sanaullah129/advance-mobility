import React, { useEffect, useState } from "react";
import { fetchAllDrivers, fetchDriverById } from "../../apis/DriverApis";
import { DriverInterface } from "../../utils/Interfaces";
import { Button, Table, TableColumnsType } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import EditModal from "./EditModal";
import AddModal from "./AddModal";

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
  }, []);

  const handleEditDriver = async (driverId: number) => {
    const driverDetails: any = await fetchDriverById(driverId); //temp solution any
    setSingleDriver(driverDetails);
    setIsModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  }

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
      render: (text: string) => <img src={text} alt="Profile Photo" className="h-[70px] w-[60px]" />,
    },
    {
      title: "Edit Details",
      key: "editDriver",
      render: (driver: DriverInterface) => {
        return (
          <Button onClick={() => handleEditDriver(driver.DriverId)}>
            <EditTwoTone />
          </Button>
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
            <Button type="primary" onClick={handleOpenAddModal}>Add Driver</Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={rows}
        rowKey="DriverId"
        pagination={{ pageSize: 50 }}
        scroll={{ x: true, y: 500 }}
      />
      <EditModal
        data={singleDriver}
        open={isModalOpen}
        close={() => setIsModalOpen(false)}
      />
      <AddModal open={openAddModal} close={()=> setOpenAddModal(false)}  />
    </>
  );
};

export default Drivers;
