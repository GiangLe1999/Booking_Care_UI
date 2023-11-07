import { FC } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import AdminNavigator from "./admin-navigator";
import { useDispatch } from "react-redux";
import { userLogout } from "../../redux/slices/user-slice";
import { changeLanguage } from "../../redux/slices/language-slice";
import { useGetLanguage } from "../../hooks/useGetLanguage";
import { FormattedMessage } from "react-intl";
import { useGetUser } from "../../hooks/useGetUser";

interface Props {}

const AdminHeader: FC<Props> = (props): JSX.Element => {
  const currentLanguage = useGetLanguage();
  const currentUser = useGetUser();

  const dispatch = useDispatch();
  return (
    <div className="z-[99] flex justify-between items-center text-white main-gradient relative">
      <div className="">
        <AdminNavigator />
      </div>

      <div className="flex items-center gap-2">
        <span className="mr-2">
          <FormattedMessage id="adminheader.welcome" /> {currentUser?.email}!
        </span>

        <div className="flex items-center gap-2 font-semibold">
          <span
            className={`cursor-pointer px-2 rounded-sm ${
              currentLanguage === "vi" && "border"
            }`}
            onClick={() => dispatch(changeLanguage())}
          >
            VI
          </span>
          <span
            className={`cursor-pointer px-2 rounded-sm ${
              currentLanguage === "en" && "border"
            }`}
            onClick={() => dispatch(changeLanguage())}
          >
            EN
          </span>
        </div>

        <div
          className="px-4 cursor-pointer"
          onClick={() => dispatch(userLogout())}
        >
          <RiLogoutBoxRLine size={20} />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
