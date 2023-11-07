import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useIsAdmin = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return user?.roleId === "R1";
};
