import React, { FC, useState, useEffect, ChangeEvent } from "react";
import { VehicleInterface } from "../../utils/Interfaces";
import { Modal, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../utils/FirebaseConfig";
import { UpdateVehicle } from "../../apis/VehiclesApi";

interface EditVehiclesProps {
  data: VehicleInterface | null;
  open: boolean;
  close: () => void;
}

const EditVehicles: FC<EditVehiclesProps> = ({ data, open, close }) => {
  const [formValues, setFormValues] = useState<VehicleInterface>({
    VehicleId: 0,
    vehicleNumber: "",
    vehicleType: "",
    pucCertificate: "",
    insuranceCertificate: ""
  });
  const [pucUpload, setPucUpload] = useState<File | null>(null);
  const [insuranceUpload, setInsuranceUpload] = useState<File | null>(null);

  useEffect(() => {
    if (data) {
      setFormValues(data);
    }
  }, [data]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handlePucChange = (info: any) => {
    const file = info.file;
    if (file.type.toLowerCase().includes("image")) {
      setPucUpload(file);
    } else {
      toast.error("Please Upload an Image");
    }
  };

  const handleInsuranceChange = (info: any) => {
    const file = info.file;
    if (file.type.toLowerCase().includes("image")) {
      setInsuranceUpload(file);
    } else {
      toast.error("Please Upload an Image");
    }
  };

  const uploadImage = async (uploadFile: File | null) => {
    if (!uploadFile) {
      return toast.error("Please Select a File");
    }
    try {
      const fileName = new Date().getTime() + "-" + uploadFile.name;
      const imageRef = ref(storage, `vehicleDocuments/${fileName}`);
      await uploadBytes(imageRef, uploadFile);
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    } catch (error) {
      console.log("Error uploading file: " + error);
      toast.error("Error uploading file");
    }
  };

  const handleSave = async () => {
    if (!formValues.vehicleNumber || !formValues.vehicleType || !pucUpload || !insuranceUpload)
      return toast.error("Please fill all the details");

    const pucImageURL: any = await uploadImage(pucUpload);
    const insuranceImageURL: any = await uploadImage(insuranceUpload);
    const updatedVehicle = {
      ...formValues,
      pucCertificate: pucImageURL || formValues.pucCertificate,
      insuranceCertificate: insuranceImageURL || formValues.insuranceCertificate
    };

    const success: boolean = await UpdateVehicle(updatedVehicle.VehicleId, updatedVehicle.vehicleNumber, updatedVehicle.vehicleType, updatedVehicle.pucCertificate, updatedVehicle.insuranceCertificate);
    if (success) {
      toast.success("Vehicle Updated Successfully");
      close();
    } else {
      toast.error("500 - Internal Server Error");
    }
  };

  const handleCancel = () => {
    close();
  };

  return (
    <Modal
      title="Edit Vehicle Details"
      open={open}
      onCancel={handleCancel}
      footer={null}
    >
      {data && (
        <div className="space-y-4">
          <div className="flex flex-col">
            <label>Vehicle Number *</label>
            <Input
              name="vehicleNumber"
              value={formValues.vehicleNumber}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Vehicle Type *</label>
            <Input
              name="vehicleType"
              value={formValues.vehicleType}
              onChange={handleChange}
            />
          </div>
          <div className="mt-3">
            <label>PUC Certificate *</label>
            <Upload
              maxCount={1}
              beforeUpload={() => false}
              onChange={handlePucChange}
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
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditVehicles;
