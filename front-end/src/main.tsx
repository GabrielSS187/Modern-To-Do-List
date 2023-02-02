import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { DndProvider } from "react-dnd";
import { HTML5Backend  } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import "swiper/css/bundle";
import "./index.css";

//* Verificar si é um dispositivo mobile ou desktop
const backend = isMobile ? TouchBackend : HTML5Backend;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DndProvider backend={backend}>
      <App />
    </DndProvider>
  </React.StrictMode>,
);