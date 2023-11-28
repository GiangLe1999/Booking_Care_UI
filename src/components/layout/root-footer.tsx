import { FC } from "react";
import Logo from "../logo";
import Socials from "../socials";
import { FormattedMessage } from "react-intl";
import { PiCheckFatFill } from "react-icons/pi";
import { FaLocationDot, FaMobileScreenButton } from "react-icons/fa6";
import StyledImage from "../styled-image";
import { footerMenuItems } from "../../data/menu";
import { Link } from "react-router-dom";

interface Props {}

const RootFooter: FC<Props> = (props): JSX.Element => {
  return (
    <footer className="bg-[#f9f9f9] border-t pt-[30px] text-normal_text">
      <div className="grid grid-cols-2 gap-8 container py-6 border-b border-[#ccc]">
        <div>
          <Logo wrapperClasses="w-[200px] h-11" />
          <h2 className="my-2 font-semibold">
            <FormattedMessage id="rootfooter.company" />
          </h2>

          <p className="flex items-center gap-1 text-sm mb-1">
            <FaLocationDot />
            <span>
              <FormattedMessage id="rootfooter.address" />
            </span>
          </p>

          <p className="flex items-center gap-1 text-sm">
            <PiCheckFatFill />
            <FormattedMessage id="rootfooter.brc" />
          </p>

          <StyledImage
            src="/assets/images/home-page/bo-cong-thuong.svg"
            alt="Bộ công thương"
            wrapperClasses="aspect-2 w-[110px] my-4"
            imageClasses="!object-contain"
          />

          <p className="font-semibold">
            <FormattedMessage id="rootfooter.office-title" />
          </p>
          <p className="mb-4 text-sm">
            <FormattedMessage id="rootfooter.office-address" />
          </p>

          <p className="font-semibold">
            <FormattedMessage id="rootfooter.support-title" />
          </p>
          <p className="text-sm mb-4">
            <FormattedMessage id="rootfooter.support-mail" />
          </p>

          <p className="font-semibold">Hotline</p>
          <p className="text-sm">
            <a href="tel:02473012468" className="text-main_color">
              024-7301-2468
            </a>{" "}
            (7h30 - 18h)
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ul>
            {footerMenuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className="text-main_color text-sm py-[5px] block"
                >
                  <FormattedMessage id={`rootsidebar.${item.title}`} />
                </Link>
              </li>
            ))}
          </ul>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <StyledImage
                wrapperClasses="w-[65px] aspect-square"
                src="/assets/images/home-page/hellodoctor-logo.png"
                alt="Hello Doctor Logo"
                imageClasses="!object-contain"
              />

              <div className="flex-1 text-sm">
                <h6 className="text-sm font-semibold mb-1">Hello Doctor</h6>
                <p>
                  <FormattedMessage id="rootfooter.partner1-explain" />
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <StyledImage
                wrapperClasses="w-[65px] aspect-square"
                src="/assets/images/home-page/logo-bernard.png"
                alt="Hello Doctor Logo"
                imageClasses="!object-contain"
              />

              <div className="flex-1 text-sm">
                <h6 className="font-semibold mb-1">
                  <FormattedMessage id="rootfooter.partner2-title" />
                </h6>
                <p>
                  <FormattedMessage id="rootfooter.partner2-explain" />
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <StyledImage
                wrapperClasses="w-[65px] aspect-square"
                src="/assets/images/home-page/logo-doctor-check.png"
                alt="Doctor Check Logo"
                imageClasses="!object-contain"
              />

              <div className="flex-1 text-sm">
                <h6 className="font-semibold mb-1">
                  <FormattedMessage id="rootfooter.partner3-title" />
                </h6>
                <p>
                  <FormattedMessage id="rootfooter.partner3-explain" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pt-2 pb-6">
        <p className="text-sm flex items-center gap-1">
          <FaMobileScreenButton />
          <FormattedMessage id="rootfooter.download" />
          &nbsp;&nbsp;
          <Link className="text-main_color" to="">
            Android
          </Link>{" "}
          -{" "}
          <Link className="text-main_color" to="">
            iPhone/iPad
          </Link>{" "}
          -{" "}
          <Link className="text-main_color" to="">
            Khác
          </Link>
        </p>
      </div>

      <div className="bg-main_color">
        <div className="container py-5">
          <div className="flex justify-between items-center">
            <span className="text-white text-xs">
              © 2023 BookingCare - All rights reserved
            </span>
            <Socials />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default RootFooter;
