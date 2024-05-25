import React, { FC, useState, ChangeEvent } from "react";
import { Modal, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../utils/FirebaseConfig";
import { AddDriver } from "../../apis/DriverApis";

interface AddModalProps {
  open: boolean;
  close: () => void;
}

const AddModal: FC<AddModalProps> = ({ open, close }) => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleChange = (info: any) => {
    const file = info.file;
    if (file.type.toLowerCase().includes("image")) {
      setImageUpload(file);
    } else {
      toast.error("Please Upload an Image");
    }
  };

  const resetFields = () => {
    setName("");
    setPhone("");
    setImageURL("");
    setImageUpload(null);
  };

  const uploadImage = async () => {
    if (!imageUpload) {
      return toast.error("Please Select a File");
    }
    try {
      const fileName = new Date().getTime() + "-" + imageUpload.name;
      const imageRef = ref(storage, `driverPhoto/${fileName}`);
      await uploadBytes(imageRef, imageUpload);
      const downloadURL = await getDownloadURL(imageRef);
      setImageURL(downloadURL);
      return downloadURL;
    } catch (error) {
      console.log("Error uploading file: " + error);
      toast.error("Error uploading file");
      return "";
    }
  };

  const handleSubmit = async () => {
    if (!name || !phone || !imageUpload)
      return toast.error("Please fill all the details");

    const url = await uploadImage();
    if (!url) return;
    console.log(name, phone, url);
    const success: boolean = await AddDriver(name, phone, url);
    if (success) {
      toast.success("Driver Added Successfully");
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
          <label>Name *</label>
          <Input
            name="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Driver Name"
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <label>Phone Number *</label>
          <Input
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Phone Number"
            className="w-full"
          />
        </div>
        <div className="mt-3">
          <Upload
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleChange}
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

export default AddModal;
