import {
  CarTwoTone,
  ContactsTwoTone,
  InteractionTwoTone,
} from "@ant-design/icons";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex justify-around w-full px-8 mx-8">
        <div className="flex flex-col justify-center items-center h-52 w-52 m-4">
          <Card
            title="Manage Drivers"
            hoverable
            onClick={()=> navigate("/drivers")}
            className="flex flex-col justify-center items-center text-center cursor-pointer w-full h-full"
          >
            <ContactsTwoTone className="text-5xl" />
          </Card>
        </div>
        <div className="flex flex-col justify-center items-center h-52 w-52 m-4">
          <Card
            title="Manage Vehicles"
            hoverable
            onClick={()=> navigate("/vehicles")}
            className="flex flex-col justify-center items-center text-center cursor-pointer w-full h-full"
          >
            <CarTwoTone className="text-5xl" />
          </Card>
        </div>
        <div className="flex flex-col justify-center items-center h-52 w-52 m-4">
          <Card
            title="Manage Transfers"
            hoverable
            onClick={()=> navigate("/transfers")}
            className="flex flex-col justify-center items-center text-center cursor-pointer w-full h-full"
          >
            <InteractionTwoTone className="text-5xl" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
