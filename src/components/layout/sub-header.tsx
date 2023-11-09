import { FC } from "react";
import { ImArrowLeft } from "react-icons/im";
import HeaderRightSection from "./header-right-section";
import { useNavigate } from "react-router-dom";

interface Props {
  headingContent?: string;
}

const SubHeader: FC<Props> = ({ headingContent }): JSX.Element => {
  const navigate = useNavigate();
  return (
    <header className="bg-main_color py-2 fixed top-0 right-0 left-0 z-50">
      <div className="container flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <ImArrowLeft
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          />
          {headingContent}
        </div>
        <HeaderRightSection color="white" />
      </div>
    </header>
  );
};

export default SubHeader;
