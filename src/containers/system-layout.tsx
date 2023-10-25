import { FC } from "react";
import AdminHeader from "../components/layout/admin-header";
import { Outlet } from "react-router-dom";

interface Props {}

const SystemLayout: FC<Props> = (props): JSX.Element => {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
};

export default SystemLayout;
