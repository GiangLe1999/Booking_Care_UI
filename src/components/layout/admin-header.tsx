import { FC } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import AdminNavigator from "./admin-navigator";
import { useDispatch } from "react-redux";
import { userLogout } from "../../redux/slices/user-slice";

interface Props {}

const AdminHeader: FC<Props> = (props): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <div className="z-[99] flex justify-between items-center text-white bg-main_color relative">
      <div className="">
        <AdminNavigator />
      </div>

      <div
        className="px-4 cursor-pointer"
        onClick={() => dispatch(userLogout())}
      >
        <RiLogoutBoxRLine size={20} />
      </div>
    </div>
  );
};

export default AdminHeader;
