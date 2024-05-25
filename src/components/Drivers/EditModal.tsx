import React, { FC, useState, useEffect, ChangeEvent } from "react";
import { DriverInterface } from "../../utils/Interfaces";
import { Modal, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface EditModalProps {
  data: DriverInterface | null;
  open: boolean;
  close: () => void;
}

const EditModal: FC<EditModalProps> = ({ data, open, close }) => {
  const [formValues, setFormValues] = useState<DriverInterface | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (data) {
      setFormValues(data);
    }
  }, [data]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(null);
  };

  const handleImageChange = (info: any) => {
    if (info.file.status === "done") {
      setImageFile(info.file.originFileObj);
    }
  };

  const handleSave = () => {
    // Handle saving edited data and uploaded image
    console.log("Edited data:", formValues);
    console.log("Uploaded image:", imageFile);
    close();
  };

  return (
    <Modal
      title="Edit Driver Details"
      visible={open}
      onCancel={close}
      footer={null}
    >
      {formValues && (
        <div className="space-y-4">
          <div className="flex flex-col">
            <label>Name</label>
            <Input
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Phone Number</label>
            <Input
              name="phoneNumber"
              value={formValues.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Profile Photo</label>
            <Upload
              maxCount={1}
              onChange={handleImageChange}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Upload Photo</Button>
            </Upload>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
            <Button onClick={close}>Cancel</Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditModal;
