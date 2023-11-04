import { FC, ReactNode } from "react";
import RootFooter from "../components/layout/root-footer";
import SubHeader from "../components/layout/sub-header";

interface Props {
  children: ReactNode;
}

const SubLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      <SubHeader />
      {children}
      <RootFooter />
    </>
  );
};

export default SubLayout;
