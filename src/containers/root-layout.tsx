import { FC } from "react";
import RootHeader from "../components/layout/root-header";

interface Props {}

const RootLayout: FC<Props> = (props): JSX.Element => {
  return (
    <div>
      <RootHeader />
    </div>
  );
};

export default RootLayout;
