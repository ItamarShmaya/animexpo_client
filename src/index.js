import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LoggedInUserProvider from "./context/LoggedInUserProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <LoggedInUserProvider>
    <App />
  </LoggedInUserProvider>
  // </React.StrictMode>
);
