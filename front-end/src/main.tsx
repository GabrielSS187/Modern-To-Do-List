import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "swiper/css/bundle";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode >
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);