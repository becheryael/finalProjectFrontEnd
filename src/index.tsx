import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import { SessionTimeoutProvider } from "./store/SessionTimeoutProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <SessionTimeoutProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </SessionTimeoutProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
