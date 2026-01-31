import process from "process";
import { Buffer } from "buffer";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ContextProvider } from "./Context";

import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

window.process = process;
window.Buffer = Buffer;

root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
);
