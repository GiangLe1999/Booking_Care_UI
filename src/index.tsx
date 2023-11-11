import ReactDOM from "react-dom/client";
import "./styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider as StateProvider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./routes/home";
import SystemLayout from "./containers/system-layout";
import ManageUser from "./routes/manage-user";
import IntlProviderWrapper from "./containers/intl-provider-wrapper";
import Login from "./routes/auth/login";
import ManageDoctor from "./routes/manage-doctor";
import Doctor from "./routes/doctor";
import ManageSchedule from "./routes/manage-schedule";
import BookSchedule from "./routes/book-schedule";
import VerifyBooking from "./routes/verify-booking";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Home /> },
      { path: "user/:id", element: <Doctor /> },
      { path: "dat-lich-kham/:time", element: <BookSchedule /> },
      { path: "verify-booking", element: <VerifyBooking /> },
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
      { path: "manage-schedule", element: <ManageSchedule /> },
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
