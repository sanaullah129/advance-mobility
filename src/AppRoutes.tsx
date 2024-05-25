import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Drivers from "./components/Drivers/Drivers";
import Home from "./components/Home";

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
    ],
  },
]);

export default Routes;
