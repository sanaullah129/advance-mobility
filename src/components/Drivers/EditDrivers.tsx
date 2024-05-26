import React, { FC, useState, useEffect, ChangeEvent } from "react";
import { DriverInterface } from "../../utils/Interfaces";
import { Modal, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../utils/FirebaseConfig";
import { UpdateDriver } from "../../apis/DriverApis";

interface EditDriversProps {
  data: DriverInterface | null;
  open: boolean;
  close: () => void;
}

const EditDrivers: FC<EditDriversProps> = ({ data, open, close }) => {
  const [formValues, setFormValues] = useState<DriverInterface>({
    DriverId: 0,
    name: "",
    phoneNumber: data?.phoneNumber!,
    profilePhoto: "",
  });
  const [imageUpload, setImageUpload] = useState<any|null>(null);
  const [imageURL, setImageURL] = useState<string>("");

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
    console.log(formValues)
  };

  const handleImageChange = (info: any) => {
      const file = info.file;
      if (file.type.toLowerCase().includes("image")) {
        setImageUpload(file);
      } else {
        toast.error("Please Upload an Image");
      }
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
    }
  };

  const handleSave = async () => {
    if (!formValues.name || !formValues.phoneNumber || !imageUpload)
      return toast.error("Please fill all the details");

    await uploadImage();
    const success: boolean = await UpdateDriver(formValues.DriverId, formValues.name, formValues.phoneNumber, imageURL);
    if (success) {
      toast.success("Driver Updated Successfully");
      close();
    } else {
      toast.error("500 - Internal Server Error");
    }
    close();
  };

  return (
    <Modal
      title="Edit Driver Details"
      open={open}
      onCancel={close}
      footer={null}
    >
      {data && (
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

export default EditDrivers;

