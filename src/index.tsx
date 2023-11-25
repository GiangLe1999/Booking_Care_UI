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
import ManageClinic from "./routes/manage-clinic";
import ManageSpecialty from "./routes/manage-specialty";
import Specialty from "./routes/specialty";
import Clinic from "./routes/clinic";
import ManagePatient from "./routes/manage-patient";
import Specialties from "./routes/specialties";
import Clinics from "./routes/clinics";
import Doctors from "./routes/doctors";
import ManageHanbook from "./routes/manage-handbook";
import ManageLonglive from "./routes/manage-longlive";
import ManageTips from "./routes/manage-tips";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Home /> },
      { path: "user/:id", element: <Doctor /> },
      { path: "dat-lich-kham/:time", element: <BookSchedule /> },
      { path: "verify-booking", element: <VerifyBooking /> },
      { path: "specialty/:id", element: <Specialty /> },
      { path: "clinic/:id", element: <Clinic /> },
      { path: "chuyen-khoa", element: <Specialties /> },
      { path: "co-so-y-te/tat-ca", element: <Clinics /> },
      { path: "bac-si", element: <Doctors /> },
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
      { path: "manage-clinic", element: <ManageClinic /> },
      { path: "manage-specialty", element: <ManageSpecialty /> },
      { path: "manage-patient", element: <ManagePatient /> },
      { path: "manage-handbook", element: <ManageHanbook /> },
      { path: "manage-longlive", element: <ManageLonglive /> },
      { path: "manage-tips", element: <ManageTips /> },
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
