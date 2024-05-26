import React, { FC, useState, ChangeEvent } from "react";
import { Modal, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../utils/FirebaseConfig";
import { AddVehicle } from "../../apis/VehiclesApi";

interface AddVehiclesProps {
  open: boolean;
  close: () => void;
}

const AddVehicles: FC<AddVehiclesProps> = ({ open, close }) => {
  const [vehicleNumber, setVehicleNumber] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string>("");
  const [pucCertificate, setPucCertificate] = useState<File | null>(null);
  const [insuranceCertificate, setInsuranceCertificate] =  useState<File | null>(null);

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVehicleNumber(e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVehicleType(e.target.value);
  };

  const handlePUCChange = (info: any) => {
    const file = info.file;
    if (file.type.toLowerCase().includes("image")) {
      setPucCertificate(file);
    } else {
      toast.error("Please Upload an Image");
    }
  };

  const handleInsuranceChange = (info: any) => {
    const file = info.file;
    if (file.type.toLowerCase().includes("image")) {
      setInsuranceCertificate(file);
    } else {
      toast.error("Please Upload an Image");
    }
  };

  const resetFields = () => {
    setInsuranceCertificate(null);
    setVehicleNumber("");
    setVehicleType("");
    setPucCertificate(null);
  };

  const uploadImage = async (uploadFile: any) => {
    if (!uploadFile) {
      return toast.error("Please Select a File");
    }
    try {
      const fileName = new Date().getTime() + "-" + uploadFile.name;
      const imageRef = ref(storage, `driverPhoto/${fileName}`);
      await uploadBytes(imageRef, uploadFile);
      const downloadURL = await getDownloadURL(imageRef);      
      return downloadURL;
    } catch (error) {
      console.log("Error uploading file: " + error);
      toast.error("Error uploading file");
    }
  };

  const handleSubmit = async () => {
    if (!vehicleNumber || !vehicleType || !pucCertificate || !insuranceCertificate)
      return toast.error("Please fill all the details");

    const pucImageURL: any = await uploadImage(pucCertificate);
    const insuranceImageURL: any = await uploadImage(insuranceCertificate);
    const success: boolean = await AddVehicle(vehicleNumber, vehicleType, pucImageURL, insuranceImageURL);
    if (success) {
      toast.success("Vehicle Added Successfully");
      resetFields();
      close();
    } else {
      toast.error("500 - Internal Server Error");
    }
  };

  const handleCancel = () => {
    resetFields();
    close();
  };

  return (
    <Modal
      title="Add Driver Details"
      open={open}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="space-y-4">
        <div className="flex flex-col">
          <label>Vehicle Number *</label>
          <Input
            name="vehicleNumber"
            value={vehicleNumber}
            onChange={handleNumberChange}
            placeholder="Vehicle Number"
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <label>Vehicle Type *</label>
          <Input
            name="vehicleType"
            value={vehicleType}
            onChange={handleTypeChange}
            placeholder="Vehicle Type"
            className="w-full"
          />
        </div>
        <div className="mt-3">
          <label>PUC Certificate *</label>
          <Upload
            maxCount={1}
            beforeUpload={() => false}
            onChange={handlePUCChange}
            showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
        <div className="mt-3">
          <label>Insurance Certificate *</label>
          <Upload
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleInsuranceChange}
            showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddVehicles;
