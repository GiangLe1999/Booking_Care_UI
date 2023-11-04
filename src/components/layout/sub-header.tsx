import { FC } from "react";
import { ImArrowLeft } from "react-icons/im";
import HeaderRightSection from "./header-right-section";
import { useNavigate } from "react-router-dom";

interface Props {}

const SubHeader: FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate();
  return (
    <header className="bg-main_color py-2 fixed top-0 right-0 left-0">
      <div className="container flex items-center justify-between text-white">
        <ImArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <HeaderRightSection color="white" />
      </div>
    </header>
  );
};

export default SubHeader;
