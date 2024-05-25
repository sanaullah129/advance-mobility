import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import Routes from "./AppRoutes";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <Toaster
      toastOptions={{
        position: "bottom-center",
        style: {
          background: "#ffff",
          color: "black",
          marginBottom: "20px",
          fontWeight: "500",
        },
      }}
    />
    <RouterProvider router={Routes} />
  </>
);

reportWebVitals();
