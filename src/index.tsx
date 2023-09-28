import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { WebsocketProvider } from "./shared/context/WebsocketContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <WebsocketProvider>
        <AppRoutes />
      </WebsocketProvider>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
