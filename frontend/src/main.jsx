import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./context/UserContext.jsx";
import DocumentContext from "./context/DocumentContext.jsx";

createRoot(document.getElementById("root")).render(
 
    <BrowserRouter>
      <UserContext>
        <DocumentContext>
          <App />
        </DocumentContext>
      </UserContext>
      <ToastContainer />
    </BrowserRouter>
  
);