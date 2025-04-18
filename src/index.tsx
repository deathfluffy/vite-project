import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/vite-project">
      <Provider store={store}>
        <App />
        <ToastContainer
          position="top-center"
          autoClose={3500}
        />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
