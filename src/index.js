import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

import "./assets/fonts/fonts.css";

// import "leaflet/dist/leaflet.css";
import { FunctionContextProvider } from "./components/Contexts/FunctionContext";
import { StateContextProvider } from "./components/Contexts/StateContext";
import { ThemeContextProvider } from "./components/Contexts/ThemesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeContextProvider>
    <StateContextProvider>
      <FunctionContextProvider>
        <App />
      </FunctionContextProvider>
    </StateContextProvider>
  </ThemeContextProvider>
);
