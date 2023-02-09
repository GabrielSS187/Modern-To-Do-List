import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { isMobile } from "react-device-detect";
import "swiper/css/bundle";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { DndProvider } from "react-dnd";

//* Verificar si esta no mobile para poder habilitar as movimentações
//* de arrastar e soltar.
const backend =  isMobile ? TouchBackend : HTML5Backend;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode >
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={backend}>
        <App />
      </DndProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);