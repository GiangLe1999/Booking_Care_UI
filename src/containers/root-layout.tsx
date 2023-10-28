import { FC } from "react";
import RootHeader from "../components/layout/root-header";
import { Outlet } from "react-router-dom";
import RootFooter from "../components/layout/root-footer";

interface Props {}

const RootLayout: FC<Props> = (props): JSX.Element => {
  return (
    <div>
      <RootHeader />
      <Outlet />
      <RootFooter />
    </div>
  );
};

export default RootLayout;
