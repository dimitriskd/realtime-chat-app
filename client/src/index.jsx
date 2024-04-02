import App from "./App";
import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";

const dom = document.querySelector("#root");
const root = createRoot(dom);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
