import { FC } from "react";
import { Link } from "react-router-dom";
import { path } from "../../constants";
import { FormattedMessage } from "react-intl";
import StyledImage from "../styled-image";
import DownloadApp from "../home-page/download-app";
import DownloadAppBtns from "../home-page/download-app-btns";

interface Props {}

const HeaderRightSidebar: FC<Props> = (): JSX.Element => {
  return (
    <div className="w-[260px]">
      <ul>
        <li>
          <Link
            to={path.CALENDAR}
            className="text-main_color py-3 px-4 block border-b border-[#eeeeee]"
          >
            <FormattedMessage id="rightsidebar.calendar" />
          </Link>
        </li>
        <li>
          <Link
            to={path.APP}
            className="text-main_color py-3 px-4 block border-b border-[#eeeeee]"
          >
            <FormattedMessage id="rightsidebar.download" />
          </Link>
        </li>
      </ul>

      <StyledImage
        wrapperClasses="w-[152px] aspect-square mx-auto my-3"
        src="/assets/images/qr-download-app.png"
        alt="Download App"
      />

      <DownloadAppBtns
        imgWrapperClasses="w-[165px] h-[46px]"
        containerWrapperClasses="flex-col"
      />
    </div>
  );
};

export default HeaderRightSidebar;
