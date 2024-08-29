import { NextUIProvider } from "@nextui-org/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AvatarProvider } from "./context/AvatarContext.jsx";
import "./index.css";
import store from "./store/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NextUIProvider>
          <AvatarProvider>
            <App />
          </AvatarProvider>
        </NextUIProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
