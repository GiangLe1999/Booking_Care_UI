import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useIsDoctor = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return user?.roleId === "R2";
};
