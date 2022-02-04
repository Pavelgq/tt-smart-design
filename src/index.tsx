import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RoutesList } from "./routesList";
import "./styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RoutesList />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
