import { FC, useState } from "react";
import { IoMdTime } from "react-icons/io";
import { MdSupportAgent } from "react-icons/md";
import { FormattedMessage } from "react-intl";
import { path } from "../../constants";
import { useDispatch } from "react-redux";
import { changeLanguage } from "../../redux/slices/language-slice";
import { IoEarth } from "react-icons/io5";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import HeaderRightSidebar from "./header-right-sidebar";

interface Props {
  color: "main" | "white";
}

const HeaderRightSection: FC<Props> = ({ color }): JSX.Element => {
  const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useDispatch();

  const changeLanguageHandler = () => {
    dispatch(changeLanguage());
  };
  return (
    <>
      <div
        className={`flex items-center gap-6 ${
          color === "main" ? "text-main_color" : "text-white"
        }`}
      >
        <div className="grid place-items-center">
          <IoMdTime
            size={21}
            onClick={() => setShowSidebar(true)}
            className="cursor-pointer"
          />
          <span className="text-xs font-bold">
            <FormattedMessage id="rootheader.calendar" />
          </span>
        </div>

        <Link to={path.SUPPORT} className="grid place-items-center">
          <MdSupportAgent size={21} />
          <span className="text-xs font-bold">
            <FormattedMessage id="rootheader.support" />
          </span>
        </Link>

        <div
          className="grid place-items-center cursor-pointer"
          onClick={changeLanguageHandler}
        >
          <IoEarth size={18} className="my-[2px]" />
          <span className="text-xs font-bold">
            <FormattedMessage id="rootheader.language" />
          </span>
        </div>
      </div>

      <Modal
        open={showSidebar}
        onClose={() => setShowSidebar(false)}
        showCloseIcon={false}
        classNames={{
          modalContainer: "right-sidebar",
          overlayAnimationIn: "customEnterOverlayAnimation",
          overlayAnimationOut: "customLeaveOverlayAnimation",
          modalAnimationIn: "customRightSidebarEnter",
          modalAnimationOut: "customRightSidebarLeave",
        }}
      >
        <HeaderRightSidebar />
      </Modal>
    </>
  );
};

export default HeaderRightSection;
