import { FC } from "react";
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

interface Props {}

const RootHeader: FC<Props> = (props): JSX.Element => {
  const dispatch = useDispatch();

  const changeLanguageHandler = () => {
    dispatch(changeLanguage());
  };

  return (
    <div className="py-[10px] border-b">
      <div className="flex items-center justify-between container">
        <div className="flex items-center gap-3">
          <TbMenu2 size={25} color="#969495" />

          <Link to="/">
            <StyledImage
              wrapperClasses="w-[160px] h-10"
              src="/assets/images/home-page/bookingcare-logo.svg"
              alt="Booking Care Logo"
              imageClasses="!object-contain"
            />
          </Link>
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

        <div className="flex items-center gap-6 text-main_color">
          <div className="grid place-items-center">
            <IoMdTime size={21} />
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
      </div>
    </div>
  );
};

export default RootHeader;
