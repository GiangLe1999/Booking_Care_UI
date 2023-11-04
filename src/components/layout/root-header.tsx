import { FC, useState } from "react";
import { TbMenu2 } from "react-icons/tb";
import StyledImage from "../styled-image";
import { Link } from "react-router-dom";
import { rootMenuItems } from "../../data/menu";
import { FormattedMessage } from "react-intl";
import { IoMdTime } from "react-icons/io";
import { MdSupportAgent } from "react-icons/md";
import { path } from "../../constants";
import { IoEarth } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { changeLanguage } from "../../redux/slices/language-slice";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import RootSidebar from "./root-sidebar";
import Logo from "../logo";
import HeaderRightSection from "./header-right-section";

interface Props {}

const RootHeader: FC<Props> = (props): JSX.Element => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div className="py-4 border-b">
        <div className="flex items-center justify-between container">
          <div className="flex items-center gap-3">
            <TbMenu2
              size={25}
              color="#969495"
              onClick={() => setShowSidebar(true)}
            />

            <Logo wrapperClasses="w-[160px] h-10" />
          </div>

          <ul className="flex items-center gap-6">
            {rootMenuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.link}>
                  <h3 className="font-semibold text-xs mb-1">
                    <FormattedMessage id={`rootheader.${item.title}`} />
                  </h3>
                  <p className="text-xs">
                    <FormattedMessage id={`rootheader.${item.subtitle}`} />
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <HeaderRightSection color="main" />
        </div>
      </div>

      <div>
        <Modal
          open={showSidebar}
          onClose={() => setShowSidebar(false)}
          classNames={{
            modalContainer: "root-sidebar",
            overlayAnimationIn: "customEnterOverlayAnimation",
            overlayAnimationOut: "customLeaveOverlayAnimation",
            modalAnimationIn: "customRootSidebarEnter",
            modalAnimationOut: "customRootSidebarLeave",
          }}
        >
          <RootSidebar />
        </Modal>
      </div>
    </>
  );
};

export default RootHeader;
