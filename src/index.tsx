import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./components/Loader/Loader.tsx";
import { GlobalContextProvider } from "./Context/GlobalProvider.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalContextProvider>
      <Provider store={store}>
        <BrowserRouter basename="/vite-project">
          <PersistGate loading={<Loader />} persistor={persistor}>
            <App />
            <ToastContainer position="top-center" autoClose={3500} />
          </PersistGate>
        </BrowserRouter>
      </Provider>
    </GlobalContextProvider>
  </StrictMode>
);
