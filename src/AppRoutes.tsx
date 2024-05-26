import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Drivers from "./components/Drivers/Drivers";
import Home from "./components/Home";
import Vehicles from "./components/Vehicles/Vehicles";

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
    ],
  },
]);

export default Routes;
