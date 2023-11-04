import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider as StateProvider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./routes/home";
import RootLayout from "./containers/root-layout";
import SystemLayout from "./containers/system-layout";
import ManageUser from "./routes/manage-user";
import IntlProviderWrapper from "./containers/intl-provider-wrapper";
import Login from "./routes/auth/login";
import ManageDoctor from "./routes/manage-doctor";
import SubLayout from "./containers/sub-layout";
import Doctor from "./routes/doctor";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Home /> },
      { path: "user/:id", element: <Doctor /> },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/system",
    element: <SystemLayout />,
    children: [
      { path: "manage-user", element: <ManageUser /> },
      { path: "manage-doctor", element: <ManageDoctor /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StateProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <IntlProviderWrapper>
        <RouterProvider router={router} />
        <ToastContainer />
      </IntlProviderWrapper>
    </PersistGate>
  </StateProvider>
);
