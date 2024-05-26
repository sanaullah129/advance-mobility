import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Drivers from "./components/Drivers/Drivers";
import Home from "./components/Home";
import Vehicles from "./components/Vehicles/Vehicles";
import TransferHistory from "./components/Tranfer/TransferHistory";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "drivers",
        element: <Drivers />,
      },
      {
        path: "vehicles",
        element: <Vehicles />,
      },
      {
        path: "transfers",
        element: <TransferHistory />,
      },
    ],
  },
]);

export default Routes;
