import { FC, ReactNode } from "react";
import RootHeader from "../components/layout/root-header";
import RootFooter from "../components/layout/root-footer";

interface Props {
  children: ReactNode;
}

const RootLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <div>
      <RootHeader />
      {children}
      <RootFooter />
    </div>
  );
};

export default RootLayout;
