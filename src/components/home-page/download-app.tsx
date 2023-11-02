import { FC } from "react";
import StyledImage from "../styled-image";
import { FormattedMessage } from "react-intl";
import { FaCheck } from "react-icons/fa6";
import DownloadAppBtns from "./download-app-btns";
import { Link } from "react-router-dom";
import { path } from "../../constants";

interface Props {}

const DownloadApp: FC<Props> = (props): JSX.Element => {
  return (
    <div>
      <div className="mx-auto w-fit flex items-center gap-6">
        <StyledImage
          wrapperClasses="w-[200px] aspect-[0.68]"
          src="/assets/images/home-page/bookingcare-app-2020.png"
          alt="Booking Care App Download"
          imageClasses="!object-top"
        />

        <div className="">
          <h4 className="font-semibold text-2xl mb-3">
            <FormattedMessage id="downloadapp.title" />
          </h4>

          <ul className="space-y-1 mb-5">
            <li className="flex items-center gap-2 text-sm">
              <FaCheck className="text-main_color" />
              <FormattedMessage id="downloadapp.explain1" />
            </li>

            <li className="flex items-center gap-2 text-sm">
              <FaCheck className="text-main_color" />
              <FormattedMessage id="downloadapp.explain2" />
            </li>

            <li className="flex items-center gap-2 text-sm">
              <FaCheck className="text-main_color" />
              <FormattedMessage id="downloadapp.explain3" />
            </li>
          </ul>

          <DownloadAppBtns imgWrapperClasses="w-[135px] h-10" />

          <p className="italic text-main_color text-sm mt-4">
            <FormattedMessage id="downloadapp.explain4" />
            &nbsp;
            <strong>
              <Link to={path.APP}>https://bookingcare.page.link</Link>
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
